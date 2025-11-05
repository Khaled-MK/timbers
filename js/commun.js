"use strict";
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
