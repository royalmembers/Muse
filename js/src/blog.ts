namespace PageCtrl {

    export function initBlog() {
        initMenu("blog");
        DeepX.MdBlogs.render("blog_content", "./config.json", { title: true });
    }

}
