/* Artwork media.
 *
 * Two layers, always in this order:
 *
 *   1. An abstract SVG composition built from the work's own palette and a motif
 *      keyword -- not a reproduction. This is the floor: it needs no network, no
 *      rights, and it always renders.
 *   2. The museum's own photograph of the work, fetched from Crystal Bridges and
 *      faded in over the SVG once it loads. If it 404s, is blocked, or the file
 *      is opened offline, it simply never arrives and layer 1 is what you see.
 *
 * The fallback is the point. `askrosie-standalone.html` is meant to open by
 * double-click on any machine, and that promise cannot depend on someone else's
 * CDN being reachable.
 */

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function svg(inner, { w = 200, h = 250, bg }) {
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true" style="display:block">
    <rect width="${w}" height="${h}" fill="${bg}"/>${inner}</svg>`;
}

const MOTIFS = {
  /* Rosie: monumental seated figure, halo behind, warm flag field */
  figure: ([a, b, c, d]) => svg(`
    <defs><radialGradient id="halo" cx="50%" cy="34%" r="42%">
      <stop offset="0%" stop-color="${c}" stop-opacity=".95"/>
      <stop offset="100%" stop-color="${b}" stop-opacity=".25"/>
    </radialGradient></defs>
    <rect width="200" height="250" fill="url(#halo)"/>
    <circle cx="100" cy="82" r="46" fill="${c}" opacity=".55"/>
    <path d="M100 46c17 0 27 13 27 30s-10 30-27 30-27-13-27-30 10-30 27-30z" fill="${d}" opacity=".9"/>
    <path d="M52 250c0-52 22-88 48-88s48 36 48 88z" fill="${a}"/>
    <rect x="44" y="168" width="112" height="16" rx="8" fill="${d}" opacity=".85"/>
    <rect x="70" y="228" width="60" height="12" rx="3" fill="${b}" opacity=".9"/>`,
    { bg: b }),

  /* Kindred Spirits: framing trees, receding gorge, distant fall of water */
  landscape: ([a, b, c, d]) => svg(`
    <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${c}"/><stop offset="60%" stop-color="${b}" stop-opacity=".5"/>
    </linearGradient></defs>
    <rect width="200" height="250" fill="url(#sky)"/>
    <path d="M0 250 L0 150 Q50 120 100 148 T200 138 L200 250z" fill="${b}" opacity=".55"/>
    <path d="M0 250 L0 190 Q60 160 110 192 T200 180 L200 250z" fill="${a}" opacity=".8"/>
    <rect x="96" y="96" width="7" height="56" fill="${c}" opacity=".8"/>
    <path d="M18 250 C22 180 10 140 26 96 C40 130 48 180 44 250z" fill="${d}"/>
    <path d="M182 250 C176 176 190 132 172 88 C156 128 148 178 156 250z" fill="${d}" opacity=".92"/>
    <circle cx="88" cy="200" r="4" fill="${d}"/><circle cx="102" cy="204" r="4" fill="${d}"/>`,
    { bg: c }),

  /* Stuart / Eakins: single lit head against a modulated dark ground */
  portrait: ([a, b, c, d]) => svg(`
    <defs><radialGradient id="lit" cx="50%" cy="38%" r="55%">
      <stop offset="0%" stop-color="${c}" stop-opacity=".85"/>
      <stop offset="100%" stop-color="${d}" stop-opacity="0"/>
    </radialGradient></defs>
    <rect width="200" height="250" fill="${d}"/>
    <rect width="200" height="250" fill="url(#lit)"/>
    <ellipse cx="100" cy="96" rx="36" ry="45" fill="${c}" opacity=".92"/>
    <path d="M46 250c0-46 24-74 54-74s54 28 54 74z" fill="${a}"/>
    <path d="M100 176c-14 0-24 8-24 8l24 66 24-66s-10-8-24-8z" fill="${b}" opacity=".55"/>`,
    { bg: d }),

  /* O'Keeffe: concentric petals spiralling to a small saturated throat */
  organic: ([a, b, c, d]) => svg(`
    <rect width="200" height="250" fill="${a}"/>
    <g transform="translate(100,125)">
      <circle r="118" fill="${d}" opacity=".45"/>
      <circle r="92"  fill="${a}" opacity=".9"/>
      <circle r="70"  fill="${d}" opacity=".35"/>
      <circle r="52"  fill="${a}" opacity=".95"/>
      <circle r="34"  fill="${b}" opacity=".55"/>
      <circle r="16"  fill="${c}"/>
      <g stroke="${b}" stroke-width="1.1" fill="none" opacity=".5">
        <path d="M0 -104 Q26 -52 0 -16"/><path d="M90 -52 Q40 -30 14 -8"/>
        <path d="M90 52 Q40 30 14 8"/><path d="M0 104 Q-26 52 0 16"/>
        <path d="M-90 52 Q-40 30 -14 8"/><path d="M-90 -52 Q-40 -30 -14 -8"/>
      </g>
    </g>`, { bg: a }),

  /* Parrish: discrete warm glows suspended in a deep blue field */
  light: ([a, b, c, d]) => svg(`
    <defs><radialGradient id="lamp"><stop offset="0%" stop-color="${c}"/><stop offset="45%" stop-color="${b}" stop-opacity=".75"/><stop offset="100%" stop-color="${b}" stop-opacity="0"/></radialGradient></defs>
    <rect width="200" height="250" fill="${d}"/>
    <rect y="150" width="200" height="100" fill="${a}" opacity=".55"/>
    <g>
      <circle cx="52"  cy="118" r="34" fill="url(#lamp)"/><circle cx="52"  cy="118" r="10" fill="${c}"/>
      <circle cx="104" cy="96"  r="40" fill="url(#lamp)"/><circle cx="104" cy="96"  r="12" fill="${c}"/>
      <circle cx="152" cy="128" r="32" fill="url(#lamp)"/><circle cx="152" cy="128" r="9"  fill="${c}"/>
      <circle cx="78"  cy="168" r="26" fill="url(#lamp)"/><circle cx="78"  cy="168" r="7"  fill="${c}"/>
      <circle cx="134" cy="182" r="24" fill="url(#lamp)"/><circle cx="134" cy="182" r="7"  fill="${c}"/>
    </g>
    <path d="M0 250 L0 214 Q100 196 200 220 L200 250z" fill="${d}" opacity=".8"/>`,
    { bg: d }),

  /* Bellows: an excavated void, worked under scattered artificial light */
  urban: ([a, b, c, d]) => svg(`
    <rect width="200" height="250" fill="${a}"/>
    <rect y="0" width="200" height="72" fill="${d}" opacity=".7"/>
    <g fill="${d}" opacity=".9">
      <rect x="4"   y="18" width="26" height="54"/><rect x="36" y="34" width="20" height="38"/>
      <rect x="146" y="26" width="24" height="46"/><rect x="176" y="40" width="20" height="32"/>
    </g>
    <path d="M0 72 L200 72 L166 250 L34 250z" fill="${a}"/>
    <path d="M22 96 L178 96 L152 232 L48 232z" fill="${d}" opacity=".55"/>
    <path d="M46 128 L154 128 L138 214 L62 214z" fill="${d}"/>
    <g fill="${c}">
      <circle cx="62" cy="112" r="5"/><circle cx="140" cy="120" r="4"/>
      <circle cx="96" cy="166" r="6"/><circle cx="118" cy="198" r="3.5"/>
    </g>
    <g fill="${b}" opacity=".85">
      <rect x="86" y="176" width="4" height="9"/><rect x="106" y="182" width="4" height="9"/>
      <rect x="72" y="150" width="4" height="8"/>
    </g>`, { bg: a }),
};

/** Inline SVG for one artwork. Falls back to a plain palette field on an unknown motif. */
export function artFrame(artwork) {
  const render = MOTIFS[artwork.motif];
  const p = artwork.palette;
  if (!render) return svg(`<rect width="200" height="250" fill="${p[0]}"/>`, { bg: p[0] });
  return render(p);
}

/** Frame with a title attribute, for thumbnails that need a tooltip. */
export function artFrameTitled(artwork) {
  return `<span title="${esc(artwork.title)} — ${esc(artwork.artist)}">${artFrame(artwork)}</span>`;
}

/* ── the photograph layer ────────────────────────────────────────────────
 * Crystal Bridges serves its collection photography from an eMuseum media
 * dispatcher. `mediaId` is the asset id from a work's object page; the suffix
 * picks a rendition.
 *
 *   https://crystalbridges.emuseum.com/objects/585/rosie-the-riveter
 *   -> https://crystalbridges.emuseum.com/internal/media/dispatcher/1379/preview
 */
const CB_MEDIA = 'https://crystalbridges.emuseum.com/internal/media/dispatcher';

export function cbImageUrl(mediaId, rendition = 'preview') {
  return `${CB_MEDIA}/${mediaId}/${rendition}`;
}

/**
 * SVG stand-in with the museum photograph layered over it.
 *
 * `onerror` removes the img outright rather than hiding it, so a failed load
 * leaves no broken-image box behind — just the SVG underneath.
 */
export function artMedia(artwork, rendition = 'preview') {
  const base = artFrame(artwork);
  if (!artwork.mediaId) return base;
  return `<span class="media">${base}<img class="media-img"
    src="${cbImageUrl(artwork.mediaId, rendition)}"
    alt="${esc(artwork.title)}, ${esc(artwork.artist)}"
    loading="lazy" decoding="async"
    onload="this.classList.add('ready')" onerror="this.remove()"></span>`;
}
