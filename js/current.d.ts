declare namespace PageCtrl {
    interface IArticleRenderExtension {
        end: Hje.DescriptionContract[];
    }
    function loadBlogArticles(root?: boolean | number): Promise<DeepX.MdBlogs.Articles>;
    function renderBlog(element: string | HTMLElement, root?: boolean | number): Promise<void>;
    function initBlog(): void;
}
declare namespace PageCtrl {
    interface ICertInfo {
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
        scope?: "match" | "interest" | "pro" | "variety" | "institution" | "school";
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
    function initCerts(): Promise<void>;
}
declare namespace PageCtrl {
    export interface IAvatarInfo {
        title?: string;
        year: number;
        month: number;
        url?: string;
    }
    const menu: {
        id: string;
        name: string;
        "name#zh": string;
    }[];
    export function initMenu(id?: (typeof menu)[number]["id"] | boolean): void;
    export function hidePopupView(): void;
    export function closePopupView(): void;
    export function closePopupViewDelay(): void;
    export function showPopupView(info: {
        url: string;
        thumb?: string;
        name: string;
        tips?: string;
        desc: string;
        close?(ev?: MouseEvent): void;
    }): void;
    export function initHome(): void;
    export {};
}
declare namespace PageCtrl {
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
        };
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
        close?(ev: MouseEvent): void;
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
        click?(data: IImageClickInfo, ev?: MouseEvent): void;
        close?(ev?: MouseEvent): void;
    }
    export class ImageSeriesPart extends Hje.BaseComponent {
        private __inner;
        constructor(element: any, options?: Hje.ComponentOptionsContract<IImageSeriesPartData>);
        get series(): IImageSeriesInfo[];
        getSeries(id: string): IImageSeriesInfo | undefined;
        selectSeries(id: string | IImageSeriesInfo): IImageSeriesInfo | undefined;
        scrollContentIntoView(): false | undefined;
        scrollMenuIntoView(): false | undefined;
        imageRelative(url: string | undefined): string | undefined;
        closeImage(ev?: MouseEvent): void;
        registerHistoryPop(): void;
        private refreshRelated;
        private genSeriesMenu;
        private getSeriesLinkInfo;
    }
    export class ImageCollectionPart extends Hje.BaseComponent {
        private __inner;
        constructor(element: any, options?: Hje.ComponentOptionsContract<IImageCollectionPartData>);
        get length(): IImageItemInfo[];
        setDefaultName(value: string): void;
        getItem(index: number | string): IImageItemInfo | undefined;
        pushWithoutRender(...items: IImageItemInfo[]): number;
        push(...items: IImageItemInfo[]): number;
        clear(): void;
        nextPage(): boolean;
        indexOf(item: string | IImageItemInfo): number;
        imageRelative(url: string | undefined): string | undefined;
        openImage(item: IImageItemInfo | string, ev?: MouseEvent): undefined;
        closeImage(ev?: MouseEvent): void;
        private genItemModel;
    }
    export class RelatedInfoPart extends Hje.BaseComponent {
        constructor(element: any, options?: Hje.ComponentOptionsContract<IRelatedInfoPartData>);
        setData(links: DeepX.MdBlogs.IArticleRelatedLinkItemInfo[] | null | undefined, images: IImageItemInfo[] | null | undefined): number;
    }
    export function seriesList(col: IImageSeriesInfo[], imageRela: string | Hje.RelativePathInfo | ImageSeriesPart | ImageCollectionPart, link?: string, options?: {
        mkt?: string | boolean;
    }): {
        tagName: string;
        styleRefs: string;
        props: {
            href: string;
        };
        children: Hje.DescriptionContract[];
    }[] | null;
    export {};
}
declare namespace PageCtrl {
    const strings: {
        all: string;
        "all#zh": string;
        share: string;
        "share#zh": string;
        photoTaken: string;
        "photoTaken#zh": string;
        general: string;
        "general#zh": string;
        paintings: string;
        "paintings#zh": string;
        series: string;
        "series#zh": string;
        dateToMonth: string;
        "dateToMonth#zh": string;
        certHonors: string;
        "certHonors#zh": string;
        picLibs: string;
        "picLibs#zh": string;
        generalPaintings: string;
        "generalPaintings#zh": string;
        related: string;
        "related#zh": string;
        relatedBlog: string;
        "relatedBlog#zh": string;
        relatedPaintings: string;
        "relatedPaintings#zh": string;
        worksBy: string;
        "worksBy#zh": string;
        workMorOwMeow: string;
        "workMorOwMeow#en": string;
        "workMorOwMeow#fr": string;
        "workMorOwMeow#ko": string;
        workStarna: string;
        "workStarna#zh": string;
        seeSeriesWorks: string;
        "seeSeriesWorks#zh": string;
        loveDrawing: string;
        "loveDrawing#zh": string;
    };
    export function getString(key: keyof typeof strings, mktOptions?: {
        mkt?: string | boolean;
    }): string;
    export function setElementProp(element: string | HTMLElement, prop: string | null, key: keyof typeof strings): void;
    export function monthYear(year: number, month?: number | null): string;
    export {};
}
declare namespace PageCtrl {
    interface IPaintingPaging {
        id?: string;
        size: number;
        root?: boolean;
        series?: IImageSeriesInfo;
    }
    export function renderPaintings(options: IPaintingPaging): Promise<void>;
    export function initPaint(): Promise<void>;
    export function onImageItemClick(data: IImageClickInfo): void;
    export {};
}
declare namespace PageCtrl {
    function scrollToTop(top?: number): void;
    function checkBrowserKind(): string;
    function ele(id: string): HTMLElement | null;
    function rootRela(root?: boolean | number): string;
    function parseFirstQuery(id: string | null | undefined): {
        id?: string;
        year?: number;
        sub?: string;
    };
    function loadingModel(failed?: boolean, context?: Hje.ViewGeneratingContextContract<any>): {
        tagName: string;
        children: {
            tagName: string;
            children: any;
        }[];
    };
    function fetchMainData<T = any>(url: string, element?: HTMLElement | string): Promise<{
        data?: T;
        context?: Hje.ViewGeneratingContextContract<any>;
    }>;
    function getImageUrl(item: IImageItemInfo, kind: Parameters<NonNullable<IImageCollectionPartOptions["itemUrl"]>>[1]): string;
}
declare namespace PageCtrl {
    interface IElementBag {
        frame: Hje.ViewGeneratingContextContract<any>;
        name: Hje.ViewGeneratingContextContract<any>;
    }
    export interface IVideoInfo {
        id: string;
        disable?: boolean;
        name: string;
        guest?: "featuring" | string;
        year: number;
        month?: number;
        thumb?: string;
        links: Record<string, string>;
    }
    export function video(year: number, id: string): IVideoInfo | undefined;
    export function videosModel(kind: "home" | "videos" | "3" | IElementBag): void;
    export function initVideos(): void;
    export {};
}
