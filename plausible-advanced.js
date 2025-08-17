/**
 * Advanced Plausible Analytics Tracking
 * Track section engagement, scroll depth, time spent, etc.
 * Compatible with GitHub Pages + Plausible
 */

class PlausibleAdvancedTracking {
    constructor() {
        this.sections = ['hero', 'about', 'journey', 'projects', 'philosophy', 'skills', 'contact'];
        this.sectionTimes = {};
        this.currentSection = null;
        this.startTime = Date.now();
        this.scrollMilestones = new Set();
        this.engaged = false;
        this.sessionEvents = [];
        
        this.init();
    }

    init() {
        // Wait for Plausible to load
        this.waitForPlausible(() => {
            this.setupSectionTracking();
            this.setupScrollTracking();
            this.setupEngagementTracking();
            this.setupInteractionTracking();
            this.setupPerformanceTracking();
            
            // Track initial page load
            this.trackEvent('Page Load', {
                referrer: document.referrer || 'Direct',
                device: this.getDeviceType(),
                viewport: `${window.innerWidth}x${window.innerHeight}`
            });
        });
    }

    waitForPlausible(callback) {
        if (window.plausible) {
            callback();
        } else {
            setTimeout(() => this.waitForPlausible(callback), 100);
        }
    }

    // Track custom events with Plausible
    trackEvent(eventName, properties = {}) {
        if (window.plausible) {
            // Convert properties to plausible format
            const props = {};
            Object.entries(properties).forEach(([key, value]) => {
                props[key] = String(value);
            });
            
            window.plausible(eventName, { props });
            console.log(`📊 [Analytics] ${eventName}:`, props);
        }
    }

