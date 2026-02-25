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
    },{
        id: "paintings",
        name: "Paintings",
        "name#zh": "画作",
    }]

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
        const container = document.getElementById("top-menu")!;
        container.innerHTML = "";
        const rela = id === true ? "./" : "../";
        const sel = typeof id === "string" ? id : undefined;
        menu.forEach(ele => {
            if (!ele || (ele as any).disable || !ele.name || !ele.id) return;
            const item = document.createElement("li");
            const link = document.createElement("a");
            container.appendChild(item);
            item.appendChild(link);
            link.href = rela + ele.id;
            link.innerText = DeepX.MdBlogs.getLocaleProp(ele, "name");
            if (ele.id === sel) item.className = "state-sel";
        });
    }

    export function initHome() {
        let container = document.getElementById("section-avatars")!;
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
        initPopupView();
        videosModel("home");
        if (typeof DeepX === "undefined") return;
        DeepX.MdBlogs.setElementText("title-about", "about");
        let videoStr = DeepX.MdBlogs.setElementText("title-videos", "videos");
        DeepX.MdBlogs.setElementText("title-links", "otherLinks");
        let ww = videoStr !== "视频";
        if (ww) return;
        DeepX.MdBlogs.setElementProp("link-certs", "innerText", "小小荣誉");
        DeepX.MdBlogs.setElementProp("title-works", "innerText", "作品集");
        DeepX.MdBlogs.setElementProp("button-works-more", null, DeepX.MdBlogs.getLocaleString("seeMore"));
        initMenu(true);
    }
}
