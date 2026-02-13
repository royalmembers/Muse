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
    export function initHome(): void;
    export {};
}
declare namespace PageCtrl {
    const strings: {
        photoTaken: string;
        "photoTaken#zh": string;
        paintings: string;
        "paintings#zh": string;
        series: string;
        "series#zh": string;
    };
    export function getString(key: keyof typeof strings): any;
    export function setElementProp(element: string | HTMLElement, prop: string | null, key: keyof typeof strings): void;
    export {};
}
declare namespace PageCtrl {
    type IImageRatio = "p" | "page" | "v" | "vertical" | "h" | "horizontal" | "s" | "square" | "w" | "wide";
    interface IPaintingPaging {
        offset: number;
        size: number;
        path: string;
        ext?: string;
        defaultName?: string;
        root?: boolean;
        id?: string;
        ratio?: IImageRatio;
        thumb?: boolean;
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
    export interface IPaintingSeriesInfo {
        id: string;
        disable?: string;
        name: string;
        year: number;
        ext?: string;
        ratio?: IImageRatio;
        thumb?: boolean;
    }
    export function renderPaintings(images: IPaintingInfo[] | true, paging: IPaintingPaging): void;
    export function hidePopupView(): void;
    export function renderImage(containerEle: HTMLElement, imageInfo: IPaintingInfo, paging: IPaintingPaging): void;
    export function initPaint(): void;
    export function initPopupView(): void;
    export {};
}
declare namespace PageCtrl {
    function scrollToTop(top?: number): void;
    function checkBrowserKind(): string;
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
        links: Record<string, string>;
    }
    export function video(year: number, id: string): IVideoInfo | undefined;
    export function videosModel(kind: "home" | "videos" | "3" | IElementBag): void;
    export function initVideos(): void;
    export {};
}
