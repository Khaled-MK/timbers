/** @format */
const dispo = [
   { ref: "CH001", largeur: 45, hauteur: 95, quantite: 2 },
   { ref: "CH002", largeur: 35, hauteur: 115, quantite: 3 },
   { ref: "CH003", largeur: 75, hauteur: 135, quantite: 1 },
   { ref: "CH004", largeur: 25, hauteur: 175, quantite: 4 },
   { ref: "CH005", largeur: 125, hauteur: 80, quantite: 2 },
   { ref: "CH006", largeur: 85, hauteur: 215, quantite: 1 },
   { ref: "CH007", largeur: 45, hauteur: 235, quantite: 3 },
   { ref: "CH008", largeur: 40, hauteur: 255, quantite: 2 },
   { ref: "CH009", largeur: 50, hauteur: 65, quantite: 1 },
   { ref: "CH010", largeur: 45, hauteur: 295, quantite: 2 },
   { ref: "CH011", largeur: 66, hauteur: 315, quantite: 1 },
   { ref: "CH012", largeur: 33, hauteur: 335, quantite: 1 },
   { ref: "CH013", largeur: 88, hauteur: 40, quantite: 2 },
   { ref: "CH014", largeur: 45, hauteur: 26, quantite: 1 },
   { ref: "CH015", largeur: 65, hauteur: 150, quantite: 1 },
   { ref: "CH016", largeur: 21, hauteur: 77, quantite: 1 },
   { ref: "CH017", largeur: 39, hauteur: 120, quantite: 1 },
   { ref: "CH018", largeur: 74, hauteur: 85, quantite: 1 },
   { ref: "CH019", largeur: 54, hauteur: 65, quantite: 1 },
   { ref: "CH020", largeur: 77, hauteur: 70, quantite: 1 },
];

const largeur = document.getElementById("largeur") as HTMLInputElement;
const hauteur = document.getElementById("hauteur") as HTMLInputElement;
const form = document.getElementById("chuteForm") as HTMLFormElement;
const sens = document.getElementById("sens") as HTMLInputElement;

watch();

largeur.addEventListener("focus", () => {
   largeur.select();
});

hauteur.addEventListener("focus", () => {
   hauteur.select();
});

form.addEventListener("submit", (e) => {
   e.preventDefault();
   const resultDiv = document.getElementById("resultDiv") as HTMLDivElement;
   const l = parseInt(largeur.value);
   const h = parseInt(hauteur.value);
   let result: { ref: string; largeur: number; hauteur: number; quantite: number }[] = [];

   resultDiv.replaceChildren();

   if (sens.checked) {
      console.log("Recherche en mode sensibilité activée");
      dispo.forEach((chute) => {
         if (l <= chute.largeur && h <= chute.hauteur && chute.quantite > 0) {
            result.push(chute);
         }
      });
   } else {
      dispo.forEach((chute) => {
         if (l <= chute.largeur && h <= chute.hauteur && chute.quantite > 0) {
            result.push(chute);
         } else if (l <= chute.hauteur && h <= chute.largeur && chute.quantite > 0) {
            result.push(chute);
         }
      });
   }

   result.forEach((chute) => {
      const largP = document.createElement("p");
      const hautP = document.createElement("p");
      const qteP = document.createElement("p");
      const refP = document.createElement("p");
      const div = document.createElement("div");
      div.classList.add("flex", "justify-between", "border-b-2", "border-stone-300", "text-right");

      largP.classList.add("w-1/6");
      hautP.classList.add("w-1/6");
      qteP.classList.add("w-1/6");
      refP.classList.add("w-1/6", "text-left");

      refP.textContent = chute.ref;
      largP.textContent = chute.largeur.toString();
      hautP.textContent = chute.hauteur.toString();
      qteP.textContent = chute.quantite.toString();

      div.append(refP, largP, hautP, qteP);
      resultDiv.appendChild(div);
   });
});

function watch() {
   const chiffInputs = document.querySelectorAll(".chiff") as NodeListOf<HTMLInputElement>;
   //    console.log("input chiffre : ", chiffInputs);
   chiffInputs.forEach((input) => {
      if (input.classList.contains("exlus")) {
         return;
      }
      input.addEventListener("input", (e) => {
         const target = e.target as HTMLInputElement;
         target.value = target.value.replace(/[^0-9.]|(?<=\d)[.](?=.*[.])|([.]\d{2})\d+|^[.]/g, "$1");
         let value = input.value.replace(/\s/g, "");
         value = value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
         input.value = value;
      });

      input.value = input.value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
   });
}
