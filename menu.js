document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");

    if (toggle && menu) {
        toggle.addEventListener("click", () => {
            menu.classList.toggle("open");
        });
    }
});
