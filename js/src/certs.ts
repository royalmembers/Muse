namespace PageCtrl {

    export interface ICertInfo {
        id: string;
        disable?: boolean;
        name: string;
        scope?: "match" | "interest" | "pro" | "variety" | "institution" | "school",
        season?: string;
        year: number;
        month?: number;
        group?: string;
        ranking: string;
        publisher?: string;
        img?: string | false;
        keywords?: string[]
    }
    
    const certs: ICertInfo[] = [{
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

    function showCert(item: ICertInfo, details: string | HTMLElement) {
        let arr : Hje.DescriptionContract[] = [{
            tagName: "div",
            styleRefs: "x-part-cert-name",
            children: []
        }];
        if (item.season) (arr[0].children as Hje.DescriptionContract[]).push({ tagName: "span", styleRefs: "x-part-cert-season", children: item.season });
        (arr[0].children as Hje.DescriptionContract[]).push({ tagName: "span", styleRefs: "x-part-cert-name", children: item.name });
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
        Hje.render(details, {
            children: [{ tagName: "section", children: arr }],
            props: { style: { display: "" } }
        });
    }

    function addCertEvent(item: ICertInfo, model: Hje.DescriptionContract, details: string | HTMLElement) {
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

    function certsModel(arr: Hje.DescriptionContract[], id: string | null, details: string | HTMLElement, onlyMatch?: boolean) {
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

    export function initCerts() {
        let arr: Hje.DescriptionContract[] = [];
        let details = document.getElementById("part-cert")!;
        let id = DeepX.MdBlogs.firstQuery();
        let info = certsModel(arr, id, details);
        if (id && info) showCert(info, details);
        let c = Hje.render("part-certs", { children: arr })!;
        let checkbox = document.getElementById("checkbox-certs") as HTMLInputElement;
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
        initMenu("certs");
    }

}