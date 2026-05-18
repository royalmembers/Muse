namespace PageCtrl {
export interface IArticleRenderExtension {
    end: Hje.DescriptionContract[]
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
            if (!article || !model) return;
            const arr: IArticleRenderExtension = { end: [] };
            if (arr.end.length > 0) ev.insertChildren("end", {
                tagName: "section",
                className: "x-part-blog-related",
                children: arr.end
            });
        },
    });
}

export function initBlog() {
    initMenu("blog");
    renderBlog("blog_content");
}

}
