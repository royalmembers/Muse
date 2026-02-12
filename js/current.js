let museSite = {};
(function (museSite) {

    let settings = {};
    let strings = {};

    const avatars = [
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
    const videos = [{
        id: "jingdezhen",
        name: "景德镇陶瓷研学之旅",
        year: 2025,
        month: 7,
        links: {
            iqiyi: "https://www.iqiyi.com/v_14kpuv94euo.html",
            "iqiyi-embed": "https://static-s.iqiyi.com/pca/uwp/new_web_player/index.html?mode=player&from=embed&tvid=4176576759377500"
        }
    }, {
        id: "jingdezhen",
        disable: true,
        guest: "featuring",
        name: "学生不练琴，我选择做这三件事",
        year: 2025,
        month: 4,
        links: {
            xiaohongshu: "https://xhslink.com/m/9SueR085WK8",
        }
    }, {
        id: "led",
        name: "点亮神灯",
        year: 2020,
        links: {
            iqiyi: "https://www.iqiyi.com/v_lgmoijf6zg.html",
            "iqiyi-embed": "https://static-s.iqiyi.com/pca/uwp/new_web_player/index.html?mode=player&from=embed&tvid=2193622781471600"
        }
    }];
    const certs = [{
        id: "kawai",
        name: "Kawai 亚洲钢琴大赛",
        scope: "match",
        season: "第8届",
        year: 2025,
        month: 4,
        group: "上海赛区业余组儿童A组",
        ranking: "三等奖",
        publisher: "柏斯音乐基金会",
        keywords: ["instrumental performance", "match"]
    }, {
        id: "shnu3ps-honor",
        name: "上师三附小“英语学科大闯关”",
        scope: "school",
        year: 2025,
        month: 4,
        group: "四年级比赛",
        ranking: "背记小达人",
        publisher: "上海师范大学附属闵行第三小学",
        keywords: ["subject"]
    }, {
        id: "shnu3ps-match",
        name: "上师三附小艺术单项比赛",
        scope: "school",
        season: "第7届",
        year: 2025,
        month: 3,
        group: "钢琴专场",
        ranking: "三等奖",
        publisher: "上海师范大学附属闵行第三小学",
        keywords: ["instrumental performance", "match"]
    }, {
        id: "vivace",
        name: "Vivace 国际钢琴大赛",
        scope: "match",
        season: "2024",
        year: 2024,
        month: 6,
        group: "上海赛区少儿A组",
        ranking: "二等奖",
        publisher: "法国中法艺术协会",
        keywords: ["instrumental performance", "match"]
    }, {
        id: "shnu3ps-honor",
        name: "红领巾奖章",
        scope: "school",
        season: "2023-2024学年",
        year: 2024,
        month: 1,
        ranking: "个人一星章",
        publisher: "中国少年先锋队上海师范大学附属闵行第三小学工作委员会",
        keywords: ["medal"]
    }, {
        id: "kawai",
        name: "Kawai 亚洲钢琴大赛",
        scope: "match",
        season: "第7届",
        year: 2023,
        month: 4,
        group: "上海赛区业余组儿童B组",
        ranking: "二等奖",
        publisher: "柏斯音乐基金会",
        keywords: ["instrumental performance", "match"]
    }, {
        id: "shnu3ps-match",
        name: "上师三附小“未来星电视台”小记者评比",
        scope: "school",
        year: 2023,
        month: 3,
        ranking: "一等奖",
        publisher: "上海师范大学附属闵行第三小学",
        keywords: []
    }, {
        id: "shnu3ps-match",
        name: "上师三附小“一起创造献冬奥”评比",
        scope: "school",
        year: 2022,
        month: 3,
        ranking: "一等奖",
        publisher: "上海师范大学附属闵行第三小学",
        keywords: ["fine art", "match"]
    }, {
        id: "caa",
        name: "美院之路全国青少年美术大赛",
        scope: "match",
        season: "第3届",
        year: 2021,
        month: 8,
        group: "综合艺术类",
        ranking: "三等奖",
        publisher: "中国美术学院",
        keywords: ["fine art", "match"]
    }, {
        id: "xiamen",
        name: "厦门音乐季钢琴公开赛",
        scope: "match",
        season: "2021",
        year: 2021,
        month: 7,
        group: "上海赛区幼儿组",
        ranking: "三等奖",
        publisher: "厦门市思明区人民政府",
        keywords: ["instrumental performance", "match"]
    }, {
        id: "shminhang-creative",
        name: "闵行区青少年科技创新大赛",
        scope: "match",
        season: "第36届",
        year: 2021,
        month: 5,
        group: "科学幻想画幼儿组",
        ranking: "二等奖",
        publisher: "上海市闵行区教育局 上海市闵行区科学技术协会",
        keywords: ["fine art", "match"]
    }, {
        id: "papajohns",
        name: "棒约翰欢乐比萨学堂",
        scope: "interest",
        year: 2021,
        ranking: "未来Pizza大师",
        publisher: "上海棒约翰餐饮管理有限公司",
        keywords: ["cook"]
    }, {
        id: "shminhang-pujiang",
        name: "浦江镇青少年教育培训中心合唱",
        scope: "institution",
        year: 2020,
        month: 12,
        ranking: "勤奋学员",
        publisher: "中国福利会少年宫上海闵行区浦江镇青少年教育培训中心",
        keywords: ["sing"]
    }, {
        id: "taolicup",
        name: "海外桃李杯",
        scope: "match",
        season: "第11届",
        year: 2020,
        month: 9,
        group: "学前组",
        ranking: "二等奖",
        publisher: "深圳市五洲行艺术团有限责任公司",
        keywords: ["dance", "match"]
    }];
    const paints = [{
        id: "countryside",
        name: "乡村景色",
        year: 2025,
        month: 4,
        thumb: true,
        keywords: ["colored-pencil"]
    }, {
        id: "moon-rabbit",
        name: "玉兔月球车",
        year: 2025,
        month: 2,
        thumb: true,
        keywords: ["computer-art"]
    }, {
        id: "fish",
        name: "年年有余",
        year: 2025,
        thumb: true,
        keywords: ["chinese-brush"]
    }, {
        id: "gold-medal",
        name: "金牌时刻",
        year: 2024,
        month: 8,
        thumb: true,
        keywords: ["watercolor"]
    }, {
        id: "magpie",
        name: "喜上眉梢",
        year: 2024,
        thumb: true,
        keywords: ["chinese-brush"]
    }, {
        id: "cat",
        name: "喵宅妙哉",
        year: 2024,
        thumb: true,
        keywords: ["chinese-brush"]
    }, {
        id: "lesser-panda",
        name: "小熊猫",
        year: 2024,
        thumb: true,
        keywords: ["chinese-brush"]
    }, {
        id: "takeout",
        name: "外卖",
        year: 2022,
        month: 7,
        thumb: true,
        keywords: ["watercolor"]
    }, {
        id: "fighting-covid-19",
        disable: true,
        name: "抗击新冠",
        year: 2022,
        month: 4,
        thumb: true,
        keywords: []
    }, {
        id: "love-music",
        name: "我爱音乐",
        year: 2021,
        month: 2,
        thumb: true,
        keywords: ["colored-pencil"]
    }, {
        id: "defend-dream",
        name: "守护梦想",
        year: 2020,
        month: 5,
        thumb: true,
        keywords: ["watercolor"]
    }];
    const paintSeries = {
        mao: [{
            id: "mao-26-02-p-01",
            year: 2026,
            month: 2
        }, {
            id: "mao-26-02-p-02",
            year: 2026,
            month: 2
        }, {
            id: "mao-26-02-p-03",
            year: 2026,
            month: 2
        }, {
            id: "mao-26-02-p-04",
            year: 2026,
            month: 2
        }, {
            id: "mao-26-02-p-05",
            year: 2026,
            month: 2
        }, {
            id: "mao-26-02-p-06",
            year: 2026,
            month: 2
        }, {
            id: "mao-26-02-p-07",
            year: 2026,
            month: 2
        }, {
            id: "mao-26-02-p-08",
            year: 2026,
            month: 2
        }, {
            id: "mao-26-02-p-09",
            year: 2026,
            month: 2
        }, {
            id: "mao-26-02-p-10",
            year: 2026,
            month: 2
        }, {
            id: "mao-26-02-p-11",
            year: 2026,
            month: 2
        }, {
            id: "mao-26-02-p-12",
            year: 2026,
            month: 2
        }, {
            id: "mao-26-02-p-13",
            year: 2026,
            month: 2
        }, {
            id: "mao-260210-p01",
            year: 2026,
            month: 2,
            day: 10
        }, {
            id: "mao-260210-p02",
            year: 2026,
            month: 2,
            day: 10
        }]
    };

    function scrollToTop(top) {
        window.scrollTo({ top: top || 0, behavior: "smooth" });
    }

    function checkBrowserKind() {
        if (typeof settings.browserKind === "string") return settings.browserKind;
        if (typeof navigator === "undefined" || !navigator.userAgent)
            return settings.browserKind = "unknown";
        let ua = navigator.userAgent;
        if (!ua.includes("Chrome/") && ua.includes("Edg/") && ua.includes("AppleWebKit/") && ua.includes("Firefox/"))
            return settings.browserKind = "unknown";
        if (ua.includes("MicroMessenger/") || ua.includes("DingTalk/") || ua.includes("WeChat/") || ua.includes("BytedanceWebview/") || ua.includes("Lark/") || ua.includes("Weibo ")) {
            if (!ua.includes(" (Windows NT "))
                return settings.browserKind = "applet";
        }

        return settings.browserKind = ua.includes(" (Windows NT ") ? "windows" : "normal";
    }

    function getAvatarUrl(item) {
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

    function showAvatar(item) {
        if (!item) return;
        DeepX.MdBlogs.setElementProp("image-avatar", "src", getAvatarUrl(item));
        DeepX.MdBlogs.setElementProp("image-desc", "innerText", strings.photoTaken ? ("* " + strings.photoTaken.replace("{0}", item.year)) : "* Photo taken on '" + item.year + ".");
    }

    function render(ele, model) {
        if (!ele) return undefined;
        if (typeof ele === "string") ele = document.getElementById(ele);
        if (!ele.tagName) return undefined;
        Hje.render(ele, model);
        return ele;
    }

    function playVideo(v, frame, name) {
        if (v.links) {
            frame.model().children[0].props.src = v.links["iqiyi-embed"] || v.links.iqiyi;
            frame.refresh();
            frame.element().style.display = "";
        }

        let m = name.model().children;
        m.splice(0);
        m.push({
            tagName: "span",
            children: v.name
        });
        m.push({
            tagName: "span",
            children: v.year.toString(10)
        });
        m.push({
            tagName: "a",
            props: { href: v.links.iqiyi, target: "_blank" },
            children: DeepX.MdBlogs.getLocaleString("name") === "名称" ? "刷新" : "Refresh",
            on: {
                click(ev) {
                    frame.model().children[0].props.src = "./blank.html";
                    frame.refresh();
                    frame.element().style.display = "none";
                    m.splice(0);
                    name.refresh();
                }
            }
        });
        name.refresh();
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
            styleRefs: ["x-part-cert-img", "x-bg-emphasis"],
            children: [{
                tagName: "img",
                props: { alt: item.name, src: "../images/certs/" + item.year.toString(10) + "/" + (typeof item.img === "string" ? item.img : (item.id + ".jpg")) }
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
                const path = "?" + item.year + "/" + item.id;
                if (location.search) history.replaceState({ id: item.id }, "", path);
                else history.pushState({ id: item.id }, "", path);
            }
        };
    }

    function parseFirstQuery(id) {
        if (!id) return {};
        const arr = id.split('/');
        if (arr.length < 2 || !arr[0] && !arr[1]) return {};
        const obj = {
            id: arr[1],
            year: parseInt(arr[0])
        };
        if (arr.length > 2) obj.sub = arr[2];
        return obj;
    }

    function certsModel(arr, id, details, onlyMatch) {
        let info;
        let year;
        if (arr.length > 1) arr.splice(0);
        let thisYear = new Date().getFullYear();
        const selInfo = parseFirstQuery(id);
        for (let i = 0; i < certs.length; i++) {
            let item = certs[i];
            if (!item || !item.name || item.disable) continue;
            if (onlyMatch && item.scope !== "match" && item.scope !== "pro" && item.scope !== "variety") continue;
            if (item.year && item.year !== year && !isNaN(item.year)) {
                arr.push({
                    tagName: "span",
                    styleRefs: "x-part-cert-year",
                    children: item.year === thisYear ? DeepX.MdBlogs.getLocaleString("thisYear") : item.year.toString(10)
                });
                year = item.year;
            }

            let m = {
                tagName: "a",
                styleRefs: "link-long-button",
                props: {
                    href: "../certs/?" + item.year.toString(10) + "/" + item.id
                },
                children: [
                    { tagName: "span", children: item.name },
                    { tagName: "span", children: item.ranking }
                ]
            };
            addCertEvent(item, m, details);
            if (selInfo.id) {
                if (selInfo.id === item.id && selInfo.year === item.year) info = item;
            }
            arr.push(m);
        }

        return info;
    }

    function renderPaintSection(images, paging) {
        museSite.renderNextWave(images, paging);
        const idPrefix = paging.id || "section-works";
        document.getElementById(idPrefix + "-more").addEventListener("click", function () {
            museSite.renderNextWave(images, paging);
        });
    }

    museSite.hidePopupView = function () {
        document.getElementById("popup-view").style.display = "none";
    };

    museSite.video = function (year, id) {
        for (let i = 0; i < videos.length; i++) {
            let v = videos[i];
            if (v && v.year === year && v.id === id) return v;
        }

        return undefined;
    };

    museSite.renderNextWave = function (images, paging) {
        const idPrefix = paging.id || "section-works";
        const containerEle = document.getElementById(idPrefix + "-container");
        for (let i = paging.offset; i < Math.min(paging.offset + paging.size, images.length); i++) {
            const imageInfo = images[i];
            if (!imageInfo || imageInfo.disable) continue;
            try {
                museSite.renderImage(containerEle, imageInfo, paging);
            } catch (ex) { }
        }
        paging.offset += paging.size;
        document.getElementById(idPrefix + "-more").style.display = paging.offset < images.length ? "" : "none";
    };

    museSite.renderImage = function (containerEle, imageInfo, paging) {
        const imageEle = document.createElement("img");
        imageEle.loading = "lazy";
        let sourceUrl = imageInfo.url;
        const ext = "." + (paging.ext || "webp");
        if (!sourceUrl) {
            if (imageInfo.id && imageInfo.year) sourceUrl = "~/" + imageInfo.year + "/" + imageInfo.id + ext;
            else return;
        }
        let thumbUrl = imageInfo.thumb;
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
            document.getElementById("popup-view-img").src = sourceUrl;
            document.getElementById("popup-view-img").alt = imageName;
            document.getElementById("popup-view-thumb").src = thumbUrl;
            document.getElementById("popup-view-thumb").alt = imageName;
            document.getElementById("popup-view-title").innerHTML = imageInfo.name || paging.defaultName;
            document.getElementById("popup-view-desc").innerHTML = imageSize;
            document.getElementById("popup-view").style.display = "";
        });
    };

    museSite.initHome = function () {
        let container = document.getElementById("section-avatars");
        container.innerHTML = "";
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
        const paging = {
            offset: 0,
            size: 12,
            path: "paintings",
            root: true
        };
        museSite.renderNextWave(paints, paging);
        document.getElementById("popup-view").addEventListener("click", museSite.hidePopupView);
        document.getElementById("section-works-more").addEventListener("click", function () {
            museSite.renderNextWave(paints, paging);
        });
        museSite.videosModel("home");
        if (typeof DeepX === "undefined") return;
        DeepX.MdBlogs.setElementText("title-about", "about");
        let videoStr = DeepX.MdBlogs.setElementText("title-videos", "videos");
        DeepX.MdBlogs.setElementText("title-links", "otherLinks");
        let ww = videoStr !== "视频";
        if (ww) return;
        strings.photoTaken = "本照片拍摄于{0}年";
        DeepX.MdBlogs.setElementProp("link-certs", "innerText", "小小荣誉");
        DeepX.MdBlogs.setElementProp("title-works", "innerText", "作品集");
        DeepX.MdBlogs.setElementProp("title-paintings", "innerText", "画作");
    };

    museSite.videosModel = function (kind) {
        let info;
        let prefix = "../videos/?";
        switch (kind || "") {
            case "home":
                prefix = "./videos/?";
                break;
            case "videos":
                prefix = "./?";
                break;
            case "3":
                prefix = "../../videos/?"
                break;
            default:
                if (kind.frame && kind.name) info = kind;
                break;
        }

        let arr = videos.map(function (item) {
            if (!item || !item.links || !item.name || item.disable) return undefined;
            let url = item.links["iqiyi-embed"];
            let embed = checkBrowserKind() === "windows" && url;
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
            else if (info) m.on = {
                click(ev) {
                    if (ev.preventDefault) ev.preventDefault();
                    else ev.returnValue = false;
                    playVideo(item, info.frame, info.name);
                    scrollToTop(4);
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
        DeepX.MdBlogs.setElementText("title-videos", "videos");
        let frame = Hje.render("part-video-container", {
            children: [{
                tagName: "iframe",
                props: {
                    title: "Video",
                    allow: "fullscreen; autoplay; encrypted-media; midi; payment"
                }
            }]
        });
        let name = Hje.render("part-video-name", {
            children: []
        });
        museSite.videosModel({
            frame: frame,
            name: name
        });
        let q = (DeepX.MdBlogs.firstQuery() || "").split("/");
        if (q.length < 2) return;
        let year = parseInt(q[0]);
        let id = q[1];
        let v = museSite.video(year, id);
        if (!v || !v.links) return;
        playVideo(v, frame, name);
    };

    museSite.initCerts = function () {
        let arr = [];
        let details = document.getElementById("part-cert");
        let id = DeepX.MdBlogs.firstQuery();
        let info = certsModel(arr, id, details);
        if (id && info) showCert(info, details);
        let c = Hje.render("part-certs", { children: arr });
        let checkbox = document.getElementById("checkbox-certs");
        if (checkbox) checkbox.addEventListener("change", function (ev) {
            certsModel(arr, id, details, checkbox.checked);
            c.refresh();
        });
        window.addEventListener("popstate", function (ev) {
            id = (ev.state || {}).id;
            const selInfo = parseFirstQuery(id);
            if (!selInfo.id) {
                details.style.display = "none";
                return;
            }

            for (let i = 0; i < certs.length; i++) {
                let item = certs[i];
                if (!item || item.id !== selInfo.id || item.year !== selInfo.year) continue;
                showCert(item, details);
                return;
            }
        });
    };

    museSite.initPaint = function () {
        renderPaintSection(paints, {
            offset: 0,
            size: 12,
            path: "paintings"
        });
        renderPaintSection(paintSeries.mao, {
            offset: 0,
            size: 12,
            path: "paintings",
            ext: "jpg",
            defaultName: "摸凹喵",
            id: "section-mao"
        });
        document.getElementById("popup-view").addEventListener("click", museSite.hidePopupView);
    };
})(museSite || (museSite = {}));
