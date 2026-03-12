namespace PageCtrl {

    type IImageRatio = "p" | "page" | "v" | "vertical" | "h" | "horizontal" | "s" | "square" | "w" | "wide";

    export interface IPaintingSeriesInfo {
        id: string;
        alias?: string[] | null;
        disable?: string;
        name: string;
        "name-cap"?: "small" | "normal" | null;
        subtitle?: string;
        "subtitle-cap"?: "small" | "normal" | null;
        icon?: string;
        qr?: string;
        blog?: string;
        year: number;
        ext?: string;
        ratio?: IImageRatio;
        thumb?: boolean;
    }

    interface IPaintingPaging {
        id?: string;
        offset: number;
        size: number;
        path: string;
        defaultName?: string;
        root?: boolean;
        series?: IPaintingSeriesInfo;
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
        return ele(`${paging?.id || "section-works"}-${suffix || "container"}`)!;
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

        for (let i in series) {
            const item = series[i];
            if (!item?.alias || item.disable || !(item.alias instanceof Array)) continue;
            if (item.alias.indexOf(id) > -1) return item;
        }

        return undefined;
    }

    function getSeriesIcon(icon: string | undefined, root?: boolean) {
        return `${rootRela(root)}images/${(icon || "logos/mspaint.png")}`;
    }

    function seriesInPaging(paging: IPaintingPaging) {
        return paging.series || {} as IPaintingSeriesInfo;
    }

    async function seriesBlog(series: IPaintingSeriesInfo | undefined) {
        const keyword = series?.blog;
        if (!keyword) return undefined;
        const articles = await loadBlogArticles();
        if (!articles) return undefined;
        return articles.blog()?.filter(ele => ele && ele.hasKeyword(keyword));
    }

    async function renderSeriesBLog(paging: IPaintingPaging) {
        const articles = await seriesBlog(paging?.series);
        const element = getContainerElement(paging, "blog");
        if (!element) return;
        element.innerHTML = "";
        if (!articles || !articles.length) {
            element.style.display = "none";
            return;
        }

        element.style.display = "";
        const title = document.createElement("h2");
        title.innerText = getString('relatedBlog');
        element.appendChild(title);
        for (let i = 0; i < articles.length; i++) {
            const article = articles[i];
            const link = document.createElement("a");
            link.className = "link-long-button";
            link.href = `../blog/?${article.getRoutePath()}`;
            let tips = article.getName();
            {
                const text = document.createElement("span");
                text.innerText = tips;
                link.appendChild(text);
            }
            let subtitle = article.getSubtitle();
            if (subtitle) {
                tips += `\n${subtitle}`;
                const text = document.createElement("span");
                text.innerText = subtitle;
                link.appendChild(text);
            }
            {
                const text = document.createElement("span");
                tips += `\n${article.dateString}`;
                text.innerText = article.dateString;
                link.appendChild(text);
            }
            subtitle = article.getIntro();
            if (subtitle) tips += `\n${subtitle}`;
            link.title = tips;
            element.appendChild(link);
        }
    }

    export function hidePopupViewDelay() {
        setTimeout(() => {
            hidePopupView();
        }, 200);
    }

    export async function renderPaintings(images: IPaintingInfo[] | true, paging: IPaintingPaging) {
        if (!paging) return;
        if (paging.root) await init("./paintings/");
        else await init();
        if (images === true) images = works.common || [];
        const series = seriesInPaging(paging);
        const container = getContainerElement(paging);
        container.innerHTML = "";
        switch (series.ratio) {
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

        DeepX.MdBlogs.setElementProp(getContainerElement(paging, "title"), null, series.name || paging.defaultName || getString("paintings"));
        const subtitle = getContainerElement(paging, "subtitle");
        if (subtitle) {
            if (series.subtitle) DeepX.MdBlogs.setElementProp(subtitle, null, series.subtitle);
            subtitle.className = series["subtitle-cap"] === "small" ? "x-text-cap-small" : "";
        }

        const icon = getContainerElement(paging, "title-icon") as HTMLImageElement;
        if (icon) {
            icon.src = getSeriesIcon(series.icon, paging.root);
            icon.style.display = series.icon ? "" : "none";
        }

        const qr = getContainerElement(paging, "qr") as HTMLImageElement;
        const qrContainer = getContainerElement(paging, "share") as HTMLImageElement;
        if (qr) {
            qr.src = getSeriesIcon(series.qr, paging.root);
            if (qrContainer) qrContainer.style.display = series.qr ? "" : "none";
        }

        renderNextWave(images, paging);
        getContainerElement(paging, "more")!.addEventListener("click", function () {
            renderNextWave(images, paging);
        });
    }

    export function hidePopupView() {
        ele("popup-view")!.style.display = "none";
    }

    export function renderImage(containerEle: HTMLElement, imageInfo: IPaintingInfo, paging: IPaintingPaging) {
        const imageEle = document.createElement("img");
        imageEle.loading = "lazy";
        let sourceUrl = imageInfo.url;
        const series = seriesInPaging(paging);
        const ext = "." + (series.ext || "webp");
        if (!sourceUrl) {
            if (imageInfo.id && imageInfo.year) sourceUrl = "~/" + imageInfo.year + "/" + imageInfo.id + ext;
            else return;
        }

        let thumbUrl = imageInfo.thumb;
        if (thumbUrl === undefined) thumbUrl = series.thumb;
        if (thumbUrl === true) thumbUrl = sourceUrl.replace("~/", "~/thumbnails/");
        else if (!thumbUrl) thumbUrl = sourceUrl;
        const imagesPath = rootRela(paging.root) + "images/";
        if (thumbUrl.indexOf("~/") == 0) thumbUrl = thumbUrl.replace("~/", imagesPath + paging.path + "/");
        if (sourceUrl.indexOf("~/") == 0) sourceUrl = sourceUrl.replace("~/", imagesPath + paging.path + "/");
        imageEle.src = thumbUrl;
        let imageName = imageInfo.name || series.name || paging.defaultName || "";
        let imageSize = imageInfo.size || "";
        if (imageSize && imageSize.indexOf("x") > 0)
            imageSize = imageSize.replace("x", "cm × ") + "cm";
        if (imageInfo.year) {
            if (imageSize) imageSize += " 　|　 ";
            imageSize += monthYear(imageInfo.year, imageInfo.month);
        }

        if (imageSize) imageName += " (" + imageSize + ")";
        imageEle.alt = imageEle.title = imageName;
        containerEle.appendChild(imageEle);
        imageEle.addEventListener("click", function (ev) {
            (ele("popup-view-img") as HTMLImageElement).src = sourceUrl;
            (ele("popup-view-img") as HTMLImageElement).alt = imageName;
            (ele("popup-view-thumb") as HTMLImageElement).src = thumbUrl;
            (ele("popup-view-thumb") as HTMLImageElement).alt = imageName;
            ele("popup-view-title")!.innerText = imageInfo.name || series.name || paging.defaultName || "";
            ele("popup-view-desc")!.innerText = imageSize;
            ele("popup-view")!.style.display = "";
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
        const seriesMenu = ele("section-series-container")!;
        seriesMenu.innerHTML = "";
        const paintingsString = getString("paintings");
        const paintingsTitleString = getString("worksBy").replace("{0}", "Muse").replace("{1}", paintingsString);
        document.title = paintingsTitleString;
        const iconElement = ele("ph-link-icon") as HTMLLinkElement;
        if (iconElement) iconElement.href = "../images/logos/logo-2026-paint.png";
        if (sel) {
            if (sel.id) q = sel.id;
            const col = ((works as any as Record<string, IPaintingInfo[]>)[q] || []).filter(ele => !!ele && !ele.disable);
            const paging = {
                offset: 0,
                size: 24,
                path: "paintings",
                series: sel
            };
            renderSeriesBLog(paging);
            await renderPaintings(col, paging);
            if (sel.name && sel.name !== paintingsString) document.title = `${sel.name} - ${paintingsTitleString}`;
            const icon = getSeriesIcon(sel.icon);
            if (iconElement && icon) iconElement.href = icon;
            setElementProp("text-series", null, "series");
        } else {
            const paging = {
                offset: 0,
                size: 24,
                path: "paintings",
                series: {
                    thumb: true,
                    qr: "logos/qr-paintings.png",
                } as IPaintingSeriesInfo,
            };
            renderSeriesBLog(paging);
            await renderPaintings(works.common, paging);
            setElementProp("text-series", null, "generalPaintings");
        }
        const series = works.series || [];
        {
            const linkEle = document.createElement("a");
            linkEle.className = sel ? "link-long-button" : "link-long-button state-sel";
            linkEle.href = "./";
            linkEle.innerText = getString("generalPaintings");
            seriesMenu.appendChild(linkEle);
            const subtitle = document.createElement("span");
            subtitle.className = "x-text-subtitle";
            subtitle.innerText = getString("series");
            seriesMenu.appendChild(subtitle);
        }
        for (let i in series) {
            const item = series[i];
            if (!item || item.disable || !item.name || !item.id) continue;
            const linkEle = document.createElement("a");
            linkEle.className = sel === item ? "link-long-button state-sel" : "link-long-button";
            linkEle.href = "./?" + item.id;
            if (item.icon) {
                const icon = document.createElement("img");
                icon.src = getSeriesIcon(item.icon);
                icon.alt = item.name;
                linkEle.appendChild(icon);
            }

            const spanEle = document.createElement("span");
            spanEle.title = spanEle.innerText = item.name;
            if (item["name-cap"] === "small") spanEle.className = "x-text-cap-small";
            linkEle.appendChild(spanEle);
            if (item.subtitle) {
                const subtitle = document.createElement("span");
                subtitle.title = subtitle.innerText = item.subtitle;
                if (item["subtitle-cap"] === "small") subtitle.className = "x-text-cap-small";
                const subtitle2 = document.createElement("span");
                subtitle2.appendChild(subtitle);
                linkEle.appendChild(subtitle2);
            }

            seriesMenu.appendChild(linkEle);
        }

        initPopupView();
        DeepX.MdBlogs.setElementProp("button-works-more", null, DeepX.MdBlogs.getLocaleString("seeMore"));
        setElementProp("section-series-title", null, "picLibs");
        setElementProp("text-works-greetings", null, "loveDrawing");
        const share = ele("section-share-title");
        if (share) {
            setElementProp(share, null, "share");
            if (typeof navigator === 'object' && typeof navigator.share === "function") {
                share.className = "x-text-link";
                share.addEventListener("click", ev => {
                    navigator.share({
                        title: document.title,
                        url: sel && q ? `./?${q}` : "./"
                    });
                });
            }
        }

        initMenu("paintings");
    }

    export function initPopupView() {
        const c = ele("popup-view");
        if (!c) return;
        c.addEventListener("click", hidePopupView);
        c.addEventListener("touchend", hidePopupViewDelay);
    }

}
