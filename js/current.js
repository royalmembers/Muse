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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var PageCtrl;
(function (PageCtrl) {
    var inner = {
        articles: undefined,
    };
    var seriesMap = {
        "mor-ow-meow": {
            name: "workMorOwMeow",
            url: "../paintings/?mao",
            logo: "../images/logos/mao-2026.png",
        },
        "starna": {
            name: "workStarna",
            url: "../paintings/?starna",
            logo: "../images/logos/starna-2026.png"
        },
    };
    function loadBlogArticles(root) {
        if (!inner.articles)
            inner.articles = DeepX.MdBlogs.fetchArticles("".concat(PageCtrl.rootRela(root), "blog/config.json"));
        return inner.articles;
    }
    PageCtrl.loadBlogArticles = loadBlogArticles;
    function renderBlog(element, root) {
        return __awaiter(this, void 0, void 0, function () {
            var articles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, loadBlogArticles(root)];
                    case 1:
                        articles = _a.sent();
                        DeepX.MdBlogs.render(element, articles, {
                            title: true,
                            onselect: function (ev) {
                                if (!ev)
                                    return;
                                var article = ev.article;
                                var model = ev.children;
                                if (!article || !model)
                                    return;
                                var arr = { end: [] };
                                appendSeriesNotice(arr, article);
                                if (arr.end.length > 0)
                                    ev.insertChildren("end", {
                                        tagName: "section",
                                        styleRefs: "x-part-blog-related",
                                        children: arr.end
                                    });
                            },
                        });
                        return [2 /*return*/];
                }
            });
        });
    }
    PageCtrl.renderBlog = renderBlog;
    function initBlog() {
        PageCtrl.initMenu("blog");
        renderBlog("blog_content");
    }
    PageCtrl.initBlog = initBlog;
    function appendSeriesNotice(arr, article) {
        var keywords = article.keywords;
        if (!(keywords === null || keywords === void 0 ? void 0 : keywords.length))
            return;
        var links = [];
        for (var i = 0; i < keywords.length; i++) {
            var keyword = keywords[i];
            if (!(keyword === null || keyword === void 0 ? void 0 : keyword.value))
                continue;
            var series = seriesMap[keyword.value];
            if (!(series === null || series === void 0 ? void 0 : series.name))
                continue;
            var name_1 = PageCtrl.getString(series.name) || series.name;
            if (!name_1)
                continue;
            links.push({
                tagName: "a",
                styleRefs: "link-long-button",
                props: {
                    href: series.url
                },
                children: [{
                        tagName: "img",
                        props: {
                            src: series.logo,
                            alt: name_1
                        }
                    }, {
                        tagName: "span",
                        children: name_1,
                    }],
            });
        }
        if (links.length < 1)
            return;
        arr.end.push({
            tagName: "h2",
            children: [{
                    tagName: "span",
                    children: PageCtrl.getString("relatedPaintings"),
                }]
        }, {
            tagName: "div",
            children: links,
        }, {
            tagName: "div",
            styleRefs: "x-part-info",
            children: [{
                    tagName: "span",
                    children: "注：猫头鱼尾兽图标、MuseTuan.com、摸凹喵（Mor-Ow Meow）及其形象、星娜喵（Starna）及其形象，是 Muse Tuan 和 Kingcean Tuan 的商标，摸凹喵画作及其衍生品均受知识产权保护，版权所有；Kingcean、Jinchen Art、金辰艺术、CompositeJs、金山旭日翼盾、红日黑山徽标，是 Kingcean Tuan、南昌金辰软件有限公司或江西金辰装饰设计工程有限公司的商标或注册商标；其它商标分别归属其所拥有的组织。",
                }]
        });
    }
    function appendSpecificSeriesNotice(series, arr) {
        if (!(series === null || series === void 0 ? void 0 : series.name))
            return;
        var name = PageCtrl.getString(series.name);
    }
})(PageCtrl || (PageCtrl = {}));
var PageCtrl;
(function (PageCtrl) {
    var inner = {};
    function init() {
        return __awaiter(this, void 0, void 0, function () {
            var res, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("./config.json")];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        json = _a.sent();
                        if (!(json === null || json === void 0 ? void 0 : json.certs))
                            return [2 /*return*/, false];
                        inner.certs = json.certs;
                        return [2 /*return*/, true];
                }
            });
        });
    }
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
                        props: { alt: item.name, src: "../images/certs/".concat(item.year.toString(10), "/").concat(typeof item.img === "string" ? item.img : (item.id + (item.year > 2025 ? ".webp" : ".jpg"))) }
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
        if (!inner.related)
            return;
        var count = inner.related.setData(item.links, item.images);
        inner.related.element().style.display = count > 0 ? "" : "none";
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
        var certs = inner.certs;
        if (!certs)
            return undefined;
        var info;
        var year;
        if (arr.length > 1)
            arr.splice(0);
        var thisYear = new Date().getFullYear();
        var selInfo = PageCtrl.parseFirstQuery(id);
        for (var i = 0; i < certs.length; i++) {
            var item = certs[i];
            if (!item || !item.name)
                continue;
            if (selInfo.id && selInfo.year && selInfo.id === item.id && selInfo.year === item.year)
                info = item;
            if (item.disable)
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
            arr.push(m);
        }
        return info;
    }
    function initCerts() {
        return __awaiter(this, void 0, void 0, function () {
            var c, certs, arr, details, id, info, checkbox;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        c = Hje.render("part-certs", {
                            children: [PageCtrl.loadingModel()]
                        });
                        return [4 /*yield*/, init()];
                    case 1:
                        if (!(_b.sent())) {
                            PageCtrl.loadingModel(true, c);
                            return [2 /*return*/];
                        }
                        certs = inner.certs;
                        if (!c)
                            return [2 /*return*/];
                        arr = [];
                        details = PageCtrl.ele("part-cert");
                        id = DeepX.MdBlogs.firstQuery();
                        inner.related = (_a = Hje.render("part-related", {
                            control: PageCtrl.RelatedInfoPart,
                            data: {
                                title: PageCtrl.getString("related"),
                                imageRela: "../images/",
                                defaultImageName: DeepX.MdBlogs.getLocaleString("pic"),
                                click: PageCtrl.onImageItemClick,
                                itemUrl: PageCtrl.getImageUrl,
                            },
                        })) === null || _a === void 0 ? void 0 : _a.control();
                        info = certsModel(arr, id, details);
                        if (id && info)
                            showCert(info, details);
                        c.model().children = arr;
                        c.refresh();
                        checkbox = PageCtrl.ele("checkbox-certs");
                        if (checkbox)
                            checkbox.addEventListener("change", function (ev) {
                                certsModel(arr, id, details, checkbox.checked);
                                c.refresh();
                            });
                        window.addEventListener("popstate", function (ev) {
                            var _a;
                            id = (ev.state || {}).id;
                            var selInfo = PageCtrl.parseFirstQuery(id);
                            if (!selInfo.id) {
                                details.style.display = "none";
                                var relatedElement = (_a = inner.related) === null || _a === void 0 ? void 0 : _a.element();
                                if (relatedElement)
                                    relatedElement.style.display = "none";
                                return;
                            }
                            if (!certs)
                                return;
                            for (var i = 0; i < certs.length; i++) {
                                var item = certs[i];
                                if (!item || item.id !== selInfo.id || item.year !== selInfo.year)
                                    continue;
                                showCert(item, details);
                                return;
                            }
                        });
                        PageCtrl.initMenu("certs");
                        return [2 /*return*/];
                }
            });
        });
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
        { year: 2015, month: 10 }
    ];
    var inner = {};
    var menu = [{
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
        url += item.year > 2025 || item.year === 2015 ? ".webp" : ".jpg";
        return url;
    }
    function showAvatar(item) {
        if (!item)
            return;
        DeepX.MdBlogs.setElementProp("image-avatar", "src", getAvatarUrl(item));
        DeepX.MdBlogs.setElementProp("image-desc", "innerText", PageCtrl.getString("photoTaken").replace("{0}", item.year.toString(10)));
    }
    function initMenu(id) {
        var container = PageCtrl.ele("top-menu");
        var cover = PageCtrl.ele("popup-view");
        if (cover) {
            cover.addEventListener("click", closePopupView);
            cover.addEventListener("touchend", closePopupViewDelay);
        }
        if (!container)
            return;
        container.innerHTML = "";
        var rela = id === true ? "./" : "../";
        var sel = typeof id === "string" ? id : undefined;
        menu.forEach(function (ele) {
            if (!ele || !ele.name || !ele.id)
                return;
            if (ele.disable && ele.id !== sel)
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
    function hidePopupView() {
        delete inner.closePopView;
        PageCtrl.ele("popup-view").style.display = "none";
    }
    PageCtrl.hidePopupView = hidePopupView;
    function closePopupView() {
        if (typeof inner.closePopView === "function") {
            inner.closePopView();
            delete inner.closePopView;
        }
        else {
            hidePopupView();
        }
    }
    PageCtrl.closePopupView = closePopupView;
    function closePopupViewDelay() {
        setTimeout(function () {
            closePopupView();
        }, 200);
    }
    PageCtrl.closePopupViewDelay = closePopupViewDelay;
    function showPopupView(info) {
        if (!(info === null || info === void 0 ? void 0 : info.url) || !info.name) {
            hidePopupView();
            return;
        }
        PageCtrl.ele("popup-view-img").src = info.url;
        PageCtrl.ele("popup-view-img").alt = info.tips || info.name;
        PageCtrl.ele("popup-view-thumb").src = info.thumb || info.url;
        PageCtrl.ele("popup-view-thumb").alt = info.tips || info.name;
        PageCtrl.ele("popup-view-title").innerText = info.name;
        PageCtrl.ele("popup-view-desc").innerText = info.desc;
        PageCtrl.ele("popup-view").style.display = "";
        inner.closePopView = info.close;
    }
    PageCtrl.showPopupView = showPopupView;
    function initHome() {
        var container = PageCtrl.ele("section-avatars");
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
        PageCtrl.renderPaintings({
            size: 12,
            root: true
        });
        PageCtrl.videosModel("home");
        if (typeof DeepX === "undefined")
            return;
        DeepX.MdBlogs.setElementText("title-about", "about");
        DeepX.MdBlogs.setElementText("title-videos", "videos");
        DeepX.MdBlogs.setElementText("title-links", "otherLinks");
        DeepX.MdBlogs.setElementText("button-blog", "blog");
        PageCtrl.setElementProp("link-certs", null, "certHonors");
        PageCtrl.setElementProp("title-works-series", null, "series");
        PageCtrl.setElementProp("title-works-common", null, "general");
        DeepX.MdBlogs.setElementProp("button-works-more", null, DeepX.MdBlogs.getLocaleString("seeMore"));
        initMenu(true);
    }
    PageCtrl.initHome = initHome;
})(PageCtrl || (PageCtrl = {}));
var PageCtrl;
(function (PageCtrl) {
    var ImageSeriesPart = /** @class */ (function (_super) {
        __extends(ImageSeriesPart, _super);
        function ImageSeriesPart(element, options) {
            var _a;
            var _this = _super.call(this, element, options) || this;
            var data = (options === null || options === void 0 ? void 0 : options.data) || {
                series: [],
                items: {},
            };
            var seriesCol = data.series || [];
            var mktOptions = data.mkt !== undefined ? { mkt: data.mkt } : undefined;
            var blogRela = toRela(data.blogRela || "../blog/");
            var imageRela = toRela(data.imageRela || "../images/");
            var styles = data.styles || {};
            var strings = data.strings || {};
            var urls = data.urls || {};
            var mainStyle = mergeArray(["x-container-pics"], styles.main);
            _this.__inner = {
                series: seriesCol,
                items: data.items || {},
                blogRela: blogRela,
                mkt: mktOptions,
                imageRela: imageRela,
                mainStyle: mainStyle,
                urls: urls,
                siteName: strings.site,
                defaultItemName: strings.pics,
                selected: data.selected,
            };
            var self = _this;
            var select = data.select;
            if (select === true || select === undefined)
                select = (_a = _this.series[0]) === null || _a === void 0 ? void 0 : _a.id;
            else if (!select || typeof select !== "string")
                select = undefined;
            _this.currentModel.children = [{
                    tagName: "article",
                    children: [data.before, genHeader([{
                                tagName: "span",
                                children: strings.pics,
                            }], styles.header, "h1", "title", "title-container"), {
                            key: "gallery",
                            tagName: "main",
                            control: ImageCollectionPart,
                            styleRefs: mainStyle,
                            data: {
                                rela: imageRela,
                                itemUrl: data.itemUrl,
                                click: data.click ? function (d, ev) {
                                    var _a;
                                    if (typeof data.click === "function")
                                        data.click(d, ev);
                                    var selectItem = self.__inner.select;
                                    if (!d.component || !((_a = d.item) === null || _a === void 0 ? void 0 : _a.id) || !selectItem)
                                        return;
                                    var _b = self.getSeriesLinkInfo(selectItem), url = _b.url, kind = _b.kind;
                                    if (kind !== "route" || !url || !url.includes("?"))
                                        return;
                                    var question = url.includes("?") ? "&" : "?";
                                    var selectImage = Hje.getQuery("id");
                                    if (selectImage) {
                                        history.replaceState(new ImageHistoryState(selectItem, d.item), "", "".concat(url).concat(question, "id=").concat(d.item.id));
                                    }
                                    else {
                                        self.__inner.needBack = true;
                                        history.pushState(new ImageHistoryState(selectItem, d.item), "", "".concat(url).concat(question, "id=").concat(d.item.id));
                                    }
                                } : undefined,
                                close: data.close,
                                mkt: data.mkt,
                                defaultName: strings.pics,
                                page: data.page,
                            },
                        }, {
                            key: "actions",
                            tagName: "section",
                            style: { display: "none" },
                            styleRefs: mergeArray(["x-part-blog-next"], styles.next),
                            children: [{
                                    tagName: "div",
                                    children: [{
                                            tagName: "button",
                                            styleRefs: ["x-button-more", "link-button-normal"],
                                            children: [span(DeepX.MdBlogs.getLocaleString("seeMore", data.mkt))],
                                            on: {
                                                click: function () {
                                                    var gallery = self.childControl("gallery");
                                                    if (!gallery)
                                                        return;
                                                    var hasNextPage = gallery.nextPage();
                                                    if (hasNextPage)
                                                        return;
                                                    self.childModel("actions", {
                                                        style: { display: "none" },
                                                    });
                                                },
                                            },
                                        }]
                                }]
                        }, {
                            key: "related",
                            tagName: "section",
                            style: { display: "none" },
                            styleRefs: mergeArray(["x-part-blog-related"], styles.related),
                            children: [],
                        }, {
                            key: "share",
                            tagName: "section",
                            styleRefs: mergeArray(["x-part-blog-share"], styles.share),
                            style: { display: "none" },
                        }, data.after,].filter(function (ele) { return !!ele; })
                }, {
                    tagName: "nav",
                    children: [genHeader([{
                                tagName: "span",
                                children: PageCtrl.getString("picLibs", mktOptions),
                            }], styles.header, "h1", undefined, "menu"), {
                            key: "all",
                            tagName: "section",
                            children: select ? [] : _this.genSeriesMenu(select),
                        }].filter(function (ele) { return !!ele; })
                }];
            _this.currentModel.onLoad = function () {
                delete _this.currentModel.onLoad;
                if (!select || self.__inner.select)
                    return;
                var sel = self.selectSeries(select);
                if (!sel)
                    return;
                var _a = self.getSeriesLinkInfo(sel), url = _a.url, kind = _a.kind, title = _a.title;
                if (kind !== "route" || !url)
                    return false;
                if (self.__inner.siteName)
                    document.title = title;
                var imageId = Hje.getQuery("id");
                if (!imageId || !url.includes("?")) {
                    history.replaceState(new ImageHistoryState(sel), "", url);
                    return;
                }
                var gallery = self.childControl("gallery");
                if (!gallery) {
                    history.replaceState(new ImageHistoryState(sel), "", url);
                    return;
                }
                var url2 = "".concat(url, "&id=").concat(imageId);
                var imageSelected = gallery.getItem(imageId);
                history.replaceState(new ImageHistoryState(sel, imageSelected), "", url2);
                if (imageSelected === null || imageSelected === void 0 ? void 0 : imageSelected.id)
                    gallery.openImage(imageSelected.id);
            };
            _this.refreshChild();
            return _this;
        }
        Object.defineProperty(ImageSeriesPart.prototype, "series", {
            get: function () {
                var col = this.__inner.series;
                var arr = [];
                for (var i = 0; i < col.length; i++) {
                    var series = col[i];
                    if (!series || typeof series === "string" || series.disable)
                        continue;
                    arr.push(series);
                }
                return arr;
            },
            enumerable: false,
            configurable: true
        });
        ImageSeriesPart.prototype.getSeries = function (id) {
            if (!id)
                return undefined;
            id = id.replace("=", "").replace(" ", "");
            var series = this.series;
            for (var i in series) {
                var item = series[i];
                if ((item === null || item === void 0 ? void 0 : item.id) !== id || item.disable)
                    continue;
                return item;
            }
            for (var i in series) {
                var item = series[i];
                if (!(item === null || item === void 0 ? void 0 : item.alias) || item.disable || !(item.alias instanceof Array))
                    continue;
                if (item.alias.indexOf(id) > -1)
                    return item;
            }
            return undefined;
        };
        ImageSeriesPart.prototype.selectSeries = function (id) {
            var _a, _b, _c;
            if (!id)
                return undefined;
            if (typeof id === "string") {
                var sel = this.getSeries(id);
                if (!sel)
                    return undefined;
                id = sel;
            }
            if (!id.id)
                return undefined;
            var items = this.__inner.items[id.id];
            var gallery = this.childControl("gallery");
            if (!gallery)
                return id;
            var mkt = this.__inner.mkt;
            this.__inner.select = id;
            gallery.clear();
            gallery.styleRefs(mergeArray(this.__inner.mainStyle, ratioClassName((_a = id.options) === null || _a === void 0 ? void 0 : _a.ratio)));
            var name = DeepX.MdBlogs.getLocaleProp(id, "name", mkt);
            var defaultName = DeepX.MdBlogs.getLocaleProp(id.options, "defaultItemName", mkt);
            if (!defaultName)
                defaultName = this.__inner.defaultItemName || DeepX.MdBlogs.getLocaleString("pic");
            else if (defaultName === true)
                defaultName = name;
            gallery.setDefaultName(name);
            gallery.pushWithoutRender.apply(gallery, items);
            var hasNextPage = gallery.nextPage();
            this.childModel("actions", {
                style: { display: hasNextPage ? "" : "none" },
            });
            var rela = this.__inner.imageRela;
            var title = [];
            var text = DeepX.MdBlogs.getLocaleProp(id, "icon", mkt);
            if (text)
                title.push({
                    tagName: "img",
                    props: {
                        src: relativePath(rela, text),
                        alt: name,
                    },
                });
            title.push(span(name, caseStyleRef(id.options, "subtitleCase", mkt)));
            text = DeepX.MdBlogs.getLocaleProp(id, "subtitle", mkt);
            if (text)
                title.push(span(text, caseStyleRef(id.options, "subtitleCase", mkt)));
            this.childModel("title", { children: title });
            var info = this.getSeriesLinkInfo(id);
            var share = sharePanel({
                qr: DeepX.MdBlogs.getLocaleProp(id.options, "qr", mkt) || ((_b = this.__inner.urls) === null || _b === void 0 ? void 0 : _b.qr),
                share: (_c = this.__inner.urls) === null || _c === void 0 ? void 0 : _c.share,
                page: info.url,
            }, DeepX.MdBlogs.getLocaleProp(id, "intro", mkt), rela, info.title, mkt);
            this.childModel("share", {
                style: { display: share.length ? "" : "none" },
                children: share,
            });
            this.refreshRelated();
            this.childModel("all", { children: this.genSeriesMenu(id.id) });
            var h = this.__inner.selected;
            if (typeof h === "function")
                h(id, this);
            return id;
        };
        ImageSeriesPart.prototype.scrollContentIntoView = function () {
            var _a;
            var element = (_a = this.childContext("title-container")) === null || _a === void 0 ? void 0 : _a.element();
            if (!element)
                return false;
            element.scrollIntoView({ behavior: "smooth" });
        };
        ImageSeriesPart.prototype.scrollMenuIntoView = function () {
            var _a;
            var element = (_a = this.childContext("menu")) === null || _a === void 0 ? void 0 : _a.element();
            if (!element)
                return false;
            element.scrollIntoView({ behavior: "smooth" });
        };
        ImageSeriesPart.prototype.imageRelative = function (url) {
            return relativePath(this.__inner.imageRela, url);
        };
        ImageSeriesPart.prototype.closeImage = function (ev) {
            if (this.__inner.needBack) {
                history.back();
                return;
            }
            var gallery = this.childControl("gallery");
            if (!gallery)
                return;
            gallery.closeImage(ev);
        };
        ImageSeriesPart.prototype.registerHistoryPop = function () {
            var self = this;
            window.addEventListener("popstate", function (ev) {
                var _a;
                delete self.__inner.needBack;
                var stateInfo = ev === null || ev === void 0 ? void 0 : ev.state;
                if (!(stateInfo === null || stateInfo === void 0 ? void 0 : stateInfo.series))
                    return;
                self.selectSeries(stateInfo.series);
                var gallery = self.childControl("gallery");
                if (!gallery)
                    return;
                if (!((_a = stateInfo.image) === null || _a === void 0 ? void 0 : _a.id)) {
                    gallery.closeImage();
                    var imageId = Hje.getQuery("id");
                    if (imageId) {
                        var url = self.getSeriesLinkInfo(stateInfo.series).url;
                        this.history.replaceState(new ImageHistoryState(stateInfo.series), "", url);
                    }
                }
                else {
                    console.log("open image");
                    gallery.openImage(stateInfo.image);
                }
            });
        };
        ImageSeriesPart.prototype.refreshRelated = function () {
            return __awaiter(this, void 0, void 0, function () {
                var series, articlesPromise, elements, links, articles, mkt, rela;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            series = this.__inner.select;
                            if (!series)
                                return [2 /*return*/];
                            articlesPromise = getArticles(series);
                            elements = [];
                            links = genLinkList(DeepX.MdBlogs.getLocaleString("relatedLinks", (_a = this.__inner.mkt) === null || _a === void 0 ? void 0 : _a.mkt), series.links);
                            if (((_b = links === null || links === void 0 ? void 0 : links.children) === null || _b === void 0 ? void 0 : _b.length) === 2)
                                elements.push(links.children[0], links.children[1]);
                            this.childModel("related", {
                                style: { display: elements.length ? "" : "none" },
                                children: elements,
                            });
                            return [4 /*yield*/, articlesPromise];
                        case 1:
                            articles = _d.sent();
                            if (this.__inner.select !== series || !(articles === null || articles === void 0 ? void 0 : articles.length))
                                return [2 /*return*/];
                            mkt = this.__inner.mkt;
                            rela = this.__inner.blogRela;
                            links = genLinkList(PageCtrl.getString("relatedBlog", mkt), articles.map(function (ele) {
                                var subtitle = [];
                                var text = ele.getSubtitle(mkt);
                                if (text)
                                    subtitle.push(text);
                                var date = ele.dateString;
                                if (date)
                                    subtitle.push(date);
                                return {
                                    name: ele.getName(mkt),
                                    subtitle: subtitle.length ? subtitle : undefined,
                                    url: "".concat(rela.value, "?").concat(ele.getRoutePath(mkt)),
                                };
                            }));
                            if (((_c = links === null || links === void 0 ? void 0 : links.children) === null || _c === void 0 ? void 0 : _c.length) !== 2)
                                return [2 /*return*/];
                            this.childModel("related", {
                                style: { display: "" },
                                children: __spreadArray([links.children[0], links.children[1]], elements, true),
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        ImageSeriesPart.prototype.genSeriesMenu = function (selected) {
            var self = this;
            var inner = self.__inner;
            var arr = [];
            var label;
            inner.series.forEach(function (ele) {
                if (!ele)
                    return;
                if (typeof ele === "string") {
                    label = ele;
                    return;
                }
                var name = DeepX.MdBlogs.getLocaleProp(ele, "name", inner.mkt);
                if (!name)
                    return null;
                if (ele.disable === "label" || ele.disable === "header") {
                    label = name;
                    return;
                }
                if (ele.disable || !ele.id)
                    return;
                if (label) {
                    arr.push(span(label, "grouping-header"));
                    label = undefined;
                }
                var labels = [];
                if (ele.icon)
                    labels.push({
                        tagName: "img",
                        props: {
                            alt: name,
                            src: relativePath(inner.imageRela, ele.icon),
                        }
                    });
                labels.push(span(name, caseStyleRef(ele.options, "nameCase", inner.mkt)));
                var desc = DeepX.MdBlogs.getLocaleProp(ele, "subtitle", inner.mkt);
                if (desc)
                    labels.push(span([span(desc)], caseStyleRef(ele.options, "subtitleCase", inner.mkt)));
                var styleRefs = ["link-long-button"];
                if (selected === ele.id)
                    styleRefs.push("state-sel");
                var _a = self.getSeriesLinkInfo(ele), seriesLink = _a.url, kind = _a.kind;
                var enableRoute = kind === "route";
                arr.push({
                    tagName: "a",
                    styleRefs: styleRefs,
                    props: {
                        href: seriesLink || "#",
                    },
                    children: labels,
                    data: ele,
                    on: {
                        click: function (ev) {
                            if (seriesLink && !enableRoute)
                                return;
                            ev.preventDefault();
                            var old = inner.select;
                            self.selectSeries(ele);
                            if (!enableRoute) {
                                self.scrollContentIntoView();
                                return;
                            }
                            if (ele !== old) {
                                history.pushState(new ImageHistoryState(ele), "", seriesLink);
                                if (inner.siteName)
                                    document.title = "".concat(name, " - ").concat(inner.siteName);
                            }
                            PageCtrl.scrollToTop();
                        }
                    },
                });
            });
            return arr;
        };
        ImageSeriesPart.prototype.getSeriesLinkInfo = function (value) {
            var _a;
            var inner = this.__inner;
            var seriesLink = (_a = inner.urls) === null || _a === void 0 ? void 0 : _a.series;
            if (seriesLink) {
                if (seriesLink === "?" || seriesLink === ".")
                    seriesLink = "./";
                else if (seriesLink.endsWith("?"))
                    seriesLink = seriesLink.substring(0, seriesLink.length - 1);
                else if (seriesLink === "#")
                    seriesLink = undefined;
            }
            var enableRoute = seriesLink === "./";
            if (seriesLink) {
                if (seriesLink.endsWith("="))
                    seriesLink += value.id;
                else if (enableRoute && (value.id === "default" || value.id === "index") && value === inner.series[0])
                    seriesLink = "./";
                else
                    seriesLink += "?" + value.id;
            }
            return {
                title: "".concat(DeepX.MdBlogs.getLocaleProp(value, "name", inner.mkt), " - ").concat(inner.siteName),
                url: seriesLink,
                kind: enableRoute ? "route" : (seriesLink ? "link" : "func"),
            };
        };
        return ImageSeriesPart;
    }(Hje.BaseComponent));
    PageCtrl.ImageSeriesPart = ImageSeriesPart;
    var ImageCollectionPart = /** @class */ (function (_super) {
        __extends(ImageCollectionPart, _super);
        function ImageCollectionPart(element, options) {
            var _a;
            var _this = _super.call(this, element, options) || this;
            var data = (options === null || options === void 0 ? void 0 : options.data) || {
                items: []
            };
            var elements = [];
            var self = _this;
            var pageSize = data.page && data.page > 0 ? data.page : undefined;
            _this.__inner = {
                items: [],
                rela: toRela(data.rela),
                itemUrl: data.itemUrl || (function () {
                    return undefined;
                }),
                click: data.click,
                close: data.close,
                mkt: data.mkt !== undefined ? { mkt: data.mkt } : undefined,
                defaultName: data.defaultName,
                pageSize: pageSize,
                nextIndex: 0,
                renderedCount: 0,
            };
            var pageSize2 = pageSize || Number.MAX_SAFE_INTEGER;
            if ((_a = options === null || options === void 0 ? void 0 : options.data) === null || _a === void 0 ? void 0 : _a.items) {
                var i = 0;
                var j = 0;
                for (; i < options.data.items.length; i++) {
                    var item = options.data.items[i];
                    var element_1 = self.genItemModel(item);
                    if (!element_1)
                        continue;
                    self.__inner.items.push(item);
                    if (item.disable)
                        continue;
                    if (j >= pageSize2)
                        continue;
                    j++;
                    elements.push(element_1);
                }
                _this.__inner.nextIndex = i;
                _this.__inner.renderedCount = j;
            }
            _this.currentModel.children = elements;
            _this.refreshChild();
            return _this;
        }
        Object.defineProperty(ImageCollectionPart.prototype, "length", {
            get: function () {
                return this.__inner.items;
            },
            enumerable: false,
            configurable: true
        });
        ImageCollectionPart.prototype.setDefaultName = function (value) {
            this.__inner.defaultName = value;
        };
        ImageCollectionPart.prototype.getItem = function (index) {
            var _a;
            if (typeof index === "number")
                return index < 0 ? undefined : this.__inner.items[index];
            if (!index || typeof index !== "string")
                return undefined;
            var col = this.__inner.items;
            for (var i = 0; i < col.length; i++) {
                var item = col[i];
                if (index === ((_a = col[i]) === null || _a === void 0 ? void 0 : _a.id))
                    return item;
            }
            return undefined;
        };
        ImageCollectionPart.prototype.pushWithoutRender = function () {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i] = arguments[_i];
            }
            var j = 0;
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var element = this.genItemModel(item);
                if (!element)
                    continue;
                if (this.__inner.items.indexOf(item) >= 0)
                    continue;
                this.__inner.items.push(item);
                j++;
            }
            return j;
        };
        ImageCollectionPart.prototype.push = function () {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i] = arguments[_i];
            }
            var pageSize = this.__inner.pageSize || Number.MAX_SAFE_INTEGER;
            var j = 0;
            var k = 0;
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var element = this.genItemModel(item);
                if (!element)
                    continue;
                if (this.__inner.items.indexOf(item) >= 0)
                    continue;
                this.__inner.items.push(item);
                j++;
                if (item.disable || k >= pageSize)
                    continue;
                this.appendChild(null, element);
                k++;
            }
            return j;
        };
        ImageCollectionPart.prototype.clear = function () {
            this.__inner.items = [];
            this.__inner.nextIndex = 0;
            this.__inner.renderedCount = 0;
            this.currentModel.children = [];
            this.refreshChild();
        };
        ImageCollectionPart.prototype.nextPage = function () {
            var pageSize = this.__inner.pageSize;
            var first = this.__inner.renderedCount;
            if (first < 0)
                first = 0;
            if (!pageSize || pageSize <= 0) {
                pageSize = Number.MAX_SAFE_INTEGER;
            }
            else {
                var more = first % pageSize;
                if (more === 0) {
                }
                else if (more === 1 && pageSize > 3) {
                    pageSize--;
                }
                else {
                    pageSize = pageSize - more + pageSize;
                }
            }
            var col = this.__inner.items;
            var j = 0;
            var i = this.__inner.nextIndex;
            for (; i < this.__inner.items.length; i++) {
                var item = col[i];
                if (item.disable)
                    continue;
                if (j >= pageSize) {
                    this.__inner.nextIndex = i;
                    this.__inner.renderedCount += j;
                    return true;
                }
                var element = this.genItemModel(item);
                if (!element)
                    continue;
                j++;
                this.appendChild(null, element);
            }
            this.__inner.nextIndex = i;
            this.__inner.renderedCount += j;
            return false;
        };
        ImageCollectionPart.prototype.indexOf = function (item) {
            var _a;
            var col = this.__inner.items;
            if (!item)
                return -1;
            if (typeof item !== "string") {
                return col.indexOf(item);
            }
            else {
                for (var i = 0; i < col.length; i++) {
                    if (item === ((_a = col[i]) === null || _a === void 0 ? void 0 : _a.id))
                        return i;
                }
            }
            return -1;
        };
        ImageCollectionPart.prototype.imageRelative = function (url) {
            return relativePath(this.__inner.rela, url);
        };
        ImageCollectionPart.prototype.openImage = function (item, ev) {
            if (!item)
                return;
            if (typeof item === "string") {
                var item2 = this.getItem(item);
                if (!item2)
                    return;
                item = item2;
            }
            var inner = this.__inner;
            var self = this;
            var name = DeepX.MdBlogs.getLocaleProp(item, "name", inner.mkt) || this.__inner.defaultName;
            var url = inner.itemUrl(item, "source");
            if (!url)
                return undefined;
            url = relativePath(inner.rela, url) || url;
            var thumb = item.thumb && typeof item.thumb === "string" ? item.thumb : undefined;
            if (!thumb && item.thumb !== false)
                thumb = inner.itemUrl(item, "thumb");
            if (thumb)
                thumb = relativePath(inner.rela, thumb);
            else
                thumb = url;
            if (typeof inner.click !== "function")
                return;
            inner.click({
                item: item,
                component: self,
                info: {
                    name: name,
                    url: url,
                    thumb: thumb,
                }
            }, ev);
        };
        ImageCollectionPart.prototype.closeImage = function (ev) {
            if (typeof this.__inner.close === "function")
                this.__inner.close(ev);
        };
        ImageCollectionPart.prototype.genItemModel = function (item) {
            if (!item)
                return undefined;
            var inner = this.__inner;
            var self = this;
            var name = DeepX.MdBlogs.getLocaleProp(item, "name", inner.mkt) || this.__inner.defaultName;
            var url = inner.itemUrl(item, "source");
            if (!url)
                return undefined;
            url = relativePath(inner.rela, url) || url;
            var thumb = item.thumb && typeof item.thumb === "string" ? item.thumb : undefined;
            if (!thumb && item.thumb !== false)
                thumb = inner.itemUrl(item, "thumb");
            if (thumb)
                thumb = relativePath(inner.rela, thumb);
            else
                thumb = url;
            return {
                tagName: "img",
                props: {
                    loading: "lazy",
                    src: thumb,
                    title: item.year && typeof item.year === "number" && item.year > 2000 ? "".concat(name, "\n").concat(item.year.toString(10)) : name,
                    alt: name,
                },
                style: item.disable ? { display: "none" } : null,
                on: {
                    click: function (ev) {
                        if (typeof inner.click !== "function")
                            return;
                        inner.click({
                            item: item,
                            component: self,
                            info: {
                                name: name,
                                url: url,
                                thumb: thumb,
                            }
                        }, ev);
                    }
                },
                data: item,
            };
        };
        return ImageCollectionPart;
    }(Hje.BaseComponent));
    PageCtrl.ImageCollectionPart = ImageCollectionPart;
    var RelatedInfoPart = /** @class */ (function (_super) {
        __extends(RelatedInfoPart, _super);
        function RelatedInfoPart(element, options) {
            var _this = _super.call(this, element, options) || this;
            var data = (options === null || options === void 0 ? void 0 : options.data) || {};
            _this.currentModel.children = [data.title ? genHeader(data.title) : null, {
                    tagName: "section",
                    key: "gallery",
                    control: ImageCollectionPart,
                    data: {
                        rela: data.imageRela,
                        mkt: data.mkt,
                        defaultName: data.defaultImageName,
                        click: data.click,
                        close: data.close,
                        itemUrl: data.itemUrl,
                    },
                    styleRefs: ["x-container-pics"],
                    style: { display: "none" },
                }, {
                    tagName: "section",
                    key: "links",
                    style: { display: "none" },
                }].filter(function (ele) { return !!ele; });
            _this.currentModel.onLoad = function () {
                delete _this.currentModel.onLoad;
                if (!data.links && !data.images)
                    return;
                _this.setData(data.links, data.images);
            };
            _this.refreshChild();
            return _this;
        }
        RelatedInfoPart.prototype.setData = function (links, images) {
            var menu = genLinkListChildren(links);
            var count = (menu === null || menu === void 0 ? void 0 : menu.length) || 0;
            this.childModel("links", {
                children: menu || [],
                style: { display: menu ? "" : "none" },
            });
            var gallery = this.childControl("gallery");
            if (!gallery)
                return count;
            gallery.clear();
            var styleInfo = { display: "none" };
            if (images && images instanceof Array) {
                var count2 = gallery.push.apply(gallery, images);
                if (count2 > 0)
                    styleInfo.display = "";
                count += count2;
            }
            gallery.style(styleInfo);
            return count;
        };
        return RelatedInfoPart;
    }(Hje.BaseComponent));
    PageCtrl.RelatedInfoPart = RelatedInfoPart;
    var ImageHistoryState = /** @class */ (function () {
        function ImageHistoryState(series, image) {
            this.series = series;
            this.image = image;
        }
        return ImageHistoryState;
    }());
    function seriesList(col, imageRela, link, options) {
        if (!link)
            link = "./";
        if (!col)
            return null;
        var imageUrl;
        if (!imageRela)
            imageUrl = function (value) { return value; };
        else if (typeof imageRela === "string")
            imageUrl = function (value) { return relativePath(toRela(imageRela), value); };
        else if (imageRela instanceof Hje.RelativePathInfo)
            imageUrl = function (value) { return relativePath(imageRela, value); };
        else if (imageRela instanceof ImageCollectionPart)
            imageUrl = function (value) { return imageRela.imageRelative(value); };
        else if (imageRela instanceof ImageSeriesPart)
            imageUrl = function (value) { return imageRela.imageRelative(value); };
        else
            imageUrl = function (value) { return value; };
        return col.map(function (ele) {
            if (!(ele === null || ele === void 0 ? void 0 : ele.id) || ele.disable)
                return null;
            var name = DeepX.MdBlogs.getLocaleProp(ele, "name", options);
            if (!name)
                return null;
            var label = [];
            var text = imageUrl(DeepX.MdBlogs.getLocaleProp(ele, "icon", options));
            if (text)
                label.push({
                    tagName: "img",
                    props: {
                        alt: name,
                        src: text,
                    }
                });
            label.push({
                tagName: "span",
                styleRefs: caseStyleRef(ele.options, "nameCase", options),
                children: name,
            });
            text = DeepX.MdBlogs.getLocaleProp(ele, "subtitle", options);
            if (text)
                label.push({
                    tagName: "span",
                    styleRefs: caseStyleRef(ele.options, "subtitleCase", options),
                    children: text,
                });
            return {
                tagName: "a",
                styleRefs: "link-long-button",
                props: {
                    href: "".concat(link, "?").concat(ele.id)
                },
                children: label,
            };
        }).filter(function (ele) { return !!ele; });
    }
    PageCtrl.seriesList = seriesList;
    function caseStyleRef(ele, key, options) {
        if (!ele)
            return undefined;
        var cap = DeepX.MdBlogs.getLocaleProp(ele, key || "nameCase", options);
        if (!cap)
            return undefined;
        switch (cap.toLowerCase()) {
            case "upper":
                return "x-text-case-upper";
            case "lower":
                return "x-text-case-lower";
            case "captial":
                return "x-text-case-capital";
            case "small":
                return "x-text-case-small";
            default:
                return undefined;
        }
    }
    function toRela(rela) {
        return (rela && rela instanceof Hje.RelativePathInfo)
            ? rela
            : new Hje.RelativePathInfo(rela || "./");
    }
    function mergeArray(original, options) {
        if (!options)
            return original;
        if (!original) {
            if (!options)
                return [];
            if (typeof options === "string")
                return [options];
            return options;
        }
        if (typeof options === "string")
            return __spreadArray(__spreadArray([], original, true), [options], false);
        return __spreadArray(__spreadArray([], original, true), options, true);
    }
    function ratioClassName(ratio) {
        if (!ratio)
            return null;
        switch (ratio) {
            case "w":
            case "wide":
                return "x-image-ratio-w";
            case "s":
            case "square":
                return "x-image-ratio-s";
            case "p":
            case "page":
                return "x-image-ratio-p";
            case "h":
            case "horizontal":
                return "x-image-ratio-h";
            case "v":
            case "vertical":
            default:
                return null;
        }
    }
    function genLinkList(title, list) {
        var elements = genLinkListChildren(list);
        if (!(elements === null || elements === void 0 ? void 0 : elements.length))
            return null;
        var container = title ? genHeader(title) : { children: [] };
        container.children.push({
            tagName: "ul",
            styleRefs: "link-tile-compact",
            children: elements,
        });
        return container;
    }
    function genLinkListChildren(list) {
        if (!(list === null || list === void 0 ? void 0 : list.length) || !(list instanceof Array))
            return null;
        var elements = list.map(function (ele) {
            if (!(ele === null || ele === void 0 ? void 0 : ele.name) || !ele.url || typeof ele.url !== "string")
                return null;
            var children = [span(ele.name)];
            if (ele.subtitle) {
                if (typeof ele.subtitle === "string") {
                    children.push(span(ele.subtitle));
                }
                else if (ele.subtitle instanceof Array) {
                    for (var i = 0; i < ele.subtitle.length; i++) {
                        var subtitle = ele.subtitle[i];
                        if (!subtitle)
                            continue;
                        if (typeof subtitle === "number")
                            children.push(span(subtitle.toString(10)));
                        else if (typeof subtitle === "string")
                            children.push(span(subtitle));
                    }
                }
            }
            var props = {
                href: ele.url,
                title: children.map(function (ele) { return ele.children; }).join("\n"),
            };
            if (ele.newWindow)
                props.target = "_blank";
            return {
                tagName: "li",
                children: [{
                        tagName: "a",
                        props: props,
                        children: children,
                    }],
            };
        }).filter(function (ele) { return !!ele; });
        if (!elements.length)
            return null;
        return elements;
    }
    function sharePanel(urls, intro, rela, title, mktOptions) {
        if (!urls)
            urls = {};
        var arr = [];
        var introElement = multipleLines(intro, "x-part-blog-note");
        if (!urls.qr) {
            if (introElement)
                arr.push(introElement);
            return arr;
        }
        var header = (urls === null || urls === void 0 ? void 0 : urls.share) ? [{
                tagName: "img",
                props: {
                    alt: PageCtrl.getString("share", mktOptions),
                    src: relativePath(rela, urls.share),
                }
            }] : [];
        header.push(urls.page && title && hasShareApi()
            ? {
                tagName: "a",
                children: PageCtrl.getString("share", mktOptions),
                on: {
                    click: function () {
                        navigator.share({
                            title: title,
                            url: urls.page
                        });
                    },
                },
            }
            : span(PageCtrl.getString("share", mktOptions)));
        arr.push({
            tagName: "h2",
            children: header,
        });
        arr.push({
            tagName: "div",
            children: [{
                    tagName: "img",
                    props: {
                        alt: "QR code",
                        src: relativePath(rela, urls.qr),
                    },
                }]
        });
        if (introElement)
            arr.push(introElement);
        return arr;
    }
    function genHeader(children, styleRefs, tagName, key, containerKey) {
        return {
            tagName: "section",
            key: containerKey,
            styleRefs: styleRefs,
            children: [{
                    tagName: tagName || "h2",
                    key: key,
                    children: children,
                }],
        };
    }
    function span(text, styleRefs, tagName) {
        return {
            tagName: tagName || "span",
            styleRefs: styleRefs,
            children: text,
        };
    }
    function multipleLines(text, styleRefs, tagName) {
        if (!text)
            return null;
        if (typeof text === "string")
            return {
                tagName: tagName || "div",
                styleRefs: styleRefs,
                children: [span(text, undefined, "p")]
            };
        if (!(text instanceof Array) || !text.length)
            return null;
        var children = text.map(function (ele) {
            if (typeof ele === "number")
                return span(ele.toString(10), undefined, "p");
            if (!ele || typeof ele !== "string")
                return null;
            return span(ele, undefined, "p");
        }).filter(function (ele) { return !!ele; });
        return children.length ? {
            tagName: tagName || "div",
            styleRefs: styleRefs,
            children: children,
        } : null;
    }
    function relativePath(rela, url) {
        var _a;
        if (!url || typeof url !== "string")
            return undefined;
        if (url.indexOf("://") >= 0)
            return url;
        return ((_a = rela.relative(url)) === null || _a === void 0 ? void 0 : _a.value) || url;
    }
    function getArticles(series) {
        return __awaiter(this, void 0, void 0, function () {
            var keyword, articles;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        keyword = series === null || series === void 0 ? void 0 : series.blog;
                        if (!keyword)
                            return [2 /*return*/, undefined];
                        return [4 /*yield*/, PageCtrl.loadBlogArticles()];
                    case 1:
                        articles = _b.sent();
                        if (!articles)
                            return [2 /*return*/, undefined];
                        return [2 /*return*/, (_a = articles.blog()) === null || _a === void 0 ? void 0 : _a.filter(function (ele) { return ele && ele.hasKeyword(keyword); })];
                }
            });
        });
    }
    function hasShareApi() {
        try {
            if (typeof navigator !== "object")
                return false;
            return typeof navigator.share === "function";
        }
        catch (_a) {
            return false;
        }
    }
})(PageCtrl || (PageCtrl = {}));
var PageCtrl;
(function (PageCtrl) {
    var strings = {
        all: "All",
        "all#zh": "全部",
        share: "Share",
        "share#zh": "分享",
        photoTaken: "Photo taken on {0}.",
        "photoTaken#zh": "本照片拍摄于{0}年",
        general: "General",
        "general#zh": "常规",
        paintings: "Paintings",
        "paintings#zh": "画作",
        series: "Series",
        "series#zh": "系列",
        dateToMonth: "MMM YYYY",
        "dateToMonth#zh": "YYYY年MM月",
        certHonors: "Honors",
        "certHonors#zh": "小小荣誉",
        picLibs: "All picture libraries",
        "picLibs#zh": "全部图集",
        generalPaintings: "General pictures",
        "generalPaintings#zh": "常规画作",
        related: "Related",
        "related#zh": "相关",
        relatedBlog: "Related blog articles",
        "relatedBlog#zh": "相关博客",
        relatedPaintings: "Related paintings",
        "relatedPaintings#zh": "相关画作",
        worksBy: "{1} by {0}",
        "worksBy#zh": "{0}的{1}",
        workMorOwMeow: "摸凹喵",
        "workMorOwMeow#en": "Mor-Ow Meow",
        "workMorOwMeow#fr": "Moh-Aou Miaou",
        "workMorOwMeow#ko": "모오 미야오",
        workStarna: "Starna",
        "workStarna#zh": "星娜喵",
        seeSeriesWorks: "See all works of the serie",
        "seeSeriesWorks#zh": "查看系列完整画作集",
        loveDrawing: "I love drawing and following are my works.",
        "loveDrawing#zh": "我爱画画！以下是我的部分作品。",
    };
    function getString(key, mktOptions) {
        return DeepX.MdBlogs.getLocaleProp(strings, key, mktOptions);
    }
    PageCtrl.getString = getString;
    function setElementProp(element, prop, key) {
        return DeepX.MdBlogs.setElementProp(element, prop, DeepX.MdBlogs.getLocaleProp(strings, key));
    }
    PageCtrl.setElementProp = setElementProp;
    function monthYear(year, month) {
        if (typeof month !== "number" || isNaN(month) || month < 1 || month > 13)
            return "'" + year.toString(10);
        var template = getString("dateToMonth").replace("YYYY", year.toString(10));
        if (template.includes("MMM")) {
            switch (month) {
                case 1:
                    template = template.replace("MMM", "Jan");
                    break;
                case 2:
                    template = template.replace("MMM", "Feb");
                    break;
                case 3:
                    template = template.replace("MMM", "Mar");
                    break;
                case 4:
                    template = template.replace("MMM", "Apr");
                    break;
                case 5:
                    template = template.replace("MMM", "May");
                    break;
                case 6:
                    template = template.replace("MMM", "Jun");
                    break;
                case 7:
                    template = template.replace("MMM", "Jul");
                    break;
                case 8:
                    template = template.replace("MMM", "Aug");
                    break;
                case 9:
                    template = template.replace("MMM", "Sep");
                    break;
                case 10:
                    template = template.replace("MMM", "Oct");
                    break;
                case 11:
                    template = template.replace("MMM", "Nov");
                    break;
                case 12:
                    template = template.replace("MMM", "Dec");
                    break;
                case 13:
                    template = template.replace("MMM", "Und");
                    break;
            }
        }
        template = template.replace("MM", month.toString(10));
        return template;
    }
    PageCtrl.monthYear = monthYear;
})(PageCtrl || (PageCtrl = {}));
var PageCtrl;
(function (PageCtrl) {
    var works = {
        series: [],
        default: [],
        done: false
    };
    function init(element, rela) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (works.done)
                            return [2 /*return*/, true];
                        return [4 /*yield*/, PageCtrl.fetchMainData("".concat(rela || "../paintings/", "config.json"), element)];
                    case 1:
                        data = (_a.sent()).data;
                        if (!data)
                            return [2 /*return*/, false];
                        works = data;
                        works.done = true;
                        return [2 /*return*/, true];
                }
            });
        });
    }
    function renderPaintings(options) {
        return __awaiter(this, void 0, void 0, function () {
            var container, images, mkt, mktOptions, c, menu, more;
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (!options)
                            return [2 /*return*/];
                        container = getContainerElement(options);
                        if (!options.root) return [3 /*break*/, 2];
                        return [4 /*yield*/, init(container, "./paintings/")];
                    case 1:
                        _f.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, init(container)];
                    case 3:
                        _f.sent();
                        _f.label = 4;
                    case 4:
                        PageCtrl.setElementProp(getContainerElement(options, "title"), null, "paintings");
                        images = ((_a = options.series) === null || _a === void 0 ? void 0 : _a.id) ? works[options.series.id] : undefined;
                        if (!images || !(images instanceof Array))
                            images = works.default || [];
                        mkt = Hje.getQuery("mkt") || Hje.getQuery("lang") || undefined;
                        mktOptions = mkt !== undefined ? { mkt: mkt } : undefined;
                        c = (_d = Hje.render(container, {
                            control: PageCtrl.ImageCollectionPart,
                            data: {
                                rela: options.root ? "./images/" : "../images/",
                                items: [],
                                defaultName: ((_c = (_b = options.series) === null || _b === void 0 ? void 0 : _b.options) === null || _c === void 0 ? void 0 : _c.defaultItemName) || DeepX.MdBlogs.getLocaleString("pic"),
                                mkt: mkt,
                                page: options.size || 24,
                                itemUrl: getPaintingImageUrl,
                                click: onImageItemClick,
                            },
                        })) === null || _d === void 0 ? void 0 : _d.control();
                        if (!c)
                            return [2 /*return*/];
                        c.pushWithoutRender.apply(c, images);
                        menu = getContainerElement(options, "menu");
                        if (menu && ((_e = works.series) === null || _e === void 0 ? void 0 : _e.length)) {
                            Hje.render(menu, {
                                children: PageCtrl.seriesList(works.series, c, options.root ? "./paintings/" : "../paintings/", mktOptions) || [],
                            });
                        }
                        if (!c.nextPage())
                            return [2 /*return*/];
                        more = getContainerElement(options, "more");
                        if (!more)
                            return [2 /*return*/];
                        more.style.display = "";
                        more.addEventListener("click", function () {
                            if (!c.nextPage())
                                more.style.display = "none";
                        });
                        return [2 /*return*/];
                }
            });
        });
    }
    PageCtrl.renderPaintings = renderPaintings;
    function initPaint() {
        return __awaiter(this, void 0, void 0, function () {
            var component;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        PageCtrl.initMenu("paintings");
                        return [4 /*yield*/, init("main-container")];
                    case 1:
                        _b.sent();
                        component = (_a = Hje.render("main-container", {
                            control: PageCtrl.ImageSeriesPart,
                            data: {
                                series: __spreadArray([{
                                        id: "default",
                                        name: PageCtrl.getString("generalPaintings"),
                                        qr: "logos/qr-paintings.png",
                                        year: 2020,
                                        thumb: true
                                    }, PageCtrl.getString("series")], works.series, true),
                                items: works,
                                select: DeepX.MdBlogs.firstQuery() || undefined,
                                blogRela: "../blog/",
                                imageRela: "../images/",
                                itemUrl: getPaintingImageUrl,
                                click: function (clickData) {
                                    var imageSize = getImageSizeDesc(clickData);
                                    var name = clickData.info.name;
                                    var desc = imageSize ? "\"".concat(name, " (").concat(imageSize, ")") : name;
                                    PageCtrl.showPopupView({
                                        name: name,
                                        url: clickData.info.url,
                                        thumb: clickData.info.thumb,
                                        tips: desc,
                                        desc: imageSize,
                                        close: function (ev) {
                                            component.closeImage(ev);
                                        }
                                    });
                                },
                                close: PageCtrl.hidePopupView,
                                selected: function (info, c) {
                                    PageCtrl.ele("ph-link-icon").href = c.imageRelative(info.icon || "./images/logos/logo-2026-paint.png") || "";
                                },
                                styles: {
                                    header: ["x-zone-hl", "layout-wide-full", "x-bg-outstanding"],
                                    next: ["x-zone-actions"],
                                    share: ["x-part-panel", "x-bg-emphasis"],
                                },
                                strings: {
                                    pics: PageCtrl.getString("paintings"),
                                    all: PageCtrl.getString("picLibs"),
                                    site: PageCtrl.getString("worksBy").replace("{0}", "Muse").replace("{1}", PageCtrl.getString("paintings")),
                                },
                                urls: {
                                    share: "./icons/share-w.png",
                                    qr: "./logos/qr-paintings.png",
                                    series: "./",
                                },
                                mkt: Hje.getQuery("mkt") || Hje.getQuery("lang") || true,
                                page: 24,
                                before: {
                                    tagName: "section",
                                    styleRefs: "x-part-greetings",
                                    children: [{
                                            tagName: "span",
                                            children: PageCtrl.getString("loveDrawing"),
                                        }, {
                                            tagName: "span",
                                            children: "♥️",
                                        }, {
                                            tagName: "a",
                                            props: {
                                                href: "#",
                                            },
                                            on: {
                                                click: function (ev) {
                                                    ev.preventDefault();
                                                    if (component)
                                                        component.scrollMenuIntoView();
                                                }
                                            },
                                            children: PageCtrl.getString("picLibs"),
                                        }]
                                }
                            },
                        })) === null || _a === void 0 ? void 0 : _a.control();
                        component.registerHistoryPop();
                        return [2 /*return*/];
                }
            });
        });
    }
    PageCtrl.initPaint = initPaint;
    function onImageItemClick(data) {
        var imageSize = getImageSizeDesc(data);
        var name = data.info.name;
        var desc = imageSize ? "\"".concat(name, " (").concat(imageSize, ")") : name;
        PageCtrl.showPopupView({
            name: name,
            url: data.info.url,
            thumb: data.info.thumb,
            tips: desc,
            desc: imageSize,
        });
    }
    PageCtrl.onImageItemClick = onImageItemClick;
    function getImageSizeDesc(data) {
        var imageSize = data.item.size || "";
        if (!data.item.year)
            return imageSize;
        if (imageSize)
            imageSize += " 　|　 ";
        imageSize += PageCtrl.monthYear(data.item.year, data.item.month);
        return imageSize;
    }
    function getPaintingImageUrl(item, kind) {
        return kind === "source"
            ? "./paintings/".concat(item.year, "/").concat(item.id, ".webp")
            : "./paintings/thumbnails/".concat(item.year, "/").concat(item.id, ".webp");
    }
    function getContainerElement(paging, suffix) {
        return PageCtrl.ele("".concat((paging === null || paging === void 0 ? void 0 : paging.id) || "section-works", "-").concat(suffix || "container"));
    }
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
    function ele(id) {
        return document.getElementById(id);
    }
    PageCtrl.ele = ele;
    function rootRela(root) {
        if (typeof root === "number") {
            if (root < 0 || isNaN(root))
                return "../";
            if (!Number.isInteger(root))
                root = Math.round(root);
            if (root === 0)
                return "./";
            var s = "../";
            for (var i = 1; i < root; i++) {
                s += "../";
            }
            return s;
        }
        return root ? "./" : "../";
    }
    PageCtrl.rootRela = rootRela;
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
    function loadingModel(failed, context) {
        var m = {
            tagName: "p",
            children: [failed ? {
                    tagName: "span",
                    children: DeepX.MdBlogs.getLocaleString("loadFailed"),
                } : {
                    tagName: "em",
                    children: DeepX.MdBlogs.getLocaleString("loading"),
                }],
        };
        if (context) {
            context.model().children = [m];
            context.refresh();
        }
        return m;
    }
    PageCtrl.loadingModel = loadingModel;
    function fetchMainData(url, element) {
        return __awaiter(this, void 0, void 0, function () {
            var c, res, json, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!url)
                            return [2 /*return*/, {}];
                        c = element ? Hje.render(element, {
                            children: [loadingModel()],
                        }) : undefined;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(url)];
                    case 2:
                        res = _b.sent();
                        return [4 /*yield*/, res.json()];
                    case 3:
                        json = _b.sent();
                        if (!json) {
                            loadingModel(true, c);
                            return [2 /*return*/, { context: c }];
                        }
                        return [2 /*return*/, {
                                data: json,
                                context: c
                            }];
                    case 4:
                        _a = _b.sent();
                        loadingModel(true, c);
                        return [2 /*return*/, { context: c }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    PageCtrl.fetchMainData = fetchMainData;
    function getImageUrl(item, kind) {
        var _a, _b;
        return kind === "source"
            ? "./".concat(((_a = item.data) === null || _a === void 0 ? void 0 : _a.kind) || "photos", "/").concat(item.year, "/").concat(item.id, ".webp")
            : "./".concat(((_b = item.data) === null || _b === void 0 ? void 0 : _b.kind) || "photos", "/thumbnails/").concat(item.year, "/").concat(item.id, ".webp");
    }
    PageCtrl.getImageUrl = getImageUrl;
})(PageCtrl || (PageCtrl = {}));
var PageCtrl;
(function (PageCtrl) {
    var videos = [{
            id: "jingdezhen",
            name: "景德镇陶瓷研学之旅",
            year: 2025,
            month: 7,
            thumb: "posters/thumbnails/20250706_145015.webp",
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
            thumb: "posters/thumbnails/2020/led.webp",
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