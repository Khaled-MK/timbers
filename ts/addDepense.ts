/** @format */

const justifInput = document.getElementById("justif") as HTMLInputElement;

watch();

justifInput.addEventListener("change", (event) => {
   console.log("fichiers : ", justifInput.files);
   const showImageDiv = document.getElementById("showImageDiv") as HTMLDivElement;
   //    const fileName = justifInput.files?.[0]?.name;
   showImgs(event, showImageDiv);
   justifInput.parentElement?.classList.add("hidden");
});

async function showImgs(e: any, div: HTMLDivElement) {
   if (!e.target.files) {
      //ajouter une erreur
   } else if (e.target.files) {
      //   const imagesIn = e.target.files;

      //   document.getElementById("error").innerText = "";
      let file = e.target.files[0];
      const reader = new FileReader();

      reader.addEventListener("load", (event) => {
         const imgUrl = event.target?.result as string;

         //  const bDiv = document.createElement("div");
         const imgDiv = document.createElement("div");
         const img = document.createElement("img");
         const suppImg = document.createElement("img");

         //  bDiv.classList.add("w-11/12", "flex", "justify-center");
         imgDiv.classList.add("w-48", "h-80", "overflow-hidden", "rounded-lg", "relative");
         img.classList.add("object-cover");
         suppImg.src = "/imgs/glob/supp.svg";
         suppImg.classList.add("absolute", "top-2", "right-2", "w-7", "h-7", "shadow-md", "shadow-white", "cursor-pointer");

         img.src = imgUrl;

         img.addEventListener(
            "load",
            () => {
               const canvas = document.createElement("canvas");
               canvas.width = 192;
               canvas.height = 341;
               const ctx = canvas.getContext("2d");
               ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
               let newImgUrl = ctx?.canvas.toDataURL("image/jpeg");
               let img2 = document.createElement("img");
               img2.src = newImgUrl as string;
               img2.classList.add("images");
               imgDiv.append(img2, suppImg);
               //    bDiv.append(imgDiv);
               div.prepend(imgDiv);
            },
            { once: true }
         );
         suppImg.addEventListener("click", () => {
            const div = suppImg.parentElement as HTMLDivElement;
            justifInput.parentElement?.classList.remove("hidden");
            div.remove();
         });
      });
      reader.readAsDataURL(file);

      //   return imagesIn;
   }
   //    else {
   //       location.href = "/erreur";
   //    }
}
