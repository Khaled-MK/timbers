"use strict";
const dispo = [
    { ref: "CH001", materiau: "MDF", epaisseur: "18mm", finition: "blanc", largeur: 45, hauteur: 95, quantite: 2 },
    { ref: "CH002", materiau: "MDF", epaisseur: "16mm", finition: "gris", largeur: 35, hauteur: 115, quantite: 3 },
    { ref: "CH003", materiau: "MDF", epaisseur: "14mm", finition: "noir", largeur: 75, hauteur: 135, quantite: 1 },
    { ref: "CH004", materiau: "MDF", epaisseur: "22mm", finition: "sonoma", largeur: 25, hauteur: 175, quantite: 4 },
    { ref: "CH005", materiau: "MDF", epaisseur: "18mm", finition: "blanc", largeur: 125, hauteur: 80, quantite: 2 },
    { ref: "CH006", materiau: "MDF", epaisseur: "22mm", finition: "gris", largeur: 85, hauteur: 215, quantite: 1 },
    { ref: "CH007", materiau: "MDF", epaisseur: "14mm", finition: "gris", largeur: 45, hauteur: 235, quantite: 3 },
    { ref: "CH008", materiau: "MEL", epaisseur: "8mm", finition: "gris", largeur: 40, hauteur: 255, quantite: 2 },
    { ref: "CH009", materiau: "MEL", epaisseur: "8mm", finition: "gris", largeur: 50, hauteur: 65, quantite: 1 },
    { ref: "CH010", materiau: "MEL", epaisseur: "8mm", finition: "sonoma", largeur: 45, hauteur: 295, quantite: 2 },
    { ref: "CH011", materiau: "MEL", epaisseur: "14mm", finition: "sonoma", largeur: 66, hauteur: 315, quantite: 1 },
    { ref: "CH012", materiau: "MEL", epaisseur: "18mm", finition: "sonoma", largeur: 33, hauteur: 335, quantite: 1 },
    { ref: "CH013", materiau: "MDF", epaisseur: "18mm", finition: "sonoma", largeur: 88, hauteur: 40, quantite: 2 },
    { ref: "CH014", materiau: "MEL", epaisseur: "18mm", finition: "blanc", largeur: 45, hauteur: 26, quantite: 1 },
    { ref: "CH015", materiau: "MDF", epaisseur: "18mm", finition: "noir", largeur: 65, hauteur: 150, quantite: 1 },
    { ref: "CH016", materiau: "MDF", epaisseur: "18mm", finition: "blanc", largeur: 21, hauteur: 77, quantite: 1 },
    { ref: "CH017", materiau: "MEL", epaisseur: "18mm", finition: "noir", largeur: 39, hauteur: 120, quantite: 1 },
    { ref: "CH018", materiau: "MDF", epaisseur: "18mm", finition: "blanc", largeur: 74, hauteur: 85, quantite: 1 },
    { ref: "CH019", materiau: "MEL", epaisseur: "18mm", finition: "noir", largeur: 54, hauteur: 65, quantite: 1 },
    { ref: "CH020", materiau: "MDF", epaisseur: "18mm", finition: "noir", largeur: 77, hauteur: 70, quantite: 1 },
    { ref: "CH021", materiau: "CTP", epaisseur: "3mm", finition: "sonoma", largeur: 77, hauteur: 70, quantite: 1 },
];
const largeur = document.getElementById("largeur");
const hauteur = document.getElementById("hauteur");
const form = document.getElementById("chuteForm");
const sens = document.getElementById("sens");
const materiau = document.getElementById("mat");
const finition = document.getElementById("finition");
const materiauxList = document.getElementById("materiaux");
const finitionsList = document.getElementById("finitions");
const resultDiv = document.getElementById("resultDiv");
watch();
document.addEventListener("DOMContentLoaded", () => {
    const materiauxUniques = new Set();
    const finitionsUniques = new Set();
    afficheChute(dispo);
    dispo.forEach((chute) => {
        materiauxUniques.add(chute.materiau + " " + chute.epaisseur);
        finitionsUniques.add(chute.finition);
    });
    materiauxUniques.forEach((materiau) => {
        const option = document.createElement("option");
        const value = materiau;
        option.value = value;
        materiauxList.appendChild(option);
    });
    finitionsUniques.forEach((finition) => {
        const option = document.createElement("option");
        const value = finition;
        option.value = value;
        finitionsList.appendChild(option);
    });
});
largeur.addEventListener("focus", () => {
    largeur.select();
});
hauteur.addEventListener("focus", () => {
    hauteur.select();
});
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const l = parseInt(largeur.value);
    const h = parseInt(hauteur.value);
    const mat = materiau.value.substring(0, materiau.value.indexOf(" ")).trim();
    const ep = materiau.value.substring(materiau.value.indexOf(" ") + 1).trim();
    const fin = finition.value.trim();
    resultDiv.replaceChildren();
    if (sens.checked) {
        console.log("Recherche en mode sensibilité activée");
        if (materiau.value.length === 0 && finition.value.length === 0) {
            dispo.forEach((chute) => {
                if (l <= chute.largeur && h <= chute.hauteur && chute.quantite > 0) {
                    afficheChute([chute]);
                }
            });
        }
        else if (materiau.value.length === 0) {
            dispo.forEach((chute) => {
                if (chute.finition.toLocaleLowerCase() === fin.toLocaleLowerCase()) {
                    if (l <= chute.largeur && h <= chute.hauteur && chute.quantite > 0) {
                        afficheChute([chute]);
                    }
                }
            });
        }
        else if (finition.value.length === 0) {
            dispo.forEach((chute) => {
                if (chute.materiau.toLocaleLowerCase() === mat.toLocaleLowerCase()) {
                    if (chute.epaisseur.toLocaleLowerCase() === ep.toLocaleLowerCase()) {
                        if (l <= chute.largeur && h <= chute.hauteur && chute.quantite > 0) {
                            afficheChute([chute]);
                        }
                    }
                }
            });
        }
        else {
            dispo.forEach((chute) => {
                if (chute.materiau.toLocaleLowerCase() === mat.toLocaleLowerCase()) {
                    if (chute.epaisseur.toLocaleLowerCase() === ep.toLocaleLowerCase()) {
                        if (chute.finition.toLocaleLowerCase() === fin.toLocaleLowerCase()) {
                            if (l <= chute.largeur && h <= chute.hauteur && chute.quantite > 0) {
                                afficheChute([chute]);
                            }
                        }
                    }
                }
            });
        }
    }
    else {
        if (materiau.value.length === 0 && finition.value.length === 0) {
            console.log("Sans les deux");
            dispo.forEach((chute) => {
                if (l <= chute.largeur && h <= chute.hauteur && chute.quantite > 0) {
                    afficheChute([chute]);
                }
                else if (h <= chute.largeur && l <= chute.hauteur && chute.quantite > 0) {
                    afficheChute([chute]);
                }
            });
        }
        else if (materiau.value.length === 0) {
            console.log("Sans materiaux");
            dispo.forEach((chute) => {
                if (chute.finition.toLocaleLowerCase() === fin.toLocaleLowerCase()) {
                    if (l <= chute.largeur && h <= chute.hauteur && chute.quantite > 0) {
                        afficheChute([chute]);
                    }
                    else if (h <= chute.largeur && l <= chute.hauteur && chute.quantite > 0) {
                        afficheChute([chute]);
                    }
                }
            });
        }
        else if (finition.value.length === 0) {
            console.log("Sans finition");
            dispo.forEach((chute) => {
                if (chute.materiau.toLocaleLowerCase() === mat.toLocaleLowerCase()) {
                    if (chute.epaisseur.toLocaleLowerCase() === ep.toLocaleLowerCase()) {
                        if (l <= chute.largeur && h <= chute.hauteur && chute.quantite > 0) {
                            afficheChute([chute]);
                        }
                        else if (h <= chute.largeur && l <= chute.hauteur && chute.quantite > 0) {
                            afficheChute([chute]);
                        }
                    }
                }
            });
        }
        else {
            console.log("strict");
            dispo.forEach((chute) => {
                if (chute.materiau.toLocaleLowerCase() === mat.toLocaleLowerCase()) {
                    if (chute.epaisseur.toLocaleLowerCase() === ep.toLocaleLowerCase()) {
                        if (chute.finition.toLocaleLowerCase() === fin.toLocaleLowerCase()) {
                            if (l <= chute.largeur && h <= chute.hauteur && chute.quantite > 0) {
                                afficheChute([chute]);
                            }
                            else if (h <= chute.largeur && l <= chute.hauteur && chute.quantite > 0) {
                                afficheChute([chute]);
                            }
                        }
                    }
                }
            });
        }
    }
});
function afficheChute(chutes) {
    chutes.forEach((chute) => {
        const refP = document.createElement("p");
        const largP = document.createElement("p");
        const hautP = document.createElement("p");
        const colP = document.createElement("p");
        const qteP = document.createElement("p");
        const div = document.createElement("div");
        div.classList.add("flex", "justify-between", "border-b-2", "border-stone-300");
        refP.classList.add("w-[13%]");
        largP.classList.add("w-[9%]", "text-right");
        hautP.classList.add("w-[9%]", "text-right");
        colP.classList.add("w-[50%]", "capitalize");
        qteP.classList.add("w-[6%]", "text-right");
        refP.textContent = chute.ref;
        largP.textContent = chute.largeur.toString();
        hautP.textContent = chute.hauteur.toString();
        colP.textContent = chute.materiau + " " + chute.epaisseur + " " + chute.finition;
        qteP.textContent = chute.quantite.toString();
        div.append(refP, largP, hautP, colP, qteP);
        resultDiv.appendChild(div);
    });
}
function watch() {
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
