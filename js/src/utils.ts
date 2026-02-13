namespace PageCtrl {

    const inner: {
        browserKind?: "normal" | "windows" | "applet" | "unknown" | string;
    } = {};

    export function scrollToTop(top?: number) {
        window.scrollTo({ top: top || 0, behavior: "smooth" });
    }

    export function checkBrowserKind() {
        if (typeof inner.browserKind === "string") return inner.browserKind;
        if (typeof navigator === "undefined" || !navigator.userAgent)
            return inner.browserKind = "unknown";
        let ua = navigator.userAgent;
        if (!ua.includes("Chrome/") && ua.includes("Edg/") && ua.includes("AppleWebKit/") && ua.includes("Firefox/"))
            return inner.browserKind = "unknown";
        if (ua.includes("MicroMessenger/") || ua.includes("DingTalk/") || ua.includes("WeChat/") || ua.includes("BytedanceWebview/") || ua.includes("Lark/") || ua.includes("Weibo ")) {
            if (!ua.includes(" (Windows NT "))
                return inner.browserKind = "applet";
        }

        return inner.browserKind = ua.includes(" (Windows NT ") ? "windows" : "normal";
    }

    export function parseFirstQuery(id: string | null | undefined): {
        id?: string;
        year?: number;
        sub?: string;
    } {
        if (!id) return {};
        const arr = id.split('/');
        if (arr.length < 2 || !arr[0] && !arr[1]) return {};
        const obj: {
            id: string;
            year: number;
            sub?: string;
        } = {
            id: arr[1],
            year: parseInt(arr[0])
        };
        if (arr.length > 2) obj.sub = arr[2];
        return obj;
    }

}