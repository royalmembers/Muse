namespace PageCtrl {

    type IImageRatio = "p" | "page" | "v" | "vertical" | "h" | "horizontal" | "s" | "square" | "w" | "wide";

    interface IPaintingPaging {
        offset: number;
        size: number;
        path: string;
        ext?: string;
        defaultName?: string;
        icon?: string;
        root?: boolean;
        id?: string;
        ratio?: IImageRatio;
        thumb?: boolean;
    }

    export interface IPaintingInfo {
        id: string;
        disable?: boolean;
        name?: string;
        year: number;
        month?: number;
        day?: number;
        url?: string;
        thumb?: boolean | string;
        keywords?: string[];
        size?: string;
    }

    export interface IPaintingSeriesInfo {
        id: string;
        disable?: string;
        name: string;
        icon?: string;
        year: number;
        ext?: string;
        ratio?: IImageRatio;
        thumb?: boolean;
    }

    let works = {
        series: [] as IPaintingSeriesInfo[],
        common: [] as IPaintingInfo[],
        done: false
    };

    async function init(rela?: string) {
        if (works.done) return true;
        const res = await fetch(`${rela || "../paintings/"}config.json`);
        const json = await res.json();
        if (!json) return false;
        works = json;
        works.done = true;
        return true;
    }

    function getContainerElement(paging: IPaintingPaging, suffix?: string) {
        return document.getElementById(`${paging?.id || "section-works"}-${suffix || "container"}`)!;
    }

    function renderNextWave(images: IPaintingInfo[], paging: IPaintingPaging) {
        const containerEle = getContainerElement(paging);
        for (let i = paging.offset; i < Math.min(paging.offset + paging.size, images.length); i++) {
            const imageInfo = images[i];
            if (!imageInfo || imageInfo.disable) continue;
            try {
                renderImage(containerEle, imageInfo, paging);
            } catch (ex) { }
        }
        paging.offset += paging.size;
        getContainerElement(paging, "more").style.display = paging.offset < images.length ? "" : "none";
    }

    function getSeries(id: string) {
        if (!id) return undefined;
        id = id.replace("=", "").replace(" ", "");
        const series = works.series || [];
        for (let i in series) {
            const item = series[i];
            if (item?.id !== id || item.disable) continue;
            return item;
        }

        return undefined;
    }

    function getSeriesIcon(paging: {
        root?: boolean;
        icon?: string;
    }) {
        return (paging.root ? "./images/" : "../images/") + (paging.icon || "logos/mspaint.png");
    }

    export async function renderPaintings(images: IPaintingInfo[] | true, paging: IPaintingPaging) {
        if (!paging) return;
        if (paging.root) await init("./paintings/");
        else await init();
        if (images === true) images = works.common || [];
        const container = getContainerElement(paging);
        container.innerHTML = "";
        switch (paging.ratio) {
            case "w":
            case "wide":
                container.className = "x-container-pics x-image-ratio-w";
                break;
            case "s":
            case "square":
                container.className = "x-container-pics x-image-ratio-s";
                break;
            case "p":
            case "page":
                container.className = "x-container-pics x-image-ratio-p";
                break;
            case "h":
            case "horizontal":
                container.className = "x-container-pics x-image-ratio-h";
                break;
            case "v":
            case "vertical":
            default:
                container.className = "x-container-pics";
                break;
        }

        DeepX.MdBlogs.setElementProp(getContainerElement(paging, "title"), null, paging.defaultName || getString("paintings"));
        const icon = getContainerElement(paging, "title-icon") as HTMLImageElement;
        if (icon) {
            icon.src = getSeriesIcon(paging);
            icon.style.display = paging.icon ? "" : "none";
        }

        renderNextWave(images, paging);
        getContainerElement(paging, "more")!.addEventListener("click", function () {
            renderNextWave(images, paging);
        });
    }

    export function hidePopupView() {
        document.getElementById("popup-view")!.style.display = "none";
    };

    export function renderImage(containerEle: HTMLElement, imageInfo: IPaintingInfo, paging: IPaintingPaging) {
        const imageEle = document.createElement("img");
        imageEle.loading = "lazy";
        let sourceUrl = imageInfo.url;
        const ext = "." + (paging.ext || "webp");
        if (!sourceUrl) {
            if (imageInfo.id && imageInfo.year) sourceUrl = "~/" + imageInfo.year + "/" + imageInfo.id + ext;
            else return;
        }
        let thumbUrl = imageInfo.thumb;
        if (thumbUrl === undefined) thumbUrl = paging.thumb;
        if (thumbUrl === true) thumbUrl = sourceUrl.replace("~/", "~/thumbnails/");
        else if (!thumbUrl) thumbUrl = sourceUrl;
        const imagesPath = paging.root ? "./images/" : "../images/";
        if (thumbUrl.indexOf("~/") == 0) thumbUrl = thumbUrl.replace("~/", imagesPath + paging.path + "/");
        if (sourceUrl.indexOf("~/") == 0) sourceUrl = sourceUrl.replace("~/", imagesPath + paging.path + "/");
        imageEle.src = thumbUrl;
        let imageName = imageInfo.name || paging.defaultName || "";
        let imageSize = imageInfo.size || "";
        if (imageSize && imageSize.indexOf("x") > 0)
            imageSize = imageSize.replace("x", "cm × ") + "cm";
        if (imageInfo.year) {
            if (imageSize && imageInfo.year) imageSize += " &nbsp; | &nbsp; ";
            imageSize += "&#39;" + imageInfo.year.toString();
        }
        if (imageSize) imageName += " (" + imageSize + ")";
        imageEle.alt = imageName;
        containerEle.appendChild(imageEle);
        imageEle.addEventListener("click", function (ev) {
            (document.getElementById("popup-view-img") as HTMLImageElement).src = sourceUrl;
            (document.getElementById("popup-view-img") as HTMLImageElement).alt = imageName;
            (document.getElementById("popup-view-thumb") as HTMLImageElement).src = thumbUrl;
            (document.getElementById("popup-view-thumb") as HTMLImageElement).alt = imageName;
            document.getElementById("popup-view-title")!.innerHTML = imageInfo.name || paging.defaultName || "";
            document.getElementById("popup-view-desc")!.innerHTML = imageSize;
            document.getElementById("popup-view")!.style.display = "";
        });
    }

    export async function initPaint() {
        DeepX.MdBlogs.setElementText("section-works-container", "loading");
        try {
            await init();
        } catch (ex) {
            DeepX.MdBlogs.setElementText("section-works-container", "loadFailed");
        }

        let q = DeepX.MdBlogs.firstQuery();
        const sel = getSeries(q);
        const seriesMenu = document.getElementById("section-series-container")!;
        seriesMenu.innerHTML = "";
        if (sel) {
            if (sel.id) q = sel.id;
            const col = (works as any as Record<string, IPaintingInfo[]>)[q];
            await renderPaintings(col, {
                offset: 0,
                size: 24,
                path: "paintings",
                ext: sel.ext,
                defaultName: sel.name,
                ratio: "p",
                icon: sel.icon,
                thumb: sel.thumb,
            });
            document.getElementById("section-back-container")!.style.display = "";
            document.getElementById("section-series-title-container")!.style.display = "none";
            seriesMenu.style.display = "none";
        } else {
            await renderPaintings(works.common, {
                offset: 0,
                size: 24,
                path: "paintings",
                thumb: true,
            });
            document.getElementById("section-back-container")!.style.display = "none";
            document.getElementById("section-series-title-container")!.style.display = "";
            seriesMenu.style.display = "";
        }
        const series = works.series || [];
        for (let i in series) {
            const item = series[i];
            if (!item || item.disable || !item.name || !item.id) continue;
            const linkEle = document.createElement("a");
            linkEle.className = "link-long-button";
            linkEle.href = "./?" + item.id;
            if (item.icon) {
                const icon = document.createElement("img");
                icon.src = getSeriesIcon(item);
                icon.alt = item.name;
                linkEle.appendChild(icon);
            }

            const spanEle = document.createElement("span");
            spanEle.title = spanEle.innerText = item.name;
            linkEle.appendChild(spanEle);
            seriesMenu.appendChild(linkEle);
        }

        initPopupView();
        DeepX.MdBlogs.setElementText("text-back", "back");
        DeepX.MdBlogs.setElementProp("button-works-more", null, DeepX.MdBlogs.getLocaleString("seeMore"));
        setElementProp("section-series-title", null, "series");
        setElementProp("text-series", null, "series");
        initMenu("paintings");
    };

    export function initPopupView() {
        document.getElementById("popup-view")!.addEventListener("click", hidePopupView);
    }

}