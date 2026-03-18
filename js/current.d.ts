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
        scope?: "match" | "interest" | "pro" | "variety" | "institution" | "school";
        season?: string;
        year: number;
        month?: number;
        group?: string;
        ranking: string;
        publisher?: string;
        img?: string | false;
        keywords?: string[];
    }
    function initCerts(): void;
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
    export function hidePopupViewDelay(): void;
    export function showPopupView(info: {
        url: string;
        thumb?: string;
        name: string;
        tips?: string;
        desc: string;
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
        offset: number;
        size: number;
        path: string;
        defaultName?: string;
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
    export function renderPaintings(images: IPaintingInfo[] | true, paging: IPaintingPaging): Promise<void>;
    export function renderImage(containerEle: HTMLElement, imageInfo: IPaintingInfo, paging: IPaintingPaging): void;
    export function initPaint(): Promise<void>;
    export {};
}
declare namespace PageCtrl {
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
        selected?(info: IPaintingSeriesInfo, component: ImageSeriesPart): void;
    }
    export interface IImageCollectionPartData extends IImageCollectionPartOptions {
        rela?: string | Hje.RelativePathInfo;
        items: IPaintingInfo[];
        defaultName?: string;
    }
    export class ImageSeriesPart extends Hje.BaseComponent {
        private __inner;
        constructor(element: any, options?: Hje.ComponentOptionsContract<IImageSeriesPartData>);
        get series(): IPaintingSeriesInfo[];
        getSeries(id: string): IPaintingSeriesInfo | undefined;
        selectSeries(id: string | IPaintingSeriesInfo): IPaintingSeriesInfo | undefined;
        scrollContentIntoView(): false | undefined;
        scrollMenuIntoView(): false | undefined;
        imageRelative(url: string): string | null;
        private refreshRelated;
        private genSeriesMenu;
        private getSeriesLinkInfo;
    }
    export class ImageCollectionPart extends Hje.BaseComponent {
        private __inner;
        constructor(element: any, options?: Hje.ComponentOptionsContract<IImageCollectionPartData>);
        get length(): IPaintingInfo[];
        getItem(index: number): IPaintingInfo | undefined;
        pushWithoutRender(...items: IPaintingInfo[]): number;
        push(...items: IPaintingInfo[]): number;
        clear(): void;
        nextPage(): boolean;
        indexOf(item: string | IPaintingInfo): number;
        private genItemModel;
    }
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
