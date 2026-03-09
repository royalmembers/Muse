namespace PageCtrl {
export interface IArticleRenderExtension {
    end: Hje.DescriptionContract[]
}

const seriesMap = {
    "mor-ow-meow": {
        name: "workMorOwMeow" as const,
        url: "../paintings/?mao",
        logo: "../images/logos/mao-2026.png",
    },
};

export function initBlog() {
    initMenu("blog");
    DeepX.MdBlogs.render("blog_content", "./config.json", {
        title: true,
        onselect(ev) {
            if (!ev) return;
            const article = ev.article;
            const model = ev.children;
            if (!article || !model) return;
            const arr: IArticleRenderExtension = { end: [] };
            if (article.hasKeyword("mor-ow-meow")) appendSeriesNotice("mor-ow-meow", arr, article);
            if (arr.end.length > 0) ev.insertChildren("end", {
                tagName: "section",
                styleRefs: "x-part-blog-related",
                children: arr.end
            });
        },
    });
}

function appendSeriesNotice(key: keyof typeof seriesMap, arr: IArticleRenderExtension, article: DeepX.MdBlogs.ArticleInfo) {
    const series = seriesMap[key || ""];
    if (!series?.name) return;
    const name = getString(series.name);
    arr.end.push({
        tagName: "h2",
        children: [{
            tagName: "span",
            children: name,
        }]
    }, {
        tagName: "ul",
        styleRefs: "link-tile-compact",
        children: [{
            tagName: "li",
            children: [{
                tagName: "a",
                props: {
                    title: `${getString("seeSeriesWorks")} - ${name}`,
                    href: series.url
                },
                children: [{
                    tagName: "span",
                    children: getString("seeSeriesWorks"),
                }],
            }],
        }],
    }, {
        tagName: "div",
        styleRefs: "x-part-info",
        children: [{
            tagName: "img",
            props: {
                src: series.logo,
                title: name
            }
        }, {
            tagName: "span",
            children: "注：摸凹喵（Mor-Ow Meow）及其形象，连同猫头鱼尾兽图标，都是 Muse Tuan 和 Kingcean Tuan 的商标，摸凹喵画作及其衍生品均受知识产权保护，版权所有。",
        }]
    })
}

}
