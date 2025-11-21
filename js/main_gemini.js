/* =======================================================
 *
 * SCRIPT MODERNE - Sacha DOUBLET Portfolio
 * (100% Vanille JS)
 *
 * ======================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /**
     * 1. Gestion du Menu Mobile (Burger)
     */
    const navBurger = document.querySelector('.nav-burger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (navBurger && navMenu) {
        navBurger.addEventListener('click', () => {
            // Animation du burger
            navBurger.classList.toggle('toggle');
            // Ouverture/fermeture du menu
            navMenu.classList.toggle('nav-active');

            // Bloque le scroll du body quand le menu est ouvert
            document.body.style.overflow = navMenu.classList.contains('nav-active') ? 'hidden' : '';
        });
    }

    // Ferme le menu mobile lors du clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('nav-active')) {
                navBurger.classList.remove('toggle');
                navMenu.classList.remove('nav-active');
                document.body.style.overflow = '';
            }
        });
    });


    /**
     * 2. Gestion du système d'onglets (Tabs)
     */
    const tabContainer = document.querySelector('.tabs-nav');

    if (tabContainer) {
        const tabLinks = tabContainer.querySelectorAll('.tab-link');
        const tabContents = document.querySelectorAll('.tab-content');

        tabContainer.addEventListener('click', (e) => {
            const clickedTab = e.target.closest('.tab-link');

            if (!clickedTab) return; // Clic en dehors d'un bouton

            e.preventDefault();

            // Retirer 'active' de tous les liens et contenus
            tabLinks.forEach(link => link.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Ajouter 'active' au lien cliqué
            clickedTab.classList.add('active');

            // Afficher le contenu correspondant
            const tabId = clickedTab.dataset.tab;
            const correspondingContent = document.getElementById(tabId);
            if (correspondingContent) {
                correspondingContent.classList.add('active');
            }
        });
    }


    /**
     * 3. Animations au Scroll (Intersection Observer)
     */
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // L'élément est visible
                entry.target.classList.add('is-visible');
                // On arrête d'observer cet élément après l'animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Déclenche quand 10% de l'élément est visible
    });

    // Observer chaque élément animé
    animatedElements.forEach(el => {
        observer.observe(el);
    });


    /**
     * 4. Bouton "Retour en haut" (Go-To-Top)
     */
    const goToTopButton = document.querySelector('.goto-top');

    if (goToTopButton) {
        window.addEventListener('scroll', () => {
            // Affiche le bouton si on a scrollé de plus de 400px
            if (window.scrollY > 400) {
                goToTopButton.classList.add('visible');
            } else {
                goToTopButton.classList.remove('visible');
            }
        });

        // Gère le clic pour remonter
        goToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});