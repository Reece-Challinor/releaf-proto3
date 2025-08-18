# RELEAF

## Overview

RELEAF is a regulatory automation platform designed to streamline environmental compliance processes with the tagline "Less red tape. More wild places." The application provides automated tools for processing permits, managing compliance requirements, and navigating state-specific regulations across Texas, Colorado, and Arkansas. Built as a modern web application, it features a clean, mobile-first interface with a retro-modern outdoor aesthetic that emphasizes usability and environmental themes.

## Recent Changes (Version 1.5 - January 2025)

### Brand System Implementation
- Implemented unified retro-modern outdoor theme with vintage landscape aesthetics
- Created custom brand components: AppShell, HeroWave, StepperDots, ChoiceButton, SSOButtons, FormStack
- Applied consistent forest/outdoor color palette throughout application
- Added proper navigation between all screens with back buttons

### API Integration  
- Added health check endpoint at `/api/health`
- Created state regulations endpoint at `/api/regulations/:state`
- Implemented permits listing endpoint at `/api/permits`
- Added automation status endpoint at `/api/automation/status`

### Navigation Flow
- Home → Login / Permits / Calendar screens
- Permits → Calendar → Checkout (coming soon)
- All pages have proper back navigation to previous screens

## User Preferences

Preferred communication style: Simple, everyday language.
Code organization: Minimal files, consolidated components where possible.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Libraries**: Dual approach combining Chakra UI for accessibility-ready components and Radix UI primitives with Tailwind CSS for styling
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and caching
- **Styling**: Tailwind CSS with custom CSS variables for theming, PostCSS for processing

### Component Design System
- **Design Tokens**: Custom color palette with forest/nature themes (forest, olive, moss, sage, sand, bone)
- **Typography**: System fonts with serif display fonts for headings
- **Component Library**: Extensive set of reusable UI components built on Radix UI primitives
- **Theme System**: CSS custom properties with consistent design tokens for colors, spacing, and typography

### Backend Architecture
- **Server Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle with PostgreSQL as the target database
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development
- **API Design**: RESTful API with `/api` prefix for all endpoints

### Data Storage Solutions
- **Database**: PostgreSQL configured through Drizzle ORM
- **Schema Management**: Centralized schema definitions in shared directory
- **Migrations**: Drizzle migrations stored in `/migrations` directory
- **Development Storage**: In-memory storage implementation for rapid prototyping

### Authentication and Authorization
- **Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)
- **User Schema**: Basic user model with username/password authentication
- **Security**: Prepared for session-based authentication with secure cookie handling

### Application Features
- **State Selection**: Multi-state support (TX, CO, AR) with segmented control interface
- **Automation Demo**: Interactive automation runner with real-time activity logging
- **Compliance Dashboard**: Overview of environmental impact, safety standards, and documentation status
- **Activity Tracking**: Real-time logging system for automation processes and permit updates

## Component Architecture

### Core Brand Components
- **AppShell**: Main layout wrapper with consistent header and navigation
- **HeroWave**: SVG wave decoration for vintage landscape aesthetic  
- **StepperDots**: Progress indicator with animated dots for multi-step flows
- **ChoiceButton**: Selection cards with icons and checkmarks for permit/option selection
- **SSOButtons**: Social sign-on buttons for Facebook, Google, Apple, Email
- **FormStack & FormField**: Consistent form layout and input styling
- **Button**: Core button component with primary, secondary, outline, ghost variants
- **Pill**: Compact status indicator with active/inactive states
- **SegmentedControl**: Multi-option selector for state selection

### Page Components
- **Home**: Landing page with hero section, brand examples, state selector, automation demo
- **Login**: Authentication flow with SSO options and email/password form
- **Permits**: Permit type selection with icon cards and progress stepper
- **Calendar**: Date/time booking interface for site visits

## API Endpoints

All API routes are prefixed with `/api` for consistency:

- `GET /api/health` - Health check endpoint for monitoring
- `GET /api/regulations/:state` - Returns regulatory info for TX, CO, AR
- `GET /api/permits` - Lists available permit types with document requirements  
- `GET /api/automation/status` - Returns automation service status

## Configuration Files

### Vite Configuration
- React plugin for JSX transformation
- Replit integration plugins
- Path aliases for clean imports (@, @/components, @/ui, etc.)
- Server configuration on port 5000

### Tailwind Configuration  
- Custom color tokens: forest, olive, moss, sage, sand, bone, charcoal
- Custom fonts: Inter (UI), Lora (Display)
- Custom border radius: re-card, re-pill
- Custom shadows: re-card
- Typography plugin for prose styling

### TypeScript Configuration
- Strict type checking enabled
- Path mappings for module resolution
- JSX preserve for Vite handling

### PostCSS Configuration
- Tailwind CSS processing
- Autoprefixer for browser compatibility

## External Dependencies

### Core Libraries
- **React 18**: UI framework with TypeScript support
- **Wouter**: Lightweight routing library
- **Express**: Backend server framework
- **Drizzle ORM**: TypeScript-first database ORM

### UI Libraries  
- **Radix UI**: Accessible component primitives (30+ components installed)
- **Lucide React**: Icon library for UI elements
- **Tailwind CSS**: Utility-first CSS framework
- **Class Variance Authority**: Component variant management

### Data Management
- **TanStack Query**: Server state and caching
- **React Hook Form**: Form state management
- **Zod**: Schema validation

### Development Tools
- **Vite**: Build tool and dev server
- **TypeScript**: Type safety across stack
- **PostCSS**: CSS processing pipeline
- **Replit Plugins**: Development environment integration