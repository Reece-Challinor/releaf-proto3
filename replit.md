# RELEAF

## Overview

RELEAF is a regulatory automation platform designed to streamline environmental compliance processes with the tagline "Less red tape. More wild places." The application provides automated tools for processing permits, managing compliance requirements, and navigating state-specific regulations across Texas, Colorado, and Arkansas. Built as a modern web application, it features a clean, mobile-first interface with a retro-modern outdoor aesthetic that emphasizes usability and environmental themes.

## User Preferences

Preferred communication style: Simple, everyday language.

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

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting (@neondatabase/serverless)
- **Connection Pooling**: Built-in connection management for serverless environments

### UI and Design Libraries
- **Chakra UI**: Component library for accessible React components with emotion styling
- **Radix UI**: Unstyled, accessible component primitives for complex interactions
- **Lucide React**: Modern icon library for consistent iconography
- **Tailwind CSS**: Utility-first CSS framework for responsive design

### Development and Build Tools
- **Vite**: Fast development server and build tool with React plugin
- **TypeScript**: Static type checking across client, server, and shared code
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer for browser compatibility

### Form and Data Management
- **React Hook Form**: Performant form library with validation
- **Zod**: Runtime type validation and schema parsing
- **TanStack Query**: Server state management with caching and background updates

### Styling and Animation
- **Framer Motion**: Animation library for micro-interactions
- **Class Variance Authority**: Utility for component variant styling
- **Tailwind Merge**: Intelligent Tailwind class merging for dynamic styling

### Development Environment
- **Replit Integration**: Specialized plugins for Replit development environment
- **Runtime Error Handling**: Development-time error overlay for better debugging experience