namespace PageCtrl {
export interface IArticleRenderExtension {
    end: Hje.DescriptionContract[]
}

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
            if (article.hasKeyword("mor-ow-meow")) appendMorOwMeowNotice(arr, article);
            if (arr.end.length > 0) ev.insertChildren("end", {
                tagName: "section",
                styleRefs: "x-part-blog-related",
                children: arr.end
            });
        },
    });
}

function appendMorOwMeowNotice(arr: IArticleRenderExtension, article: DeepX.MdBlogs.ArticleInfo) {
    arr.end.push({
        tagName: "p",
        children: [{
            tagName: "span",
            children: "注：摸凹喵（Mor-Ow Meow）及其形象，连同猫头鱼尾兽图标，都是 Muse 和 Kingcean Tuan 的商标，摸凹喵画作及其衍生产品均受知识产权保护，版权所有。",
        }]
    }, {
        tagName: "ul",
        styleRefs: "link-tile-compact",
        children: [{
            tagName: "li",
            children: [{
                tagName: "a",
                props: {
                    title: "《摸凹喵》画作集",
                    href: "../paintings/?mao"
                },
                children: [{
                    tagName: "span",
                    children: `《${getString("workMorOwMeow")}》`,
                }, {
                    tagName: "span",
                    children: "查看完整画作集",
                }],
            }],
        }],
    })
}

}
