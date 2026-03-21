namespace PageCtrl {

    interface IPaintingPaging {
        id?: string;
        size: number;
        root?: boolean;
        series?: IImageSeriesInfo;
    }

    let works = {
        series: [] as IImageSeriesInfo[],
        default: [] as IImageItemInfo[],
        done: false
    };

    async function init(element?: HTMLElement | string, rela?: string) {
        if (works.done) return true;
        const { data } = await fetchMainData(`${rela || "../paintings/"}config.json`, element);
        if (!data) return false;
        works = data;
        works.done = true;
        return true;
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
                itemUrl: getPaintingImageUrl,
                click: onImageItemClick,
            } as IImageCollectionPartData,
        })?.control() as ImageCollectionPart;
        if (!c) return;
        c.pushWithoutRender(...images);
        const menu = getContainerElement(options, "menu");
        if (menu && works.series?.length) {
            Hje.render(menu, {
                children: seriesList(works.series, c, options.root ? "./paintings/" : "../paintings/", mktOptions) || [],
            });
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
                itemUrl: getPaintingImageUrl,
                click: onImageItemClick,
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
                        children: "♥️",
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

    export function onImageItemClick(data: IImageClickInfo) {
        let imageSize = data.item.size || "";
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

    function getPaintingImageUrl(item: IImageItemInfo, kind: Parameters<NonNullable<IImageCollectionPartOptions["itemUrl"]>>[1]) {
        return kind === "source"
            ? `./paintings/${item.year}/${item.id}.webp`
            : `./paintings/thumbnails/${item.year}/${item.id}.webp`;
    }

    function getContainerElement(paging: IPaintingPaging, suffix?: string) {
        return ele(`${paging?.id || "section-works"}-${suffix || "container"}`)!;
    }

}
