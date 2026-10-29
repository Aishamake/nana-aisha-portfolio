
/* =========================================================
   NANA AISHA - PROFESSIONAL PORTFOLIO
   Main JavaScript File
   Multi-Page Portfolio Website
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. WEBSITE CONFIGURATION
       ===================================================== */

    // Replace with your real professional email address.
    const portfolioEmail = "nanaaisha780@gmail.com.com";

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    const scrollBehavior = prefersReducedMotion.matches
        ? "instant"
        : "smooth";


    /* =====================================================
       2. SELECT HTML ELEMENTS
       ===================================================== */

    const header = document.getElementById("header");

    const navbar = document.getElementById("navbar");

    const menuToggle = document.getElementById(
        "menuToggle"
    );

    const navLinks = document.querySelectorAll(
        ".nav-link"
    );

    const backToTop = document.getElementById(
        "backToTop"
    );

    const filterButtons = document.querySelectorAll(
        ".filter-btn"
    );

    const projectCards = document.querySelectorAll(
        ".project-card"
    );

    const contactForm = document.getElementById(
        "contactForm"
    );

    const formStatus = document.getElementById(
        "formStatus"
    );

    const currentYear = document.getElementById(
        "currentYear"
    );


    /* =====================================================
       3. MOBILE NAVIGATION MENU
       ===================================================== */

    function openMobileMenu() {

        if (!navbar || !menuToggle) return;

        navbar.classList.add("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        }

    }


    function closeMobileMenu() {

        if (!navbar || !menuToggle) return;

        navbar.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

    }


    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navbar.classList.contains(
                "active"
            );

            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }

        });


        // Close menu when navigation link is clicked.
        navLinks.forEach(link => {

            link.addEventListener("click", () => {
                closeMobileMenu();
            });

        });


        // Close menu when clicking outside.
        document.addEventListener("click", event => {

            const insideNavbar = navbar.contains(
                event.target
            );

            const insideToggle = menuToggle.contains(
                event.target
            );

            if (
                navbar.classList.contains("active") &&
                !insideNavbar &&
                !insideToggle
            ) {
                closeMobileMenu();
            }

        });


        // Close menu when Escape key is pressed.
        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                closeMobileMenu();
            }

        });


        // Close menu when desktop screen is restored.
        window.addEventListener("resize", () => {

            if (window.innerWidth > 992) {
                closeMobileMenu();
            }

        });

    }


    /* =====================================================
       4. STICKY HEADER
       ===================================================== */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }


    /* =====================================================
       5. ACTIVE NAVIGATION FOR MULTIPLE PAGES
       ===================================================== */

    function updateActiveNavigation() {

        let currentPage = window.location.pathname
            .split("/")
            .pop();

        if (!currentPage) {
            currentPage = "index.html";
        }

        currentPage = currentPage.toLowerCase();

        navLinks.forEach(link => {

            const linkURL = new URL(
                link.getAttribute("href"),
                window.location.href
            );

            let linkPage = linkURL.pathname
                .split("/")
                .pop()
                .toLowerCase();

            if (!linkPage) {
                linkPage = "index.html";
            }

            const isActive =
                linkPage === currentPage;

            link.classList.toggle(
                "active",
                isActive
            );

            if (isActive) {
                link.setAttribute(
                    "aria-current",
                    "page"
                );
            } else {
                link.removeAttribute(
                    "aria-current"
                );
            }

        });

    }


    /* =====================================================
       6. SMOOTH SCROLLING
       ===================================================== */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.getElementById(
                targetId.substring(1)
            );

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: scrollBehavior,
                block: "start"
            });

            // Update URL without refreshing page.
            if (window.history.replaceState) {

                window.history.replaceState(
                    null,
                    "",
                    targetId
                );

            }

            closeMobileMenu();

        });

    });


    /* =====================================================
       7. PROJECT FILTERING
       ===================================================== */

    function filterProjects(category) {

        projectCards.forEach(card => {

            const cardCategories = (
                card.dataset.category || ""
            ).split(/\s+/);

            const shouldShow =
                category === "all" ||
                cardCategories.includes(category);

            card.classList.toggle(
                "hidden",
                !shouldShow
            );

            card.hidden = !shouldShow;

        });

    }


    if (filterButtons.length > 0) {

        filterButtons.forEach(button => {

            button.addEventListener("click", () => {

                const selectedCategory =
                    button.dataset.filter || "all";

                filterButtons.forEach(btn => {

                    btn.classList.remove("active");

                    btn.setAttribute(
                        "aria-pressed",
                        "false"
                    );

                });

                button.classList.add("active");

                button.setAttribute(
                    "aria-pressed",
                    "true"
                );

                filterProjects(selectedCategory);

            });

        });


        // Initialize active project filter.
        const initialFilter =
            document.querySelector(".filter-btn.active")
            || filterButtons[0];

        if (initialFilter) {

            filterButtons.forEach(button => {

                button.classList.toggle(
                    "active",
                    button === initialFilter
                );

                button.setAttribute(
                    "aria-pressed",
                    button === initialFilter
                        ? "true"
                        : "false"
                );

            });

            filterProjects(
                initialFilter.dataset.filter || "all"
            );

        }

    }


    /* =====================================================
       8. SCROLL REVEAL ANIMATIONS
       ===================================================== */

    const revealSelectors = [
        ".section-heading",
        ".about-image",
        ".about-content",
        ".skill-category",
        ".timeline-item",
        ".project-card",
        ".service-card",
        ".contact-info",
        ".contact-form-wrapper",
        ".education-card",
        ".experience-card",
        ".page-header-content",
        ".about-story",
        ".skills-category",
        ".project-details",
        ".service-details"
    ];

    const revealElements = document.querySelectorAll(
        revealSelectors.join(", ")
    );


    if (
        "IntersectionObserver" in window &&
        !prefersReducedMotion.matches
    ) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "active"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -30px 0px"
            }
        );


        revealElements.forEach(element => {

            element.classList.add("reveal");

            revealObserver.observe(element);

        });

    }


    /* =====================================================
       9. BACK TO TOP BUTTON
       ===================================================== */

    function updateBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 400) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    }


    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: scrollBehavior
            });

        });

    }


    /* =====================================================
       10. CONTACT FORM VALIDATION
       ===================================================== */

    function showFormStatus(message, type) {

        if (!formStatus) return;

        formStatus.textContent = message;

        formStatus.className = "form-status";

        if (type) {
            formStatus.classList.add(type);
        }

    }


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                showFormStatus("", "");

                const nameInput = contactForm.querySelector(
                    '[name="name"]'
                );

                const emailInput = contactForm.querySelector(
                    '[name="email"]'
                );

                const subjectInput = contactForm.querySelector(
                    '[name="subject"]'
                );

                const messageInput = contactForm.querySelector(
                    '[name="message"]'
                );


                if (
                    !nameInput ||
                    !emailInput ||
                    !subjectInput ||
                    !messageInput
                ) {

                    showFormStatus(
                        "Contact form configuration is incomplete.",
                        "error"
                    );

                    return;
                }


                const name = nameInput.value.trim();
                const email = emailInput.value.trim();
                const subject = subjectInput.value.trim();
                const message = messageInput.value.trim();


                // Check empty fields.
                if (
                    !name ||
                    !email ||
                    !subject ||
                    !message
                ) {

                    showFormStatus(
                        "Please fill in all required fields.",
                        "error"
                    );

                    return;
                }


                // Validate email format.
                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailPattern.test(email)) {

                    showFormStatus(
                        "Please enter a valid email address.",
                        "error"
                    );

                    emailInput.focus();

                    return;
                }


                // Check whether contact email is configured.
                if (
                    portfolioEmail === "nanaaisha780@gmail.com"
                ) {

                    showFormStatus(
                        "The contact email is not configured yet.",
                        "error"
                    );

                    return;
                }


                // Prepare email subject.
                const emailSubject = encodeURIComponent(
                    `Portfolio Enquiry: ${subject}`
                );


                // Prepare email body.
                const emailBody = encodeURIComponent(
                    `Hello Nana Aisha,\n\n` +
                    `${message}\n\n` +
                    `-------------------------\n` +
                    `Name: ${name}\n` +
                    `Email: ${email}\n` +
                    `Subject: ${subject}\n`
                );


                // Open visitor's email application.
                const mailtoURL =
                    `mailto:${portfolioEmail}` +
                    `?subject=${emailSubject}` +
                    `&body=${emailBody}`;


                window.location.href = mailtoURL;


                showFormStatus(
                    "Your email application should open with your message ready. Please press Send in your email application.",
                    "success"
                );

                // Do not reset the form automatically.
                // JavaScript cannot confirm email delivery.

            }
        );

    }


    /* =====================================================
       11. AUTOMATIC COPYRIGHT YEAR
       ===================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       12. SCROLL EVENT OPTIMIZATION
       ===================================================== */

    let scrollTicking = false;

    function handleScroll() {

        if (!scrollTicking) {

            window.requestAnimationFrame(() => {

                updateHeader();

                updateBackToTop();

                scrollTicking = false;

            });

            scrollTicking = true;

        }

    }


    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );


    /* =====================================================
       13. INITIALIZE PORTFOLIO
       ===================================================== */

    updateHeader();

    updateActiveNavigation();

    updateBackToTop();


    console.log(
        "Nana Aisha Portfolio loaded successfully."
    );

});
