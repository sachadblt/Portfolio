// ===== CURSEUR PERSONNALISÉ (CORRIGÉ) =====
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    // On met à jour les coordonnées de la souris
    mouseX = e.clientX;
    mouseY = e.clientY;

    // On NE met PAS à jour le style ici, pour éviter les saccades
});

function animateFollower() {
    // Calcul de la distance
    const distX = mouseX - followerX;
    const distY = mouseY - followerY;

    // Interpolation linéaire pour le suiveur (le rend fluide)
    followerX += distX * 0.1;
    followerY += distY * 0.1;

    // MISE À JOUR FLUIDE :
    // Mettre à jour les DEUX curseurs dans l'animation frame
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';

    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';

    // Demander la prochaine frame d'animation
    requestAnimationFrame(animateFollower);
}

// Démarrer l'animation
animateFollower();

// Effet sur les éléments interactifs
const interactiveElements = document.querySelectorAll('a, button, .btn');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// ===== NAVIGATION =====
const navbar = document.getElementById('navbar');
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

// Scroll effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Menu burger
burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');

    // Animation des barres du burger
    const spans = burger.querySelectorAll('span');
    if (burger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Fermer le menu au clic sur un lien
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('active');

        const spans = burger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Active link sur scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-links a[href*=${sectionId}]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-links a[href*=${sectionId}]`)?.classList.remove('active');
        }
    });
});

// ===== EFFET DE TYPING =====
const typingText = document.querySelector('.typing-text');
const texts = [
    'Développeur Full-Stack',
    'Créateur d\'expériences web',
    'Passionné de technologie',
    'Étudiant en informatique'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 200;

function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 100;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 200;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingDelay = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingDelay = 500;
    }

    setTimeout(type, typingDelay);
}

// Démarrer l'animation de typing
setTimeout(type, 1000);

// ===== ANIMATION DES STATISTIQUES =====
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target;
            const target = parseInt(statNumber.dataset.target);
            let current = 0;
            const increment = target / 50;

            const updateCount = () => {
                current += increment;
                if (current < target) {
                    statNumber.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCount);
                } else {
                    statNumber.textContent = target;
                }
            };

            updateCount();
            statObserver.unobserve(statNumber);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number').forEach(stat => {
    statObserver.observe(stat);
});

// ===== ANIMATION DES BARRES DE COMPÉTENCES =====
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.skill-progress');
            if (progressBar) {
                progressBar.style.animation = 'fillBar 1.5s ease forwards';
            }
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-item').forEach(item => {
    skillObserver.observe(item);
});

// ===== ANIMATION AU SCROLL (FADE IN) =====
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Appliquer l'animation aux cartes de projet
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(card);
});

// Appliquer l'animation aux feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(card);
});

// Appliquer l'animation aux timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(item);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    // Parallax pour les shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.2);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });

    // Parallax pour le hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 700);
    }
});

// ===== EFFET DE GLITCH ALÉATOIRE =====
const glitchElement = document.querySelector('.glitch');
if (glitchElement) {
    setInterval(() => {
        if (Math.random() > 0.95) {
            glitchElement.style.textShadow = `
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #FF3366,
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #6366F1
            `;

            setTimeout(() => {
                glitchElement.style.textShadow = 'none';
            }, 100);
        }
    }, 3000);
}

// ===== FILTRAGE DES PROJETS (OPTIONNEL) =====
const projectFilters = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('.project-card');

projectFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        const filterValue = filter.dataset.filter;

        projectCards.forEach(card => {
            if (filterValue === 'all' || card.dataset.category === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });

        // Active filter
        projectFilters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
    });
});

// ===== ANIMATION DES FORMES FLOTTANTES =====
const floatingShapes = document.querySelectorAll('.shape');
floatingShapes.forEach((shape, index) => {
    // Position aléatoire initiale
    const randomX = Math.random() * 100;
    const randomY = Math.random() * 100;
    shape.style.left = randomX + '%';
    shape.style.top = randomY + '%';

    // Animation continue
    setInterval(() => {
        const currentLeft = parseFloat(shape.style.left);
        const currentTop = parseFloat(shape.style.top);

        const newLeft = currentLeft + (Math.random() * 2 - 1);
        const newTop = currentTop + (Math.random() * 2 - 1);

        shape.style.left = Math.max(0, Math.min(100, newLeft)) + '%';
        shape.style.top = Math.max(0, Math.min(100, newTop)) + '%';
    }, 50);
});

// ===== CHARGEMENT DE LA PAGE =====
window.addEventListener('load', () => {
    // Animation de chargement
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Animation du hero
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// ===== GESTION DES PERFORMANCES =====
// Désactiver les animations sur mobile pour meilleures performances
const isMobile = window.matchMedia('(max-width: 768px)').matches;

if (isMobile) {
    // Désactiver le curseur personnalisé
    if (cursor) cursor.style.display = 'none';
    if (cursorFollower) cursorFollower.style.display = 'none';
    document.body.style.cursor = 'auto';

    // Simplifier certaines animations
    floatingShapes.forEach(shape => {
        shape.style.animation = 'none';
    });
}

// ===== AJOUT : SÉLECTEUR DE THÈME =====
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeKey = 'sacha-portfolio-theme';

// Fonction pour appliquer le thème
function applyTheme(theme) {
    if (theme === 'light') {
        body.classList.add('light-theme');
    } else {
        body.classList.remove('light-theme');
    }
}

// Écouteur d'événement pour le bouton
themeToggle.addEventListener('click', () => {
    let currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
    let newTheme = currentTheme === 'light' ? 'dark' : 'light';

    applyTheme(newTheme);

    // Sauvegarder le choix
    localStorage.setItem(themeKey, newTheme);
});

// Vérifier le thème sauvegardé au chargement de la page
const savedTheme = localStorage.getItem(themeKey);

if (savedTheme) {
    applyTheme(savedTheme);
} else {
    // Par défaut, vérifier les préférences système
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const defaultTheme = prefersLight ? 'light' : 'dark';
    applyTheme(defaultTheme);
    localStorage.setItem(themeKey, defaultTheme);
}


// ===== CONSOLE MESSAGE =====
console.log('%c👋 Salut! ', 'font-size: 20px; font-weight: bold; color: #FF3366;');
console.log('%cTu regardes le code ? Tu es curieux, j\'aime ça ! 😄', 'font-size: 14px; color: #6366F1;');
console.log('%cSi tu as des questions ou des suggestions, n\'hésite pas à me contacter !', 'font-size: 12px; color: #FCD34D;');

// ===== DEBUG MODE (OPTIONNEL) =====
// Décommenter pour voir les sections et leur état de chargement
/*
const debugMode = false;
if (debugMode) {
    sections.forEach(section => {
        section.style.border = '2px solid red';
        console.log('Section:', section.id, 'Offset:', section.offsetTop);
    });
}
*/