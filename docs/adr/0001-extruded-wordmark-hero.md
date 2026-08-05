# The hero's 3D object is the wordmark itself

The homepage is a type-led editorial design, which normally argues for deleting WebGL entirely — three.js and `@tresjs/*` are the heaviest dependencies in the bundle, and an animated background competes with oversized type for the reader's attention. We kept them anyway, but made the extruded "CDI" the hero's *subject* rather than decoration behind it: there is then only one focal point, so the type and the 3D reinforce each other instead of fighting. The scene contains nothing else — the wireframe icosahedra and falling binary field that used to sit behind the headline were removed for exactly this reason.

## Consequences

- The WebGL font and the CSS font must stay the same family, or the hero reads as two typefaces. `public/fonts/space-grotesk-cdi.typeface.json` carries only the C, D and I outlines, converted from the same source as the webfont, and has to be regenerated whenever that font changes.
  - Extruding `public/CDI_logo.svg` directly was tried instead, so the hero could not drift from the brand mark. It was reverted: the geometry was correct and drawing (15,476 triangles a frame) but the mark never became visible on the page.
- Because the wordmark carries the hero rather than accenting it, the `lite` motion tier cannot simply drop the canvas and leave the layout as-is; it substitutes a gradient that preserves the same off-centre mass.
- Space Grotesk (SIL OFL 1.1) was chosen partly because its licence permits conversion to `typeface.json`. Clash Display, which the stylesheet previously named, does not: the ITF Free Font Licence forbids translating or extracting the font software, which rules out generating glyph outlines from it. Any future typeface change has to clear the same bar.
