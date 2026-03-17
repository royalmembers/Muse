namespace PageCtrl {
export interface IArticleRenderExtension {
    end: Hje.DescriptionContract[]
}

interface IBlogSeriesInfo {
    name: string;
    url: string;
    logo?: string;
}

const inner = {
    articles: undefined as Promise<DeepX.MdBlogs.Articles> | undefined,
};

const seriesMap = {
    "mor-ow-meow": {
        name: "workMorOwMeow" as const,
        url: "../paintings/?mao",
        logo: "../images/logos/mao-2026.png",
    },
};

export function loadBlogArticles(root?: boolean | number) {
    if (!inner.articles)
        inner.articles = DeepX.MdBlogs.fetchArticles(`${rootRela(root)}blog/config.json`);
    return inner.articles;
}

export async function renderBlog(element: string | HTMLElement, root?: boolean | number) {
    const articles = await loadBlogArticles(root);
    DeepX.MdBlogs.render(element, articles, {
        title: true,
        onselect(ev) {
            if (!ev) return;
            const article = ev.article;
            const model = ev.children;
            if (!article || !model) return;
            const arr: IArticleRenderExtension = { end: [] };
            appendSeriesNotice(arr, article);
            if (arr.end.length > 0) ev.insertChildren("end", {
                tagName: "section",
                styleRefs: "x-part-blog-related",
                children: arr.end
            });
        },
    });
}

export function initBlog() {
    initMenu("blog");
    renderBlog("blog_content");
}

function appendSeriesNotice(arr: IArticleRenderExtension, article: DeepX.MdBlogs.ArticleInfo) {
    const keywords = article.keywords;
    if (!keywords?.length) return;
    const links: Hje.DescriptionContract[] = [];
    for (let i = 0; i < keywords.length; i++) {
        const keyword = keywords[i];
        if (!keyword?.value) continue;
        const series = seriesMap[keyword.value as keyof typeof seriesMap];
        if (!series?.name) continue;
        const name = getString(series.name) || series.name;
        if (!name) continue;
        links.push({
            tagName: "a",
            styleRefs: "link-long-button",
            props: {
                href: series.url
            },
            children: [{
                tagName: "img",
                props: {
                    src: series.logo,
                    alt: name
                }
            }, {
                tagName: "span",
                children: name,
            }],
        });
    }
    if (links.length < 1) return;
    arr.end.push({
        tagName: "h2",
        children: [{
            tagName: "span",
            children: getString("relatedPaintings"),
        }]
    }, {
        tagName: "div",
        children: links,
    }, {
        tagName: "div",
        styleRefs: "x-part-info",
        children: [{
            tagName: "span",
            children: "注：猫头鱼尾兽图标、MuseTuan.com、摸凹喵（Mor-Ow Meow）及其形象，是 Muse Tuan 和 Kingcean Tuan 的商标，摸凹喵画作及其衍生品均受知识产权保护，版权所有；Kingcean、Jinchen Art、金辰艺术、CompositeJs、金山旭日翼盾、红日黑山徽标，是 Kingcean Tuan、南昌金辰软件有限公司或江西金辰装饰设计工程有限公司的商标或注册商标；其它商标分别归属其所拥有的组织。",
        }]
    });
}

function appendSpecificSeriesNotice(series: IBlogSeriesInfo, arr: Hje.DescriptionContract[]) {
    if (!series?.name) return;
    const name = getString(series.name as any);
    
}

}
