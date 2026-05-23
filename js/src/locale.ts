namespace PageCtrl {

    const strings = {
        share: "Share",
        "share#zh": "分享",
        photoTaken: "Photo taken on {0}.",
        "photoTaken#zh": "本照片拍摄于{0}年",
        series: "Series",
        "series#zh": "系列",
        audio: "Audio",
        "audio#zh": "音频",
        dateToMonth: "MMM YYYY",
        "dateToMonth#zh": "YYYY年MM月",
        certHonors: "Honors",
        "certHonors#zh": "小小荣誉",
        generalPaintings: "General pictures",
        "generalPaintings#zh": "常规画作",
        relatedPictures: "Related pictures",
        "relatedPictures#zh": "相关图片",
        selfPortrait: "Self portrait",
        "selfPortrait#zh": "自画像",
        worksBy: "{1} by {0}",
        "worksBy#zh": "{0}的{1}",
        loveDrawing: "I love drawing and following are my works.",
        "loveDrawing#zh": "我爱画画！以下是我的部分作品。",
    }

    export function getString(key: keyof typeof strings, mktOptions?: { mkt?: string | boolean }) {
        return DeepX.MdBlogs.getLocaleProp(strings, key, mktOptions) as string;
    }

    export function setElementProp(element: string | HTMLElement, prop: string | null, key: keyof typeof strings) {
        return DeepX.MdBlogs.setElementProp(element, prop, DeepX.MdBlogs.getLocaleProp(strings, key));
    }

    export function setElementProps(col: ({
        element: string | HTMLElement;
        key: keyof typeof strings;
        prop?: string | null;
        mdblogs?: false;
    } | {
        element: string | HTMLElement;
        key: Parameters<typeof DeepX.MdBlogs.getLocaleString>[0];
        prop?: string | null;
        mdblogs: true;
    })[]) {
        for (const item of col) {
            if (!item?.element || !item.key) continue;
            DeepX.MdBlogs.setElementProp(
                item.element,
                item.prop,
                item.mdblogs
                    ? DeepX.MdBlogs.getLocaleString(item.key)
                    : DeepX.MdBlogs.getLocaleProp(strings, item.key));
        }
    }

    export function monthYear(year: number, month?: number | null) {
        if (typeof month !== "number" || isNaN(month) || month < 1 || month > 13)
            return "'" + year.toString(10);
        let template = getString("dateToMonth").replace("YYYY", year.toString(10));
        if (template.includes("MMM")) {
            switch (month) {
                case 1:
                    template = template.replace("MMM", "Jan");
                    break;
                case 2:
                    template = template.replace("MMM", "Feb");
                    break;
                case 3:
                    template = template.replace("MMM", "Mar");
                    break;
                case 4:
                    template = template.replace("MMM", "Apr");
                    break;
                case 5:
                    template = template.replace("MMM", "May");
                    break;
                case 6:
                    template = template.replace("MMM", "Jun");
                    break;
                case 7:
                    template = template.replace("MMM", "Jul");
                    break;
                case 8:
                    template = template.replace("MMM", "Aug");
                    break;
                case 9:
                    template = template.replace("MMM", "Sep");
                    break;
                case 10:
                    template = template.replace("MMM", "Oct");
                    break;
                case 11:
                    template = template.replace("MMM", "Nov");
                    break;
                case 12:
                    template = template.replace("MMM", "Dec");
                    break;
                case 13:
                    template = template.replace("MMM", "Und");
                    break;
            }
        }

        template = template.replace("MM", month.toString(10));
        return template;
    }

}
