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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
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
                    children: "注：猫头鱼尾兽图标、MuseTuan.com、摸凹喵（Mor-Ow Meow）及其形象，是 Muse Tuan 和 Kingcean Tuan 的商标，摸凹喵画作及其衍生品均受知识产权保护，版权所有；Kingcean、Jinchen Art、金辰艺术、CompositeJs、金山旭日翼盾、红日黑山徽标，是 Kingcean Tuan、南昌金辰软件有限公司或江西金辰装饰设计工程有限公司的商标或注册商标；其它商标分别归属其所拥有的组织。",
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
    var certs = [{
            id: "tomusic-0201",
            name: "听闻音乐琴韵风采奖",
            disable: true,
            scope: "institution",
            season: "第8届",
            year: 2026,
            month: 2,
            ranking: "琴韵风采奖",
            publisher: "听闻音乐工作室",
            keywords: ["instrumental performance", "match"]
        }, {
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
            disable: true,
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
        var details = PageCtrl.ele("part-cert");
        var id = DeepX.MdBlogs.firstQuery();
        var info = certsModel(arr, id, details);
        if (id && info)
            showCert(info, details);
        var c = Hje.render("part-certs", { children: arr });
        var checkbox = PageCtrl.ele("checkbox-certs");
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
        url += item.year > 2025 ? ".webp" : ".jpg";
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
            cover.addEventListener("click", hidePopupView);
            cover.addEventListener("touchend", hidePopupViewDelay);
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
        PageCtrl.ele("popup-view").style.display = "none";
    }
    PageCtrl.hidePopupView = hidePopupView;
    function hidePopupViewDelay() {
        setTimeout(function () {
            hidePopupView();
        }, 200);
    }
    PageCtrl.hidePopupViewDelay = hidePopupViewDelay;
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
        PageCtrl.renderPaintings(true, {
            offset: 0,
            size: 12,
            path: "paintings",
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
        PageCtrl.setElementProp("title-works-common", null, "generalPaintings");
        DeepX.MdBlogs.setElementProp("button-works-more", null, DeepX.MdBlogs.getLocaleString("seeMore"));
        initMenu(true);
    }
    PageCtrl.initHome = initHome;
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
        generalPaintings: "General",
        "generalPaintings#zh": "常规",
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
        return PageCtrl.ele("".concat((paging === null || paging === void 0 ? void 0 : paging.id) || "section-works", "-").concat(suffix || "container"));
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
    function seriesInPaging(paging) {
        return paging.series || {};
    }
    function renderPaintings(images, paging) {
        return __awaiter(this, void 0, void 0, function () {
            var series, container, subtitle;
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
                        DeepX.MdBlogs.setElementProp(getContainerElement(paging, "title"), null, DeepX.MdBlogs.getLocaleProp(series, "name") || paging.defaultName || PageCtrl.getString("paintings"));
                        subtitle = getContainerElement(paging, "subtitle");
                        if (subtitle) {
                            if (series.subtitle)
                                DeepX.MdBlogs.setElementProp(subtitle, null, series.subtitle);
                            subtitle.className = series["subtitle-cap"] === "small" ? "x-text-cap-small" : "";
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
        var imagesPath = PageCtrl.rootRela(paging.root) + "images/";
        if (thumbUrl.indexOf("~/") == 0)
            thumbUrl = thumbUrl.replace("~/", imagesPath + paging.path + "/");
        if (sourceUrl.indexOf("~/") == 0)
            sourceUrl = sourceUrl.replace("~/", imagesPath + paging.path + "/");
        imageEle.src = thumbUrl;
        var imageName = DeepX.MdBlogs.getLocaleProp(imageInfo, "name") || DeepX.MdBlogs.getLocaleProp(series, "name") || paging.defaultName || "";
        var imageSize = imageInfo.size || "";
        if (imageSize && imageSize.indexOf("x") > 0)
            imageSize = imageSize.replace("x", "cm × ") + "cm";
        if (imageInfo.year) {
            if (imageSize)
                imageSize += " 　|　 ";
            imageSize += PageCtrl.monthYear(imageInfo.year, imageInfo.month);
        }
        var imageName2 = imageSize ? "\"".concat(imageName, " (").concat(imageSize, ")") : imageName;
        imageEle.alt = imageEle.title = imageName;
        containerEle.appendChild(imageEle);
        imageEle.addEventListener("click", function (ev) {
            PageCtrl.ele("popup-view-img").src = sourceUrl;
            PageCtrl.ele("popup-view-img").alt = imageName2;
            PageCtrl.ele("popup-view-thumb").src = thumbUrl;
            PageCtrl.ele("popup-view-thumb").alt = imageName2;
            PageCtrl.ele("popup-view-title").innerText = imageName;
            PageCtrl.ele("popup-view-desc").innerText = imageSize;
            PageCtrl.ele("popup-view").style.display = "";
        });
    }
    PageCtrl.renderImage = renderImage;
    function initPaint() {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1, component;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        PageCtrl.initMenu("paintings");
                        Hje.render("main-container", {
                            children: DeepX.MdBlogs.getLocaleString("loading")
                        });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, init()];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _b.sent();
                        DeepX.MdBlogs.setElementText("section-works-container", "loadFailed");
                        return [3 /*break*/, 4];
                    case 4:
                        component = (_a = Hje.render("main-container", {
                            control: PageCtrl.ImageSeriesPart,
                            data: {
                                series: __spreadArray([{
                                        id: "common",
                                        name: "常规",
                                        "name#en": "Common",
                                        qr: "logos/qr-paintings.png",
                                        hideName: true,
                                        year: 2020,
                                        thumb: true
                                    }, PageCtrl.getString("series")], works.series, true),
                                items: works,
                                select: DeepX.MdBlogs.firstQuery(),
                                blogRela: "../blog/",
                                imageRela: "../images/",
                                itemUrl: function (item, kind) {
                                    return kind === "source"
                                        ? "./paintings/".concat(item.year, "/").concat(item.id, ".webp")
                                        : "./paintings/thumbnails/".concat(item.year, "/").concat(item.id, ".webp");
                                },
                                click: function (data) {
                                    var imageSize = data.item.size || "";
                                    if (imageSize && imageSize.indexOf("x") > 0)
                                        imageSize = imageSize.replace("x", "cm × ") + "cm";
                                    if (data.item.year) {
                                        if (imageSize)
                                            imageSize += " 　|　 ";
                                        imageSize += PageCtrl.monthYear(data.item.year, data.item.month);
                                    }
                                    var name = data.info.name;
                                    var desc = imageSize ? "\"".concat(name, " (").concat(imageSize, ")") : name;
                                    PageCtrl.ele("popup-view-img").src = data.info.url;
                                    PageCtrl.ele("popup-view-img").alt = desc;
                                    PageCtrl.ele("popup-view-thumb").src = data.info.thumb;
                                    PageCtrl.ele("popup-view-thumb").alt = desc;
                                    PageCtrl.ele("popup-view-title").innerText = name;
                                    PageCtrl.ele("popup-view-desc").innerText = imageSize;
                                    PageCtrl.ele("popup-view").style.display = "";
                                },
                                styles: {
                                    header: ["x-zone-hl", "layout-wide-full", "x-bg-outstanding"],
                                    next: ["x-zone-actions"],
                                    share: ["x-part-panel", "x-bg-emphasis"],
                                },
                                strings: {
                                    pics: PageCtrl.getString("paintings"),
                                    all: PageCtrl.getString("picLibs"),
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
                                            children: PageCtrl.getString("loveDrawing"),
                                        }, {
                                            tagName: "span",
                                            children: "❤",
                                        }, {
                                            tagName: "a",
                                            props: {
                                                href: "#",
                                            },
                                            on: {
                                                click: function (ev) {
                                                    ev.preventDefault();
                                                    if (component)
                                                        component.scrollAllMenuIntoView();
                                                }
                                            },
                                            children: DeepX.MdBlogs.getLocaleString("seeMore"),
                                        }]
                                }
                            },
                        })) === null || _a === void 0 ? void 0 : _a.control();
                        window.addEventListener("popstate", function (ev) {
                            if (!component || !(ev === null || ev === void 0 ? void 0 : ev.state))
                                return;
                            component.selectSeries(ev.state);
                        });
                        return [2 /*return*/];
                }
            });
        });
    }
    PageCtrl.initPaint = initPaint;
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
            var mainStyle = mergeArray(["x-container-pics"], styles.main);
            _this.__inner = {
                series: seriesCol,
                items: data.items || {},
                blogRela: blogRela,
                mkt: mktOptions,
                imageRela: imageRela,
                mainStyle: mainStyle,
                urls: data.urls,
                defaultName: strings.pics,
            };
            var self = _this;
            var select = data.select;
            if (select === true || select === undefined)
                select = (_a = _this.series[0]) === null || _a === void 0 ? void 0 : _a.id;
            else if (!select || typeof select !== "string")
                select = undefined;
            _this.currentModel.children = [data.before, genHeader([{
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
                        click: data.click,
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
                }, sharePanel(data.urls, null, imageRela, styles.share, mktOptions), data.after, genHeader([{
                        tagName: "span",
                        children: PageCtrl.getString("picLibs", mktOptions),
                    }], styles.header, "h1", undefined, "menu"), {
                    key: "all",
                    tagName: "section",
                    children: select ? [] : _this.genSeriesMenu(select),
                }].filter(function (ele) { return !!ele; });
            _this.refreshChild(undefined, function () {
                setTimeout(function () {
                    if (!select)
                        return;
                    var sel = _this.selectSeries(select);
                    if (!sel)
                        return;
                    var _a = _this.getSeriesLinkInfo(sel), url = _a.url, kind = _a.kind;
                    if (kind !== "route" || !url)
                        return false;
                    history.replaceState(sel, "", url);
                }, 100);
            });
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
            this.__inner.select = id;
            gallery.clear();
            gallery.styleRefs(mergeArray(this.__inner.mainStyle, ratioClassName(id.ratio)));
            gallery.pushWithoutRender.apply(gallery, items);
            var hasNextPage = gallery.nextPage();
            this.childModel("actions", {
                style: { display: hasNextPage ? "" : "none" },
            });
            var rela = this.__inner.imageRela;
            var mkt = this.__inner.mkt;
            var title = [];
            var text = DeepX.MdBlogs.getLocaleProp(id, "icon", mkt);
            if (text)
                title.push({
                    tagName: "img",
                    props: {
                        src: rela.relative(text),
                        alt: DeepX.MdBlogs.getLocaleProp(id, "name", mkt),
                    },
                });
            if (id.hideName && this.__inner.defaultName) {
                title.push(span(this.__inner.defaultName));
            }
            else {
                title.push(span(DeepX.MdBlogs.getLocaleProp(id, "name", mkt)));
                text = DeepX.MdBlogs.getLocaleProp(id, "subtitle", mkt);
                if (text)
                    title.push(span(text));
            }
            this.childModel("title", { children: title });
            var share = (_c = sharePanel({
                qr: id.qr || ((_a = this.__inner.urls) === null || _a === void 0 ? void 0 : _a.qr),
                share: (_b = this.__inner.urls) === null || _b === void 0 ? void 0 : _b.share
            }, DeepX.MdBlogs.getLocaleProp(id, "intro", mkt), rela, undefined, mkt)) === null || _c === void 0 ? void 0 : _c.children;
            this.childModel("share", {
                style: { display: share ? "" : "none" },
                children: share || []
            });
            this.refreshRelated();
            this.childModel("all", { children: this.genSeriesMenu(id.id) });
            return id;
        };
        ImageSeriesPart.prototype.scrollContentIntoView = function () {
            var _a;
            var element = (_a = this.childContext("title-container")) === null || _a === void 0 ? void 0 : _a.element();
            if (!element)
                return false;
            element.scrollIntoView({ behavior: "smooth" });
        };
        ImageSeriesPart.prototype.scrollAllMenuIntoView = function () {
            var _a;
            var element = (_a = this.childContext("menu")) === null || _a === void 0 ? void 0 : _a.element();
            if (!element)
                return false;
            element.scrollIntoView({ behavior: "smooth" });
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
                                var _a;
                                var subtitle = [];
                                var text = ele.getSubtitle(mkt);
                                if (text)
                                    subtitle.push(text);
                                var year = (_a = ele.dateObj) === null || _a === void 0 ? void 0 : _a.year;
                                if (year)
                                    subtitle.push(year.toString(10));
                                return {
                                    name: ele.getName(mkt),
                                    subtitle: subtitle.length ? subtitle : undefined,
                                    url: rela.relative("../blog/".concat(ele.getRoutePath(mkt))).value,
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
            return inner.series.map(function (ele) {
                if (!ele)
                    return null;
                if (typeof ele === "string")
                    return span(ele, "grouping-header");
                var name = DeepX.MdBlogs.getLocaleProp(ele, "name", inner.mkt);
                if (!name)
                    return null;
                if (ele.disable === "label" || ele.disable === "header")
                    return span(name, "grouping-header");
                if (ele.disable || !ele.id)
                    return null;
                var labels = [];
                if (ele.icon)
                    labels.push({
                        tagName: "img",
                        props: {
                            alt: name,
                            src: inner.imageRela.relative(ele.icon),
                        }
                    });
                var cap = DeepX.MdBlogs.getLocaleProp(ele, "name-cap", inner.mkt);
                labels.push(span(name, cap === "small" ? "x-text-cap-small" : undefined));
                var desc = DeepX.MdBlogs.getLocaleProp(ele, "subtitle", inner.mkt);
                cap = DeepX.MdBlogs.getLocaleProp(ele, "subtitle-cap", inner.mkt);
                if (desc)
                    labels.push(span([span(desc)], cap === "small" ? "x-text-cap-small" : undefined));
                var styleRefs = ["link-long-button"];
                if (selected === ele.id)
                    styleRefs.push("state-sel");
                var _a = self.getSeriesLinkInfo(ele), seriesLink = _a.url, kind = _a.kind;
                var enableRoute = kind === "route";
                return {
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
                            if (ele !== old)
                                history.pushState(ele, "", seriesLink);
                            PageCtrl.scrollToTop();
                        }
                    },
                };
            }).filter(function (ele) { return !!ele; });
        };
        ImageSeriesPart.prototype.getSeriesLinkInfo = function (value) {
            var _a;
            var seriesLink = (_a = this.__inner.urls) === null || _a === void 0 ? void 0 : _a.series;
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
                else if (enableRoute && value.hideName && value === this.__inner.series[0])
                    seriesLink = "./";
                else
                    seriesLink += "?" + value.id;
            }
            return {
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
                mkt: data.mkt !== undefined ? { mkt: data.mkt } : undefined,
                defaultName: data.defaultName,
                pageSize: pageSize,
                nextIndex: 0,
            };
            var pageSize2 = pageSize || Number.MAX_SAFE_INTEGER;
            if ((_a = options === null || options === void 0 ? void 0 : options.data) === null || _a === void 0 ? void 0 : _a.items) {
                var j = 0;
                for (var i = 0; i < options.data.items.length; i++) {
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
                _this.__inner.nextIndex = j;
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
        ImageCollectionPart.prototype.getItem = function (index) {
            return index < 0 ? undefined : this.__inner.items[index];
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
            this.currentModel.children = [];
            this.refreshChild();
        };
        ImageCollectionPart.prototype.nextPage = function () {
            var pageSize = this.__inner.pageSize;
            var first = this.__inner.nextIndex;
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
            for (var i = first; i < this.__inner.items.length; i++) {
                var item = col[i];
                if (item.disable)
                    continue;
                if (j >= pageSize) {
                    this.__inner.nextIndex = first + j;
                    return true;
                }
                var element = this.genItemModel(item);
                if (!element)
                    continue;
                j++;
                this.appendChild(null, element);
            }
            this.__inner.nextIndex = first + j;
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
        ImageCollectionPart.prototype.genItemModel = function (item) {
            if (!item)
                return undefined;
            var inner = this.__inner;
            var self = this;
            var name = DeepX.MdBlogs.getLocaleProp(item, "name", inner.mkt) || this.__inner.defaultName;
            var url = inner.itemUrl(item, "source");
            if (!url)
                return undefined;
            url = inner.rela.relative(url).value;
            var thumb = item.thumb && typeof item.thumb === "string" ? item.thumb : undefined;
            if (!thumb && item.thumb !== false)
                thumb = inner.itemUrl(item, "thumb");
            if (thumb)
                thumb = inner.rela.relative(thumb).value;
            else
                thumb = url;
            return {
                tagName: "img",
                props: {
                    loading: "lazy",
                    src: thumb,
                    title: name,
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
        var container = genHeader(title);
        container.children.push({
            tagName: "ul",
            styleRefs: "link-tile-compact",
            children: elements,
        });
        return container;
    }
    function sharePanel(urls, intro, rela, styleRefs, mktOptions) {
        if (!urls)
            urls = {};
        if (!urls.qr) {
            var introElement_1 = multipleLines(intro);
            return introElement_1 ? {
                tagName: "section",
                styleRefs: mergeArray(["x-part-blog-note"], styleRefs),
                children: [introElement_1],
            } : null;
        }
        var header = (urls === null || urls === void 0 ? void 0 : urls.share) ? [{
                tagName: "img",
                props: {
                    alt: PageCtrl.getString("share", mktOptions),
                    src: rela.relative(urls.share).value,
                }
            }, span(PageCtrl.getString("share", mktOptions))] : [span(PageCtrl.getString("share", mktOptions))];
        var container = genHeader(header, mergeArray(["x-part-blog-share"], styleRefs), "h2");
        container.key = "share";
        var col = container.children;
        col.push({
            tagName: "div",
            children: [{
                    tagName: "img",
                    props: {
                        alt: "QR code",
                        src: rela.relative(urls.qr),
                    },
                }]
        });
        var introElement = multipleLines(intro, "x-part-blog-note");
        if (introElement)
            col.push(introElement);
        return container;
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
    function span(text, styleRefs) {
        return {
            tagName: "span",
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
                children: [span(text)]
            };
        if (!(text instanceof Array) || !text.length)
            return null;
        var children = text.map(function (ele) {
            if (typeof ele === "number")
                return span(ele.toString(10));
            if (!ele || typeof ele !== "string")
                return null;
            return span(ele);
        }).filter(function (ele) { return !!ele; });
        return children.length ? {
            tagName: tagName || "div",
            styleRefs: styleRefs,
            children: children,
        } : null;
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