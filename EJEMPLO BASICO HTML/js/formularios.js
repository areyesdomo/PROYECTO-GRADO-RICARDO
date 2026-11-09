"use strict";

const whatsappNumber = "593962749138";
const query = new URLSearchParams(window.location.search);
const categoryField = document.querySelector("#categoria");
const productField = document.querySelector("#detalles");
const category = query.get("categoria");
const product = query.get("producto");

if (categoryField && category) {
    categoryField.value = category;
}

if (productField && product) {
    productField.value = `Producto de interés: ${product}\n`;
}

document.querySelectorAll("form[data-whatsapp-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.reportValidity()) {
            return;
        }

        const fields = new FormData(form);
        const details = Array.from(fields.entries())
            .map(([label, value]) => `${label}: ${value}`)
            .join("\n");
        const message = `${form.dataset.message}\n\n${details}`;
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        window.location.assign(whatsappUrl);
    });
});
