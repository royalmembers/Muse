let museSite = {};
(function (museSite) {

    let strings = {};
    let avatars = [
        { year: 2025, month: 7 },
        { year: 2024, month: 5 },
        { year: 2023, month: 6 },
        { year: 2022, month: 1 },
        { year: 2021, month: 4 },
        { year: 2020, month: 1 },
        { year: 2019, month: 10 },
        { year: 2018, month: 10 },
        { year: 2017, month: 4 },
        { year: 2016, month: 6 }
    ];
    let videos = [{
        name: "景德镇陶瓷研学之旅",
        year: 2025,
        links: {
            iqiyi: "https://www.iqiyi.com/v_14kpuv94euo.html",
            "iqiyi-embed": "https://static-s.iqiyi.com/pca/uwp/new_web_player/index.html?mode=player&from=embed&tvid=4176576759377500"
        }
    },{
        name: "点亮神灯",
        year: 2020,
        links: {
            iqiyi: "https://www.iqiyi.com/v_lgmoijf6zg.html",
            "iqiyi-embed": "https://static-s.iqiyi.com/pca/uwp/new_web_player/index.html?mode=player&from=embed&tvid=2193622781471600"
        }
    }]

    function getAvatarUrl(item) {
        let url = item.url;
        if (url) return url;
        url = "./images/avatar/avatar_MuseTuan_" + item.year;
        if (item.month) {
            if (item.month < 10) url += "0";
            url += item.month;
        }
        url += ".jpg";
        return url;
    }
    function setElementProp(ele, key, value) {
        let element = document.getElementById(ele);
        if (!element) return;
        element[key] = value;
    }

    function showAvatar(item) {
        if (!item) return;
        setElementProp("image-avatar", "src", getAvatarUrl(item));
        setElementProp("image-desc", "innerText", strings.photoTaken ? ("* " + strings.photoTaken.replace("{0}", item.year)) : "* Photo taken on '" + item.year + ".");
    }

    museSite.initHome = function () {
        let container = document.getElementById("section-avatars");
        avatars.forEach(function (item, i) {
            if (!item) return;
            let url = getAvatarUrl(item);
            let span = document.createElement("span");
            span.className = "x-photo-avatar";
            if (i === 0) span.style.display = "none";
            span.addEventListener("click", function (ev) {
                showAvatar(item);
                container.children[0].style.display = "";
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
                let year = parseInt(q.substr(1));
                if (year > 2000 && year < 3000) avatars.some(function (item) {
                    if (item.year !== year) return false;
                    container.children[0].style.display = "";
                    showAvatar(item);
                    return true;
                });
            }
        } catch (ex) { }
        if (typeof site === "undefined") return;
        let videoStr = site.getString("videos", "title-videos");
        site.getString("otherLinks", "title-links");
        let ww = videoStr !== "视频";
        if (ww) return;
        strings.photoTaken = "本照片拍摄于{0}年";
    }

})(museSite || (museSite = {}));
