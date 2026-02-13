namespace PageCtrl {

    interface IElementBag {
        frame: Hje.ViewGeneratingContextContract<any>;
        name: Hje.ViewGeneratingContextContract<any>;
    }

    export interface IVideoInfo {
        id: string;
        disable?: boolean;
        name: string;
        guest?: "featuring" | string;
        year: number;
        month?: number;
        links: Record<string, string>;
    }

    const videos: IVideoInfo[] = [{
        id: "jingdezhen",
        name: "景德镇陶瓷研学之旅",
        year: 2025,
        month: 7,
        links: {
            iqiyi: "https://www.iqiyi.com/v_14kpuv94euo.html",
            "iqiyi-embed": "https://static-s.iqiyi.com/pca/uwp/new_web_player/index.html?mode=player&from=embed&tvid=4176576759377500"
        }
    }, {
        id: "jingdezhen",
        disable: true,
        guest: "featuring",
        name: "学生不练琴，我选择做这三件事",
        year: 2025,
        month: 4,
        links: {
            xiaohongshu: "https://xhslink.com/m/9SueR085WK8",
        }
    }, {
        id: "led",
        name: "点亮神灯",
        year: 2020,
        links: {
            iqiyi: "https://www.iqiyi.com/v_lgmoijf6zg.html",
            "iqiyi-embed": "https://static-s.iqiyi.com/pca/uwp/new_web_player/index.html?mode=player&from=embed&tvid=2193622781471600"
        }
    }];

    
    function playVideo(v: IVideoInfo, frame: Hje.ViewGeneratingContextContract<any>, name: Hje.ViewGeneratingContextContract<any>) {
        if (v.links) {
            (frame.model().children as Hje.DescriptionContract[])[0].props!.src = v.links["iqiyi-embed"] || v.links.iqiyi;
            frame.refresh();
            frame.element().style.display = "";
        }

        let m = name.model().children as Hje.DescriptionContract[];
        m.splice(0);
        m.push({
            tagName: "span",
            children: v.name
        });
        m.push({
            tagName: "span",
            children: v.year.toString(10)
        });
        m.push({
            tagName: "a",
            props: { href: v.links.iqiyi, target: "_blank" },
            children: DeepX.MdBlogs.getLocaleString("name") === "名称" ? "刷新" : "Refresh",
            on: {
                click(ev: MouseEvent) {
                    (frame.model().children as Hje.DescriptionContract[])[0].props!.src = "./blank.html";
                    frame.refresh();
                    frame.element().style.display = "none";
                    m.splice(0);
                    name.refresh();
                }
            }
        });
        name.refresh();
    }

    export function video(year: number, id: string) {
        for (let i = 0; i < videos.length; i++) {
            let v = videos[i];
            if (v && v.year === year && v.id === id) return v;
        }

        return undefined;
    }

    export function videosModel(kind: "home" | "videos" | "3" | IElementBag) {
        let info: IElementBag;
        let prefix = "../videos/?";
        switch (kind || "") {
            case "home":
                prefix = "./videos/?";
                break;
            case "videos":
                prefix = "./?";
                break;
            case "3":
                prefix = "../../videos/?"
                break;
            default:
                if ((kind as IElementBag).frame && (kind as IElementBag).name) info = kind as IElementBag;
                break;
        }

        let arr = videos.map(function (item) {
            if (!item || !item.links || !item.name || item.disable) return undefined;
            let url = item.links["iqiyi-embed"];
            let embed = checkBrowserKind() === "windows" && url;
            if (!embed) url = item.links.iqiyi;
            if (!url) return undefined;
            let m: Hje.DescriptionContract = {
                tagName: "a",
                props: { href: embed ? (prefix + item.year + "/" + item.id) : url },
                styleRefs: "link-long-button",
                children: [{
                    tagName: "span",
                    children: item.name
                }, {
                    tagName: "span",
                    children: item.year.toString(10)
                }]
            };
            if (!embed) m.props!.target = "_blank";
            else if (info) m.on = {
                click(ev) {
                    if (ev.preventDefault) ev.preventDefault();
                    else ev.returnValue = false;
                    playVideo(item, info.frame, info.name);
                    scrollToTop(4);
                }
            };
            return m;
        }).filter(function (item) {
            return !!item;
        });
        Hje.render("part-videos", {
            children: arr
        });
    }

    export function initVideos() {
        DeepX.MdBlogs.setElementText("title-videos", "videos");
        let frame = Hje.render("part-video-container", {
            children: [{
                tagName: "iframe",
                props: {
                    title: "Video",
                    allow: "fullscreen; autoplay; encrypted-media; midi; payment"
                }
            }]
        })!;
        let name = Hje.render("part-video-name", {
            children: []
        })!;
        videosModel({
            frame: frame,
            name: name
        });
        let q = (DeepX.MdBlogs.firstQuery() || "").split("/");
        if (q.length < 2) return;
        let year = parseInt(q[0]);
        let id = q[1];
        let v = video(year, id);
        if (!v || !v.links) return;
        playVideo(v, frame, name);
    }

}