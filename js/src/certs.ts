namespace PageCtrl {

    export interface ICertInfo {
        id: string;
        disable?: boolean;
        name: string;
        /**
         * The level and kind of the honor.
         * - match: 大型赛事（区域型或以上）。
         * - interest: 兴趣班、小型活动、商业娱乐活动。
         * - pro: 行业专业赛事。
         * - variety: 综艺录制。
         * - institution: 培训机构、俱乐部。
         * - school: 学校。
         */
        scope?: "match" | "interest" | "pro" | "variety" | "institution" | "school",
        season?: string;
        year: number;
        month?: number;
        group?: string;
        ranking: string;
        publisher?: string;
        img?: string | false;
        keywords?: string[];
        links?: DeepX.MdBlogs.IArticleRelatedLinkItemInfo[];
        images?: IImageItemInfo[];
    }
    
    const inner: {
        certs?: ICertInfo[];
        related?: RelatedInfoPart;
    } = {};

    async function init() {
        const res = await fetch("./config.json");
        const json = await res.json();
        if (!json?.certs) return false;
        inner.certs = json.certs;
        return true;
    }

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
        if (!inner.related) return;
        const count = inner.related.setData(item.links, item.images);
        inner.related.element().style.display = count > 0 ? "" : "none";
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
        const certs = inner.certs;
        if (!certs) return undefined;
        let info;
        let year;
        if (arr.length > 1) arr.splice(0);
        let thisYear = new Date().getFullYear();
        const selInfo = parseFirstQuery(id);
        for (let i = 0; i < certs.length; i++) {
            let item = certs[i];
            if (!item || !item.name) continue;
            if (selInfo.id && selInfo.year && selInfo.id === item.id && selInfo.year === item.year) info = item;
            if (item.disable) continue;
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
            arr.push(m);
        }

        return info;
    }

    export async function initCerts() {
        const c = Hje.render("part-certs", {
            children: [loadingModel()]
        });
        if (!await init()) {
            loadingModel(true, c);
            return;
        }
        const certs = inner.certs;
        if (!c) return;
        const arr: Hje.DescriptionContract[] = [];
        const details = ele("part-cert")!;
        let id = DeepX.MdBlogs.firstQuery();
        inner.related = Hje.render("part-related", {
            control: RelatedInfoPart,
            data: {
                title: getString("related"),
                imageRela: "../images/",
                defaultImageName: DeepX.MdBlogs.getLocaleString("pic"),
                click: onImageItemClick,
                itemUrl: getImageUrl,
            } as IRelatedInfoPartData,
        })?.control() as RelatedInfoPart;
        const info = certsModel(arr, id, details);
        if (id && info) showCert(info, details);
        c.model().children = arr;
        c.refresh();
        let checkbox = ele("checkbox-certs") as HTMLInputElement;
        if (checkbox) checkbox.addEventListener("change", function (ev) {
            certsModel(arr, id, details, checkbox.checked);
            c.refresh();
        });

        window.addEventListener("popstate", function (ev) {
            id = (ev.state || {}).id;
            const selInfo = parseFirstQuery(id);
            if (!selInfo.id) {
                details.style.display = "none";
                const relatedElement = inner.related?.element();
                if (relatedElement) relatedElement.style.display = "none";
                return;
            }

            if (!certs) return;
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