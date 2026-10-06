/**
 * First Breath Trust - Main JavaScript
 * Modern, smooth interactions and animations
 */

(function() {
    'use strict';

    // ============================================
    // Navigation
    // ============================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // Sticky navbar on scroll
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');

            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) {
                navToggle.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // Counter Animation
    // ============================================
    function animateCounters() {
        const counters = document.querySelectorAll('[data-count]');

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(counter);
        });
    }

    animateCounters();

    // ============================================
    // Fade In Animation on Scroll
    // ============================================
    const fadeElements = document.querySelectorAll('.section, .mission-card, .program-card, .testimonial-card, .vmv-card, .objective-card, .team-card, .uniqueness-card, .sustainability-card, .giving-card, .story-card, .gallery-item, .payment-card');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        fadeObserver.observe(el);
    });

    // ============================================
    // Donation Form
    // ============================================
    const donationForm = document.getElementById('donationForm');
    const amountBtns = document.querySelectorAll('.amount-btn');
    const customAmount = document.getElementById('customAmount');

    if (amountBtns.length > 0) {
        amountBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                amountBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                if (customAmount) {
                    customAmount.value = this.getAttribute('data-amount');
                }
            });
        });
    }

    if (customAmount) {
        customAmount.addEventListener('input', function() {
            amountBtns.forEach(b => b.classList.remove('active'));
        });
    }

    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const amount = customAmount && customAmount.value
                ? customAmount.value
                : document.querySelector('.amount-btn.active')?.getAttribute('data-amount');
            const name = document.getElementById('donorName')?.value;
            const email = document.getElementById('donorEmail')?.value;

            if (!amount || amount <= 0) {
                alert('Please select or enter a donation amount.');
                return;
            }

            if (!name || !email) {
                alert('Please fill in your name and email address.');
                return;
            }

            // Scroll to manual payment section
            const paymentSection = document.querySelector('.manual-payment-section');
            if (paymentSection) {
                paymentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Show a small toast
                showToast(`Thank you, ${name}! Please complete your $${amount} donation via MTN or Airtel Money below.`);
            } else {
                showToast(`Thank you, ${name}! Your donation pledge of $${amount} has been received.`);
            }
        });
    }

    // ============================================
    // Toast Notification System
    // ============================================
    function showToast(message, type = 'success') {
        const existing = document.querySelector('.fbt-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'fbt-toast';
        const bg = type === 'success' ? '#2A9D8F' : '#E76F51';
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%) translateY(-20px);
            background: ${bg};
            color: white;
            padding: 16px 28px;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.25);
            z-index: 9999;
            font-weight: 500;
            font-family: 'Inter', sans-serif;
            font-size: 0.95rem;
            max-width: 90%;
            text-align: center;
            opacity: 0;
            transition: all 0.4s ease;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
        });

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(-20px)';
            setTimeout(() => toast.remove(), 400);
        }, 5000);
    }

    // ============================================
    // Contact Form — handled by FormSubmit.co
    // Show success toast if redirected back with ?sent=true
    // ============================================
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('sent') === 'true') {
        showToast("Thank you! Your message has been sent. We'll get back to you soon.");
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    // ============================================
    // Footer Year
    // ============================================
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // ============================================
    // Gallery Lightbox (Simple)
    // ============================================
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const bg = this.querySelector('.gallery-bg');
            if (bg) {
                const imageUrl = bg.style.backgroundImage.replace(/url\(['"]?/, '').replace(/['"]?\)/, '');

                const lightbox = document.createElement('div');
                lightbox.style.cssText = `
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    cursor: pointer;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;

                const img = document.createElement('img');
                img.src = imageUrl;
                img.style.cssText = `
                    max-width: 90%;
                    max-height: 90%;
                    object-fit: contain;
                    border-radius: 8px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
                `;

                lightbox.appendChild(img);
                document.body.appendChild(lightbox);
                document.body.style.overflow = 'hidden';

                requestAnimationFrame(() => {
                    lightbox.style.opacity = '1';
                });

                lightbox.addEventListener('click', () => {
                    lightbox.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(lightbox);
                        document.body.style.overflow = '';
                    }, 300);
                });
            }
        });
    });

    // ============================================
    // Lazy Loading Images
    // ============================================
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ============================================
    // Parallax Effect for Hero
    // ============================================
    const heroBg = document.querySelector('.hero-bg');

    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                heroBg.style.transform = `scale(1.05) translateY(${scrolled * 0.3}px)`;
            }
        }, { passive: true });
    }

    // ============================================
    // Copy to Clipboard (for Mobile Money details)
    // ============================================
    window.copyToClipboard = function(elementId) {
        const el = document.getElementById(elementId);
        if (!el) return;

        const text = el.textContent.trim();

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                showCopiedFeedback(el);
            }).catch(() => {
                fallbackCopy(text, el);
            });
        } else {
            fallbackCopy(text, el);
        }
    };

    function fallbackCopy(text, el) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            showCopiedFeedback(el);
        } catch (err) {
            console.error('Copy failed:', err);
        }
        document.body.removeChild(textarea);
    }

    function showCopiedFeedback(el) {
        const btn = el.parentElement.querySelector('.copy-btn');
        if (!btn) return;

        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i>';
        btn.classList.add('copied');
        showToast('Copied to clipboard!');

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.remove('copied');
        }, 1500);
    }

    // ============================================
    // Console Welcome Message
    // ============================================
    console.log('%c First Breath Trust ', 'background: #2A9D8F; color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
    console.log('%c Transforming Lives, Creating Change ', 'color: #E76F51; font-size: 14px; font-style: italic;');

})();