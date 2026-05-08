# TODO

- [x] Update `src/components/home-component/MainHeader.js`:
  - [x] Upgrade mobile drawer design (gradient header, better spacing, rounded/border/shadow)
  - [x] Add polished entrance/exit animations for overlay + drawer
  - [x] Add animated About submenu (chevron rotation + smooth expand/collapse)
  - [x] Improve UX: close on outside click/escape, prevent background scroll while open

- [x] Run lint (`npm run lint`) and ensure no errors (currently failing due to eslint-config-next module resolution in this environment)

- [ ] Manually verify in dev server that mobile menu + submenu animate correctly

- [ ] Update `src/components/home-component/CompanyOverview.js`:
  - [x] Fix image container typo (`overflow-hiddens`)
  - [x] Redesign visuals (better typography/cards/accents)
  - [x] Add professional entrance animations (IntersectionObserver + keyframes)
- [x] Verify in browser `/about-us` that animations work and layout is correct



