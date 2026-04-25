// Main Navigation Logic
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenuClose && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });

        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
            document.body.style.overflow = 'auto'; // Enable scrolling
        });

        // Close on link click
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // Initialize LocalStorage dummy data if empty
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

    if (!localStorage.getItem('velocity_gallery')) {
        const dummyGallery = [
            { id: 1, title: 'Campus Tour', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop' },
            { id: 2, title: 'Classroom Session', url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600&auto=format&fit=crop' },
            { id: 3, title: 'Library', url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=600&auto=format&fit=crop' }
        ];
        localStorage.setItem('velocity_gallery', JSON.stringify(dummyGallery));
    }
});
