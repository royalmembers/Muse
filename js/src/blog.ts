namespace PageCtrl {
export interface IArticleRenderExtension {
    start: Hje.DescriptionContract[];
    end: Hje.DescriptionContract[];
    last: Hje.DescriptionContract[];
    mkt?: string | boolean;
    article: DeepX.MdBlogs.ArticleInfo;
    relative(path: string | Hje.RelativePathInfo): string;
}

const inner = {
    articles: undefined as Promise<DeepX.MdBlogs.Articles> | undefined,
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
        galleryUrl(info) {
            const relaPath = rootRela(root);
            if (!info?.id) return `${relaPath}paintings/`;
            return `${relaPath}/paintings/?${info.id}`;
        },
        onselect(ev) {
            if (!ev) return;
            const article = ev.article;
            const model = ev.children;
            if (!article?.data || !model) return;
            const arr: IArticleRenderExtension = {
                article,
                start: [],
                end: [],
                last: [],
                mkt: ev.mkt,
                relative(path: string | Hje.RelativePathInfo) {
                    return articles.relative(path).value;
                }
            };
            audioSection(arr);
            if (arr.start.length > 0) ev.insertChildren("start", {
                tagName: "section",
                className: "x-part-blog-related",
                children: arr.start
            });
            if (arr.end.length > 0) ev.insertChildren("end", {
                tagName: "section",
                className: "x-part-blog-related",
                children: arr.end
            });
            if (arr.last.length > 0) ev.insertChildren("last", {
                tagName: "section",
                className: "x-part-blog-related",
                children: arr.last
            });
        },
    });
}

export function initBlog() {
    initMenu("blog");
    renderBlog("blog_content");
}

function audioSection(output: IArticleRenderExtension) {
    const data = output.article.data;
    const audio = data.audio as {
        name: string;
        desc?: string;
        url: string;
        preload?: HTMLAudioElement["preload"]
    }[];
    if (!audio || !(audio instanceof Array) || !audio.length) return;
    output.end.push({
        tagName: "h2",
        children: getString("audio")
    })
    for (const item of audio) {
        if (!item?.url || !item.name) continue;
        const children: Hje.DescriptionContract[] = [];
        const name = DeepX.MdBlogs.getLocaleProp(item, "name");
        children.push({
            tagName: "span",
            children: name,
        });
        const desc = DeepX.MdBlogs.getLocaleProp(item, "desc");
        if (desc) children.push({
            tagName: "br",
        }, {
            tagName: "span",
            children: desc,
        })
        output.end.push({
            tagName: "figure",
            children: [{
                tagName: "audio",
                props: {
                    controls: true,
                    preload: item.preload || "none",
                },
                children: [{
                    tagName: "source",
                    props: {
                        src: output.relative(item.url)
                    }
                }]
            }, {
                tagName: "figcaption",
                children,
            }]
        });
    }
}

}
