namespace PageCtrl {

    type IImageUrlKind = 'thumb' | 'source';

    export interface IImageClickInfo {
        item: IPaintingInfo;
        component: ImageCollectionPart;
        info: {
            name: string;
            url: string;
            thumb: string;
        };
    }

    export interface IImageCollectionPartOptions {
        itemUrl?(item: IPaintingInfo, kind: IImageUrlKind): string | undefined;
        click?(data: IImageClickInfo, ev: MouseEvent): void;
        mkt?: string | boolean;
        page?: number;
    }

    export interface IImageSeriesPartData extends IImageCollectionPartOptions {
        series: (IPaintingSeriesInfo | string | DeepX.MdBlogs.IArticleLabelInfo)[];
        items: Record<string, IPaintingInfo[]>;
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
    }

    export interface IImageCollectionPartData extends IImageCollectionPartOptions {
        rela?: string | Hje.RelativePathInfo;
        items: IPaintingInfo[];
        defaultName?: string;
    }

    export class ImageSeriesPart extends Hje.BaseComponent {
        private __inner: {
            series: (IPaintingSeriesInfo | string | DeepX.MdBlogs.IArticleLabelInfo)[];
            items: Record<string, IPaintingInfo[]>;
            blogRela: Hje.RelativePathInfo;
            imageRela: Hje.RelativePathInfo;
            mkt?: { mkt: string | boolean };
            mainStyle: string[];
            select?: IPaintingSeriesInfo;
            urls: IImageSeriesPartData["urls"];
            defaultName?: string;
            siteName?: string;
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
            const mainStyle = mergeArray(["x-container-pics"], styles.main);
            this.__inner = {
                series: seriesCol,
                items: data.items || {},
                blogRela,
                mkt: mktOptions,
                imageRela,
                mainStyle,
                urls: data.urls,
                defaultName: strings.pics,
                siteName: strings.site,
            };
            const self = this;
            let select = data.select;
            if (select === true || select === undefined) select = this.series[0]?.id;
            else if (!select || typeof select !== "string") select = undefined;
            this.currentModel.children = [data.before, genHeader([{
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
            }, sharePanel(data.urls, null, imageRela, styles.share, mktOptions), data.after, genHeader([{
                tagName: "span",
                children: getString("picLibs", mktOptions),
            }], styles.header, "h1", undefined, "menu"), {
                key: "all",
                tagName: "section",
                children: select ? [] : this.genSeriesMenu(select),
            }].filter(ele => !!ele);
            this.refreshChild(undefined, () => {
                setTimeout(() => {
                    if (!select || self.__inner.select) return;
                    const sel = self.selectSeries(select);
                    if (!sel) return;
                    const { url, kind } = self.getSeriesLinkInfo(sel);
                    if (kind !== "route" || !url) return false;
                    history.replaceState(sel, "", url);
                    if (self.__inner.siteName)
                        document.title = `${DeepX.MdBlogs.getLocaleProp(sel, "name", mktOptions)} - ${self.__inner.siteName}`;
                }, 100);
            });
        }

        get series() {
            const col = this.__inner.series;
            const arr: IPaintingSeriesInfo[] = [];
            for (let i = 0; i < col.length; i++) {
                const series = col[i];
                if (!series || typeof series === "string" || series.disable) continue;
                arr.push(series as IPaintingSeriesInfo);
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

        selectSeries(id: string | IPaintingSeriesInfo) {
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
            this.__inner.select = id;
            gallery.clear();
            gallery.styleRefs(mergeArray(this.__inner.mainStyle, ratioClassName(id.ratio)));
            gallery.pushWithoutRender(...items);
            const hasNextPage = gallery.nextPage();
            this.childModel("actions", {
                style: { display: hasNextPage ? "" : "none" },
            });
            const rela = this.__inner.imageRela;
            const mkt = this.__inner.mkt;
            const title: Hje.DescriptionContract[] = [];
            let text = DeepX.MdBlogs.getLocaleProp(id, "icon", mkt);
            if (text) title.push({
                tagName: "img",
                props: {
                    src: rela.relative(text),
                    alt: DeepX.MdBlogs.getLocaleProp(id, "name", mkt),
                },
            });
            if (id.hideName && this.__inner.defaultName) {
                title.push(span(this.__inner.defaultName));
            } else {
                title.push(span(DeepX.MdBlogs.getLocaleProp(id, "name", mkt)));
                text = DeepX.MdBlogs.getLocaleProp(id, "subtitle", mkt);
                if (text) title.push(span(text));
            }
            this.childModel("title", { children: title });
            const share = sharePanel({
                qr: id.qr || this.__inner.urls?.qr,
                share: this.__inner.urls?.share
            }, DeepX.MdBlogs.getLocaleProp(id, "intro", mkt), rela, undefined, mkt)?.children;
            this.childModel("share", {
                style: { display: share ? "" : "none" },
                children: share || []
            });
            this.refreshRelated();
            this.childModel("all", { children: this.genSeriesMenu(id.id) });
            return id;
        }

        scrollContentIntoView() {
            const element = this.childContext("title-container")?.element() as HTMLElement | undefined;
            if (!element) return false;
            element.scrollIntoView({ behavior: "smooth" });
        }

        scrollAllMenuIntoView() {
            const element = this.childContext("menu")?.element() as HTMLElement | undefined;
            if (!element) return false;
            element.scrollIntoView({ behavior: "smooth" });
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
                const year = ele.dateObj?.year;
                if (year) subtitle.push(year.toString(10));
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
            return inner.series.map(ele => {
                if (!ele) return null;
                if (typeof ele === "string") return span(ele, "grouping-header");
                const name = DeepX.MdBlogs.getLocaleProp(ele, "name", inner.mkt);
                if (!name) return null;
                if (ele.disable === "label" || ele.disable === "header") return span(name, "grouping-header");
                if (ele.disable || !ele.id) return null;
                const labels: Hje.DescriptionContract[] = [];
                if (ele.icon) labels.push({
                    tagName: "img",
                    props: {
                        alt: name,
                        src: inner.imageRela.relative(ele.icon),
                    }
                });
                let cap = DeepX.MdBlogs.getLocaleProp(ele, "name-cap", inner.mkt) as ITitleCapKind;
                labels.push(span(name, cap === "small" ? "x-text-cap-small" : undefined));
                const desc = DeepX.MdBlogs.getLocaleProp(ele, "subtitle", inner.mkt);
                cap = DeepX.MdBlogs.getLocaleProp(ele, "subtitle-cap", inner.mkt) as ITitleCapKind;
                if (desc) labels.push(span([span(desc)], cap === "small" ? "x-text-cap-small" : undefined));
                const styleRefs = ["link-long-button"];
                if (selected === ele.id) styleRefs.push("state-sel");
                const { url: seriesLink, kind } = self.getSeriesLinkInfo(ele);
                const enableRoute = kind === "route";
                return {
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
                };
            }).filter(ele => !!ele);
        }

        private getSeriesLinkInfo(value: IPaintingSeriesInfo): {
            url: string | undefined;
            kind: "route" | "link" | "func",
        } {
            let seriesLink = this.__inner.urls?.series;
            if (seriesLink) {
                if (seriesLink === "?" || seriesLink === ".") seriesLink = "./";
                else if (seriesLink.endsWith("?")) seriesLink = seriesLink.substring(0, seriesLink.length - 1);
                else if (seriesLink === "#") seriesLink = undefined;
            }
            const enableRoute = seriesLink === "./";
            if (seriesLink) {
                if (seriesLink.endsWith("=")) seriesLink += value.id;
                else if (enableRoute && value.hideName && value === this.__inner.series[0]) seriesLink = "./";
                else seriesLink += "?" + value.id;
            }
            return {
                url: seriesLink,
                kind: enableRoute ? "route" : (seriesLink ? "link" : "func"),
            };
        }
    }

    export class ImageCollectionPart extends Hje.BaseComponent {
        private __inner: {
            items: IPaintingInfo[];
            rela: Hje.RelativePathInfo;
            itemUrl(item: IPaintingInfo, kind: IImageUrlKind): string | undefined;
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

        getItem(index: number) {
            return index < 0 ? undefined : this.__inner.items[index];
        }

        pushWithoutRender(...items: IPaintingInfo[]) {
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

        push(...items: IPaintingInfo[]) {
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
            for (let i = first; i < this.__inner.items.length; i++) {
                const item = col[i];
                if (item.disable) continue;
                if (j >= pageSize) {
                    this.__inner.nextIndex = first + j;
                    return true;
                }

                const element = this.genItemModel(item);
                if (!element) continue;
                j++;
                this.appendChild(null as any as string, element);
            }

            this.__inner.nextIndex = first + j;
            return false;
        }

        indexOf(item: string | IPaintingInfo) {
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

        private genItemModel(item: IPaintingInfo) {
            if (!item) return undefined;
            const inner = this.__inner;
            const self = this;
            const name = DeepX.MdBlogs.getLocaleProp(item, "name", inner.mkt) || this.__inner.defaultName;
            let url = inner.itemUrl(item, "source");
            if (!url) return undefined;
            url = inner.rela.relative(url).value;
            let thumb = item.thumb && typeof item.thumb === "string" ? item.thumb : undefined;
            if (!thumb && item.thumb !== false) thumb = inner.itemUrl(item, "thumb");
            if (thumb) thumb = inner.rela.relative(thumb).value;
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

    function genLinkList(title: string, list: {
        name: string;
        subtitle?: string | null | (string | number | null | undefined)[];
        url: string | { type: string; value: string; };
        newWindow?: boolean;
    }[] | DeepX.MdBlogs.IArticleRelatedLinkItemInfo[] | undefined) {
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
        const container = genHeader(title);
        container.children.push({
            tagName: "ul",
            styleRefs: "link-tile-compact",
            children: elements,
        });
        return container;
    }

    function sharePanel(
        urls: { share?: string; qr?: string } | undefined,
        intro: string | undefined | null,
        rela: Hje.RelativePathInfo,
        styleRefs?: string | string[],
        mktOptions?: { mkt?: string | boolean }): Hje.DescriptionContract | null {
        if (!urls) urls = {};
        if (!urls.qr) {
            const introElement = multipleLines(intro); 
            return introElement ? {
                tagName: "section",
                styleRefs: mergeArray(["x-part-blog-note"], styleRefs),
                children: [introElement],
            } : null;
        }

        const header = urls?.share ? [{
            tagName: "img",
            props: {
                alt: getString("share", mktOptions),
                src: rela.relative(urls.share).value,
            }
        }, span(getString("share", mktOptions))] : [span(getString("share", mktOptions))];
        const container = genHeader(header, mergeArray(["x-part-blog-share"], styleRefs), "h2");
        (container as Hje.DescriptionContract).key = "share";
        const col = container.children;
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
        const introElement = multipleLines(intro, "x-part-blog-note"); 
        if (introElement) col.push(introElement);
        return container;
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

    function span(text: string | Hje.DescriptionContract[], styleRefs?: string | string[]): Hje.DescriptionContract {
        return {
            tagName: "span",
            styleRefs,
            children: text,
        };
    }

    function multipleLines(text: string | (string | number)[] | null | undefined, styleRefs?: string | string[], tagName?: string) {
        if (!text) return null;
        if (typeof text === "string") return {
            tagName: tagName || "div",
            styleRefs,
            children: [span(text)]
        };
        if (!(text instanceof Array) || !text.length) return null;
        const children = text.map(ele => {
            if (typeof ele === "number") return span(ele.toString(10));
            if (!ele || typeof ele !== "string") return null;
            return span(ele);
        }).filter(ele => !!ele);
        return children.length ? {
            tagName: tagName || "div",
            styleRefs,
            children,
        } : null;
    }

    async function getArticles(series: IPaintingSeriesInfo) {
        const keyword = series?.blog;
        if (!keyword) return undefined;
        const articles = await loadBlogArticles();
        if (!articles) return undefined;
        return articles.blog()?.filter(ele => ele && ele.hasKeyword(keyword));
    }

}
