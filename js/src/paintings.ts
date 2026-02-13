namespace PageCtrl {

    type IImageRatio = "p" | "page" | "v" | "vertical" | "h" | "horizontal" | "s" | "square" | "w" | "wide";

    interface IPaintingPaging {
        offset: number;
        size: number;
        path: string;
        ext?: string;
        defaultName?: string;
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
        year: number;
        ext?: string;
        ratio?: IImageRatio;
        thumb?: boolean;
    }

    const works: Record<string, IPaintingInfo[]> = {
        common: [{
            id: "countryside",
            name: "乡村景色",
            year: 2025,
            month: 4,
            keywords: ["colored-pencil"]
        }, {
            id: "moon-rabbit",
            name: "玉兔月球车",
            year: 2025,
            month: 2,
            keywords: ["computer-art"]
        }, {
            id: "fish",
            name: "年年有余",
            year: 2025,
            keywords: ["chinese-brush"]
        }, {
            id: "gold-medal",
            name: "金牌时刻",
            year: 2024,
            month: 8,
            keywords: ["watercolor"]
        }, {
            id: "magpie",
            name: "喜上眉梢",
            year: 2024,
            keywords: ["chinese-brush"]
        }, {
            id: "cat",
            name: "喵宅妙哉",
            year: 2024,
            keywords: ["chinese-brush"]
        }, {
            id: "lesser-panda",
            name: "小熊猫",
            year: 2024,
            keywords: ["chinese-brush"]
        }, {
            id: "takeout",
            name: "外卖",
            year: 2022,
            month: 7,
            keywords: ["watercolor"]
        }, {
            id: "fighting-covid-19",
            disable: true,
            name: "抗击新冠",
            year: 2022,
            month: 4,
            keywords: []
        }, {
            id: "love-music",
            name: "我爱音乐",
            year: 2021,
            month: 2,
            keywords: ["colored-pencil"]
        }, {
            id: "defend-dream",
            name: "守护梦想",
            year: 2020,
            month: 5,
            keywords: ["watercolor"]
        }],
        mao: [{
            id: "mao-260210-p2",
            name: "摸凹喵凤凰神兽",
            year: 2026,
            month: 2,
            day: 10
        }, {
            id: "mao-260210-p1",
            name: "摸凹喵龙神兽",
            year: 2026,
            month: 2,
            day: 10
        }, {
            id: "mao-26-02-p-14",
            name: "摸凹喵吊坠",
            year: 2026,
            month: 2
        }, {
            id: "mao-26-02-p-13",
            name: "摸凹喵吊坠",
            year: 2026,
            month: 2
        }, {
            id: "mao-26-02-p-12",
            year: 2026,
            month: 2
        }, {
            id: "mao-26-02-p-11",
            name: "狮子摸凹喵",
            year: 2026,
            month: 2
        }, {
            id: "mao-26-02-p-10",
            name: "摸凹喵吊坠",
            year: 2026,
            month: 2
        }, {
            id: "mao-26-02-p-09",
            year: 2026,
            month: 2
        }, {
            id: "mao-26-02-p-08",
            name: "熊猫摸凹喵",
            year: 2026,
            month: 2
        }, {
            id: "mao-26-02-p-07",
            name: "熊猫摸凹喵",
            year: 2026,
            month: 2
        }, {
            id: "mao-26-02-p-06",
            year: 2026,
            month: 2
        }, {
            id: "mao-26-02-p-05",
            year: 2026,
            month: 2
        }, {
            id: "mao-26-02-p-04",
            name: "摸凹喵吃成都火锅",
            year: 2026,
            month: 2
        }, {
            id: "mao-26-02-p-03",
            name: "摸凹喵吃老北京火锅",
            year: 2026,
            month: 2
        }, {
            id: "mao-26-02-p-02",
            name: "摸凹喵泡澡",
            year: 2026,
            month: 2
        }, {
            id: "mao-26-02-p-01",
            name: "摸凹喵玩游戏",
            year: 2026,
            month: 2
        }]
    };

    const series: IPaintingSeriesInfo[] = [{
        id: "mao",
        name: "摸凹喵",
        year: 2026,
        ratio: "p",
        thumb: true,
    }];

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
        for (let i in series) {
            const item = series[i];
            if (item?.id !== id || item.disable) continue;
            return item;
        }

        return undefined;
    }
    
    export function renderPaintings(images: IPaintingInfo[] | true, paging: IPaintingPaging) {
        if (!paging) return;
        if (images === true) images = works.common;
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

        DeepX.MdBlogs.setElementProp(getContainerElement(paging, "title"), null, paging.defaultName || "paintings");
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
        let imageName = imageInfo.name;
        let imageSize = imageInfo.size || "";
        if (imageSize && imageSize.indexOf("x") > 0)
            imageSize = imageSize.replace("x", "cm × ") + "cm";
        if (imageInfo.year) {
            if (imageSize && imageInfo.year) imageSize += " &nbsp; | &nbsp; ";
            imageSize += "&#39;" + imageInfo.year.toString();
        }
        if (imageName) {
            if (imageSize) imageName += " (" + imageSize + ")";
        } else {
            imageName = paging.defaultName || "";
        }
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

    export function initPaint() {
        let q = DeepX.MdBlogs.firstQuery();
        const series = getSeries(q);
        if (series) {
            if (series.id) q = series.id;
            const col = works[q];
            renderPaintings(col, {
                offset: 0,
                size: 24,
                path: "paintings",
                ext: series.ext,
                defaultName: series.name,
                ratio: "p",
                thumb: series.thumb,
            });
        } else {
            renderPaintings(works.common, {
                offset: 0,
                size: 24,
                path: "paintings",
                thumb: true,
            });
        }
        initPopupView();
    };

    export function initPopupView() {
        document.getElementById("popup-view")!.addEventListener("click", hidePopupView);
    }

}