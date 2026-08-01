# CDI

The public web presence of Club Digital & Innovation, the student-run digital club at ENCG Agadir. It serves two audiences at once — students who want to join, and businesses who want to work with the club — and this split shapes most of the vocabulary below.

## Language

### The organisation

**CDI**:
Club Digital & Innovation, the student club at ENCG Agadir, founded 2018. Where the distinction from CDI Agency matters, say "the club".
_Avoid_: the association, the society

**CDI Agency**:
The club's commercial arm, which takes on paid digital work for outside organisations. A separate brand with its own social accounts, not a department of the club.
_Avoid_: the agency side, CDI Pro, the business unit

**Member**:
A student who has joined the club. Distinct from a signed-in **User**, which is an authentication concept — most members have never logged into the site.
_Avoid_: user, participant

### Audiences and journeys

**Path**:
One of the two routes into CDI presented on the homepage: the student path (leading to the club) or the business path (leading to the agency). The site's information architecture forks here.
_Avoid_: audience, persona, track

**Join**:
A student's route into membership, currently a WhatsApp conversation rather than a form on the site.
_Avoid_: apply, register, sign up — "sign up" in particular collides with authentication

### Events

**E-DAY**:
CDI's flagship annual event — a full day of talks, workshops and networking, and the main sponsorship opportunity offered to businesses. Editions are numbered (currently 3.0).
_Avoid_: the conference, the summit

### Presentation

**Section**:
One of the five vertical parts of the homepage — hero, paths, proof, event, contact. Each is a component, none is a route.
_Avoid_: page, panel, slide

**Set-piece**:
A section's one distinctive scroll-driven moment. A section has at most one; some deliberately have none, to give the page a rest beat.
_Avoid_: animation, effect

**Motion tier**:
How much motion a given visitor receives: `full` (desktop, fine pointer — pinning, custom cursor, post-processing), `lite` (touch or narrow — the WebGL wordmark and reveals, but nothing pinned), or `static` (reduced motion — nothing animates). A single tier governs the whole page rather than each effect deciding for itself. The canvas is the one capability read separately from the tier, since it belongs on every device that animates at all.
_Avoid_: breakpoint, device class, performance mode

**Wordmark**:
The extruded three-dimensional "CDI" that is the subject of the hero. It is typographic, not decorative geometry — set in the same typeface as the page's headings.
_Avoid_: logo, the 3D object — the logo is a separate mark, used flat in the nav and footer
