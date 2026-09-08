export default defineAppConfig({
  ui: {
    colors: {
      primary: "brand",
      secondary: "accent",
      neutral: "slate",
    },

    button: {
      defaultVariants: {
        size: "md",
      },
      slots: {
        base: "font-medium rounded-full transition",
      },
    },

    card: {
      slots: {
        root: "rounded-2xl",
      },
    },
  },
});
