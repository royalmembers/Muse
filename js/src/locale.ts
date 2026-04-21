namespace PageCtrl {

    const strings = {
        all: "All",
        "all#zh": "全部",
        share: "Share",
        "share#zh": "分享",
        photoTaken: "Photo taken on {0}.",
        "photoTaken#zh": "本照片拍摄于{0}年",
        general: "General",
        "general#zh": "常规",
        paintings: "Paintings",
        "paintings#zh": "画作",
        series: "Series",
        "series#zh": "系列",
        dateToMonth: "MMM YYYY",
        "dateToMonth#zh": "YYYY年MM月",
        certHonors: "Honors",
        "certHonors#zh": "小小荣誉",
        picLibs: "All picture libraries",
        "picLibs#zh": "全部图集",
        generalPaintings: "General pictures",
        "generalPaintings#zh": "常规画作",
        related: "Related",
        "related#zh": "相关",
        relatedBlog: "Related blog articles",
        "relatedBlog#zh": "相关博客",
        relatedPaintings: "Related paintings",
        "relatedPaintings#zh": "相关画作",
        worksBy: "{1} by {0}",
        "worksBy#zh": "{0}的{1}",
        workMorOwMeow: "摸凹喵",
        "workMorOwMeow#en": "Mor-Ow Meow",
        "workMorOwMeow#fr": "Moh-Aou Miaou",
        "workMorOwMeow#ko": "모오 미야오",
        workStarna: "Starna",
        "workStarna#zh": "星娜喵",
        seeSeriesWorks: "See all works of the serie",
        "seeSeriesWorks#zh": "查看系列完整画作集",
        loveDrawing: "I love drawing and following are my works.",
        "loveDrawing#zh": "我爱画画！以下是我的部分作品。",
    }

    export function getString(key: keyof typeof strings, mktOptions?: { mkt?: string | boolean }) {
        return DeepX.MdBlogs.getLocaleProp(strings, key, mktOptions) as string;
    }

    export function setElementProp(element: string | HTMLElement, prop: string | null, key: keyof typeof strings) {
        return DeepX.MdBlogs.setElementProp(element, prop, DeepX.MdBlogs.getLocaleProp(strings, key));
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
