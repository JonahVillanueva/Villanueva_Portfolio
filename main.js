document.addEventListener("DOMContentLoaded", () => {



const themeToggle = document.getElementById("themeToggle");
const body = document.body;

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    body.classList.add("light-mode");
}

function updateThemeButton() {

    const isLightMode = body.classList.contains("light-mode");

    themeToggle.setAttribute(
        "aria-label",
        isLightMode ? "Switch to dark mode" : "Switch to light mode"
    );

    themeToggle.setAttribute(
        "title",
        isLightMode ? "Switch to dark mode" : "Switch to light mode"
    );

}

updateThemeButton();

themeToggle.addEventListener("click", () => {

    body.classList.toggle("light-mode");

    const currentTheme = body.classList.contains("light-mode")
        ? "light"
        : "dark";

    localStorage.setItem("portfolio-theme", currentTheme);

    updateThemeButton();

});




const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );

    menuToggle.innerHTML = isOpen
        ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"></path></svg>'
        : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"></path></svg>';

});


navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");

        menuToggle.innerHTML =
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"></path></svg>';

    });

});




const idHanger = document.getElementById("idHanger");

if (idHanger) {

    idHanger.addEventListener("click", () => {

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        idHanger.classList.remove("is-swinging");

        
        void idHanger.offsetWidth;

        idHanger.classList.add("is-swinging");

    });


    idHanger.addEventListener("animationend", (event) => {

        if (event.animationName === "bigSwing") {
            idHanger.classList.remove("is-swinging");
        }

    });

}




const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    if (!name || !email || !message) {

        formMessage.textContent = "Please complete all fields.";
        return;

    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        formMessage.textContent = "Please enter a valid email address.";
        return;

    }

    const recipient = "yourname@email.com";

    const subject = encodeURIComponent(
        "Portfolio Contact from " + name
    );

    const body = encodeURIComponent(
        "Name: " + name +
        "\nEmail: " + email +
        "\n\nMessage:\n" + message
    );

    formMessage.textContent = "Opening your email application...";

    window.location.href =
        "mailto:" + recipient +
        "?subject=" + subject +
        "&body=" + body;

});




const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

function updateActiveLink() {

    let currentSection = "home";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }

    });

    navigationLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveLink);

updateActiveLink();

});
