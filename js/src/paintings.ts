namespace PageCtrl {

    interface IPaintingPaging {
        id?: string;
        size: number;
        root?: boolean | number;
        gallery?: DeepX.MdBlogs.IImageGalleryInfo;
    }

    let works = {
        gallery: undefined as any as DeepX.MdBlogs.IImageGalleryInfo[],
        blog: [] as DeepX.MdBlogs.ArticleInfo[],
    };

    async function init(element?: HTMLElement | string, root?: boolean | number) {
        if (works.gallery) return true;
        if (element) DeepX.MdBlogs.setElementProp(element, null, DeepX.MdBlogs.getLocaleString("loading"));
        try {
            const blogPromise = loadBlogArticles(root);
            const articles = await blogPromise;
            if (articles) {
                works.gallery = articles.gallery() || [];
                works.blog = articles.blog() || [];
            }
        } catch (ex) {
            if (element) DeepX.MdBlogs.setElementProp(element, null, DeepX.MdBlogs.getLocaleString("loadFailed"));
        }
        return true;
    }

    export async function renderPaintings(options: IPaintingPaging) {
        if (!options) return;
        const container = getContainerElement(options);
        if (options.root) await init(container, options.root);
        else await init(container);
        DeepX.MdBlogs.setElementText(getContainerElement(options, "title"), "paintings");
        const id = options.gallery?.id || "default";
        let items = DeepX.MdBlogs.getGallery(works.gallery, id)?.items;
        let rela = new Hje.RelativePathInfo(`${rootRela(options.root)}paintings/`);
        if (!items || typeof items === "string") {
            if (!items) {
                items = `${rootRela(options.root)}paintings/config.json`;
            } else {
                items = rela.relative(items).toString();
            }
            const resp = await fetch(items);
            const json: DeepX.MdBlogs.IImageItemsData = await resp.json();
            items = json.items instanceof Array ? json.items : json.items[id];
            if (!items || !(items instanceof Array)) items = [];
            if (json.options?.imageRela) rela = rela.relative(json.options.imageRela);
        }
        const mkt = Hje.getQuery("mkt") || Hje.getQuery("lang") || undefined;
        const mktOptions = mkt !== undefined ? { mkt } : undefined;
        const c = Hje.render(container, {
            component: DeepX.MdBlogs.ImageCollectionPart,
            data: {
                rela,
                items: [],
                defaultName: options.gallery?.options?.defaultItemName || DeepX.MdBlogs.getLocaleString("pic"),
                mkt,
                page: options.size || 24,
                itemUrl: getPaintingImageUrl,
                click: onImageItemClick,
            } as DeepX.MdBlogs.IImageCollectionPartData,
        }) as DeepX.MdBlogs.ImageCollectionPart;
        if (!c) return;
        c.pushWithoutRender(...items);
        const menu = getContainerElement(options, "menu");
        if (menu && works.gallery?.length) {
            Hje.render(menu, {
                children: DeepX.MdBlogs.galleryList(works.gallery, c, options.root ? "./paintings/" : "../paintings/", mktOptions) || [],
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
        const mkt = Hje.getQuery("mkt") || Hje.getQuery("lang") || true;
        const component = Hje.render("main-container", {
            component: DeepX.MdBlogs.ImageGalleryPart,
            data: {
                gallery: [{
                    id: "default",
                    name: getString("generalPaintings"),
                    options: {
                        qr: "../images/logos/qr-paintings.png",
                    },
                    year: 2020,
                    thumb: true,
                    items: "./config.json",
                }, getString("series"), ...works.gallery],
                select: DeepX.MdBlogs.firstQuery() || undefined,
                blog: works.blog,
                blogRela: "../blog/",
                url: "./",
                itemUrl: getPaintingImageUrl,
                after: {
                    key: "share",
                    tagName: "section",
                    className: ["x-part-blog-share", "x-part-panel", "x-bg-emphasis"],
                    style: { display: "none" },
                },
                click: clickData => {
                    const imageSize = getImageSizeDesc(clickData)
                    const name = clickData.info.name;
                    const desc = imageSize ? `"${name} (${imageSize})` : name;
                    showPopupView({
                        name: name,
                        url: clickData.info.url,
                        thumb: clickData.info.thumb,
                        tips: desc,
                        desc: imageSize,
                        close(ev) {
                            component.closeImage(ev);
                        }
                    });
                },
                close: hidePopupView,
                selected(info, c) {
                    (ele("ph-link-icon") as HTMLLinkElement).href = info.icon || "../images/logos/logo-2026-paint.png";
                    const mktOptions = mkt ? { mkt } : undefined;
                    const info2 = c.getGalleryLinkInfo(info);
                    const share = sharePanel({
                        qr: DeepX.MdBlogs.getLocaleProp(info.options, "qr", mktOptions) || "../images/logos/qr-paintings.png",
                        share: "../images/icons/share-w.png",
                        page: info2.url,
                    }, DeepX.MdBlogs.getLocaleProp(info, "intro", mktOptions), undefined, info2.title, mktOptions);
                    if (!c.after) return;
                    c.after.style({ display: share.length ? "" : "none" });
                    (c.after as Hje.ElementComponent).setChildren(share);
                },
                styles: {
                    header: ["x-zone-hl", "layout-wide-full", "x-bg-outstanding"],
                    next: ["x-zone-actions"],
                    share: ["x-part-panel", "x-bg-emphasis"],
                },
                strings: {
                    pics: DeepX.MdBlogs.getLocaleString("paintings"),
                    all: DeepX.MdBlogs.getLocaleString("picLibs"),
                    site: getString("worksBy").replace("{0}", "Muse").replace("{1}", DeepX.MdBlogs.getLocaleString("paintings")),
                },
                mkt,
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
                        children: DeepX.MdBlogs.getLocaleString("picLibs"),
                    }]
                }
            } as DeepX.MdBlogs.IImageGalleryPartData,
        }) as DeepX.MdBlogs.ImageGalleryPart;
        component.registerHistoryPop();
    }

    export function onImageItemClick(data: DeepX.MdBlogs.IImageClickInfo) {
        const imageSize = getImageSizeDesc(data)
        const name = data.info.name;
        const desc = imageSize ? `"${name} (${imageSize})` : name;
        showPopupView({
            name: name,
            url: data.info.url,
            thumb: data.info.thumb,
            tips: desc,
            desc: imageSize,
        });
    }

    function getImageSizeDesc(data: DeepX.MdBlogs.IImageClickInfo) {
        let imageSize = data.item.size || "";
        if (!data.item.year) return imageSize;
        if (imageSize) imageSize += " 　|　 ";
        imageSize += monthYear(data.item.year, data.item.month);
        return imageSize;
    }

    function getPaintingImageUrl(item: DeepX.MdBlogs.IImageItemInfo, options: DeepX.MdBlogs.IImageUrlResolveOptions) {
        return options.kind === "source"
            ? `../images/paintings/${item.year}/${item.id}.webp`
            : `../images/paintings/thumbnails/${item.year}/${item.id}.webp`;
    }

    function getContainerElement(paging: IPaintingPaging, suffix?: string) {
        return ele(`${paging?.id || "section-works"}-${suffix || "container"}`)!;
    }

    function sharePanel(
        urls: {
            share?: string;
            qr?: string;
            page?: string;
        } | undefined,
        intro: string | undefined | null,
        rela: Hje.RelativePathInfo | undefined,
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
                src: rela ? rela.relative(urls.share) : urls.share,
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
                    src: rela ? rela.relative(urls.qr) : urls.qr,
                },
            }]
        });
        if (introElement) arr.push(introElement);
        return arr;
    }

    function hasShareApi() {
        try {
            if (typeof navigator !== "object") return false;
            return typeof navigator.share === "function";
        } catch {
            return false;
        }
    }

    function multipleLines(text: string | (string | number)[] | null | undefined, className?: string | string[], tagName?: string) {
        if (!text) return null;
        if (typeof text === "string") return {
            tagName: tagName || "div",
            className,
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
            className,
            children,
        } : null;
    }

    function span(text: string | Hje.DescriptionContract[], className?: string | string[], tagName?: string): Hje.DescriptionContract {
        return {
            tagName: tagName || "span",
            className,
            children: text,
        };
    }

}
