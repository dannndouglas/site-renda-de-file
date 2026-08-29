# Home Delicada Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Renda de Filé de Jaguaribe homepage as a restrained editorial experience while preserving current Strapi data contracts and routes.

**Architecture:** Keep `app/page.tsx` as the server-side data loader and rebuild `DynamicHomePage` as the client-side presentation boundary. Header, footer, and all redesign styles stay in their existing files so the change follows the repository structure; data fallbacks remain local to the homepage component.

**Tech Stack:** Next.js 15, React 19, TypeScript, Framer Motion, Next Image, Vitest, Tailwind CSS v4 global stylesheet.

**Spec:** `docs/superpowers/specs/2026-08-29-home-delicada-design.md`

## Global Constraints

- Preserve the existing Strapi endpoints, response types, and public routes.
- Do not add statistics, promotional badges, heavy shadows, loud gradients, or extra content sections.
- Use Cormorant Garamond for editorial headings and Karla for body/interface copy.
- Keep motion short and subtle and disable it through `prefers-reduced-motion` and `useReducedMotion`.
- Reuse the three supplied local photography assets and CMS images; do not create placeholder art.
- Do not modify backend files or unrelated working-tree changes.

---

### Task 1: Lock the homepage content contract with tests

**Files:**
- Modify: `frontend/src/components/DynamicHomePage.test.tsx`
- Modify: `frontend/src/components/DynamicHomePage.tsx`

**Interfaces:**
- Consumes: `PaginaInicial | null`, `Produto[]`, and `Associacao[]` from `@/lib/strapi`.
- Produces: rendered links and copy based on CMS data, plus deterministic fallback content when data is absent.

- [ ] **Step 1: Add a failing CMS-data test**

Add a Vitest case that renders representative CMS data and asserts that the title, CTA, product name, product route, and association name appear:

```tsx
it('prioriza conteúdo editorial vindo do Strapi', () => {
  const html = renderToStaticMarkup(
    <DynamicHomePage
      paginaInicial={{
        id: 1,
        attributes: {
          titulo_principal: 'Memória tecida em Jaguaribe',
          subtitulo: 'Uma tradição feita com tempo e delicadeza.',
          texto_chamada_acao: 'Conheça a origem',
          link_chamada_acao: '/sobre',
          mostrar_associacoes: true,
          mostrar_noticias: false,
          mostrar_estatisticas: false,
          createdAt: '', updatedAt: '', publishedAt: '',
        },
      }}
      produtos={[{
        id: 2,
        attributes: {
          nome: 'Caminho Flor de Mandacaru', descricao: [],
          categoria: 'Cama, Mesa e Banho', slug: 'flor-de-mandacaru',
          disponivel: true, createdAt: '', updatedAt: '', publishedAt: '',
        },
      }]}
      associacoes={[{ id: 3, documentId: 'assoc-3', nome: 'Mãos do Jaguaribe' }]}
    />,
  );

  expect(html).toContain('Memória tecida em Jaguaribe');
  expect(html).toContain('Conheça a origem');
  expect(html).toContain('Caminho Flor de Mandacaru');
  expect(html).toContain('/produtos/flor-de-mandacaru');
  expect(html).toContain('Mãos do Jaguaribe');
});
```

- [ ] **Step 2: Run the focused test and confirm the new assertion fails**

Run: `npm test -- DynamicHomePage.test.tsx`

Expected: the CMS test fails because the current `productPieces` function replaces fewer than three CMS products with the complete fallback list.

- [ ] **Step 3: Make CMS products fill the available slots before fallbacks**

Change the mapper so available CMS products are kept and only missing slots are filled:

```ts
function productPieces(produtos: Produto[]): Piece[] {
  const available = produtos
    .filter((produto) => produto.attributes?.disponivel !== false)
    .slice(0, 3)
    .map((produto, index) => ({
      name: produto.attributes.nome,
      category: produto.attributes.categoria || 'Renda de Filé',
      image: getStrapiImageUrl(produto.attributes.fotos_produto) || fallbackPieces[index].image,
      href: `/produtos/${produto.attributes.slug}`,
    }));

  return [...available, ...fallbackPieces.slice(available.length)].slice(0, 3);
}
```

- [ ] **Step 4: Run the focused test suite**

Run: `npm test -- DynamicHomePage.test.tsx`

Expected: both fallback and CMS-data tests pass.

- [ ] **Step 5: Commit the content contract**

```powershell
git add -- frontend/src/components/DynamicHomePage.test.tsx frontend/src/components/DynamicHomePage.tsx
git commit -m "test: cover editorial home content"
```

### Task 2: Rebuild the editorial homepage composition

**Files:**
- Modify: `frontend/src/components/DynamicHomePage.tsx`
- Verify: `frontend/src/app/page.tsx`

**Interfaces:**
- Consumes: the same `DynamicHomePageProps` and `/images/renda-file/*.jpg` assets.
- Produces: semantic sections with class namespaces `delicate-hero`, `delicate-history`, `delicate-pieces`, `delicate-process`, and `delicate-makers`.

- [ ] **Step 1: Verify the server loader remains minimal**

Confirm `page.tsx` fetches `getPaginaInicial()`, `getProdutos()`, and `getAssociacoes()` in `Promise.all` and passes only those three values into `DynamicHomePage`.

- [ ] **Step 2: Replace the old homepage markup with five semantic sections**

Use this section skeleton and retain the existing data helpers:

