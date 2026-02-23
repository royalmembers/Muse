"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var PageCtrl;
(function (PageCtrl) {
    var certs = [{
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
    function showCert(item, details) {
        var arr = [{
                tagName: "div",
                styleRefs: "x-part-cert-name",
                children: []
            }];
        if (item.season)
            arr[0].children.push({ tagName: "span", styleRefs: "x-part-cert-season", children: item.season });
        arr[0].children.push({ tagName: "span", styleRefs: "x-part-cert-name", children: item.name });
        if (item.group)
            arr.push({
                tagName: "div",
                styleRefs: "x-part-cert-group",
                children: [{ tagName: "span", children: item.group }]
            });
        arr.push({
            tagName: "div",
            styleRefs: "x-part-cert-ranking",
            children: [{ tagName: "span", children: item.ranking }]
        });
        arr = [{ tagName: "div", children: arr }];
        if (item.img !== false)
            arr.push({
                tagName: "div",
                styleRefs: ["x-part-cert-img", "x-bg-emphasis"],
                children: [{
                        tagName: "img",
                        props: { alt: item.name, src: "../images/certs/" + item.year.toString(10) + "/" + (typeof item.img === "string" ? item.img : (item.id + ".jpg")) }
                    }]
            });
        var year = [{ tagName: "span", children: item.year.toString(10) + "年" }];
        if (item.month)
            year[0].children += item.month.toString(10) + "月";
        if (item.publisher)
            year.splice(0, 0, { tagName: "span", children: item.publisher });
        arr.push({
            tagName: "div",
            styleRefs: "x-part-cert-year",
            children: year
        });
        Hje.render(details, {
            children: [{ tagName: "section", children: arr }],
            props: { style: { display: "" } }
        });
    }
    function addCertEvent(item, model, details) {
        if (!details)
            return;
        model.on = {
            click: function (ev) {
                if (ev.preventDefault)
                    ev.preventDefault();
                else
                    ev.returnValue = false;
                showCert(item, details);
                PageCtrl.scrollToTop();
                var path = "?" + item.year + "/" + item.id;
                if (location.search)
                    history.replaceState({ id: item.id }, "", path);
                else
                    history.pushState({ id: item.id }, "", path);
            }
        };
    }
    function certsModel(arr, id, details, onlyMatch) {
        var info;
        var year;
        if (arr.length > 1)
            arr.splice(0);
        var thisYear = new Date().getFullYear();
        var selInfo = PageCtrl.parseFirstQuery(id);
        for (var i = 0; i < certs.length; i++) {
            var item = certs[i];
            if (!item || !item.name || item.disable)
                continue;
            if (onlyMatch && item.scope !== "match" && item.scope !== "pro" && item.scope !== "variety")
                continue;
            if (item.year && item.year !== year && !isNaN(item.year)) {
                arr.push({
                    tagName: "span",
                    styleRefs: "x-part-cert-year",
                    children: item.year === thisYear ? DeepX.MdBlogs.getLocaleString("thisYear") : item.year.toString(10)
                });
                year = item.year;
            }
            var m = {
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
                if (selInfo.id === item.id && selInfo.year === item.year)
                    info = item;
            }
            arr.push(m);
        }
        return info;
    }
    function initCerts() {
        var arr = [];
        var details = document.getElementById("part-cert");
        var id = DeepX.MdBlogs.firstQuery();
        var info = certsModel(arr, id, details);
        if (id && info)
            showCert(info, details);
        var c = Hje.render("part-certs", { children: arr });
        var checkbox = document.getElementById("checkbox-certs");
        if (checkbox)
            checkbox.addEventListener("change", function (ev) {
                certsModel(arr, id, details, checkbox.checked);
                c.refresh();
            });
        window.addEventListener("popstate", function (ev) {
            id = (ev.state || {}).id;
            var selInfo = PageCtrl.parseFirstQuery(id);
            if (!selInfo.id) {
                details.style.display = "none";
                return;
            }
            for (var i = 0; i < certs.length; i++) {
                var item = certs[i];
                if (!item || item.id !== selInfo.id || item.year !== selInfo.year)
                    continue;
                showCert(item, details);
                return;
            }
        });
        PageCtrl.initMenu("certs");
    }
    PageCtrl.initCerts = initCerts;
})(PageCtrl || (PageCtrl = {}));
var PageCtrl;
(function (PageCtrl) {
    var avatars = [
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
    var menu = [{
            id: "certs",
            name: "Honors",
            "name#zh": "荣誉",
        }, {
            id: "paintings",
            name: "Paintings",
            "name#zh": "画作",
        }];
    function getAvatarUrl(item) {
        var url = item.url;
        if (url)
            return url;
        url = "./images/avatar/avatar_MuseTuan_" + item.year.toString(10);
        if (item.month) {
            if (item.month < 10)
                url += "0";
            url += item.month;
        }
        url += item.year > 2025 ? ".webp" : ".jpg";
        return url;
    }
    function showAvatar(item) {
        if (!item)
            return;
        DeepX.MdBlogs.setElementProp("image-avatar", "src", getAvatarUrl(item));
        DeepX.MdBlogs.setElementProp("image-desc", "innerText", PageCtrl.getString("photoTaken").replace("{0}", item.year));
    }
    function initMenu(id) {
        var container = document.getElementById("top-menu");
        container.innerHTML = "";
        var rela = id === true ? "./" : "../";
        var sel = typeof id === "string" ? id : undefined;
        menu.forEach(function (ele) {
            if (!ele || ele.disable || !ele.name || !ele.id)
                return;
            var item = document.createElement("li");
            var link = document.createElement("a");
            container.appendChild(item);
            item.appendChild(link);
            link.href = rela + ele.id;
            link.innerText = DeepX.MdBlogs.getLocaleProp(ele, "name");
            if (ele.id === sel)
                item.className = "state-sel";
        });
    }
    PageCtrl.initMenu = initMenu;
    function initHome() {
        var container = document.getElementById("section-avatars");
        container.innerHTML = "";
        avatars.forEach(function (item, i) {
            if (!item)
                return;
            var url = getAvatarUrl(item);
            var span = document.createElement("span");
            span.className = "x-photo-avatar";
            if (i === 0)
                span.style.display = "none";
            span.addEventListener("click", function (ev) {
                showAvatar(item);
                container.children[0].style.display = "";
                PageCtrl.scrollToTop();
            });
            var img = document.createElement("img");
            img.alt = item.title || ("Muse (" + item.year + ")");
            img.src = url;
            span.appendChild(img);
            container.append(span);
        });
        try {
            var q = location.search;
            if (q.length === 5) {
                var year_1 = parseInt(q.substring(1));
                if (year_1 > 2000 && year_1 < 3000)
                    avatars.some(function (item) {
                        if (item.year !== year_1)
                            return false;
                        container.children[0].style.display = "";
                        showAvatar(item);
                        return true;
                    });
            }
        }
        catch (ex) { }
        PageCtrl.renderPaintings(true, {
            offset: 0,
            size: 12,
            path: "paintings",
            root: true
        });
        PageCtrl.initPopupView();
        PageCtrl.videosModel("home");
        if (typeof DeepX === "undefined")
            return;
        DeepX.MdBlogs.setElementText("title-about", "about");
        var videoStr = DeepX.MdBlogs.setElementText("title-videos", "videos");
        DeepX.MdBlogs.setElementText("title-links", "otherLinks");
        var ww = videoStr !== "视频";
        if (ww)
            return;
        DeepX.MdBlogs.setElementProp("link-certs", "innerText", "小小荣誉");
        DeepX.MdBlogs.setElementProp("title-works", "innerText", "作品集");
        DeepX.MdBlogs.setElementProp("button-works-more", null, DeepX.MdBlogs.getLocaleString("seeMore"));
        initMenu(true);
    }
    PageCtrl.initHome = initHome;
    ;
})(PageCtrl || (PageCtrl = {}));
var PageCtrl;
(function (PageCtrl) {
    var strings = {
        photoTaken: "Photo taken on {0}.",
        "photoTaken#zh": "本照片拍摄于{0}年",
        paintings: "Paintings",
        "paintings#zh": "画作",
        series: "Series",
        "series#zh": "系列",
    };
    function getString(key) {
        return DeepX.MdBlogs.getLocaleProp(strings, key);
    }
    PageCtrl.getString = getString;
    function setElementProp(element, prop, key) {
        return DeepX.MdBlogs.setElementProp(element, prop, DeepX.MdBlogs.getLocaleProp(strings, key));
    }
    PageCtrl.setElementProp = setElementProp;
})(PageCtrl || (PageCtrl = {}));
var PageCtrl;
(function (PageCtrl) {
    var works = {
        series: [],
        common: [],
        done: false
    };
    function init(rela) {
        return __awaiter(this, void 0, void 0, function () {
            var res, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (works.done)
                            return [2 /*return*/, true];
                        return [4 /*yield*/, fetch("".concat(rela || "../paintings/", "config.json"))];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        json = _a.sent();
                        if (!json)
                            return [2 /*return*/, false];
                        works = json;
                        works.done = true;
                        return [2 /*return*/, true];
                }
            });
        });
    }
    function getContainerElement(paging, suffix) {
        return document.getElementById("".concat((paging === null || paging === void 0 ? void 0 : paging.id) || "section-works", "-").concat(suffix || "container"));
    }
    function renderNextWave(images, paging) {
        var containerEle = getContainerElement(paging);
        for (var i = paging.offset; i < Math.min(paging.offset + paging.size, images.length); i++) {
            var imageInfo = images[i];
            if (!imageInfo || imageInfo.disable)
                continue;
            try {
                renderImage(containerEle, imageInfo, paging);
            }
            catch (ex) { }
        }
        paging.offset += paging.size;
        getContainerElement(paging, "more").style.display = paging.offset < images.length ? "" : "none";
    }
    function getSeries(id) {
        if (!id)
            return undefined;
        id = id.replace("=", "").replace(" ", "");
        var series = works.series || [];
        for (var i in series) {
            var item = series[i];
            if ((item === null || item === void 0 ? void 0 : item.id) !== id || item.disable)
                continue;
            return item;
        }
        return undefined;
    }
    function getSeriesIcon(icon, root) {
        return (root ? "./images/" : "../images/") + (icon || "logos/mspaint.png");
    }
    function seriesInPaging(paging) {
        return paging.series || {};
    }
    function renderPaintings(images, paging) {
        return __awaiter(this, void 0, void 0, function () {
            var series, container, icon;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!paging)
                            return [2 /*return*/];
                        if (!paging.root) return [3 /*break*/, 2];
                        return [4 /*yield*/, init("./paintings/")];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, init()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (images === true)
                            images = works.common || [];
                        series = seriesInPaging(paging);
                        container = getContainerElement(paging);
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
                        DeepX.MdBlogs.setElementProp(getContainerElement(paging, "title"), null, series.name || paging.defaultName || PageCtrl.getString("paintings"));
                        DeepX.MdBlogs.setElementProp(getContainerElement(paging, "subtitle"), null, series.subtitle || "");
                        icon = getContainerElement(paging, "title-icon");
                        if (icon) {
                            icon.src = getSeriesIcon(series.icon, paging.root);
                            icon.style.display = series.icon ? "" : "none";
                        }
                        renderNextWave(images, paging);
                        getContainerElement(paging, "more").addEventListener("click", function () {
                            renderNextWave(images, paging);
                        });
                        return [2 /*return*/];
                }
            });
        });
    }
    PageCtrl.renderPaintings = renderPaintings;
    function hidePopupView() {
        document.getElementById("popup-view").style.display = "none";
    }
    PageCtrl.hidePopupView = hidePopupView;
    ;
    function renderImage(containerEle, imageInfo, paging) {
        var imageEle = document.createElement("img");
        imageEle.loading = "lazy";
        var sourceUrl = imageInfo.url;
        var series = seriesInPaging(paging);
        var ext = "." + (series.ext || "webp");
        if (!sourceUrl) {
            if (imageInfo.id && imageInfo.year)
                sourceUrl = "~/" + imageInfo.year + "/" + imageInfo.id + ext;
            else
                return;
        }
        var thumbUrl = imageInfo.thumb;
        if (thumbUrl === undefined)
            thumbUrl = series.thumb;
        if (thumbUrl === true)
            thumbUrl = sourceUrl.replace("~/", "~/thumbnails/");
        else if (!thumbUrl)
            thumbUrl = sourceUrl;
        var imagesPath = paging.root ? "./images/" : "../images/";
        if (thumbUrl.indexOf("~/") == 0)
            thumbUrl = thumbUrl.replace("~/", imagesPath + paging.path + "/");
        if (sourceUrl.indexOf("~/") == 0)
            sourceUrl = sourceUrl.replace("~/", imagesPath + paging.path + "/");
        imageEle.src = thumbUrl;
        var imageName = imageInfo.name || series.name || paging.defaultName || "";
        var imageSize = imageInfo.size || "";
        if (imageSize && imageSize.indexOf("x") > 0)
            imageSize = imageSize.replace("x", "cm × ") + "cm";
        if (imageInfo.year) {
            if (imageSize && imageInfo.year)
                imageSize += " 　 | 　 ";
            imageSize += "'" + imageInfo.year.toString();
        }
        if (imageSize)
            imageName += " (" + imageSize + ")";
        imageEle.alt = imageName;
        containerEle.appendChild(imageEle);
        imageEle.addEventListener("click", function (ev) {
            document.getElementById("popup-view-img").src = sourceUrl;
            document.getElementById("popup-view-img").alt = imageName;
            document.getElementById("popup-view-thumb").src = thumbUrl;
            document.getElementById("popup-view-thumb").alt = imageName;
            document.getElementById("popup-view-title").innerText = imageInfo.name || series.name || paging.defaultName || "";
            document.getElementById("popup-view-desc").innerText = imageSize;
            document.getElementById("popup-view").style.display = "";
        });
    }
    PageCtrl.renderImage = renderImage;
    function initPaint() {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1, q, sel, seriesMenu, col, series, i, item, linkEle, icon, spanEle, subtitle, subtitle2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        DeepX.MdBlogs.setElementText("section-works-container", "loading");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, init()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        DeepX.MdBlogs.setElementText("section-works-container", "loadFailed");
                        return [3 /*break*/, 4];
                    case 4:
                        q = DeepX.MdBlogs.firstQuery();
                        sel = getSeries(q);
                        seriesMenu = document.getElementById("section-series-container");
                        seriesMenu.innerHTML = "";
                        if (!sel) return [3 /*break*/, 6];
                        if (sel.id)
                            q = sel.id;
                        col = works[q];
                        return [4 /*yield*/, renderPaintings(col, {
                                offset: 0,
                                size: 24,
                                path: "paintings",
                                series: sel
                            })];
                    case 5:
                        _a.sent();
                        document.getElementById("section-back-container").style.display = "";
                        document.getElementById("section-series-title-container").style.display = "none";
                        seriesMenu.style.display = "none";
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, renderPaintings(works.common, {
                            offset: 0,
                            size: 24,
                            path: "paintings",
                            series: {
                                thumb: true
                            },
                        })];
                    case 7:
                        _a.sent();
                        document.getElementById("section-back-container").style.display = "none";
                        document.getElementById("section-series-title-container").style.display = "";
                        seriesMenu.style.display = "";
                        _a.label = 8;
                    case 8:
                        series = works.series || [];
                        for (i in series) {
                            item = series[i];
                            if (!item || item.disable || !item.name || !item.id)
                                continue;
                            linkEle = document.createElement("a");
                            linkEle.className = "link-long-button";
                            linkEle.href = "./?" + item.id;
                            if (item.icon) {
                                icon = document.createElement("img");
                                icon.src = getSeriesIcon(item.icon);
                                icon.alt = item.name;
                                linkEle.appendChild(icon);
                            }
                            spanEle = document.createElement("span");
                            spanEle.title = spanEle.innerText = item.name;
                            linkEle.appendChild(spanEle);
                            if (item.subtitle) {
                                subtitle = document.createElement("span");
                                subtitle.title = subtitle.innerText = item.subtitle;
                                subtitle2 = document.createElement("span");
                                subtitle2.appendChild(subtitle);
                                linkEle.appendChild(subtitle2);
                            }
                            seriesMenu.appendChild(linkEle);
                        }
                        initPopupView();
                        DeepX.MdBlogs.setElementText("text-back", "back");
                        DeepX.MdBlogs.setElementProp("button-works-more", null, DeepX.MdBlogs.getLocaleString("seeMore"));
                        PageCtrl.setElementProp("section-series-title", null, "series");
                        PageCtrl.setElementProp("text-series", null, "series");
                        PageCtrl.initMenu("paintings");
                        return [2 /*return*/];
                }
            });
        });
    }
    PageCtrl.initPaint = initPaint;
    ;
    function initPopupView() {
        document.getElementById("popup-view").addEventListener("click", hidePopupView);
    }
    PageCtrl.initPopupView = initPopupView;
})(PageCtrl || (PageCtrl = {}));
var PageCtrl;
(function (PageCtrl) {
    var inner = {};
    function scrollToTop(top) {
        window.scrollTo({ top: top || 0, behavior: "smooth" });
    }
    PageCtrl.scrollToTop = scrollToTop;
    function checkBrowserKind() {
        if (typeof inner.browserKind === "string")
            return inner.browserKind;
        if (typeof navigator === "undefined" || !navigator.userAgent)
            return inner.browserKind = "unknown";
        var ua = navigator.userAgent;
        if (!ua.includes("Chrome/") && ua.includes("Edg/") && ua.includes("AppleWebKit/") && ua.includes("Firefox/"))
            return inner.browserKind = "unknown";
        if (ua.includes("MicroMessenger/") || ua.includes("DingTalk/") || ua.includes("WeChat/") || ua.includes("BytedanceWebview/") || ua.includes("Lark/") || ua.includes("Weibo ")) {
            if (!ua.includes(" (Windows NT "))
                return inner.browserKind = "applet";
        }
        return inner.browserKind = ua.includes(" (Windows NT ") ? "windows" : "normal";
    }
    PageCtrl.checkBrowserKind = checkBrowserKind;
    function parseFirstQuery(id) {
        if (!id)
            return {};
        var arr = id.split('/');
        if (arr.length < 2 || !arr[0] && !arr[1])
            return {};
        var obj = {
            id: arr[1],
            year: parseInt(arr[0])
        };
        if (arr.length > 2)
            obj.sub = arr[2];
        return obj;
    }
    PageCtrl.parseFirstQuery = parseFirstQuery;
})(PageCtrl || (PageCtrl = {}));
var PageCtrl;
(function (PageCtrl) {
    var videos = [{
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
    function playVideo(v, frame, name) {
        if (v.links) {
            frame.model().children[0].props.src = v.links["iqiyi-embed"] || v.links.iqiyi;
            frame.refresh();
            frame.element().style.display = "";
        }
        var m = name.model().children;
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
                click: function (ev) {
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
    function video(year, id) {
        for (var i = 0; i < videos.length; i++) {
            var v = videos[i];
            if (v && v.year === year && v.id === id)
                return v;
        }
        return undefined;
    }
    PageCtrl.video = video;
    function videosModel(kind) {
        var info;
        var prefix = "../videos/?";
        switch (kind || "") {
            case "home":
                prefix = "./videos/?";
                break;
            case "videos":
                prefix = "./?";
                break;
            case "3":
                prefix = "../../videos/?";
                break;
            default:
                if (kind.frame && kind.name)
                    info = kind;
                break;
        }
        var arr = videos.map(function (item) {
            if (!item || !item.links || !item.name || item.disable)
                return undefined;
            var url = item.links["iqiyi-embed"];
            var embed = PageCtrl.checkBrowserKind() === "windows" && url;
            if (!embed)
                url = item.links.iqiyi;
            if (!url)
                return undefined;
            var m = {
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
            if (!embed)
                m.props.target = "_blank";
            else if (info)
                m.on = {
                    click: function (ev) {
                        if (ev.preventDefault)
                            ev.preventDefault();
                        else
                            ev.returnValue = false;
                        playVideo(item, info.frame, info.name);
                        PageCtrl.scrollToTop(4);
                    }
                };
            return m;
        }).filter(function (item) {
            return !!item;
        });
        Hje.render("part-videos", {
            children: arr
        });
    }
    PageCtrl.videosModel = videosModel;
    function initVideos() {
        DeepX.MdBlogs.setElementText("title-videos", "videos");
        var frame = Hje.render("part-video-container", {
            children: [{
                    tagName: "iframe",
                    props: {
                        title: "Video",
                        allow: "fullscreen; autoplay; encrypted-media; midi; payment"
                    }
                }]
        });
        var name = Hje.render("part-video-name", {
            children: []
        });
        videosModel({
            frame: frame,
            name: name
        });
        var q = (DeepX.MdBlogs.firstQuery() || "").split("/");
        if (q.length < 2)
            return;
        var year = parseInt(q[0]);
        var id = q[1];
        var v = video(year, id);
        if (!v || !v.links)
            return;
        playVideo(v, frame, name);
    }
    PageCtrl.initVideos = initVideos;
})(PageCtrl || (PageCtrl = {}));
//# sourceMappingURL=current.js.map