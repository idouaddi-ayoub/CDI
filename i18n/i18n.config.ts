import en from "./locales/en";
import fr from "./locales/fr";

export default defineI18nConfig(() => ({
  legacy: false,
  locales: ["en", "fr"],
  locale: "en",
  messages: {
    en,
    fr,
  },
}));