```tsx
<div className="delicate-home">
  <section className="delicate-hero" aria-labelledby="delicate-hero-title">...</section>
  <section className="delicate-history" aria-labelledby="delicate-history-title">...</section>
  <section className="delicate-pieces" aria-labelledby="delicate-pieces-title">...</section>
  <section className="delicate-process" aria-labelledby="delicate-process-title">...</section>
  <section className="delicate-makers" aria-labelledby="delicate-makers-title">...</section>
</div>
```

Each section must contain one primary heading, no badges, and no statistics. Keep a single primary action in the hero and text links elsewhere.

- [ ] **Step 3: Add restrained motion**

Use `useReducedMotion()` and the shared transition:

```ts
const editorialTransition = reduceMotion
  ? { duration: 0 }
  : { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const };
```

Apply initial `opacity` plus at most `16px` vertical movement to copy, a clip-path reveal to the hero photograph, and a maximum image hover scale of `1.025`.

- [ ] **Step 4: Re-run the homepage tests**

Run: `npm test -- DynamicHomePage.test.tsx`

Expected: all tests pass and the output contains no statistics or news section.

- [ ] **Step 5: Commit the homepage composition**

```powershell
git add -- frontend/src/app/page.tsx frontend/src/components/DynamicHomePage.tsx
git commit -m "feat: rebuild editorial homepage"
```

### Task 3: Unify the global shell and responsive visual system

**Files:**
- Modify: `frontend/src/components/Header.tsx`
- Modify: `frontend/src/components/Footer.tsx`
- Modify: `frontend/src/app/globals.css`
- Verify: `frontend/src/app/layout.tsx`

**Interfaces:**
- Consumes: existing routes `/`, `/sobre`, `/produtos`, `/associacoes`, and `/contato`; font variables `--font-cormorant` and `--font-karla`.
- Produces: accessible desktop/mobile navigation and responsive styles for the complete editorial homepage.

- [ ] **Step 1: Rebuild the header without changing route destinations**

Keep `usePathname`, close the mobile menu on route change, use `aria-current="page"`, and expose a button with `aria-expanded` and `aria-controls="delicate-mobile-nav"`.

- [ ] **Step 2: Rebuild the compact footer**

Render the brand statement, four essential links, `Jaguaribe — Ceará`, and the current copyright year. Do not add newsletter, phone, statistics, or social counters.

- [ ] **Step 3: Replace homepage styling with scoped editorial tokens**

Define these root tokens and use them consistently:

```css
:root {
  --delicate-paper: oklch(98.3% 0.006 80);
  --delicate-paper-deep: oklch(95.8% 0.012 76);
  --delicate-white: oklch(99.6% 0.002 80);
  --delicate-ink: oklch(29% 0.024 43);
  --delicate-muted: oklch(48% 0.025 49);
  --delicate-blue: oklch(56% 0.055 210);
  --delicate-blue-deep: oklch(43% 0.055 211);
  --delicate-clay: oklch(61% 0.09 51);
  --delicate-line: oklch(86% 0.018 73);
  --delicate-ease: cubic-bezier(0.22, 1, 0.36, 1);
}
```

Use a mobile-first single-column layout, switch the hero/process to two columns at `820px`, and switch the pieces grid to three columns at `680px`. Keep focus-visible outlines and a `prefers-reduced-motion` override.

- [ ] **Step 4: Run lint and tests**

Run: `npm run lint`

Run: `npm test`

Expected: both commands exit successfully, or a preexisting failure is reproduced against `HEAD` and documented separately.

- [ ] **Step 5: Commit the global shell and styling**

```powershell
git add -- frontend/src/components/Header.tsx frontend/src/components/Footer.tsx frontend/src/app/globals.css frontend/src/app/layout.tsx
git commit -m "style: refine delicate site shell"
```

### Task 4: Build and complete visual QA

**Files:**
- Modify: `design-qa.md`
- Verify: `frontend/src/app/page.tsx`
- Verify: `frontend/src/components/DynamicHomePage.tsx`
- Verify: `frontend/src/components/Header.tsx`
- Verify: `frontend/src/components/Footer.tsx`
- Verify: `frontend/src/app/globals.css`

**Interfaces:**
- Consumes: the three supplied reference images and the running Next.js homepage.
- Produces: a responsive, visually reviewed homepage and `design-qa.md` containing `final result: passed`.

- [ ] **Step 1: Run the production build**

Run: `npm run build`

Expected: Next.js completes compilation and static generation without errors.

- [ ] **Step 2: Start the frontend locally**

Run: `npm run dev -- --hostname 0.0.0.0 --port 3000`

Expected: the homepage responds at `http://localhost:3000/`.

- [ ] **Step 3: Capture desktop and mobile states in the in-app browser**

Inspect at approximately `1440x1000` and `390x844`. Exercise the mobile menu and every primary CTA, and check the browser console for errors.

- [ ] **Step 4: Compare the implementation with the references**

Review identical viewport captures for hierarchy, image crop, spacing, type scale, borders, color, responsiveness, and motion. Record each issue in `design-qa.md` with P0–P3 severity and fix all P0/P1/P2 findings.

- [ ] **Step 5: Mark the QA result**

The final line of `design-qa.md` must be exactly:

```text
final result: passed
```

- [ ] **Step 6: Run final verification**

Run: `npm test && npm run lint && npm run build`

Expected: all commands pass after the last visual fix.

- [ ] **Step 7: Commit the verified result**

```powershell
git add -- design-qa.md frontend/src/app/page.tsx frontend/src/components/DynamicHomePage.tsx frontend/src/components/Header.tsx frontend/src/components/Footer.tsx frontend/src/app/globals.css frontend/src/app/layout.tsx
git commit -m "chore: verify homepage redesign"
```

