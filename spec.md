# Apex Science Academy

## Current State
Fully built single-page website with 9 sections: sticky nav, hero, courses, branches, about/faculty, testimonials, gallery, contact form, footer. Uses default light theme styling.

## Requested Changes (Diff)

### Add
- Course card images: JEE (`/assets/generated/course-jee.dim_800x500.jpg`), MHT-CET (`/assets/generated/course-mhtcet.dim_800x500.jpg`), FYJC Science (`/assets/generated/course-fyjc.dim_800x500.jpg`), SYJC Science (`/assets/generated/course-syjc.dim_800x500.jpg`)
- Branch images: Andheri, Dadar, Thane, Pune, Navi Mumbai, Nagpur (all in `/assets/generated/branch-*.dim_600x400.jpg`)
- Faculty profile images: Dr. Rajesh Sharma, Prof. Meera Iyer, Prof. Ankit Deshmukh, Dr. Priya Patil (all in `/assets/generated/faculty-*.dim_400x400.jpg`)
- Gallery images: classroom, sciencelab, teaching, celebrating, studymaterials, annualevent (all in `/assets/generated/gallery-*.dim_800x600.jpg`)
- CSS animations: scroll-triggered fade-in for sections, hover lift for cards, hover glow for buttons
- Glassmorphism card styles with glow on hover

### Modify
- Full dark theme: background `#0A192F` to `#1E1A3A` gradient
- All card backgrounds: semi-transparent glassmorphism (`rgba(255,255,255,0.05)` with `backdrop-filter: blur`)
- Text colors: white `#FFFFFF` and light gray `#E2E8F0`
- Accent colors: Electric Orange `#FF6B35` and Cyan `#06B6D4`
- All buttons: Orange to Pink gradient (`#FF6B35 → #EC489A`)
- All section headings: gradient text Orange to Pink
- Replace gallery placeholder divs with real images
- Replace faculty avatar placeholders with real images
- Replace branch placeholder divs with real images
- Replace course placeholder icons/backgrounds with real images

### Remove
- Light theme colors
- Placeholder gradient divs for gallery/branches/courses

## Implementation Plan
1. Rewrite `index.css` with dark theme CSS variables, glassmorphism utilities, gradient button classes, animation keyframes (fadeInUp), scroll observer utility
2. Rewrite `App.tsx` to apply new design: dark backgrounds, gradient headings, glassmorphism cards, real images in all sections, IntersectionObserver for scroll animations
