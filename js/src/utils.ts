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

}