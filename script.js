// Farcaster Mini App JavaScript
(async function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        redirectUrl: 'https://reframedaily.beehiiv.com/',
        splashDuration: 2000, // 2 seconds
        redirectDelay: 500 // Additional delay after splash
    };
    
    // DOM Elements
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const redirectBtn = document.getElementById('redirect-btn');
    
    // Import Farcaster SDK
    let sdk = null;
    try {
        const farcasterModule = await import('https://esm.sh/@farcaster/frame-sdk');
        sdk = farcasterModule.sdk;
        console.log('Farcaster SDK loaded successfully');
    } catch (error) {
        console.warn('Failed to load Farcaster SDK:', error);
    }
    
    // Initialize Mini App
    async function initializeMiniApp() {
        try {
            if (sdk) {
                // Get context information
                const context = await sdk.context;
                console.log('Farcaster context:', context);
                
                // Initialize SDK - using actions.ready() instead of sdk.ready()
                if (sdk.actions && sdk.actions.ready) {
                    await sdk.actions.ready();
                    console.log('Mini App ready');
                } else {
                    console.log('SDK ready function not available, continuing without it');
                }
            }
        } catch (error) {
            console.warn('SDK initialization error:', error);
        }
    }
    
    // Handle splash screen
    function handleSplashScreen() {
        setTimeout(() => {
            // Initialize Mini App after splash
            initializeMiniApp();
            
            // Hide splash and immediately redirect to newsletter
            splashScreen.classList.add('hidden');
            redirectToNewsletter();
        }, CONFIG.splashDuration);
    }
    
    // Redirect functionality
    function redirectToNewsletter() {
        try {
            // Add loading state
            document.body.classList.add('loading');
            redirectBtn.innerHTML = '<span class="button-text">🔄 Loading...</span>';
            
            setTimeout(() => {
                // Create iframe to embed the newsletter site
                const iframe = document.createElement('iframe');
                iframe.src = CONFIG.redirectUrl;
                iframe.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border: none;
                    z-index: 2000;
                    background: white;
                `;
                iframe.title = 'Reframe Daily Newsletter';
                
                // Add close button for iframe
                const closeBtn = document.createElement('button');
                closeBtn.innerHTML = '✕';
                closeBtn.style.cssText = `
                    position: fixed;
                    top: 10px;
                    right: 10px;
                    z-index: 2001;
                    background: rgba(0,0,0,0.7);
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 32px;
                    height: 32px;
                    cursor: pointer;
                    font-size: 14px;
                    line-height: 1;
                `;
                
                closeBtn.onclick = () => {
                    document.body.removeChild(iframe);
                    document.body.removeChild(closeBtn);
                    document.body.classList.remove('loading');
                    redirectBtn.innerHTML = '<span class="button-text">📰 Subscribe to Newsletter</span><span class="button-arrow">→</span>';
                };
                
                // Add iframe and close button to page
                document.body.appendChild(iframe);
                document.body.appendChild(closeBtn);
                
                // Remove loading state
                document.body.classList.remove('loading');
                
            }, CONFIG.redirectDelay);
            
        } catch (error) {
            console.error('Redirect error:', error);
            // Fallback to direct redirect
            window.location.href = CONFIG.redirectUrl;
        }
    }
    
    // Event Listeners
    function setupEventListeners() {
        // Redirect button click
        redirectBtn.addEventListener('click', redirectToNewsletter);
        
        // Handle keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target === redirectBtn) {
                redirectToNewsletter();
            }
        });
        
        // Handle SDK events if available
        if (sdk && sdk.on) {
            sdk.on('primaryButtonClicked', () => {
                console.log('Primary button clicked via SDK');
                redirectToNewsletter();
            });
            
            sdk.on('frameAdded', () => {
                console.log('Frame added to user collection');
            });
        }
    }
    
    // Auto-redirect functionality (optional)
    function autoRedirect() {
        // Check if this is a direct access vs embedded access
        const isEmbedded = window !== window.parent;
        const hasUserInteraction = sessionStorage.getItem('userInteracted');
        
        // Only auto-redirect if not embedded and user hasn't interacted
        if (!isEmbedded && !hasUserInteraction) {
            // Set a timer for auto-redirect (10 seconds)
            setTimeout(() => {
                if (!sessionStorage.getItem('userInteracted')) {
                    console.log('Auto-redirecting after timeout');
                    redirectToNewsletter();
                }
            }, 10000);
        }
    }
    
    // Track user interaction
    function trackUserInteraction() {
        sessionStorage.setItem('userInteracted', 'true');
    }
    
    // Add interaction tracking to main elements
    function setupInteractionTracking() {
        ['click', 'touchstart', 'keydown'].forEach(eventType => {
            document.addEventListener(eventType, trackUserInteraction, { once: true });
        });
    }
    
    // Performance monitoring
    function trackPerformance() {
        // Track page load time
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        });
        
        // Track when splash screen is hidden
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.target === splashScreen && 
                    splashScreen.classList.contains('hidden')) {
                    console.log('Splash screen hidden');
                    observer.disconnect();
                }
            });
        });
        
        observer.observe(splashScreen, { 
            attributes: true, 
            attributeFilter: ['class'] 
        });
    }
    
    // Error handling
    function setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('JavaScript error:', e.error);
        });
        
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
        });
    }
    
    // Initialize application
    function init() {
        console.log('Initializing Reframe Daily Mini App');
        
        // Setup all functionality
        setupEventListeners();
        setupInteractionTracking();
        setupErrorHandling();
        trackPerformance();
        
        // Handle splash screen
        handleSplashScreen();
        
        // Setup auto-redirect (optional)
        autoRedirect();
        
        console.log('Mini App initialization complete');
    }
    
    // Start the application when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Expose utilities for debugging
    window.ReframeDailyApp = {
        redirect: redirectToNewsletter,
        config: CONFIG,
        sdk: sdk
    };
    
})();
