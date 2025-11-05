"use strict";
const justifInput = document.getElementById("justif");
watch();
justifInput.addEventListener("change", (event) => {
    var _a;
    console.log("fichiers : ", justifInput.files);
    const showImageDiv = document.getElementById("showImageDiv");
    showImgs(event, showImageDiv);
    (_a = justifInput.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
});
async function showImgs(e, div) {
    if (!e.target.files) {
    }
    else if (e.target.files) {
        let file = e.target.files[0];
        const reader = new FileReader();
        reader.addEventListener("load", (event) => {
            var _a;
            const imgUrl = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            const imgDiv = document.createElement("div");
            const img = document.createElement("img");
            const suppImg = document.createElement("img");
            imgDiv.classList.add("w-48", "h-80", "overflow-hidden", "rounded-lg", "relative");
            img.classList.add("object-cover");
            suppImg.src = "/imgs/glob/supp.svg";
            suppImg.classList.add("absolute", "top-2", "right-2", "w-7", "h-7", "shadow-md", "shadow-white", "cursor-pointer");
            img.src = imgUrl;
            img.addEventListener("load", () => {
                const canvas = document.createElement("canvas");
                canvas.width = 192;
                canvas.height = 341;
                const ctx = canvas.getContext("2d");
                ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                let newImgUrl = ctx === null || ctx === void 0 ? void 0 : ctx.canvas.toDataURL("image/jpeg");
                let img2 = document.createElement("img");
                img2.src = newImgUrl;
                img2.classList.add("images");
                imgDiv.append(img2, suppImg);
                div.prepend(imgDiv);
            }, { once: true });
            suppImg.addEventListener("click", () => {
                var _a;
                const div = suppImg.parentElement;
                (_a = justifInput.parentElement) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
                div.remove();
            });
        });
        reader.readAsDataURL(file);
    }
}
