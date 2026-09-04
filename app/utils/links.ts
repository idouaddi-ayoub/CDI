export const SITE_URL = "https://www.cdiencga.com";

export const LINKS = {
  join: "https://wa.me/212708609901",
  business: "mailto:cdiencga.info@gmail.com",
  eday: "mailto:cdiencga.info@gmail.com?subject=E-DAY%203.0%20partnership",

  email: "cdiencga.info@gmail.com",
  whatsapp: "https://wa.me/212708609901",
  location: "https://maps.app.goo.gl/jSxZgtFuSV6F9GHWA",

  club: {
    instagram: "https://www.instagram.com/cdi_encgagadir/",
    linkedin: "https://www.linkedin.com/company/cdi-encg-agadir/posts/",
    tiktok: "https://www.tiktok.com/@cdi_encgagadir",
    facebook: "https://web.facebook.com/cdi.encga",
  },
  agency: {
    instagram: "https://www.instagram.com/cdi.agency/",
    linkedin: "https://www.linkedin.com/company/cdi.agency/",
    tiktok: "https://www.tiktok.com/@cdi.agency",
  },
} as const;

export type SocialLink = { icon: string; href: string; label: string };

export const NAV_ITEMS = [
  { key: "about", id: "proof" },
  { key: "event", id: "event" },
  { key: "join", id: "paths" },
  { key: "contact", id: "contact" },
] as const;

export const CLUB_SOCIALS: SocialLink[] = [
  {
    icon: "i-simple-icons-instagram",
    href: LINKS.club.instagram,
    label: "Instagram",
  },
  {
    icon: "i-simple-icons-linkedin",
    href: LINKS.club.linkedin,
    label: "LinkedIn",
  },
  { icon: "i-simple-icons-tiktok", href: LINKS.club.tiktok, label: "TikTok" },
  {
    icon: "i-simple-icons-facebook",
    href: LINKS.club.facebook,
    label: "Facebook",
  },
];

export const AGENCY_SOCIALS: SocialLink[] = [
  {
    icon: "i-simple-icons-instagram",
    href: LINKS.agency.instagram,
    label: "Instagram",
  },
  {
    icon: "i-simple-icons-linkedin",
    href: LINKS.agency.linkedin,
    label: "LinkedIn",
  },
  { icon: "i-simple-icons-tiktok", href: LINKS.agency.tiktok, label: "TikTok" },
];

export const EXTERNAL_ATTRS = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
