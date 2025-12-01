 gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Fonction d'initialisation du site (vos animations existantes)
    function initSiteAnimations() {
        
        // 1. Animation de la Hero Section (déclenchée après le loader)
        const tlHero = gsap.timeline();
        tlHero.to('.hero-visual-wrapper', {
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: "power3.out" // Courbe plus douce style Apple
        })
        .to('.reveal-text', {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out"
        }, "-=1.0") // Commence avant la fin de l'image
        .to('.person-label', { // Animation des étiquettes noms
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.6
        }, "-=0.5");

        // 2. Vos autres animations ScrollTrigger
        // Hero Image Expansion on Scroll
        gsap.to('.hero-visual-wrapper', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'center top',
                scrub: 1,
            },
            width: '100vw',
            maxWidth: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
            borderRadius: '0px',
            ease: 'none'
        });

        // Scroll Reveals (Générique pour le reste du site)
        const revealElements = document.querySelectorAll('.bento-card, .level-col, .section-dark .mission-content');
        revealElements.forEach(el => {
            gsap.fromTo(el,
                { opacity: 0, y: 50 },
                {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out"
                }
            );
        });

        // Bento Grid Stagger
        gsap.fromTo('.bento-card',
            { opacity: 0, y: 40, scale: 0.98 },
            {
                scrollTrigger: {
                    trigger: '.bento-grid',
                    start: "top 75%",
                },
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out"
            }
        );
        
        // Animation des titres section par section (Split text effect simulation)
        const sectionTitles = document.querySelectorAll('h2');
        sectionTitles.forEach(title => {
             gsap.fromTo(title, 
                { opacity: 0, y: 30 },
                {
                    scrollTrigger: {
                        trigger: title,
                        start: "top 90%",
                    },
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power4.out"
                }
             );
        });
    }

    // --- LOGIQUE DU LOADER ---
    window.addEventListener("load", () => {
        const counter = { val: 0 };
        const counterElement = document.querySelector(".preloader-counter");
        const preloader = document.querySelector(".preloader");
        
        // Bloquer le scroll
        document.body.classList.add('loading');

        const tlLoader = gsap.timeline({
            onComplete: () => {
                document.body.classList.remove('loading');
                initSiteAnimations(); // Lance le site une fois fini
            }
        });

        // Animation du logo MSALES
        tlLoader.to('.preloader-logo', {
            opacity: 1,
            duration: 0.5,
            delay: 0.2
        });

        // Compteur de 0 à 100
        tlLoader.to(counter, {
            val: 100,
            duration: 1.5, // Durée du chargement simulé
            ease: "power2.inOut",
            onUpdate: () => {
                counterElement.innerText = Math.floor(counter.val);
            }
        });

        // Disparition des chiffres
        tlLoader.to('.preloader-content', {
            opacity: 0,
            y: -50,
            duration: 0.4,
            ease: "power2.in"
        });

        // Le rideau noir se lève (Effet Premium)
        tlLoader.to('.preloader', {
            height: 0,
            duration: 1.2,
            ease: "expo.inOut" // C'est LA courbe "Apple" par excellence
        });
        
        // Petit ajustement pour cacher le loader complètement
        tlLoader.set('.preloader', { display: 'none' });
    });