// ========================================
// INFINITE REASONS CAROUSEL
// Auto-scrolling carousel with seamless loop
// ========================================

const reasonsData = [
    {
        number: 1,
        title: "Maîtrise ton temps",
        desc: "Travaille quand tu veux, où tu veux. Pas de quotas, pas d'horaires imposés.",
        image: "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=400&q=80",
        alt: "Maîtrise ton temps"
    },
    {
        number: 2,
        title: "Choisis ton rôle",
        desc: "Découvreur ou Business. Simple, clair, évolutif selon tes envies.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80",
        alt: "Choisis ton rôle"
    },
    {
        number: 3,
        title: "Gagne sur chaque vente",
        desc: "Commission transparente et traçable. Pas de calculs opaques, revenu immédiat.",
        image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&q=80",
        alt: "Gagne sur chaque vente"
    },
    {
        number: 4,
        title: "Recommande ou vends",
        desc: "Parle simplement des produits ou vends directement sur le terrain.",
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&q=80",
        alt: "Recommande ou vends"
    },
    {
        number: 5,
        title: "Apprends à ton rythme",
        desc: "Modules simples, vidéos courtes. Tu apprends, tu appliques, tu progresses.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80",
        alt: "Apprends à ton rythme"
    },
    {
        number: 6,
        title: "Accompagnement permanent",
        desc: "CRM clair, équipe de soutien, coaching. Tu n'es jamais seul.",
        image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&q=80",
        alt: "Accompagnement permanent"
    },
    {
        number: 7,
        title: "Développe ton réseau",
        desc: "Invite d'autres partenaires et touche des commissions sur leur succès.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
        alt: "Développe ton réseau"
    },
    {
        number: 8,
        title: "Concilie vie pro",
        desc: "Garde ton emploi ou tes activités. MSALES s'adapte à ta vie.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80",
        alt: "Concilie vie pro"
    },
    {
        number: 9,
        title: "Évolue selon tes résultats",
        desc: "Découvreur → Business → Chef de zone. La croissance est entre tes mains.",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&q=80",
        alt: "Évolue selon tes résultats"
    },
    {
        number: 10,
        title: "Communauté libre",
        desc: "Une communauté qui avance, partage et réussit ensemble.",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80",
        alt: "Communauté libre"
    }
];

// Create a reason card element
function createReasonCard(reason) {
    return `
        <div class="reason-card">
            <div class="reason-image-placeholder">
                <img src="${reason.image}" alt="${reason.alt}" loading="lazy">
            </div>
            <div class="reason-content">
                <span class="reason-number">Raison ${reason.number}</span>
                <h3 class="reason-title">${reason.title}</h3>
                <p class="reason-desc">${reason.desc}</p>
                <a href="#contact" class="reason-link">En savoir plus →</a>
            </div>
        </div>
    `;
}

// Initialize the infinite carousel
function initInfiniteReasonsCarousel() {
    const container = document.getElementById('reasonsScroll');
    if (!container) return;

    // Create the track
    const track = document.createElement('div');
    track.className = 'reasons-track';

    // Generate cards HTML (triple the cards for seamless loop)
    const cardsHTML = reasonsData.map(createReasonCard).join('');
    track.innerHTML = cardsHTML + cardsHTML + cardsHTML; // Triple for seamless loop

    // Append track to container
    container.appendChild(track);

    // Wait for images to load, then start animation
    setTimeout(() => {
        startInfiniteScroll(track);
    }, 100);
}

// Start the infinite scroll animation
function startInfiniteScroll(track) {
    const cards = track.querySelectorAll('.reason-card');
    if (cards.length === 0) return;

    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded, carousel will display without animation');
        return;
    }

    const cardWidth = cards[0].offsetWidth;
    const gap = 24; // Gap between cards (from CSS)
    const totalCardWidth = cardWidth + gap;
    const totalCards = reasonsData.length;
    const totalWidth = totalCardWidth * totalCards;

    // Set initial position
    gsap.set(track, { x: 0 });

    // Create the infinite loop animation
    const duration = 30; // 30 seconds for one complete loop

    gsap.to(track, {
        x: -totalWidth,
        duration: duration,
        ease: "none",
        repeat: -1,
        modifiers: {
            x: function (x) {
                // Seamless loop: when we've moved one set of cards, reset position
                const xValue = parseFloat(x);
                return `${xValue % totalWidth}px`;
            }
        }
    });

    // Pause on hover for better UX
    track.addEventListener('mouseenter', () => {
        gsap.to(track, { timeScale: 0.3, duration: 0.5, ease: "power2.out" });
    });

    track.addEventListener('mouseleave', () => {
        gsap.to(track, { timeScale: 1, duration: 0.5, ease: "power2.in" });
    });

    // Removed ScrollTrigger entrance animation to ensure visibility
    // The cards will be visible immediately
    gsap.set(cards, { opacity: 1, y: 0 });
}

// Initialize when DOM is ready
function initCarousel() {
    // Wait a bit to ensure GSAP is loaded
    setTimeout(() => {
        initInfiniteReasonsCarousel();
    }, 100);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);
} else {
    initCarousel();
}
