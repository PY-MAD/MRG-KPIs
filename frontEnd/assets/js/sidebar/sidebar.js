document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector("aside");
    const sidebarTrigger = document.querySelector("[sidenav-trigger]");

    sidebarTrigger.addEventListener("click", function () {
        sidebar.classList.toggle("sm:hidden");
        sidebar.classList.toggle("translate-x-0");
        sidebar.classList.toggle("left-0");
    });
});