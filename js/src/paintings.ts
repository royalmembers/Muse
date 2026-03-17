namespace PageCtrl {

    type IImageRatio = "p" | "page" | "v" | "vertical" | "h" | "horizontal" | "s" | "square" | "w" | "wide";

    export type ITitleCapKind = "small" | "normal" | null;

    export interface IPaintingSeriesInfo {
        id: string;
        alias?: string[] | null;
        disable?: boolean;
        name: string;
        "name-cap"?: ITitleCapKind;
        subtitle?: string;
        "subtitle-cap"?: ITitleCapKind;
        defaultItemName?: string;
        icon?: string;
        intro?: string;
        qr?: string;
        blog?: string;
        year: number;
        ratio?: IImageRatio;
        thumb?: boolean;
        links?: DeepX.MdBlogs.IArticleRelatedLinkItemInfo[];
        [property: string]: any;
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

    function seriesInPaging(paging: IPaintingPaging) {
        return paging.series || {} as IPaintingSeriesInfo;
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

        DeepX.MdBlogs.setElementProp(getContainerElement(paging, "title"), null, DeepX.MdBlogs.getLocaleProp(series, "name") || paging.defaultName || getString("paintings"));
        const subtitle = getContainerElement(paging, "subtitle");
        if (subtitle) {
            if (series.subtitle) DeepX.MdBlogs.setElementProp(subtitle, null, series.subtitle);
            subtitle.className = series["subtitle-cap"] === "small" ? "x-text-cap-small" : "";
        }

        renderNextWave(images, paging);
        getContainerElement(paging, "more")!.addEventListener("click", function () {
            renderNextWave(images, paging);
        });
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
        const imageName = DeepX.MdBlogs.getLocaleProp(imageInfo, "name") || DeepX.MdBlogs.getLocaleProp(series, "name") || paging.defaultName || "";
        let imageSize = imageInfo.size || "";
        if (imageSize && imageSize.indexOf("x") > 0)
            imageSize = imageSize.replace("x", "cm × ") + "cm";
        if (imageInfo.year) {
            if (imageSize) imageSize += " 　|　 ";
            imageSize += monthYear(imageInfo.year, imageInfo.month);
        }

        const imageName2 = imageSize ? `"${imageName} (${imageSize})` : imageName;
        imageEle.alt = imageEle.title = imageName;
        containerEle.appendChild(imageEle);
        imageEle.addEventListener("click", function (ev) {
            (ele("popup-view-img") as HTMLImageElement).src = sourceUrl;
            (ele("popup-view-img") as HTMLImageElement).alt = imageName2;
            (ele("popup-view-thumb") as HTMLImageElement).src = thumbUrl;
            (ele("popup-view-thumb") as HTMLImageElement).alt = imageName2;
            ele("popup-view-title")!.innerText = imageName;
            ele("popup-view-desc")!.innerText = imageSize;
            ele("popup-view")!.style.display = "";
        });
    }

    export async function initPaint() {
        initMenu("paintings");
        Hje.render("main-container", {
            children: [{
                tagName: "p",
                children: [{
                    tagName: "em",
                    children: DeepX.MdBlogs.getLocaleString("loading"),
                }],
            }],
        });
        try {
            await init();
        } catch (ex) {
            DeepX.MdBlogs.setElementText("section-works-container", "loadFailed");
        }
        const component = Hje.render("main-container", {
            control: ImageSeriesPart,
            data: {
                series: [{
                    id: "default",
                    name: getString("generalPaintings"),
                    qr: "logos/qr-paintings.png",
                    year: 2020,
                    thumb: true
                }, getString("series"), ...works.series],
                items: works as any,
                select: DeepX.MdBlogs.firstQuery() || true,
                blogRela: "../blog/",
                imageRela: "../images/",
                itemUrl(item, kind) {
                    return kind === "source"
                        ? `./paintings/${item.year}/${item.id}.webp`
                        : `./paintings/thumbnails/${item.year}/${item.id}.webp`;
                },
                click(data) {
                    let imageSize = data.item.size || "";
                    if (imageSize && imageSize.indexOf("x") > 0)
                        imageSize = imageSize.replace("x", "cm × ") + "cm";
                    if (data.item.year) {
                        if (imageSize) imageSize += " 　|　 ";
                        imageSize += monthYear(data.item.year, data.item.month);
                    }

                    const name = data.info.name;
                    const desc = imageSize ? `"${name} (${imageSize})` : name;
                    (ele("popup-view-img") as HTMLImageElement).src = data.info.url;
                    (ele("popup-view-img") as HTMLImageElement).alt = desc;
                    (ele("popup-view-thumb") as HTMLImageElement).src = data.info.thumb;
                    (ele("popup-view-thumb") as HTMLImageElement).alt = desc;
                    ele("popup-view-title")!.innerText = name;
                    ele("popup-view-desc")!.innerText = imageSize;
                    ele("popup-view")!.style.display = "";
                },
                styles: {
                    header: ["x-zone-hl", "layout-wide-full", "x-bg-outstanding"],
                    next: ["x-zone-actions"],
                    share: ["x-part-panel", "x-bg-emphasis"],
                },
                strings: {
                    pics: getString("paintings"),
                    all: getString("picLibs"),
                    site: getString("worksBy").replace("{0}", "Muse").replace("{1}", getString("paintings")),
                },
                urls: {
                    share: "./icons/share-w.png",
                    qr: "./logos/qr-paintings.png",
                    series: "./",
                },
                mkt: Hje.getQuery("mkt") || true,
                page: 24,
                before: {
                    tagName: "section",
                    styleRefs: "x-part-greetings",
                    children: [{
                        tagName: "span",
                        children: getString("loveDrawing"),
                    }, {
                        tagName: "span",
                        children: "❤",
                    }, {
                        tagName: "a",
                        props: {
                            href: "#",
                        },
                        on: {
                            click(ev: MouseEvent) {
                                ev.preventDefault();
                                if (component) component.scrollAllMenuIntoView();
                            }
                        },
                        children: getString("picLibs"),
                    }]
                }
            } as IImageSeriesPartData,
        })?.control() as ImageSeriesPart;
        window.addEventListener("popstate", function(ev) {
            if (!component || !ev?.state) return;
            component.selectSeries(ev.state);
        });
    }

}
