let museSite = {};
(function (museSite) {

    let settings = {};
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
        { year: 2016, month: 6 },
        { year: 2015, month: 9 }
    ];
    let videos = [{
        id: "jingdezhen",
        name: "景德镇陶瓷研学之旅",
        year: 2025,
        links: {
            iqiyi: "https://www.iqiyi.com/v_14kpuv94euo.html",
            "iqiyi-embed": "https://static-s.iqiyi.com/pca/uwp/new_web_player/index.html?mode=player&from=embed&tvid=4176576759377500"
        }
    },{
        id: "led",
        name: "点亮神灯",
        year: 2020,
        links: {
            iqiyi: "https://www.iqiyi.com/v_lgmoijf6zg.html",
            "iqiyi-embed": "https://static-s.iqiyi.com/pca/uwp/new_web_player/index.html?mode=player&from=embed&tvid=2193622781471600"
        }
    }];
    let certs = [{
        id: "kawai-asia-piano-2025",
        name: "Kawai 亚洲钢琴大赛",
        scope: "match",
        season: "第8届",
        year: 2025,
        month: 4,
        group: "上海赛区业余组儿童A组",
        ranking: "三等奖",
        publisher: "柏斯音乐基金会"
    }, {
        id: "shnu3ps-match-2023",
        name: "上师三附小“未来星电视台”小记者评比",
        scope: "school",
        year: 2023,
        month: 3,
        ranking: "一等奖",
        publisher: "上海师范大学附属闵行第三小学"
    }, {
        id: "shnu3ps-match-2022",
        name: "上师三附小“一起创造献冬奥”评比",
        scope: "school",
        year: 2022,
        month: 3,
        ranking: "一等奖",
        publisher: "上海师范大学附属闵行第三小学"
    }, {
        id: "caa-raataa-3-2021",
        name: "美院之路全国青少年美术大赛",
        scope: "match",
        season: "第3届",
        year: 2021,
        month: 8,
        group: "综合艺术类",
        ranking: "三等奖",
        publisher: "中国美术学院"
    }, {
        id: "xiamen-musicseason-p-2021",
        name: "厦门音乐季钢琴公开赛",
        scope: "match",
        season: "2021",
        year: 2021,
        month: 7,
        group: "上海赛区幼儿组",
        ranking: "三等奖",
        publisher: "厦门市思明区人民政府"
    }, {
        id: "shminhang-creative-36-2021",
        name: "闵行区青少年科技创新大赛",
        scope: "match",
        season: "第36届",
        year: 2021,
        month: 5,
        group: "科学幻想幼儿组",
        ranking: "二等奖",
        publisher: "上海市闵行区教育局 上海市闵行区科学技术协会"
    }, {
        id: "papajohns-cook-2021",
        name: "棒约翰欢乐比萨学堂",
        scope: "interest",
        year: 2021,
        ranking: "未来Pizza大师",
        publisher: "上海棒约翰餐饮管理有限公司"
    }, {
        id: "childrenpal-shminhangpjz-hc-2020",
        name: "浦江镇青少年教育培训中心合唱",
        scope: "institution",
        year: 2020,
        month: 12,
        ranking: "勤奋学员",
        publisher: "中国福利会少年宫上海闵行区浦江镇青少年教育培训中心"
    }, {
        id: "taoli-os-2020",
        name: "海外桃李杯",
        scope: "match",
        season: "第11届",
        year: 2020,
        month: 9,
        group: "学前组",
        ranking: "二等奖",
        publisher: "深圳市五洲行艺术团有限责任公司"
    }];

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function checkNormalBrowser() {
        if (typeof settings.unnormal === "boolean") return !settings.unnormal;
        if (typeof navigator === "undefined" || !navigator.userAgent) {
            settings.unnormal = true;
            return false;
        }

        let ua = navigator.userAgent;
        if (!ua.includes("Chrome/") && ua.includes("Edg/") && ua.includes("AppleWebKit/") && ua.includes("Firefox/")) {
            settings.unnormal = true;
            return false;
        }

        if (ua.includes("MicroMessenger/") || ua.includes("DingTalk/") || ua.includes("WeChat/") || ua.includes("BytedanceWebview/") || ua.includes("Lark/") || ua.includes("Weibo ")) {
            if (!ua.includes(" (Windows NT ")) {
                settings.unnormal = true;
                return false;
            }
        }

        settings.unnormal = false;
        return true;
    }

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

    function render(ele, model) {
        if (!ele) return undefined;
        if (typeof ele === "string") ele = document.getElementById(ele);
        if (!ele.tagName) return undefined;
        Hje.render(ele, model);
        return ele;
    }

    function showCert(item, details) {
        let arr = [{
            tagName: "div",
            styleRefs: "x-part-cert-name",
            children: []
        }];
        if (item.season) arr[0].children.push({ tagName: "span", styleRefs: "x-part-cert-season", children: item.season });
        arr[0].children.push({ tagName: "span", styleRefs: "x-part-cert-name", children: item.name });
        if (item.group) arr.push({
            tagName: "div",
            styleRefs: "x-part-cert-group",
            children: [{ tagName: "span", children: item.group }]
        });
        arr.push({
            tagName: "div",
            styleRefs: "x-part-cert-ranking",
            children: [{tagName: "span", children: item.ranking }]
        });
        arr = [{ tagName: "div", children: arr }];
        if (item.img !== false) arr.push({
            tagName: "div",
            styleRefs: "x-part-cert-img",
            children: [{
                tagName: "img",
                props: { alt: item.name, src: "../images/certs/" + (typeof item.img === "string" ? item.img : (item.id + ".jpg")) }
            }]
        });
        let year = [{ tagName: "span", children: item.year.toString(10) + "年" }]
        if (item.month) year[0].children += item.month.toString(10) + "月";
        if (item.publisher) year.splice(0, 0, { tagName: "span", children: item.publisher });
        arr.push({
            tagName: "div",
            styleRefs: "x-part-cert-year",
            children: year
        });
        Hje.render(details, { children: [{ tagName: "section", children: arr }] });
        details.style.display = "";
    }

    function addCertEvent(item, model, details) {
        if (!details) return;
        model.on = {
            click(ev) {
                if (ev.preventDefault) ev.preventDefault();
                else ev.returnValue = false;
                showCert(item, details);
                scrollToTop();
            }
        };
    }

    function certsModel(arr, id, details, onlyMatch) {
        let info;
        let year;
        if (arr.length > 1) arr.splice(0);
        for (let i = 0; i < certs.length; i++) {
            let item = certs[i];
            if (!item || !item.name || item.disable) continue;
            if (onlyMatch && item.scope !== "match" && item.scope !== "pro") continue;
            if (item.year !== year && !isNaN(parseInt(item.year))) {
                arr.push({
                    tagName: "span",
                    styleRefs: "x-part-cert-year",
                    children: item.year.toString(10)
                });
                year = item.year;
            }

            let m = {
                tagName: "a",
                styleRefs: "link-long-button",
                props: {
                    href: "../certs/?" + item.id
                },
                children: [
                    { tagName: "span", children: item.name },
                    { tagName: "span", children: item.ranking }
                ]
            };
            addCertEvent(item, m, details);
            if (id && id === item.id) info = item;
            arr.push(m);
        }

        return info;
    }

    museSite.video = function (year, id) {
        for (let i = 0; i < videos.length; i++) {
            let v = videos[i];
            if (v && v.year === year && v.id === id) return v;
        }

        return undefined;
    };

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
                    container.children[0].style.display = "";
                    showAvatar(item);
                    return true;
                });
            }
        } catch (ex) { }
        museSite.videosModel("home");
        if (typeof site === "undefined") return;
        site.getString("about", "title-about");
        let videoStr = site.getString("videos", "title-videos");
        site.getString("otherLinks", "title-links");
        let ww = videoStr !== "视频";
        if (ww) return;
        strings.photoTaken = "本照片拍摄于{0}年";
        setElementProp("link-certs", "innerText", "小小荣誉");
    };

    museSite.videosModel = function (kind) {
        let frame = document.getElementById("video-frame");
        let prefix = "../videos/?";
        switch (kind) {
            case "home":
                prefix = "./videos/?";
                break;
            case "videos":
                prefix = "./?";
                break;
            case "3":
                prefix = "../../videos/?"
                break;
        }

        let arr = videos.map(function (item) {
            if (!item || !item.links || !item.name) return undefined;
            let url = item.links["iqiyi-embed"];
            let embed = checkNormalBrowser() && url;
            if (!embed) url = item.links.iqiyi;
            if (!url) return undefined;
            let m = {
                tagName: "a",
                props: { href: embed ? (prefix + item.year + "/" + item.id) : url },
                styleRefs: "link-long-button",
                children: [{
                    tagName: "span",
                    children: item.name
                }, {
                    tagName: "span",
                    children: item.year.toString(10)
                }]
            };
            if (!embed) m.props.target = "_blank";
            else if (frame) m.on = {
                click(ev) {
                    if (ev.preventDefault) ev.preventDefault();
                    else ev.returnValue = false;
                    frame.src = url;
                    scrollToTop();
                }
            };
            return m;
        }).filter(function (item) {
            return item;
        });
        render("part-videos", {
            children: arr
        });
    };

    museSite.initVideos = function () {
        let videoStr = site.getString("videos", "title-videos");
        museSite.videosModel("videos");
        let q = (site.firstQuery() || "").split("/");
        if (q.length < 2) return;
        let year = parseInt(q[0]);
        let id = q[1];
        let v = museSite.video(year, id);
        if (!v || !v.links) return;
        let ele = document.getElementById("video-frame");
        ele.src = v.links["iqiyi-embed"] || v.links.iqiyi;
        ele.style.display = "";
        ele = document.getElementById("part-video-name");
        if (ele) Hje.render(ele, {
            children: [{
                tagName: "span",
                children: v.name
            }, {
                tagName: "span",
                children: v.year.toString(10)
            }, {
                tagName: "a",
                props: { href: v.links.iqiyi },
                children: videoStr === "视频" ? "刷新" : "Refresh"
            }]
        });
    };

    museSite.initCerts = function () {
        let arr = [];
        let details = document.getElementById("part-cert");
        let id = site.firstQuery();
        let info = certsModel(arr, id, details);
        if (id && info) showCert(info, details);
        let c = Hje.render("part-certs", { children: arr });
        let checkbox = document.getElementById("checkbox-certs");
        if (checkbox) checkbox.addEventListener("change", function (ev) {
            certsModel(arr, id, details, checkbox.checked);
            c.refresh();
        });
    };

})(museSite || (museSite = {}));
