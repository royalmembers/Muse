namespace PageCtrl {

    const strings = {
        photoTaken: "Photo taken on {0}.",
        "photoTaken#zh": "本照片拍摄于{0}年",
        paintings: "Paintings",
        "paintings#zh": "画作",
    }

    export function getString(key: keyof typeof strings) {
        return DeepX.MdBlogs.getLocaleProp(strings, key);
    }

    export function setElementProp(element: string | HTMLElement, prop: string | null, key: keyof typeof strings) {
        return DeepX.MdBlogs.setElementProp(element, prop, DeepX.MdBlogs.getLocaleProp(strings, key));
    }
}
