# Architecture (FSD)

The project is structured according to Feature-Sliced Design:

- `src/app`: Application-wide setup (providers, styles, entry point).
- `src/pages`: Full pages composed of widgets and features.
- `src/widgets`: Complex UI components (e.g., Header, ProductList).
- `src/features`: User interactions with business value (e.g., AddToCart, Login).
- `src/entities`: Business entities (e.g., Product, Cart, User).
- `src/shared`: Reusable infrastructure (API, UI components, config, libs).
    - **UI Library:** Includes `Button`, `Input`, `Checkbox`, `Select`, `Badge`, `Skeleton`, `Card`, `Spinner`, `Modal`.
