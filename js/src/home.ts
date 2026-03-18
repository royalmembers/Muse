namespace PageCtrl {

    export interface IAvatarInfo {
        title?: string;
        year: number;
        month: number;
        url?: string;
    }

    const avatars: IAvatarInfo[] = [
        { year: 2026, month: 2 },
        { year: 2025, month: 7 },
        { year: 2024, month: 5 },
        { year: 2023, month: 6 },
        { year: 2022, month: 1 },
        { year: 2021, month: 4 },
        { year: 2020, month: 1 },
        { year: 2019, month: 10 },
        { year: 2018, month: 10 },
        { year: 2017, month: 4 },
        { year: 2016, month: 6 },
        { year: 2015, month: 9 }
    ];

    const menu = [{
        id: "certs",
        name: "Honors",
        "name#zh": "荣誉",
    }, {
        id: "paintings",
        name: "Paintings",
        "name#zh": "画作",
    }, {
        id: "blog",
        name: "Blog",
        "name#zh": "博客",
    }];

    function getAvatarUrl(item: IAvatarInfo) {
        let url = item.url;
        if (url) return url;
        url = "./images/avatar/avatar_MuseTuan_" + item.year.toString(10);
        if (item.month) {
            if (item.month < 10) url += "0";
            url += item.month;
        }
        url += item.year > 2025 ? ".webp" : ".jpg";
        return url;
    }

    function showAvatar(item: IAvatarInfo) {
        if (!item) return;
        DeepX.MdBlogs.setElementProp("image-avatar", "src", getAvatarUrl(item));
        DeepX.MdBlogs.setElementProp("image-desc", "innerText", getString("photoTaken").replace("{0}", item.year.toString(10)));
    }

    export function initMenu(id?: (typeof menu)[number]["id"] | boolean) {
        const container = ele("top-menu");
        const cover = ele("popup-view");
        if (cover) {
            cover.addEventListener("click", hidePopupView);
            cover.addEventListener("touchend", hidePopupViewDelay);
        }

        if (!container) return;
        container.innerHTML = "";
        const rela = id === true ? "./" : "../";
        const sel = typeof id === "string" ? id : undefined;
        menu.forEach(ele => {
            if (!ele || !ele.name || !ele.id) return;
            if ((ele as any).disable && ele.id !== sel) return;
            const item = document.createElement("li");
            const link = document.createElement("a");
            container.appendChild(item);
            item.appendChild(link);
            link.href = rela + ele.id;
            link.innerText = DeepX.MdBlogs.getLocaleProp(ele, "name");
            if (ele.id === sel) item.className = "state-sel";
        });
    }

    export function hidePopupView() {
        ele("popup-view")!.style.display = "none";
    }

    export function hidePopupViewDelay() {
        setTimeout(() => {
            hidePopupView();
        }, 200);
    }

    export function showPopupView(info: {
        url: string;
        thumb?: string;
        name: string;
        tips?: string;
        desc: string;
    }) {
        if (!info?.url || !info.name) {
            hidePopupView();
            return;
        }
        (ele("popup-view-img") as HTMLImageElement).src = info.url;
        (ele("popup-view-img") as HTMLImageElement).alt = info.tips || info.name;
        (ele("popup-view-thumb") as HTMLImageElement).src = info.thumb || info.url;
        (ele("popup-view-thumb") as HTMLImageElement).alt = info.tips || info.name;
        ele("popup-view-title")!.innerText = info.name;
        ele("popup-view-desc")!.innerText = info.desc;
        ele("popup-view")!.style.display = "";
    }

    export function initHome() {
        let container = ele("section-avatars")!;
        container.innerHTML = "";
        avatars.forEach(function (item, i) {
            if (!item) return;
            let url = getAvatarUrl(item);
            let span = document.createElement("span");
            span.className = "x-photo-avatar";
            if (i === 0) span.style.display = "none";
            span.addEventListener("click", function (ev) {
                showAvatar(item);
                (container.children[0] as HTMLElement).style.display = "";
                scrollToTop();
            });
            let img = document.createElement("img");
            img.alt = item.title || ("Muse (" + item.year + ")");
            img.src = url;
            span.appendChild(img);
            container.append(span);
        });
        try {
            let q = location.search;
            if (q.length === 5) {
                let year = parseInt(q.substring(1));
                if (year > 2000 && year < 3000) avatars.some(function (item) {
                    if (item.year !== year) return false;
                    (container.children[0] as HTMLElement).style.display = "";
                    showAvatar(item);
                    return true;
                });
            }
        } catch (ex) { }
        renderPaintings(true, {
            offset: 0,
            size: 12,
            path: "paintings",
            root: true
        });
        videosModel("home");
        if (typeof DeepX === "undefined") return;
        DeepX.MdBlogs.setElementText("title-about", "about");
        DeepX.MdBlogs.setElementText("title-videos", "videos");
        DeepX.MdBlogs.setElementText("title-links", "otherLinks");
        DeepX.MdBlogs.setElementText("button-blog", "blog");
        setElementProp("link-certs", null, "certHonors");
        setElementProp("title-works-series", null, "series");
        setElementProp("title-works-common", null, "general");
        DeepX.MdBlogs.setElementProp("button-works-more", null, DeepX.MdBlogs.getLocaleString("seeMore"));
        initMenu(true);
    }
}
