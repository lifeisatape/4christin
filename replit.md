# Reframe Daily - Farcaster Mini App

## Overview

Reframe Daily is a Farcaster Mini App that serves as a newsletter delivery platform for daily Farcaster updates and insights. The application is designed as a simple web-based mini app that integrates with the Farcaster ecosystem to provide users with curated daily content about the Farcaster social protocol.

## System Architecture

### Frontend Architecture
The application uses a vanilla JavaScript approach with HTML5, CSS3, and ES6+ JavaScript. The architecture follows a single-page application (SPA) pattern with:

- **Static HTML structure** with semantic markup and comprehensive meta tags for social sharing
- **CSS-based styling** using modern CSS features including CSS Grid, Flexbox, and CSS animations
- **JavaScript module system** leveraging ES6 imports and async/await patterns
- **Progressive enhancement** ensuring the app works with or without the Farcaster SDK

### Integration Layer
The app integrates with the Farcaster ecosystem through:

- **Farcaster SDK** imported dynamically from CDN (`@farcaster/frame-sdk`)
- **Mini App Configuration** via `.well-known/farcaster.json` for discovery and capabilities
- **Frame meta tags** for proper rendering within Farcaster clients

## Key Components

### 1. Splash Screen System
- **Purpose**: Provides a branded loading experience while initializing the Farcaster SDK
- **Implementation**: CSS-based animations with JavaScript timing control
- **Duration**: 2-second splash with additional 500ms delay before redirect

### 2. Farcaster SDK Integration
- **Loading Strategy**: Dynamic import with graceful fallback if SDK fails to load
- **Context Access**: Retrieves user context from Farcaster when available
- **Error Handling**: Comprehensive try-catch blocks to prevent crashes

### 3. Meta Tag Configuration
- **Social Sharing**: Complete Open Graph and Twitter Card implementation
- **SEO Optimization**: Standard meta tags for search engine visibility
- **Frame Integration**: Farcaster-specific meta tags for mini app functionality

### 4. Configuration Management
- **Centralized Config**: JavaScript object containing all app settings
- **External Links**: Primary redirect to Beehiiv newsletter platform
- **Timing Controls**: Configurable delays and durations

## Data Flow

1. **App Initialization**: HTML loads with splash screen visible
2. **SDK Loading**: Asynchronous import of Farcaster SDK from CDN
3. **Context Retrieval**: If SDK loads successfully, fetch user context
4. **Splash Display**: Show branded loading screen for configured duration
5. **Content Transition**: Hide splash, show main content area
6. **External Redirect**: Navigate to newsletter platform

The app follows a linear flow pattern optimized for quick loading and immediate user value delivery.

## External Dependencies

### Core Dependencies
- **Farcaster Frame SDK**: `@farcaster/frame-sdk` loaded from esm.sh CDN
- **Beehiiv Platform**: External newsletter service for content delivery

### Asset Dependencies
- **Vector Graphics**: SVG files for logos and branding
- **Font Stack**: System fonts with fallback chain for cross-platform compatibility

### CDN Strategy
The application uses CDN-based loading for the Farcaster SDK to ensure:
- Reduced bundle size
- Automatic updates from Farcaster team
- Graceful degradation if CDN is unavailable

## Deployment Strategy

### Static Hosting
The application is designed for static hosting environments:
- **No server-side processing** required
- **Direct file serving** of HTML, CSS, JS, and assets
- **CDN-friendly** with cacheable static resources

### Farcaster Integration
- **Well-known endpoint**: `.well-known/farcaster.json` for app discovery
- **Account association**: Cryptographic signatures for app verification
- **Capability declaration**: Frame launch and URL opening permissions

### Performance Considerations
- **Minimal JavaScript bundle**: Only essential code included
- **Optimized loading**: Async SDK loading prevents blocking
- **Fast transitions**: CSS-based animations for smooth UX

## Changelog

- June 28, 2025. Initial setup
- June 28, 2025. Fixed Farcaster SDK integration (version "next", actions.ready(), actions.openUrl())
- June 28, 2025. Implemented iframe-based newsletter loading instead of external redirect
- June 28, 2025. Added close button for iframe navigation
- June 28, 2025. Implemented auto-redirect after splash screen (no manual button click required)
- June 28, 2025. Deployed to app4christin.replit.app and updated all meta tags and manifest with production URLs

## User Preferences

Preferred communication style: Simple, everyday language.