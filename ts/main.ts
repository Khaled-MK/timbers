/** @format */
const allIputs = document.querySelectorAll("input") as NodeListOf<HTMLInputElement>;
const chiffInputs = document.querySelectorAll(".chiff") as NodeListOf<HTMLInputElement>;
const addImgs = document.querySelectorAll(".addImg") as NodeListOf<HTMLImageElement>;
const globDiv = document.getElementById("glob") as HTMLDivElement;
const startBtn = document.getElementById("start") as HTMLButtonElement;
const matInputs = document.querySelectorAll(".mat") as NodeListOf<HTMLInputElement>;
const coutHT = document.getElementById("coutHT") as HTMLParagraphElement;
const coutMC = document.getElementById("coutMC") as HTMLParagraphElement;
const surface = document.getElementById("surface") as HTMLInputElement;
const pourceMarge = document.getElementById("pourceMarge") as HTMLParagraphElement;
const marge = document.getElementById("marge") as HTMLParagraphElement;
const venteMC = document.getElementById("venteMC") as HTMLParagraphElement;
const venteHT = document.getElementById("venteHT") as HTMLParagraphElement;

let desigInputs = document.querySelectorAll(".desig, .mat") as NodeListOf<HTMLInputElement>;
let suppBtns = document.querySelectorAll(".suppImg") as NodeListOf<HTMLImageElement>;
let matx: any[] = [];
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
         const matxList = document.getElementById("materiaux") as HTMLDListElement;
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
   const surface = document.getElementById("surface") as HTMLInputElement;
   if (surface.value.length <= 0 || parseFloat(surface.value.replace(/\s/g, "")) <= 0) {
      surface.classList.add("border-red-600", "text-red-600", "placeholder-red-600", "text-sm", "normal-case");
      surface.placeholder = "Ce champs est obligatoire";

      surface.addEventListener("focus", () => {
         surface.classList.remove("border-red-600", "text-red-600", "placeholder-red-600", "text-sm", "normal-case");
         surface.placeholder = "";
      });
      return;
   } else {
      const startDiv = startBtn.parentElement as HTMLDivElement;
      const bigDiv = startDiv.parentElement as HTMLDivElement;
      const h2 = bigDiv.firstElementChild as HTMLHeadingElement;
      const smDiv = h2.nextElementSibling as HTMLDivElement;

      Array.from(smDiv.children).forEach((el) => {
         const element = el as HTMLDivElement;
         element.style.width = "100%";
         element.style.marginTop = "0.5rem";
         element.style.marginBottom = "0.5rem";
         // element.classList.remove("w-1/4");
         // element.classList.add("my-2");
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
   const input = e.target as HTMLInputElement;
   if (input.value.length > 0) {
      if (input.classList.contains("desig") || input.classList.contains("mat")) {
         modifDisignInputs(e.target as HTMLInputElement);
      }
      if (input.classList.contains("chiff")) {
         calculMtn();
         watchInputs();
      }
   }
});

globDiv.addEventListener("click", (e) => {
   const target = e.target as HTMLElement;
   if (target.classList.contains("suppImg")) {
      const div = target.parentElement?.parentElement as HTMLDivElement;
      div.remove();
      calculTotal();
   }
});

// matInputs.forEach(() => {
//    input.addEventListener("input", () => {

//    })
// })

pourceMarge.addEventListener("click", () => {
   const input = document.createElement("input");
   input.type = "text";
   input.value = pourceMarge.textContent?.replace("%", "") || "0";
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
   const input = document.createElement("input");
   input.type = "text";
   input.value = marge.textContent?.replace("%", "") || "0";
   marge.replaceWith(input);
   input.classList.add("chiff", "text-right", "bg-transparent", "border-b-2", "border-stone-300", "outline-none");
   watchInputs();
   input.select();

   input.addEventListener("input", () => {
      let value = parseFloat(input.value.replace(/\s/g, ""));
      if (input.value.trim() === "" || isNaN(parseFloat(input.value))) {
         marge.textContent = "0";
         pourceMarge.textContent = "0 %";
         venteMC.textContent = "0 / m²";
         venteHT.textContent = "0";
      } else {
         marge.textContent = value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      }
      // calculTotal();
      pourceMarge.textContent = ((value / (parseFloat(coutHT.textContent?.replace(/\s/g, "") || "0") || 1)) * 100).toFixed(0) + " %";
      venteHT.textContent = (parseFloat(coutHT.textContent?.replace(/\s/g, "") || "0") + value).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      venteMC.textContent = (parseFloat(venteHT.textContent.replace(/\s/g, "")) / parseFloat(surface.value.replace(/\s/g, ""))).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " / m²";
   });

   input.addEventListener("change", () => {
      if (input.value.trim() === "" || isNaN(parseFloat(input.value))) {
         marge.textContent = "0";
      } else {
         marge.textContent = parseFloat(input.value.replace(/\s/g, ""))
            .toFixed(0)
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      }
      input.replaceWith(marge);
   });
});

venteHT.addEventListener("click", () => {
   const input = document.createElement("input");
   input.type = "text";
   input.value = venteHT.textContent?.replace("%", "") || "0";
   venteHT.replaceWith(input);
   input.classList.add("chiff", "text-right", "bg-transparent", "border-b-2", "border-stone-300", "outline-none");
   watchInputs();
   input.select();

   input.addEventListener("input", () => {
      let value = parseFloat(input.value.replace(/\s/g, ""));
      if (!isNaN(value)) {
         venteHT.textContent = value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      }
      // calculTotal();
      marge.textContent = (value - (parseFloat(coutHT.textContent?.replace(/\s/g, "") || "0") || 0)).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

      pourceMarge.textContent = ((parseFloat(marge.textContent.replace(/\s/g, "") || "0") / (parseFloat(coutHT.textContent?.replace(/\s/g, "")) || 1)) * 100).toFixed(0) + " %";

      venteMC.textContent = (parseFloat(venteHT.textContent.replace(/\s/g, "")) / parseFloat(surface.value.replace(/\s/g, ""))).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " / m²";
   });

   input.addEventListener("change", () => {
      if (input.value.trim() === "" || isNaN(parseFloat(input.value))) {
         venteHT.textContent = "0";
      } else {
         venteHT.textContent = parseFloat(input.value.replace(/\s/g, ""))
            .toFixed(0)
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      }
      input.replaceWith(venteHT);
   });
});

venteMC.addEventListener("click", () => {
   const input = document.createElement("input");
   input.type = "text";
   input.value = venteMC.textContent?.replace("%", "") || "0";
   venteMC.replaceWith(input);
   input.classList.add("chiff", "text-right", "bg-transparent", "border-b-2", "border-stone-300", "outline-none");
   watchInputs();
   input.select();

   input.addEventListener("input", () => {
      let value = parseFloat(input.value.replace(/\s/g, ""));
      if (!isNaN(value)) {
         venteMC.textContent = value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      }
      // calculTotal();
      venteHT.textContent = (parseFloat(venteMC.textContent.replace(/\s/g, "")) * parseFloat(surface.value.replace(/\s/g, ""))).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      marge.textContent = (parseFloat(venteHT.textContent.replace(/\s/g, "")) - (parseFloat(coutHT.textContent?.replace(/\s/g, "") || "0") || 0)).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      pourceMarge.textContent = ((parseFloat(marge.textContent.replace(/\s/g, "") || "0") / (parseFloat(coutHT.textContent?.replace(/\s/g, "")) || 1)) * 100).toFixed(0) + " %";
   });

   input.addEventListener("change", () => {
      if (input.value.trim() === "" || isNaN(parseFloat(input.value))) {
         venteMC.textContent = "0";
      } else {
         venteMC.textContent =
            parseFloat(input.value.replace(/\s/g, ""))
               .toFixed(0)
               .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " / m²";
      }
      input.replaceWith(venteMC);
   });
});

function calculTotal() {
   const totaux = document.querySelectorAll(".mtn") as NodeListOf<HTMLParagraphElement>;
   const sousTotaux = document.querySelectorAll(".sous-t") as NodeListOf<HTMLParagraphElement>;

   sousTotaux.forEach((total) => {
      let sum = 0;
      totaux.forEach((mtn) => {
         if (mtn.classList.contains(total.classList[1])) {
            sum += parseFloat(mtn.textContent?.replace(/\s/g, "") || "0");
         }
      });

      total.textContent = sum.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
   });

   let total = 0;
   totaux.forEach((mtn) => {
      total += parseFloat(mtn.textContent?.replace(/\s/g, "") || "0");
   });
   coutHT.textContent = total.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
   coutMC.textContent = (total / parseFloat(surface.value.replace(/\s/g, ""))).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " / m²";

   if (coutMC.textContent === "NaN / m²") {
      coutMC.textContent = "";
   }

   pourceMarge.classList.remove("text-white");
   marge.textContent = (total * (parseFloat(pourceMarge.textContent?.replace(/\s/g, "").replace("%", "") || "0") / 100)).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
   venteHT.textContent = (total + parseFloat(marge.textContent?.replace(/\s/g, "") || "0")).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
   venteMC.textContent = (parseFloat(venteHT.textContent.replace(/\s/g, "")) / parseFloat(surface.value.replace(/\s/g, ""))).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " / m²";
}

async function modifDisignInputs(input: HTMLInputElement) {
   if (input.classList.contains("desig")) {
      const sibling = input.nextElementSibling as HTMLInputElement;
      const div = input.parentElement?.parentElement as HTMLDivElement;
      const typeClass = input.classList[0];
      const section = input.parentElement?.parentElement?.parentElement as HTMLDivElement;
      const dupDiv = div.cloneNode(true) as HTMLDivElement;
      const image = document.createElement("img");
      const para = document.createElement("p");

      section.append(dupDiv);

      const dupDesig = dupDiv.querySelector(".desig") as HTMLInputElement;
      dupDesig.value = "";

      para.classList.add(typeClass, "desig", "w-2/4");
      image.classList.add("suppImg", "h-[1.2rem]", "opacity-80", "hover:opacity-100", "cursor-pointer");

      image.src = "./imgs/glob/supp.svg";
      image.alt = "";

      para.innerText = input.value;

      if (sibling) {
         // console.log("Sibling : ", sibling);
         sibling.classList.remove("hidden");
         sibling.focus();
         sibling.before(para as HTMLElement);
         sibling.after(image as HTMLElement);

         sibling.addEventListener("change", async () => {
            const uPrice = sibling.parentElement?.nextElementSibling?.nextElementSibling as HTMLInputElement;
            matx.forEach((mat) => {
               const existingMat = mat.materiaux + " " + mat.epaisseur + " " + mat.finition + " " + mat.hauteur;
               if (existingMat === sibling.value) {
                  uPrice.value = mat.prix.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
               }
            });
         });
      } else {
         const secPara = document.createElement("p");
         secPara.classList.add(typeClass, "mat", "w-[40%]");

         input.parentElement?.append(para, secPara, image);
      }

      input.remove();
      return;
   }

   if (input.classList.contains("mat")) {
      const typeClass = input.classList[0];
      const sibling = input.previousElementSibling as HTMLElement;
      // console.log(sibling);
      const para = document.createElement("p");
      para.classList.add(typeClass, "mat", "w-[40%]");
      para.innerText = input.value;
      if (sibling) {
         sibling.after(para as HTMLElement);
      }
      input.remove();
      return;
   }

   suppBtns = document.querySelectorAll(".suppImg") as NodeListOf<HTMLImageElement>;
}

function calculMtn() {
   const chiffInputs = document.querySelectorAll(".chiff") as NodeListOf<HTMLInputElement>;
   chiffInputs.forEach((input) => {
      input.addEventListener("focus", () => {
         input.select();
      });
      input.addEventListener("input", () => {
         if (input.classList.contains("qte")) {
            const qte = input;
            const coutU = input.nextElementSibling as HTMLInputElement;
            const montant = input.nextElementSibling?.nextElementSibling as HTMLParagraphElement;

            montant.textContent = (parseFloat(qte.value.replace(/\s/g, "")) * parseFloat(coutU.value.replace(/\s/g, ""))).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            if (montant.textContent === "NaN") {
               montant.textContent = "0";
            }
         } else if (input.classList.contains("unit")) {
            const coutU = input;
            const qte = input.previousElementSibling as HTMLInputElement;
            const montant = input.nextElementSibling as HTMLParagraphElement;

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

function suppLine() {
   console.log(suppBtns);
   suppBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
         const lineDiv = btn.parentElement?.parentElement as HTMLDivElement;
         console.log("Div a supp : ", lineDiv);
         lineDiv.remove();
      });
   });
}
