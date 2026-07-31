---
name: Academic Precision
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#424753'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#727785'
  outline-variant: '#c2c6d5'
  surface-tint: '#005ac1'
  primary: '#0058bd'
  on-primary: '#ffffff'
  primary-container: '#2771df'
  on-primary-container: '#fefcff'
  inverse-primary: '#adc6ff'
  secondary: '#5c5f61'
  on-secondary: '#ffffff'
  secondary-container: '#e0e3e5'
  on-secondary-container: '#626567'
  tertiary: '#4648d4'
  on-tertiary: '#ffffff'
  tertiary-container: '#6063ee'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a41'
  on-primary-fixed-variant: '#004494'
  secondary-fixed: '#e0e3e5'
  secondary-fixed-dim: '#c4c7c9'
  on-secondary-fixed: '#191c1e'
  on-secondary-fixed-variant: '#444749'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#07006c'
  on-tertiary-fixed-variant: '#2f2ebe'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-xs:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style
The design system embodies a "Scholar-Tech" aesthetic—merging the intellectual rigor of academia with the high-velocity precision of modern SaaS leaders like Linear and Stripe. The brand personality is authoritative yet accessible, designed to evoke a sense of clarity, focus, and discovery.

The visual style is **Hyper-Minimalist with Depth**. It utilizes expansive white space to reduce cognitive load during research, while employing "optical precision" through ultra-fine 1px borders and layered shadows. Subtle mesh gradients are used sparingly in backgrounds to prevent the UI from feeling sterile, adding a sense of premium atmosphere to the professional environment.

## Colors
The palette is anchored by a high-clarity "Academic Blue" (#4285F4) which serves as the primary driver for actions and focus states. 

- **Primary:** Used for primary buttons, active states, and critical paths.
- **Surface & Secondary:** A range of ultra-light cool grays (#F8FAFC to #F1F5F9) creates a layered "paper-on-glass" effect.
- **Accents:** A subtle Indigo (#6366F1) is used for data visualization or secondary category tags to provide depth without breaking the professional tone.
- **Gradients:** Use linear gradients from `primary` to a slightly lighter tint (10% opacity shift) for hero areas to mimic the polished feel of modern developer tools.

## Typography
Plus Jakarta Sans is the sole typeface, chosen for its modern geometric construction and exceptional legibility in data-dense environments. 

Headlines utilize tighter letter-spacing and heavier weights to feel "anchored" and authoritative. Body text maintains a generous line height (1.5x - 1.6x) to ensure long-form research abstracts remain readable. Labels and metadata use medium to semi-bold weights at smaller sizes to maintain a clear hierarchy against primary content.

## Layout & Spacing
This design system uses a **Fixed-Fluid Hybrid Grid**. Content is centered within a 1280px max-width container for desktop viewing to prevent line lengths from becoming unreadable.

- **Grid:** 12-column layout for desktop, 4-column for mobile.
- **Rhythm:** An 8px base unit drives all spacing.
- **Padding:** Use "Airy Padding"—inner card padding should never be less than 24px to maintain the premium, high-end marketing aesthetic. 
- **Adaptive Rules:** On mobile, margins shrink to 16px, and complex multi-column data tables should collapse into "card-list" views to preserve touch targets.

## Elevation & Depth
Elevation is achieved through **Tonal Layering** and **Soft Ambient Shadows**. Instead of heavy borders, use subtle surface color shifts.

- **Level 0 (Background):** Pure white (#FFFFFF) or ultra-light mesh gradient.
- **Level 1 (Cards/Surface):** Secondary color (#F8FAFC) with a 1px border (#E2E8F0).
- **Shadows:** Use a "Linear-style" shadow: `0 1px 2px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.03)`. This creates a sophisticated, multi-layered lift that feels physical but light.
- **Backdrop:** Use `16px` background blur for navigation bars and modal overlays to maintain context while focusing the user.

## Shapes
The design system uses a **Rounded** shape language to feel approachable and modern. 

Standard components (buttons, inputs) use a 12px radius. Larger containers, such as research cards or modal windows, utilize a 16px to 24px radius to soften the overall interface. Interaction states should maintain these radii—avoiding sharp corners even in nested elements to ensure a cohesive, organic flow.

## Components
- **Buttons:** Primary buttons use a subtle top-light gradient and a 1px inset border to appear "tactile." Label weight is `500`.
- **Inputs:** Search bars and text fields use a subtle inner shadow (0.5px) to feel recessed. On focus, the border transitions to Primary Blue with a 3px soft outer glow.
- **Cards:** Research result cards feature a `hover` state that lifts the element using a more pronounced shadow and a slight (2px) upward translation.
- **Chips/Tags:** Used for academic disciplines. These are low-contrast (light gray background, dark gray text) to avoid distracting from primary actions.
- **Lists:** Data-heavy lists use "Ghost Dividers"—using whitespace and subtle background hover tints instead of hard horizontal lines.
- **Microinteractions:** All transitions (hover, focus, modal entry) should use a custom `cubic-bezier(0.4, 0, 0.2, 1)` easing for a snappy, high-performance feel.