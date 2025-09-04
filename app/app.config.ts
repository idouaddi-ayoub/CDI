export default defineAppConfig({
  ui: {
    button: {
      variants: {
        border: {
          rounded: "rounded-4xl ",
        },
      },
      compoundVariants: [
        // ghost
        // link
        // outline
        // soft
        // solid
        {
          color: "primary",
          variant: "solid",
          class:
            "border border-green-default bg-green-default hover:bg-primary/25 capitalize hover:text-white",
        },
        // subtle
      ],
      defaultVariants: {
        color: "primary",
        variant: "solid",
        size: "xl",
        border: "rounded",
      },
    },
    badge: {
      base: "rounded-4xl",
      variants: {
        border: {
          rounded: "rounded-4xl ",
        },
      },
      compoundVariants: [
        {
          color: "primary",
          variant: "solid",
          class:
            "border rounded-4xl justify-center items-center border-green-default bg-green-default  capitalize ",
        },
        // subtle
      ],
    },
  },
});
