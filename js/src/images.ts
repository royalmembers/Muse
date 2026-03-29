namespace PageCtrl {

    type IImageUrlKind = 'thumb' | 'source';
    type IImageRatio = "p" | "page" | "v" | "vertical" | "h" | "horizontal" | "s" | "square" | "w" | "wide";

    export type ITitleCaseKind = "upper" | "lower" | "capital" | "small" | "normal" | "none" | null;

    export interface IImageSeriesInfo {
        id: string;
        alias?: string[] | null;
        disable?: boolean;
        name: string;
        subtitle?: string;
        options: {
            nameCase?: ITitleCaseKind;
            subtitleCase?: ITitleCaseKind;
            qr?: string;
            defaultItemName?: string | boolean;
            ratio?: IImageRatio;
            thumb?: boolean;
        },
        icon?: string;
        intro?: string;
        blog?: string;
        year: number;
        links?: DeepX.MdBlogs.IArticleRelatedLinkItemInfo[];
        data?: Record<string, any>;
        [property: string]: any;
    }

    export interface IImageItemInfo {
        id: string;
        disable?: boolean;
        name?: string;
        year: number;
        month?: number;
        day?: number;
        url?: string;
        thumb?: boolean | string;
        keywords?: string[];
        size?: string;
        data?: any;
    }

    export interface IImageClickInfo {
        item: IImageItemInfo;
        component: ImageCollectionPart;
        info: {
            name: string;
            url: string;
            thumb?: string;
        };
    }

    export interface IImageCollectionPartOptions {
        itemUrl?(item: IImageItemInfo, kind: IImageUrlKind): string | undefined;
        click?(data: IImageClickInfo, ev: MouseEvent): void;
        mkt?: string | boolean;
        page?: number;
    }

    export interface IImageSeriesPartData extends IImageCollectionPartOptions {
        series: (IImageSeriesInfo | string | DeepX.MdBlogs.IArticleLabelInfo)[];
        items: Record<string, IImageItemInfo[]>;
        select?: string | boolean;
        blogRela?: string | Hje.RelativePathInfo;
        imageRela?: string | Hje.RelativePathInfo;
        styles?: {
            header?: string | string[];
            main?: string | string[];
            next?: string | string[];
            related?: string | string[];
            share?: string | string[];
        };
        strings?: {
            all?: string;
            pics?: string;
            site?: string;
        };
        urls?: {
            share?: string;
            qr?: string;
            series?: string;
        };
        before?: Hje.DescriptionContract;
        after?: Hje.DescriptionContract;
        selected?(info: IImageSeriesInfo, component: ImageSeriesPart): void;
    }

    export interface IImageCollectionPartData extends IImageCollectionPartOptions {
        rela?: string | Hje.RelativePathInfo;
        items: IImageItemInfo[];
        defaultName?: string;
    }

    export interface IRelatedInfoPartData {
        title?: string;
        links?: DeepX.MdBlogs.IArticleRelatedLinkItemInfo[];
        images?: IImageItemInfo[];
        imageRela?: string | Hje.RelativePathInfo;
        defaultImageName?: string;
        mkt?: string | boolean;
        itemUrl?(item: IImageItemInfo, kind: IImageUrlKind): string | undefined;
        click?(data: IImageClickInfo, ev: MouseEvent): void;
    }

    export class ImageSeriesPart extends Hje.BaseComponent {
        private __inner: {
            series: (IImageSeriesInfo | string | DeepX.MdBlogs.IArticleLabelInfo)[];
            items: Record<string, IImageItemInfo[]>;
            blogRela: Hje.RelativePathInfo;
            imageRela: Hje.RelativePathInfo;
            mkt?: { mkt: string | boolean };
            mainStyle: string[];
            select?: IImageSeriesInfo;
            urls: IImageSeriesPartData["urls"];
            siteName?: string;
            defaultItemName?: string;
            selected?: (info: IImageSeriesInfo, component: ImageSeriesPart) => void;
        };

        constructor(element: any, options?: Hje.ComponentOptionsContract<IImageSeriesPartData>) {
            super(element, options);
            const data = options?.data || {
                series: [],
                items: {},
            };
            const seriesCol = data.series || [];
            const mktOptions = data.mkt !== undefined ? { mkt: data.mkt } : undefined;
            const blogRela = toRela(data.blogRela || "../blog/");
            const imageRela = toRela(data.imageRela || "../images/");
            const styles = data.styles || {};
            const strings = data.strings || {};
            const urls = data.urls || {};
            const mainStyle = mergeArray(["x-container-pics"], styles.main);
            this.__inner = {
                series: seriesCol,
                items: data.items || {},
                blogRela,
                mkt: mktOptions,
                imageRela,
                mainStyle,
                urls: urls,
                siteName: strings.site,
                defaultItemName: strings.pics,
                selected: data.selected,
            };
            const self = this;
            let select = data.select;
            if (select === true || select === undefined) select = this.series[0]?.id;
            else if (!select || typeof select !== "string") select = undefined;
            this.currentModel.children = [{
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
                        click: data.click,
                        mkt: data.mkt,
                        defaultName: strings.pics,
                        page: data.page,
                    } as IImageCollectionPartData,
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
                                click() {
                                    const gallery = self.childControl("gallery") as ImageCollectionPart;
                                    if (!gallery) return;
                                    const hasNextPage = gallery.nextPage();
                                    if (hasNextPage) return;
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
                }, data.after,
            ].filter(ele => !!ele)}, {
                tagName: "nav",
                children: [genHeader([{
                    tagName: "span",
                    children: getString("picLibs", mktOptions),
                }], styles.header, "h1", undefined, "menu"), {
                    key: "all",
                    tagName: "section",
                    children: select ? [] : this.genSeriesMenu(select),
                }].filter(ele => !!ele)
            }];
            this.currentModel.onLoad = () => {
                delete this.currentModel.onLoad;
                if (!select || self.__inner.select) return;
                const sel = self.selectSeries(select);
                if (!sel) return;
                const { url, kind, title } = self.getSeriesLinkInfo(sel);
                if (kind !== "route" || !url) return false;
                history.replaceState(sel, "", url);
                if (self.__inner.siteName)
                    document.title = title;
            };
            this.refreshChild();
        }

        get series() {
            const col = this.__inner.series;
            const arr: IImageSeriesInfo[] = [];
            for (let i = 0; i < col.length; i++) {
                const series = col[i];
                if (!series || typeof series === "string" || series.disable) continue;
                arr.push(series as IImageSeriesInfo);
            }

            return arr;
        }

        getSeries(id: string) {
            if (!id) return undefined;
            id = id.replace("=", "").replace(" ", "");
            const series = this.series;
            for (let i in series) {
                const item = series[i];
                if (item?.id !== id || item.disable) continue;
                return item;
            }

            for (let i in series) {
                const item = series[i];
                if (!item?.alias || item.disable || !(item.alias instanceof Array)) continue;
                if (item.alias.indexOf(id) > -1) return item;
            }

            return undefined;
        }

        selectSeries(id: string | IImageSeriesInfo) {
            if (!id) return undefined;
            if (typeof id === "string") {
                const sel = this.getSeries(id);
                if (!sel) return undefined;
                id = sel;
            }

            if (!id.id) return undefined;
            const items = this.__inner.items[id.id];
            const gallery = this.childControl("gallery") as ImageCollectionPart;
            if (!gallery) return id;
            const mkt = this.__inner.mkt;
            this.__inner.select = id;
            gallery.clear();
            gallery.styleRefs(mergeArray(this.__inner.mainStyle, ratioClassName(id.options?.ratio)));
            gallery.setDefaultName(DeepX.MdBlogs.getLocaleProp(id.options, "defaultItemName", mkt) || this.__inner.defaultItemName);
            gallery.pushWithoutRender(...items);
            const hasNextPage = gallery.nextPage();
            this.childModel("actions", {
                style: { display: hasNextPage ? "" : "none" },
            });
            const rela = this.__inner.imageRela;
            const title: Hje.DescriptionContract[] = [];
            let text = DeepX.MdBlogs.getLocaleProp(id, "icon", mkt);
            if (text) title.push({
                tagName: "img",
                props: {
                    src: relativePath(rela, text),
                    alt: DeepX.MdBlogs.getLocaleProp(id, "name", mkt),
                },
            });
            title.push(span(DeepX.MdBlogs.getLocaleProp(id, "name", mkt)));
            text = DeepX.MdBlogs.getLocaleProp(id, "subtitle", mkt);
            if (text) title.push(span(text));
            this.childModel("title", { children: title });
            const info = this.getSeriesLinkInfo(id);
            const share = sharePanel({
                qr: DeepX.MdBlogs.getLocaleProp(id.options, "qr", mkt) || this.__inner.urls?.qr,
                share: this.__inner.urls?.share,
                page: info.url,
            }, DeepX.MdBlogs.getLocaleProp(id, "intro", mkt), rela, info.title, mkt);
            this.childModel("share", {
                style: { display: share.length ? "" : "none" },
                children: share,
            });
            this.refreshRelated();
            this.childModel("all", { children: this.genSeriesMenu(id.id) });
            const h = this.__inner.selected;
            if (typeof h === "function") h(id, this);
            return id;
        }

        scrollContentIntoView() {
            const element = this.childContext("title-container")?.element() as HTMLElement | undefined;
            if (!element) return false;
            element.scrollIntoView({ behavior: "smooth" });
        }

        scrollMenuIntoView() {
            const element = this.childContext("menu")?.element() as HTMLElement | undefined;
            if (!element) return false;
            element.scrollIntoView({ behavior: "smooth" });
        }

        imageRelative(url: string | undefined) {
            return relativePath(this.__inner.imageRela, url);
        }

        private async refreshRelated() {
            const series = this.__inner.select;
            if (!series) return;
            const articlesPromise = getArticles(series);
            const elements: Hje.DescriptionContract[] = [];
            let links = genLinkList(DeepX.MdBlogs.getLocaleString("relatedLinks", this.__inner.mkt?.mkt), series.links);
            if (links?.children?.length === 2) elements.push(links.children[0], links.children[1]);
            this.childModel("related", {
                style: { display: elements.length ? "" : "none" },
                children: elements,
            });
            const articles = await articlesPromise;
            if (this.__inner.select !== series || !articles?.length) return;
            const mkt = this.__inner.mkt;
            const rela = this.__inner.blogRela;
            links = genLinkList(getString("relatedBlog", mkt), articles.map(ele => {
                const subtitle: string[] = [];
                let text = ele.getSubtitle(mkt);
                if (text) subtitle.push(text);
                const date = ele.dateString;
                if (date) subtitle.push(date);
                return {
                    name: ele.getName(mkt),
                    subtitle: subtitle.length ? subtitle : undefined,
                    url: `${rela.value}?${ele.getRoutePath(mkt)}`,
                };
            }));
            if (links?.children?.length !== 2) return;
            this.childModel("related", {
                style: { display: "" },
                children: [links.children[0], links.children[1], ...elements],
            });
        }

        private genSeriesMenu(selected?: string) {
            const self = this;
            const inner = self.__inner;
            const arr: Hje.DescriptionContract[] = [];
            let label: string | undefined;
            inner.series.forEach(ele => {
                if (!ele) return;
                if (typeof ele === "string") {
                    label = ele;
                    return;
                }
                const name = DeepX.MdBlogs.getLocaleProp(ele, "name", inner.mkt);
                if (!name) return null;
                if (ele.disable === "label" || ele.disable === "header") {
                    label = name;
                    return;
                }
                if (ele.disable || !ele.id) return;
                if (label) {
                    arr.push(span(label, "grouping-header"));
                    label = undefined;
                }
                const labels: Hje.DescriptionContract[] = [];
                if (ele.icon) labels.push({
                    tagName: "img",
                    props: {
                        alt: name,
                        src: relativePath(inner.imageRela, ele.icon),
                    }
                });
                labels.push(span(name, caseStyleRef(ele.options, "nameCase", inner.mkt)));
                const desc = DeepX.MdBlogs.getLocaleProp(ele, "subtitle", inner.mkt);
                if (desc) labels.push(span([span(desc)], caseStyleRef(ele.options, "subtitleCase", inner.mkt)));
                const styleRefs = ["link-long-button"];
                if (selected === ele.id) styleRefs.push("state-sel");
                const { url: seriesLink, kind } = self.getSeriesLinkInfo(ele);
                const enableRoute = kind === "route";
                arr.push({
                    tagName: "a",
                    styleRefs,
                    props: {
                        href: seriesLink || "#",
                    },
                    children: labels,
                    data: ele,
                    on: {
                        click(ev: MouseEvent) {
                            if (seriesLink && !enableRoute) return;
                            ev.preventDefault();
                            const old = inner.select;
                            self.selectSeries(ele);
                            if (!enableRoute) {
                                self.scrollContentIntoView();
                                return;
                            }
                            if (ele !== old) {
                                history.pushState(ele, "", seriesLink);
                                if (inner.siteName) document.title = `${name} - ${inner.siteName}`;
                            }
                            scrollToTop();
                        }
                    },
                });
            });
            return arr;
        }

        private getSeriesLinkInfo(value: IImageSeriesInfo): {
            title: string;
            url: string | undefined;
            kind: "route" | "link" | "func",
        } {
            const inner = this.__inner;
            let seriesLink = inner.urls?.series;
            if (seriesLink) {
                if (seriesLink === "?" || seriesLink === ".") seriesLink = "./";
                else if (seriesLink.endsWith("?")) seriesLink = seriesLink.substring(0, seriesLink.length - 1);
                else if (seriesLink === "#") seriesLink = undefined;
            }
            const enableRoute = seriesLink === "./";
            if (seriesLink) {
                if (seriesLink.endsWith("="))
                    seriesLink += value.id;
                else if (enableRoute && (value.id === "default" || value.id === "index") && value === inner.series[0])
                    seriesLink = "./";
                else
                    seriesLink += "?" + value.id;
            }
            return {
                title: `${DeepX.MdBlogs.getLocaleProp(value, "name", inner.mkt)} - ${inner.siteName}`,
                url: seriesLink,
                kind: enableRoute ? "route" : (seriesLink ? "link" : "func"),
            };
        }
    }

    export class ImageCollectionPart extends Hje.BaseComponent {
        private __inner: {
            items: IImageItemInfo[];
            rela: Hje.RelativePathInfo;
            itemUrl(item: IImageItemInfo, kind: IImageUrlKind): string | undefined;
            click?(data: IImageClickInfo, ev: MouseEvent): void;
            mkt?: { mkt: string | boolean };
            defaultName?: string;
            pageSize?: number;
            nextIndex: number;
        };
        constructor(element: any, options?: Hje.ComponentOptionsContract<IImageCollectionPartData>) {
            super(element, options);
            const data = options?.data || {
                items: []
            };
            const elements: Hje.DescriptionContract[] = [];
            const self = this;
            const pageSize = data.page && data.page > 0 ? data.page : undefined;
            this.__inner = {
                items: [],
                rela: toRela(data.rela),
                itemUrl: data.itemUrl || (() => {
                    return undefined
                }),
                click: data.click,
                mkt: data.mkt !== undefined ? { mkt: data.mkt } : undefined,
                defaultName: data.defaultName,
                pageSize: pageSize,
                nextIndex: 0,
            };
            const pageSize2 = pageSize || Number.MAX_SAFE_INTEGER;
            if (options?.data?.items) {
                let j = 0;
                for (let i = 0; i < options.data.items.length; i++) {
                    const item = options.data.items[i];
                    const element = self.genItemModel(item);
                    if (!element) continue;
                    self.__inner.items.push(item);
                    if (item.disable) continue;
                    if (j >= pageSize2) continue;
                    j++;
                    elements.push(element);
                }

                this.__inner.nextIndex = j;
            }

            this.currentModel.children = elements;
            this.refreshChild();
        }

        get length() {
            return this.__inner.items;
        }

        setDefaultName(value: string) {
            this.__inner.defaultName = value;
        }

        getItem(index: number) {
            return index < 0 ? undefined : this.__inner.items[index];
        }

        pushWithoutRender(...items: IImageItemInfo[]) {
            let j = 0;
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const element = this.genItemModel(item);
                if (!element) continue;
                if (this.__inner.items.indexOf(item) >= 0) continue;
                this.__inner.items.push(item);
                j++;
            }

            return j;
        }

        push(...items: IImageItemInfo[]) {
            const pageSize = this.__inner.pageSize || Number.MAX_SAFE_INTEGER;
            let j = 0;
            let k = 0;
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const element = this.genItemModel(item);
                if (!element) continue;
                if (this.__inner.items.indexOf(item) >= 0) continue;
                this.__inner.items.push(item);
                j++;
                if (item.disable || k >= pageSize) continue;
                this.appendChild(null as any as string, element);
                k++;
            }

            return j;
        }

        clear() {
            this.__inner.items = [];
            this.__inner.nextIndex = 0;
            this.currentModel.children = [];
            this.refreshChild();
        }

        nextPage() {
            let pageSize = this.__inner.pageSize;
            let first = this.__inner.nextIndex;
            if (first < 0) first = 0;
            if (!pageSize || pageSize <= 0) {
                pageSize = Number.MAX_SAFE_INTEGER;
            } else {
                const more = first % pageSize;
                if (more === 0) {
                } else if (more === 1 && pageSize > 3) {
                    pageSize--;
                } else {
                    pageSize = pageSize - more + pageSize;
                }
            }
            const col = this.__inner.items;
            let j = 0;
            let i = first;
            for (; i < this.__inner.items.length; i++) {
                const item = col[i];
                if (item.disable) continue;
                if (j >= pageSize) {
                    this.__inner.nextIndex = i;
                    return true;
                }

                const element = this.genItemModel(item);
                if (!element) continue;
                j++;
                this.appendChild(null as any as string, element);
            }

            this.__inner.nextIndex = i;
            return false;
        }

        indexOf(item: string | IImageItemInfo) {
            const col = this.__inner.items;
            if (!item) return -1;
            if (typeof item !== "string") {
                return col.indexOf(item);
            } else {
                for (let i = 0; i < col.length; i++) {
                    if (item === col[i]?.id) return i;
                }
            }

            return -1;
        }

        imageRelative(url: string | undefined) {
            return relativePath(this.__inner.rela, url);
        }

        private genItemModel(item: IImageItemInfo) {
            if (!item) return undefined;
            const inner = this.__inner;
            const self = this;
            const name = DeepX.MdBlogs.getLocaleProp(item, "name", inner.mkt) || this.__inner.defaultName;
            let url = inner.itemUrl(item, "source");
            if (!url) return undefined;
            url = relativePath(inner.rela, url) || url;
            let thumb = item.thumb && typeof item.thumb === "string" ? item.thumb : undefined;
            if (!thumb && item.thumb !== false) thumb = inner.itemUrl(item, "thumb");
            if (thumb) thumb = relativePath(inner.rela, thumb);
            else thumb = url;
            return {
                tagName: "img",
                props: {
                    loading: "lazy",
                    src: thumb,
                    title: item.year && typeof item.year === "number" && item.year > 2000 ? `${name}\n${item.year.toString(10)}` : name,
                    alt: name,
                },
                style: item.disable ? { display: "none" } : null,
                on: {
                    click(ev) {
                        if (typeof inner.click !== "function") return;
                        inner.click({
                            item,
                            component: self,
                            info: {
                                name,
                                url,
                                thumb,
                            }
                        }, ev);
                    }
                },
                data: item,
            } as Hje.DescriptionContract;
        }
    }

    export class RelatedInfoPart extends Hje.BaseComponent {
        constructor(element: any, options?: Hje.ComponentOptionsContract<IRelatedInfoPartData>) {
            super(element, options);
            const data = options?.data || {};
            this.currentModel.children = [data.title ? genHeader(data.title) : null, {
                tagName: "section",
                key: "gallery",
                control: ImageCollectionPart,
                data: {
                    rela: data.imageRela,
                    mkt: data.mkt,
                    defaultName: data.defaultImageName,
                    click: data.click,
                    itemUrl: data.itemUrl,
                } as IImageCollectionPartData,
                styleRefs: ["x-container-pics"],
                style: { display: "none" },
            }, {
                tagName: "section",
                key: "links",
                style: { display: "none" },
            }].filter(ele => !!ele);
            this.currentModel.onLoad = () => {
                delete this.currentModel.onLoad;
                if (!data.links && !data.images) return;
                this.setData(data.links, data.images);
            };
            this.refreshChild();
        }

        setData(links: DeepX.MdBlogs.IArticleRelatedLinkItemInfo[] | null | undefined, images: IImageItemInfo[] | null | undefined) {
            const menu = genLinkListChildren(links);
            let count = menu?.length || 0;
            this.childModel("links", {
                children: menu || [],
                style: { display: menu ? "" : "none" },
            });
            const gallery = this.childControl("gallery") as ImageCollectionPart;
            if (!gallery) return count;
            gallery.clear();
            const styleInfo = { display: "none" };
            if (images && images instanceof Array) {
                const count2 = gallery.push(...images);
                if (count2 > 0) styleInfo.display = "";
                count += count2;
            }
            gallery.style(styleInfo);
            return count;
        }
    }

    export function seriesList(col: IImageSeriesInfo[], imageRela: string | Hje.RelativePathInfo | ImageSeriesPart | ImageCollectionPart, link?: string, options?: {
        mkt?: string | boolean;
    }) {
        if (!link) link = "./";
        if (!col) return null;
        let imageUrl: (value: string | undefined) => string | undefined;
        if (!imageRela) imageUrl = value => value;
        else if (typeof imageRela === "string") imageUrl = value => relativePath(toRela(imageRela), value);
        else if (imageRela instanceof Hje.RelativePathInfo) imageUrl = value => relativePath(imageRela, value);
        else if (imageRela instanceof ImageCollectionPart) imageUrl = value => imageRela.imageRelative(value);
        else if (imageRela instanceof ImageSeriesPart) imageUrl = value => imageRela.imageRelative(value);
        else imageUrl = value => value;
        return col.map(ele => {
            if (!ele?.id || ele.disable) return null;
            const name = DeepX.MdBlogs.getLocaleProp(ele, "name", options);
            if (!name) return null;
            const label: Hje.DescriptionContract[] = [];
            let text = imageUrl(DeepX.MdBlogs.getLocaleProp(ele, "icon", options));
            if (text) label.push({
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
            if (text) label.push({
                tagName: "span",
                styleRefs: caseStyleRef(ele.options, "subtitleCase", options),
                children: text,
            });
            return {
                tagName: "a",
                styleRefs: "link-long-button",
                props: {
                    href: `${link}?${ele.id}`
                },
                children: label,
            };
        }).filter(ele => !!ele);
    }

    function caseStyleRef(ele: any, key: string, options?: { mkt?: string | boolean }) {
        if (!ele) return undefined;
        const cap = DeepX.MdBlogs.getLocaleProp(ele, key || "nameCase", options) as ITitleCaseKind;
        if (!cap) return undefined;
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

    function toRela(rela: string | Hje.RelativePathInfo | null | undefined) {
        return (rela && rela instanceof Hje.RelativePathInfo)
            ? rela
            : new Hje.RelativePathInfo(rela || "./");
    }

    function mergeArray(original: string[], options?: string | string[] | null) {
        if (!options) return original;
        if (!original) {
            if (!options) return [];
            if (typeof options === "string") return [options];
            return options;
        }
        if (typeof options === "string") return [...original, options];
        return [...original, ...options];
    }

    function ratioClassName(ratio: string | null | undefined) {
        if (!ratio) return null;
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

    function genLinkList(title: string | null, list: ({
        name: string;
        subtitle?: string | null | (string | number | null | undefined)[];
        url: string | { type: string; value: string; };
        newWindow?: boolean;
    } | DeepX.MdBlogs.IArticleRelatedLinkItemInfo | null | undefined)[] | null | undefined) {
        const elements = genLinkListChildren(list);
        if (!elements?.length) return null;
        const container = title ? genHeader(title) : { children: [] as Hje.DescriptionContract[] };
        container.children.push({
            tagName: "ul",
            styleRefs: "link-tile-compact",
            children: elements,
        });
        return container;
    }

    function genLinkListChildren(list: ({
        name: string;
        subtitle?: string | null | (string | number | null | undefined)[];
        url: string | { type: string; value: string; };
        newWindow?: boolean;
    } | DeepX.MdBlogs.IArticleRelatedLinkItemInfo | null | undefined)[] | null | undefined) {
        if (!list?.length || !(list instanceof Array)) return null;
        const elements = list.map(ele => {
            if (!ele?.name || !ele.url || typeof ele.url !== "string") return null;
            const children: Hje.DescriptionContract[] = [span(ele.name)];
            if (ele.subtitle) {
                if (typeof ele.subtitle === "string") {
                    children.push(span(ele.subtitle));
                } else if (ele.subtitle instanceof Array) {
                    for (let i = 0; i < ele.subtitle.length; i++) {
                        const subtitle = ele.subtitle[i];
                        if (!subtitle) continue;
                        if (typeof subtitle === "number") children.push(span(subtitle.toString(10)));
                        else if (typeof subtitle === "string") children.push(span(subtitle));
                    }
                }
            }
            const props = {
                href: ele.url,
                title: children.map(ele => ele.children).join("\n"),
            };
            if (ele.newWindow) (props as any).target = "_blank";
            return {
                tagName: "li",
                children: [{
                    tagName: "a",
                    props,
                    children,
                }],
            } as Hje.DescriptionContract;
        }).filter(ele => !!ele);
        if (!elements.length) return null;
        return elements;
    }

    function sharePanel(
        urls: {
            share?: string;
            qr?: string;
            page?: string;
        } | undefined,
        intro: string | undefined | null,
        rela: Hje.RelativePathInfo,
        title: string,
        mktOptions?: { mkt?: string | boolean }) {
        if (!urls) urls = {};
        const arr: Hje.DescriptionContract[] = [];
        const introElement = multipleLines(intro, "x-part-blog-note");
        if (!urls.qr) {
            if (introElement) arr.push(introElement);
            return arr;
        }

        const header: Hje.DescriptionContract[] = urls?.share ? [{
            tagName: "img",
            props: {
                alt: getString("share", mktOptions),
                src: relativePath(rela, urls.share),
            }
        }] : [];
        header.push(urls.page && title && hasShareApi()
            ? {
                tagName: "a",
                children: getString("share", mktOptions),
                on: {
                    click() {
                        navigator.share({
                            title: title,
                            url: urls.page
                        });
                    },
                },
            }
            : span(getString("share", mktOptions)));
        arr.push({
            tagName: "h2",
            children: header,
        })
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
        if (introElement) arr.push(introElement);
        return arr;
    }

    function genHeader(
        children: Hje.DescriptionContract[] | string,
        styleRefs?: string | string[],
        tagName?: string,
        key?: string,
        containerKey?: string) {
        return {
            tagName: "section",
            key: containerKey,
            styleRefs,
            children: [{
                tagName: tagName || "h2",
                key,
                children,
            } as Hje.DescriptionContract],
        };
    }

    function span(text: string | Hje.DescriptionContract[], styleRefs?: string | string[], tagName?: string): Hje.DescriptionContract {
        return {
            tagName: tagName || "span",
            styleRefs,
            children: text,
        };
    }

    function multipleLines(text: string | (string | number)[] | null | undefined, styleRefs?: string | string[], tagName?: string) {
        if (!text) return null;
        if (typeof text === "string") return {
            tagName: tagName || "div",
            styleRefs,
            children: [span(text, undefined, "p")]
        };
        if (!(text instanceof Array) || !text.length) return null;
        const children = text.map(ele => {
            if (typeof ele === "number") return span(ele.toString(10), undefined, "p");
            if (!ele || typeof ele !== "string") return null;
            return span(ele, undefined, "p");
        }).filter(ele => !!ele);
        return children.length ? {
            tagName: tagName || "div",
            styleRefs,
            children,
        } : null;
    }

    function relativePath(rela: Hje.RelativePathInfo, url: string | undefined) {
        if (!url || typeof url !== "string") return undefined;
        if (url.indexOf("://") >= 0) return url;
        return rela.relative(url)?.value || url;
    }

    async function getArticles(series: IImageSeriesInfo) {
        const keyword = series?.blog;
        if (!keyword) return undefined;
        const articles = await loadBlogArticles();
        if (!articles) return undefined;
        return articles.blog()?.filter(ele => ele && ele.hasKeyword(keyword));
    }

    function hasShareApi() {
        try {
            if (typeof navigator !== "object") return false;
            return typeof navigator.share === "function";
        } catch {
            return false;
        }
    }

}
