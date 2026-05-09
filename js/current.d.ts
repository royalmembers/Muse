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
        images?: DeepX.MdBlogs.IImageItemInfo[];
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
        root?: boolean | number;
        gallery?: DeepX.MdBlogs.IImageGalleryInfo;
    }
    export function renderPaintings(options: IPaintingPaging): Promise<void>;
    export function initPaint(): Promise<void>;
    export function onImageItemClick(data: DeepX.MdBlogs.IImageClickInfo): void;
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
    function loadingModel(failed?: boolean, component?: Hje.ElementComponent): {
        tagName: string;
        children: {
            tagName: string;
            children: any;
        }[];
    };
    function fetchMainData<T = any>(url: string, element?: HTMLElement | string): Promise<{
        data?: T;
        component?: Hje.ElementComponent;
    }>;
    function getImageUrl(item: DeepX.MdBlogs.IImageItemInfo, options: DeepX.MdBlogs.IImageUrlResolveOptions): string;
}
declare namespace PageCtrl {
    interface IElementBag {
        frame: Hje.ElementComponent;
        name: Hje.ElementComponent;
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
