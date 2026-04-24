# Archived Features

These features have been temporarily removed from the live site. They can be restored when the full SaaS is ready.

---

## 1. Pricing Page (`_archive/pricing/`)

**Files:**
- `page.js` → Move to `app/pricing/page.js`
- `pricing.module.css` → Move to `app/pricing/pricing.module.css`
- `PricingExperience.jsx` → Move to `components/pricing/PricingExperience.jsx`

**To restore:**
1. Copy the files back to their original locations
2. Add `{ label: "Pricing", href: "/pricing" }` to the `navLinks` array in `lib/site-content.js`
3. Add `{ label: "Pricing", href: "/pricing" }` to the footer `footerColumns` Product section in `lib/site-content.js`
4. Restore the `pricingTiers` export in `lib/site-content.js` (check git history, commit `d8872d3`)

---

## 2. Interactive 3D Building (`_archive/home-3d/`)

**Files:**
- `InteractiveBuilding.jsx` → Move to `components/home/InteractiveBuilding.jsx`

**To restore:**
1. Install dependencies: `npm install three @react-three/fiber @react-three/drei`
2. Copy `InteractiveBuilding.jsx` back to `components/home/`
3. In `components/home/HomeExperience.jsx`:
   - Add `import dynamic from "next/dynamic";`
   - Add the dynamic import:
     ```js
     const InteractiveBuilding = dynamic(() => import("./InteractiveBuilding"), {
       ssr: false,
       loading: () => <div>Loading 3D Model...</div>
     });
     ```
   - Add the `InteractiveDemoSection` component and include it in the render tree
4. The CSS for `.interactiveDemoSection` etc. is already in `app/home.module.css` (no need to re-add)