    // Section engagement tracking
    setupSectionTracking() {
        const sections = document.querySelectorAll('section[id]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const sectionId = entry.target.id;
                
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    this.enterSection(sectionId);
                } else if (!entry.isIntersecting && this.currentSection === sectionId) {
                    this.exitSection(sectionId);
                }
            });
        }, {
            threshold: [0.5],
            rootMargin: '-10% 0px -10% 0px'
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    enterSection(sectionId) {
        // Exit previous section
        if (this.currentSection && this.currentSection !== sectionId) {
            this.exitSection(this.currentSection);
        }

        this.currentSection = sectionId;
        this.sectionTimes[sectionId] = {
            start: Date.now(),
            visits: (this.sectionTimes[sectionId]?.visits || 0) + 1
        };

        this.trackEvent('Section Enter', {
            section: sectionId,
            visit_number: this.sectionTimes[sectionId].visits
        });
    }

    exitSection(sectionId) {
        if (this.sectionTimes[sectionId]?.start) {
            const timeSpent = Date.now() - this.sectionTimes[sectionId].start;
            const timeInSeconds = Math.round(timeSpent / 1000);
            
            // Only track if spent more than 3 seconds
            if (timeInSeconds >= 3) {
                this.trackEvent('Section Time', {
                    section: sectionId,
                    time_seconds: timeInSeconds,
                    engagement_level: this.getEngagementLevel(timeInSeconds)
                });
            }

            delete this.sectionTimes[sectionId].start;
        }
    }

    getEngagementLevel(seconds) {
        if (seconds < 10) return 'Low';
        if (seconds < 30) return 'Medium';
        if (seconds < 60) return 'High';
        return 'Very High';
    }

    // Scroll depth tracking
    setupScrollTracking() {
        let maxScroll = 0;
        
        const trackScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset;
            
            const scrollPercent = Math.round((scrollTop + windowHeight) / documentHeight * 100);
            
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                
                // Track milestone scrolls
                [25, 50, 75, 90].forEach(milestone => {
                    if (scrollPercent >= milestone && !this.scrollMilestones.has(milestone)) {
                        this.scrollMilestones.add(milestone);
                        this.trackEvent('Scroll Milestone', {
                            depth_percent: milestone,
                            time_to_scroll: Math.round((Date.now() - this.startTime) / 1000)
                        });
                    }
                });
            }
        };

        window.addEventListener('scroll', trackScroll, { passive: true });
    }

    // Engagement tracking
    setupEngagementTracking() {
        let engagementTimer;
        
        const resetEngagementTimer = () => {
            clearTimeout(engagementTimer);
            engagementTimer = setTimeout(() => {
                if (!this.engaged) {
                    this.engaged = true;
                    this.trackEvent('User Engaged', {
                        time_to_engage: Math.round((Date.now() - this.startTime) / 1000)
                    });
                }
            }, 15000); // 15 seconds = engaged
        };

        // Track user activity
        ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
            document.addEventListener(event, resetEngagementTimer, { passive: true });
        });

        // Track time milestones
        [30, 60, 120, 300].forEach(seconds => {
            setTimeout(() => {
                this.trackEvent('Time Milestone', {
                    seconds_on_page: seconds,
                    current_section: this.currentSection || 'unknown'
                });
            }, seconds * 1000);
        });
    }

    // Interaction tracking
    setupInteractionTracking() {
        // Navigation clicks
        document.addEventListener('click', (e) => {
            const element = e.target.closest('a, button');
            if (!element) return;

            // Navigation menu
            if (element.matches('.nav-links a')) {
                this.trackEvent('Navigation Click', {
                    destination: element.getAttribute('href')?.replace('#', ''),
                    text: element.textContent?.trim(),
                    current_section: this.currentSection || 'unknown'
                });
            }

            // Project navigation
            if (element.matches('.nav-arrow')) {
                this.trackEvent('Project Navigation', {
                    direction: element.classList.contains('prev') ? 'Previous' : 'Next',
                    current_section: this.currentSection || 'unknown'
                });
            }

            // Language switch
            if (element.matches('.lang-btn')) {
                this.trackEvent('Language Switch', {
                    language: element.id?.replace('lang-', ''),
                    from_section: this.currentSection || 'unknown'
                });
            }

            // Contact links
            if (element.matches('.contact-link')) {
                this.trackEvent('Contact Interaction', {
                    type: element.href.includes('mailto:') ? 'Email' : 'External Link',
                    url: element.href,
                    from_section: this.currentSection || 'unknown'
                });
            }

            // CTA buttons
            if (element.matches('.cta-button')) {
                this.trackEvent('CTA Click', {
                    text: element.textContent?.trim(),
                    from_section: this.currentSection || 'unknown',
                    time_before_click: Math.round((Date.now() - this.startTime) / 1000)
                });
            }
        });

        // Track hover on important elements
        const importantElements = document.querySelectorAll('.profile-photo, .project-card, .skill-icon');
        importantElements.forEach(element => {
            let hoverStart;
            
            element.addEventListener('mouseenter', () => {
                hoverStart = Date.now();
            });
            
            element.addEventListener('mouseleave', () => {
                if (hoverStart) {
                    const hoverTime = Date.now() - hoverStart;
                    if (hoverTime > 1000) { // Only track hovers > 1 second
                        this.trackEvent('Element Hover', {
                            element: element.className,
                            hover_duration: Math.round(hoverTime / 1000),
                            section: this.currentSection || 'unknown'
                        });
                    }
                }
            });
        });
    }

    // Performance tracking
    setupPerformanceTracking() {
        window.addEventListener('load', () => {
            // Track page load performance
            if (performance.timing) {
                const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                const domReady = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
                
                this.trackEvent('Performance', {
                    load_time_ms: loadTime,
                    dom_ready_ms: domReady,
                    load_time_category: this.getLoadTimeCategory(loadTime)
                });
            }

            // Track largest contentful paint
            if ('PerformanceObserver' in window) {
                new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    
                    this.trackEvent('LCP', {
                        lcp_ms: Math.round(lastEntry.startTime),
                        lcp_category: this.getLCPCategory(lastEntry.startTime)
                    });
                }).observe({ entryTypes: ['largest-contentful-paint'] });
            }
        });
    }

    getLoadTimeCategory(ms) {
        if (ms < 1000) return 'Excellent';
        if (ms < 3000) return 'Good';
        if (ms < 5000) return 'Average';
        return 'Poor';
    }

    getLCPCategory(ms) {
        if (ms < 2500) return 'Good';
        if (ms < 4000) return 'Needs Improvement';
        return 'Poor';
    }

    getDeviceType() {
        const width = window.innerWidth;
        if (width < 768) return 'Mobile';
        if (width < 1024) return 'Tablet';
        return 'Desktop';
    }

    // Track page exit
    trackPageExit() {
        const sessionDuration = Date.now() - this.startTime;
        const maxScrollDepth = Math.max(...this.scrollMilestones, 0);
        
        this.trackEvent('Page Exit', {
            session_duration: Math.round(sessionDuration / 1000),
            max_scroll_depth: maxScrollDepth,
            sections_visited: Object.keys(this.sectionTimes).length,
            was_engaged: this.engaged
        });
    }
}

// Initialize advanced tracking
let advancedTracking;

document.addEventListener('DOMContentLoaded', () => {
    advancedTracking = new PlausibleAdvancedTracking();
    
    // Track page exit
    window.addEventListener('beforeunload', () => {
        if (advancedTracking) {
            advancedTracking.trackPageExit();
        }
    });
});

// Global access for debugging
window.analytics = advancedTracking;