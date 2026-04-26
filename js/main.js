// Main Site Logic
document.addEventListener('DOMContentLoaded', () => {
    // --- Mouse Glow Effect ---
    const cursorGlow = document.createElement('div');
    cursorGlow.id = 'cursor-glow';
    document.body.appendChild(cursorGlow);

    window.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenuClose && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
            document.body.style.overflow = 'hidden';
        });

        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
            document.body.style.overflow = 'auto';
        });

        const mobileLinks = mobileMenu.querySelectorAll('.mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // --- Custom Smooth Scrolling with Easing ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            e.preventDefault();
            
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 80;
            const startPosition = window.scrollY;
            const distance = targetPosition - startPosition;
            const duration = 1200; // 1.2 seconds for luxurious feel
            let start = null;

            // easeOutQuart: fast start, super smooth deceleration
            const easeOutQuart = (t) => 1 - (--t) * t * t * t;

            const animation = (currentTime) => {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const progress = Math.min(timeElapsed / duration, 1);
                const easeProgress = easeOutQuart(progress);
                
                window.scrollTo(0, startPosition + distance * easeProgress);

                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                } else {
                    history.replaceState(null, null, targetId);
                }
            };

            requestAnimationFrame(animation);
        });
    });

    // --- Active Link highlighting on Scroll ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-velocity-blue', 'font-semibold');
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('text-velocity-blue', 'font-semibold');
            }
        });
        
        // Floating Pill Navigation
        const desktopNav = document.getElementById('desktop-nav');
        const navPill = document.getElementById('nav-pill');
        if (desktopNav && navPill) {
            const activeLink = Array.from(navLinks).find(link => link.getAttribute('href').includes(current) && current !== '');
            if (activeLink) {
                navPill.style.opacity = '1';
                navPill.style.width = `${activeLink.offsetWidth}px`;
                navPill.style.left = `${activeLink.offsetLeft}px`;
            } else {
                navPill.style.opacity = '0';
            }
        }

        // Parallax Image Scrolling (Desktop only)
        if (window.innerWidth >= 768) {
            const parallaxElements = document.querySelectorAll('.parallax');
            parallaxElements.forEach(el => {
                const speed = el.dataset.speed || 0.15;
                el.style.transform = `translateY(${window.scrollY * speed}px)`;
            });
        } else {
            document.querySelectorAll('.parallax').forEach(el => el.style.transform = 'none');
        }
        
        // Sticky Nav visual tweak
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-md');
            navbar.classList.remove('shadow-sm');
        } else {
            navbar.classList.remove('shadow-md');
            navbar.classList.add('shadow-sm');
        }
    });

    // --- Intersection Observer for Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Optional: Stop observing after animation triggers once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-anim').forEach(el => {
        observer.observe(el);
    });

    // --- Google Reviews Marquee ---
    const reviews = [
        { name: "Archit Sinha", rating: 5, text: "Great learning experience here .....enabled me to score 95.4% in my 12th boards" },
        { name: "Paritosh Shrivastava", rating: 5, text: "Kool Saurav Sir is best he’ll definitely help you to reach IIT" },
        { name: "Akhilesh Tiwari", rating: 5, text: "Thanks velocity classes for giving us quality of education, I watched Rahul Goswami sir video and shared with my friend and relatives." },
        { name: "Swati Bhagat", rating: 5, text: "Best place for education👌... not for only education... it's helpful for improvement others activities for our children....👍👍👍 Good for NEET prepration..." },
        { name: "Alok Singh", rating: 5, text: "I would say this coaching institute is the best to crack any competition exam. For this I call Velocity Education the way to success." },
        { name: "Praveen Kumar", rating: 5, text: "It's a recommended institute for classes upto 12and and preparation of competitive exams" },
    ];

    const marqueeContainer = document.getElementById('reviews-marquee');
    if (marqueeContainer) {
        // Create review cards
        const createReviewHTML = (review) => `
            <a href="https://maps.app.goo.gl/XY1paXyXwGSoBwg38" target="_blank" class="block bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md border border-slate-100 min-w-[300px] max-w-[300px] shrink-0 mx-3 hover:shadow-lg transition-all hover:-translate-y-1">
                <div class="flex items-center gap-3 mb-3">
                    <div class="w-10 h-10 rounded-full bg-velocity-blue text-white flex items-center justify-center font-bold text-lg">
                        ${review.name.charAt(0)}
                    </div>
                    <div>
                        <p class="font-bold text-slate-800 text-sm">${review.name}</p>
                        <div class="flex text-velocity-yellow text-sm">
                            ${Array(review.rating).fill('<i class="ph-fill ph-star"></i>').join('')}
                        </div>
                    </div>
                </div>
                <p class="text-slate-600 text-sm italic line-clamp-4">"${review.text}"</p>
            </a>
        `;

        // Add original set
        let reviewsHTML = reviews.map(createReviewHTML).join('');
        // Add duplicated set for seamless looping
        reviewsHTML += reviews.map(createReviewHTML).join('');
        
        marqueeContainer.innerHTML = reviewsHTML;
    }

    // --- Dummy Data Initialization for CMS ---
    if (!localStorage.getItem('velocity_achievements')) {
        const dummyAchievements = [
            { id: 1, title: 'Rahul Sharma', description: 'Secured AIR 45 in JEE Advanced.', year: '2025', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop' },
            { id: 2, title: 'Priya Singh', description: 'AIR 102 in NEET UG.', year: '2025', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop' }
        ];
        localStorage.setItem('velocity_achievements', JSON.stringify(dummyAchievements));
    }

    if (!localStorage.getItem('velocity_events')) {
        const dummyEvents = [
            { id: 1, title: 'Career Guidance Seminar', date: '2025-11-15', description: 'Expert talk on choosing the right engineering branch.' },
            { id: 2, title: 'Annual Parents Meet', date: '2025-10-10', description: 'Discussing student progress and future strategies.' }
        ];
        localStorage.setItem('velocity_events', JSON.stringify(dummyEvents));
    }

    if (!localStorage.getItem('velocity_v2_migrated')) {
        localStorage.removeItem('velocity_gallery');
        localStorage.setItem('velocity_v2_migrated', 'true');
    }

    if (!localStorage.getItem('velocity_gallery')) {
        const dummyGallery = [
            { id: 1, title: 'Institute Frontage', url: 'https://lh3.googleusercontent.com/p/AF1QipN3diH9LacCd1xkOPmdeFPyJNZFxPbLpuNRPRhj=s1600' },
            { id: 2, title: 'Modern Classroom', url: 'https://lh3.googleusercontent.com/p/AF1QipNNUQZy7uenIFznzt6OiaLn3IlMsilhgAyO9Ydf=s1600' },
            { id: 3, title: 'Information Poster', url: 'https://lh3.googleusercontent.com/p/AF1QipOktGhely9MdTIi7VdYLzsYBpxbCUSmUlx_kDzu=s1600' },
            { id: 4, title: 'Main Building', url: 'https://lh3.googleusercontent.com/p/AF1QipM9cMim0LrHGSxl1BRod_MHvaUB2hQFp9y1WuRi=s1600' }
        ];
        localStorage.setItem('velocity_gallery', JSON.stringify(dummyGallery));
    }

    // --- Render CMS Content into single page ---
    
    // Achievements
    const achievementsGrid = document.getElementById('achievements-grid');
    if (achievementsGrid) {
        const achievements = JSON.parse(localStorage.getItem('velocity_achievements') || '[]');
        if (achievements.length === 0) {
            achievementsGrid.innerHTML = '<p class="col-span-full text-center text-slate-500">No achievements recorded yet.</p>';
        } else {
            achievements.forEach(item => {
                achievementsGrid.innerHTML += `
                    <div class="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
                        <div class="aspect-square bg-slate-200 overflow-hidden relative">
                            <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
                            <div class="absolute top-3 right-3 bg-velocity-yellow text-velocity-dark text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                ${item.year}
                            </div>
                        </div>
                        <div class="p-5 text-center">
                            <h3 class="font-bold text-lg text-slate-800">${item.title}</h3>
                            <p class="text-sm text-velocity-blue font-medium mt-1">${item.description}</p>
                        </div>
                    </div>
                `;
            });
        }
    }

    // Events Timeline
    const eventsTimeline = document.getElementById('events-timeline');
    if (eventsTimeline) {
        const events = JSON.parse(localStorage.getItem('velocity_events') || '[]');
        if (events.length === 0) {
            eventsTimeline.innerHTML = '<p class="text-center text-slate-500 relative z-10 bg-slate-50 py-4">No events scheduled.</p>';
        } else {
            events.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach((item, index) => {
                const isEven = index % 2 === 0;
                const sideClass = isEven ? 'md:pr-12 md:text-right md:ml-0' : 'md:pl-12 md:ml-auto';
                const dotPosition = isEven ? 'md:left-auto md:-right-[10px]' : 'md:-left-[10px]';
                
                const dateObj = new Date(item.date);
                const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

                eventsTimeline.innerHTML += `
                    <div class="relative w-full md:w-1/2 mb-8 pl-12 md:pl-0 ${sideClass}">
                        <!-- Timeline Dot -->
                        <div class="absolute top-1 left-0 ${dotPosition} w-5 h-5 bg-velocity-yellow border-4 border-white rounded-full z-10 shadow-md hidden md:block"></div>
                        <!-- Mobile Dot -->
                        <div class="absolute top-1 left-[14px] w-5 h-5 bg-velocity-yellow border-4 border-white rounded-full z-10 shadow-md md:hidden"></div>
                        
                        <div class="bg-white p-6 rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow">
                            <span class="text-xs font-bold text-velocity-blue uppercase tracking-wider">${dateStr}</span>
                            <h3 class="font-heading text-xl font-bold text-slate-800 mt-2 mb-2">${item.title}</h3>
                            <p class="text-slate-600 text-sm">${item.description}</p>
                        </div>
                    </div>
                `;
            });
        }
    }

    // Gallery
    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
        const gallery = JSON.parse(localStorage.getItem('velocity_gallery') || '[]');
        if (gallery.length === 0) {
            galleryGrid.innerHTML = '<p class="text-center text-slate-500">No images in gallery.</p>';
        } else {
            gallery.forEach(item => {
                galleryGrid.innerHTML += `
                    <div class="masonry-item group rounded-xl">
                        <img src="${item.url}" alt="${item.title}">
                        <div class="masonry-overlay rounded-b-xl">
                            <span class="font-heading font-bold text-lg">${item.title}</span>
                        </div>
                    </div>
                `;
            });
        }
    }
});
