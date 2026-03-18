namespace PageCtrl {

    type IImageRatio = "p" | "page" | "v" | "vertical" | "h" | "horizontal" | "s" | "square" | "w" | "wide";

    export type ITitleCapKind = "small" | "normal" | null;

    export interface IPaintingSeriesInfo {
        id: string;
        alias?: string[] | null;
        disable?: boolean;
        name: string;
        "name-cap"?: ITitleCapKind;
        subtitle?: string;
        "subtitle-cap"?: ITitleCapKind;
        defaultItemName?: string;
        icon?: string;
        intro?: string;
        qr?: string;
        blog?: string;
        year: number;
        ratio?: IImageRatio;
        thumb?: boolean;
        links?: DeepX.MdBlogs.IArticleRelatedLinkItemInfo[];
        [property: string]: any;
    }

    interface IPaintingPaging {
        id?: string;
        size: number;
        root?: boolean;
        series?: IPaintingSeriesInfo;
    }

    export interface IPaintingInfo {
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
    }

    let works = {
        series: [] as IPaintingSeriesInfo[],
        default: [] as IPaintingInfo[],
        done: false
    };

    async function init(element?: HTMLElement | string, rela?: string) {
        if (works.done) return true;
        const c = element ? Hje.render(element, {
            children: [{
                tagName: "p",
                children: [{
                    tagName: "em",
                    children: DeepX.MdBlogs.getLocaleString("loading"),
                }],
            }],
        }) : undefined;
        try {
            const res = await fetch(`${rela || "../paintings/"}config.json`);
            const json = await res.json();
            if (!json) return false;
            works = json;
            works.done = true;
            return true;
        } catch {
            if (c) {
                c.model().children = [{
                    tagName: "span",
                    children: DeepX.MdBlogs.getLocaleString("loadFailed"),
                }];
                c.refresh();
            }
            return false;
        }
    }

    export async function renderPaintings(options: IPaintingPaging) {
        if (!options) return;
        const container = getContainerElement(options);
        if (options.root) await init(container, "./paintings/");
        else await init(container);
        setElementProp(getContainerElement(options, "title"), null, "paintings");
        let images = options.series?.id ? works[options.series.id as keyof typeof works] : undefined;
        if (!images || !(images instanceof Array)) images = works.default || [];
        const mkt = Hje.getQuery("mkt") || undefined;
        const mktOptions = mkt !== undefined ? { mkt } : undefined;
        const c = Hje.render(container, {
            control: ImageCollectionPart,
            data: {
                rela: options.root ? "./images/" : "../images/",
                items: [],
                defaultName: DeepX.MdBlogs.getLocaleString("pic"),
                mkt,
                page: options.size || 24,
                itemUrl: getImageUrl,
                click: onItemClick,
            } as IImageCollectionPartData,
        })?.control() as ImageCollectionPart;
        if (!c) return;
        c.pushWithoutRender(...images);
        const menu = getContainerElement(options, "menu");
        if (menu && works.series?.length) {
            const link = options.root ? "./paintings/" : "../paintings/";
            const children = works.series.map(ele => {
                if (!ele?.id || ele.disable) return null;
                const name = DeepX.MdBlogs.getLocaleProp(ele, "name", mktOptions);
                if (!name) return null;
                const label: Hje.DescriptionContract[] = [];
                let text = DeepX.MdBlogs.getLocaleProp(ele, "icon", mktOptions);
                if (text) label.push({
                    tagName: "img",
                    props: {
                        alt: name,
                        src: c.imageRelative(text),
                    }
                });
                label.push({
                    tagName: "span",
                    styleRefs: capStyleRef(ele, "name-cap", mktOptions),
                    children: name,
                });
                text = DeepX.MdBlogs.getLocaleProp(ele, "subtitle", mktOptions);
                if (text) label.push({
                    tagName: "span",
                    styleRefs: capStyleRef(ele, "subtitle-cap", mktOptions),
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
            Hje.render(menu, { children });
        }

        if (!c.nextPage()) return;
        const more = getContainerElement(options, "more");
        if (!more) return;
        more.style.display = "";
        more.addEventListener("click", function () {
            if (!c.nextPage()) more.style.display = "none";
        });
    }

    export async function initPaint() {
        initMenu("paintings");
        await init("main-container");
        const component = Hje.render("main-container", {
            control: ImageSeriesPart,
            data: {
                series: [{
                    id: "default",
                    name: getString("generalPaintings"),
                    qr: "logos/qr-paintings.png",
                    year: 2020,
                    thumb: true
                }, getString("series"), ...works.series],
                items: works as any,
                select: DeepX.MdBlogs.firstQuery() || undefined,
                blogRela: "../blog/",
                imageRela: "../images/",
                itemUrl: getImageUrl,
                click: onItemClick,
                selected(info, c) {
                    (ele("ph-link-icon") as HTMLLinkElement).href = c.imageRelative(info.icon || "./images/logos/logo-2026-paint.png") || "";
                },
                styles: {
                    header: ["x-zone-hl", "layout-wide-full", "x-bg-outstanding"],
                    next: ["x-zone-actions"],
                    share: ["x-part-panel", "x-bg-emphasis"],
                },
                strings: {
                    pics: getString("paintings"),
                    all: getString("picLibs"),
                    site: getString("worksBy").replace("{0}", "Muse").replace("{1}", getString("paintings")),
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
                        children: getString("loveDrawing"),
                    }, {
                        tagName: "span",
                        children: "❤",
                    }, {
                        tagName: "a",
                        props: {
                            href: "#",
                        },
                        on: {
                            click(ev: MouseEvent) {
                                ev.preventDefault();
                                if (component) component.scrollMenuIntoView();
                            }
                        },
                        children: getString("picLibs"),
                    }]
                }
            } as IImageSeriesPartData,
        })?.control() as ImageSeriesPart;
        window.addEventListener("popstate", function(ev) {
            if (!component || !ev?.state) return;
            component.selectSeries(ev.state);
        });
    }

    function getContainerElement(paging: IPaintingPaging, suffix?: string) {
        return ele(`${paging?.id || "section-works"}-${suffix || "container"}`)!;
    }

    function getImageUrl(item: IPaintingInfo, kind: Parameters<NonNullable<IImageCollectionPartOptions["itemUrl"]>>[1]) {
        return kind === "source"
            ? `./paintings/${item.year}/${item.id}.webp`
            : `./paintings/thumbnails/${item.year}/${item.id}.webp`;
    }

    function onItemClick(data: IImageClickInfo) {
        let imageSize = data.item.size || "";
        if (imageSize && imageSize.indexOf("x") > 0)
            imageSize = imageSize.replace("x", "cm × ") + "cm";
        if (data.item.year) {
            if (imageSize) imageSize += " 　|　 ";
            imageSize += monthYear(data.item.year, data.item.month);
        }

        const name = data.info.name;
        const desc = imageSize ? `"${name} (${imageSize})` : name;
        showPopupView({
            name: name,
            url: data.info.url,
            thumb: data.info.thumb,
            tips: desc,
            desc: imageSize
        });
    }

}
