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

    export function ele(id: string) {
        return document.getElementById(id);
    }

    export function rootRela(root?: boolean | number) {
        if (typeof root === "number") {
            if (root < 0 || isNaN(root)) return "../";
            if (!Number.isInteger(root)) root = Math.round(root);
            if (root === 0) return "./";
            let s = "../";
            for (let i = 1; i < root; i++) {
                s += "../";
            }

            return s;
        }

        return root ? "./" : "../";
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

    export function loadingModel(failed?: boolean, context?: Hje.ViewGeneratingContextContract<any>) {
        const m = {
            tagName: "p",
            children: [failed ? {
                tagName: "span",
                children: DeepX.MdBlogs.getLocaleString("loadFailed"),
            } : {
                tagName: "em",
                children: DeepX.MdBlogs.getLocaleString("loading"),
            }],
        };
        if (context) {
            context.model().children = [m];
            context.refresh();
        }
        return m;
    }

    export async function fetchMainData<T = any>(url: string, element?: HTMLElement | string): Promise<{
        data?: T,
        context?: Hje.ViewGeneratingContextContract<any>
    }> {
        if (!url) return {};
        const c = element ? Hje.render(element, {
            children: [loadingModel()],
        }) : undefined;
        try {
            const res = await fetch(url);
            const json = await res.json();
            if (!json) {
                loadingModel(true, c);
                return { context: c }
            }
            return {
                data: json as T,
                context: c
            };
        } catch {
            loadingModel(true, c);
            return { context: c };
        }
    }

}