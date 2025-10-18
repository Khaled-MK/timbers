"use strict";
const allIputs = document.querySelectorAll("input");
const chiffInputs = document.querySelectorAll(".chiff");
const addImgs = document.querySelectorAll(".addImg");
const globDiv = document.getElementById("glob");
const startBtn = document.getElementById("start");
const matInputs = document.querySelectorAll(".mat");
const coutHT = document.getElementById("coutHT");
const coutMC = document.getElementById("coutMC");
const surface = document.getElementById("surface");
const pourceMarge = document.getElementById("pourceMarge");
const marge = document.getElementById("marge");
const venteMC = document.getElementById("venteMC");
const venteHT = document.getElementById("venteHT");
let desigInputs = document.querySelectorAll(".desig, .mat");
let suppBtns = document.querySelectorAll(".suppImg");
let matx = [];
watchInputs();
window.addEventListener("load", async () => {
    await fetch("/getMatx", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
        matx = data;
        const matxList = document.getElementById("materiaux");
        matx.forEach((mat) => {
            const option = document.createElement("option");
            option.value = mat.materiaux + " " + mat.epaisseur + " " + mat.finition + " " + mat.hauteur;
            matxList.append(option);
        });
        console.log("Materiaux from server : ", matx);
    });
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        console.log(e);
    }
});
startBtn.addEventListener("click", () => {
    const surface = document.getElementById("surface");
    if (surface.value.length <= 0 || parseFloat(surface.value.replace(/\s/g, "")) <= 0) {
        surface.classList.add("border-red-600", "text-red-600", "placeholder-red-600", "text-sm", "normal-case");
        surface.placeholder = "Ce champs est obligatoire";
        surface.addEventListener("focus", () => {
            surface.classList.remove("border-red-600", "text-red-600", "placeholder-red-600", "text-sm", "normal-case");
            surface.placeholder = "";
        });
        return;
    }
    else {
        const startDiv = startBtn.parentElement;
        const bigDiv = startDiv.parentElement;
        const h2 = bigDiv.firstElementChild;
        const smDiv = h2.nextElementSibling;
        Array.from(smDiv.children).forEach((el) => {
            const element = el;
            element.style.width = "100%";
            element.style.marginTop = "0.5rem";
            element.style.marginBottom = "0.5rem";
        });
        h2.style.cssText = "margin-bottom : 0rem; text-align : left; font-size : 1.5rem; line-height : 2rem; ";
        smDiv.style.cssText = "display : block ; font-size : 1rem; line-height : 1.5rem ";
        surface.classList.remove("border-red-600", "text-red-600", "placeholder-red-600", "text-sm", "normal-case");
        surface.placeholder = "";
        bigDiv.style.cssText = "margin: 0rem;  width : 100%; max-width: 460px; padding-left: 0rem; padding-right: 0rem; padding-top : 0rem ; padding-bottom : 0rem; transition: all 1.2s ease;";
        startDiv.remove();
        setTimeout(() => {
            globDiv.classList.remove("hidden");
        }, 600);
    }
});
globDiv.addEventListener("change", (e) => {
    const input = e.target;
    if (input.value.length > 0) {
        if (input.classList.contains("desig") || input.classList.contains("mat")) {
            modifDisignInputs(e.target);
        }
        if (input.classList.contains("chiff")) {
            calculMtn();
            watchInputs();
        }
    }
});
globDiv.addEventListener("click", (e) => {
    var _a;
    const target = e.target;
    if (target.classList.contains("suppImg")) {
        const div = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
        div.remove();
        calculTotal();
    }
});
pourceMarge.addEventListener("click", () => {
    var _a;
    const input = document.createElement("input");
    input.type = "text";
    input.value = ((_a = pourceMarge.textContent) === null || _a === void 0 ? void 0 : _a.replace("%", "")) || "0";
    pourceMarge.replaceWith(input);
    input.classList.add("chiff", "text-right", "bg-transparent", "border-b-2", "border-stone-300", "outline-none");
    input.select();
    input.addEventListener("input", () => {
        let value = parseFloat(input.value.replace(/\s/g, ""));
        if (!isNaN(value)) {
            pourceMarge.textContent = value + " %";
        }
        calculTotal();
        watchInputs();
    });
    input.addEventListener("change", () => {
        if (input.value.trim() === "" || isNaN(parseFloat(input.value))) {
            pourceMarge.textContent = "0 %";
        }
        input.replaceWith(pourceMarge);
    });
});
marge.addEventListener("click", () => {
    var _a;
    const input = document.createElement("input");
    input.type = "text";
    input.value = ((_a = marge.textContent) === null || _a === void 0 ? void 0 : _a.replace("%", "")) || "0";
    marge.replaceWith(input);
    input.classList.add("chiff", "text-right", "bg-transparent", "border-b-2", "border-stone-300", "outline-none");
    watchInputs();
    input.select();
    input.addEventListener("input", () => {
        var _a, _b;
        let value = parseFloat(input.value.replace(/\s/g, ""));
        if (input.value.trim() === "" || isNaN(parseFloat(input.value))) {
            marge.textContent = "0";
            pourceMarge.textContent = "0 %";
            venteMC.textContent = "0 / m²";
            venteHT.textContent = "0";
        }
        else {
            marge.textContent = value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
        pourceMarge.textContent = ((value / (parseFloat(((_a = coutHT.textContent) === null || _a === void 0 ? void 0 : _a.replace(/\s/g, "")) || "0") || 1)) * 100).toFixed(0) + " %";
        venteHT.textContent = (parseFloat(((_b = coutHT.textContent) === null || _b === void 0 ? void 0 : _b.replace(/\s/g, "")) || "0") + value).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        venteMC.textContent = (parseFloat(venteHT.textContent.replace(/\s/g, "")) / parseFloat(surface.value.replace(/\s/g, ""))).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " / m²";
    });
    input.addEventListener("change", () => {
        if (input.value.trim() === "" || isNaN(parseFloat(input.value))) {
            marge.textContent = "0";
        }
        else {
            marge.textContent = parseFloat(input.value.replace(/\s/g, ""))
                .toFixed(0)
                .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
        input.replaceWith(marge);
    });
});
venteHT.addEventListener("click", () => {
    var _a;
    const input = document.createElement("input");
    input.type = "text";
    input.value = ((_a = venteHT.textContent) === null || _a === void 0 ? void 0 : _a.replace("%", "")) || "0";
    venteHT.replaceWith(input);
    input.classList.add("chiff", "text-right", "bg-transparent", "border-b-2", "border-stone-300", "outline-none");
    watchInputs();
    input.select();
    input.addEventListener("input", () => {
        var _a, _b;
        let value = parseFloat(input.value.replace(/\s/g, ""));
        if (!isNaN(value)) {
            venteHT.textContent = value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
        marge.textContent = (value - (parseFloat(((_a = coutHT.textContent) === null || _a === void 0 ? void 0 : _a.replace(/\s/g, "")) || "0") || 0)).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        pourceMarge.textContent = ((parseFloat(marge.textContent.replace(/\s/g, "") || "0") / (parseFloat((_b = coutHT.textContent) === null || _b === void 0 ? void 0 : _b.replace(/\s/g, "")) || 1)) * 100).toFixed(0) + " %";
        venteMC.textContent = (parseFloat(venteHT.textContent.replace(/\s/g, "")) / parseFloat(surface.value.replace(/\s/g, ""))).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " / m²";
    });
    input.addEventListener("change", () => {
        if (input.value.trim() === "" || isNaN(parseFloat(input.value))) {
            venteHT.textContent = "0";
        }
        else {
            venteHT.textContent = parseFloat(input.value.replace(/\s/g, ""))
                .toFixed(0)
                .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
        input.replaceWith(venteHT);
    });
});
venteMC.addEventListener("click", () => {
    var _a;
    const input = document.createElement("input");
    input.type = "text";
    input.value = ((_a = venteMC.textContent) === null || _a === void 0 ? void 0 : _a.replace("%", "")) || "0";
    venteMC.replaceWith(input);
    input.classList.add("chiff", "text-right", "bg-transparent", "border-b-2", "border-stone-300", "outline-none");
    watchInputs();
    input.select();
    input.addEventListener("input", () => {
        var _a, _b;
        let value = parseFloat(input.value.replace(/\s/g, ""));
        if (!isNaN(value)) {
            venteMC.textContent = value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
        venteHT.textContent = (parseFloat(venteMC.textContent.replace(/\s/g, "")) * parseFloat(surface.value.replace(/\s/g, ""))).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        marge.textContent = (parseFloat(venteHT.textContent.replace(/\s/g, "")) - (parseFloat(((_a = coutHT.textContent) === null || _a === void 0 ? void 0 : _a.replace(/\s/g, "")) || "0") || 0)).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        pourceMarge.textContent = ((parseFloat(marge.textContent.replace(/\s/g, "") || "0") / (parseFloat((_b = coutHT.textContent) === null || _b === void 0 ? void 0 : _b.replace(/\s/g, "")) || 1)) * 100).toFixed(0) + " %";
    });
    input.addEventListener("change", () => {
        if (input.value.trim() === "" || isNaN(parseFloat(input.value))) {
            venteMC.textContent = "0";
        }
        else {
            venteMC.textContent =
                parseFloat(input.value.replace(/\s/g, ""))
                    .toFixed(0)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " / m²";
        }
        input.replaceWith(venteMC);
    });
});
function calculTotal() {
    var _a, _b;
    const totaux = document.querySelectorAll(".mtn");
    const sousTotaux = document.querySelectorAll(".sous-t");
    sousTotaux.forEach((total) => {
        let sum = 0;
        totaux.forEach((mtn) => {
            var _a;
            if (mtn.classList.contains(total.classList[1])) {
                sum += parseFloat(((_a = mtn.textContent) === null || _a === void 0 ? void 0 : _a.replace(/\s/g, "")) || "0");
            }
        });
        total.textContent = sum.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    });
    let total = 0;
    totaux.forEach((mtn) => {
        var _a;
        total += parseFloat(((_a = mtn.textContent) === null || _a === void 0 ? void 0 : _a.replace(/\s/g, "")) || "0");
    });
    coutHT.textContent = total.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    coutMC.textContent = (total / parseFloat(surface.value.replace(/\s/g, ""))).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " / m²";
    if (coutMC.textContent === "NaN / m²") {
        coutMC.textContent = "";
    }
    pourceMarge.classList.remove("text-white");
    marge.textContent = (total * (parseFloat(((_a = pourceMarge.textContent) === null || _a === void 0 ? void 0 : _a.replace(/\s/g, "").replace("%", "")) || "0") / 100)).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    venteHT.textContent = (total + parseFloat(((_b = marge.textContent) === null || _b === void 0 ? void 0 : _b.replace(/\s/g, "")) || "0")).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    venteMC.textContent = (parseFloat(venteHT.textContent.replace(/\s/g, "")) / parseFloat(surface.value.replace(/\s/g, ""))).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " / m²";
}
async function modifDisignInputs(input) {
    var _a, _b, _c, _d;
    if (input.classList.contains("desig")) {
        const sibling = input.nextElementSibling;
        const div = (_a = input.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
        const typeClass = input.classList[0];
        const section = (_c = (_b = input.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement;
        const dupDiv = div.cloneNode(true);
        const image = document.createElement("img");
        const para = document.createElement("p");
        section.append(dupDiv);
        const dupDesig = dupDiv.querySelector(".desig");
        dupDesig.value = "";
        para.classList.add(typeClass, "desig", "w-2/4");
        image.classList.add("suppImg", "h-[1.2rem]", "opacity-80", "hover:opacity-100", "cursor-pointer");
        image.src = "./imgs/glob/supp.svg";
        image.alt = "";
        para.innerText = input.value;
        if (sibling) {
            sibling.classList.remove("hidden");
            sibling.focus();
            sibling.before(para);
            sibling.after(image);
            sibling.addEventListener("change", async () => {
                var _a, _b;
                const uPrice = (_b = (_a = sibling.parentElement) === null || _a === void 0 ? void 0 : _a.nextElementSibling) === null || _b === void 0 ? void 0 : _b.nextElementSibling;
                matx.forEach((mat) => {
                    const existingMat = mat.materiaux + " " + mat.epaisseur + " " + mat.finition + " " + mat.hauteur;
                    if (existingMat === sibling.value) {
                        uPrice.value = mat.prix.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                    }
                });
            });
        }
        else {
            const secPara = document.createElement("p");
            secPara.classList.add(typeClass, "mat", "w-[40%]");
            (_d = input.parentElement) === null || _d === void 0 ? void 0 : _d.append(para, secPara, image);
        }
        input.remove();
        return;
    }
    if (input.classList.contains("mat")) {
        const typeClass = input.classList[0];
        const sibling = input.previousElementSibling;
        const para = document.createElement("p");
        para.classList.add(typeClass, "mat", "w-[40%]");
        para.innerText = input.value;
        if (sibling) {
            sibling.after(para);
        }
        input.remove();
        return;
    }
    suppBtns = document.querySelectorAll(".suppImg");
}
function calculMtn() {
    const chiffInputs = document.querySelectorAll(".chiff");
    chiffInputs.forEach((input) => {
        input.addEventListener("focus", () => {
            input.select();
        });
        input.addEventListener("input", () => {
            var _a;
            if (input.classList.contains("qte")) {
                const qte = input;
                const coutU = input.nextElementSibling;
                const montant = (_a = input.nextElementSibling) === null || _a === void 0 ? void 0 : _a.nextElementSibling;
                montant.textContent = (parseFloat(qte.value.replace(/\s/g, "")) * parseFloat(coutU.value.replace(/\s/g, ""))).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                if (montant.textContent === "NaN") {
                    montant.textContent = "0";
                }
            }
            else if (input.classList.contains("unit")) {
                const coutU = input;
                const qte = input.previousElementSibling;
                const montant = input.nextElementSibling;
                montant.textContent = (parseFloat(qte.value.replace(/\s/g, "")) * parseFloat(coutU.value.replace(/\s/g, ""))).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                if (montant.textContent === "NaN") {
                    montant.textContent = "0";
                }
            }
            calculTotal();
        });
    });
}
function watchInputs() {
    const chiffInputs = document.querySelectorAll(".chiff");
    chiffInputs.forEach((input) => {
        if (input.classList.contains("exlus")) {
            return;
        }
        input.addEventListener("input", (e) => {
            const target = e.target;
            target.value = target.value.replace(/[^0-9.]|(?<=\d)[.](?=.*[.])|([.]\d{2})\d+|^[.]/g, "$1");
            let value = input.value.replace(/\s/g, "");
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            input.value = value;
        });
        input.value = input.value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    });
}
function suppLine() {
    console.log(suppBtns);
    suppBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            var _a;
            const lineDiv = (_a = btn.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
            console.log("Div a supp : ", lineDiv);
            lineDiv.remove();
        });
    });
}
