# Yummi

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## ProductListComponent

A standalone Angular component for displaying a grid of product items (e.g., meals) with pagination functionality. Designed with responsiveness and performance in mind, and styled using Tailwind CSS.

## Features

- **Responsive Grid**: Displays items in a grid layout that adjusts dynamically for different screen sizes.
- **Pagination**: Includes a "Load More" button to fetch additional items.
- **Efficient Rendering**: Implements `ChangeDetectionStrategy.OnPush` and `trackBy` for optimal performance.
- **Customizable**: Accepts a list of product items and toggles the "Load More" button based on input.

## Inputs

- `items: ProductItem[]`  
  Array of products to display. Each item has the following properties:
  - `title: string` - The product title.
  - `username: string` - Creator's username.
  - `image: string` - URL of the product image.
  - `userImage: string` - URL of the creator's image.
  - `date: string` - Creation date.
  - `comments: string` - Product description.
  - `category: string` - Product category.

- `showLoadMore: boolean`  
  Toggles the visibility of the "Load More" button.

## Outputs

- `loadMore: EventEmitter<void>`  
  Emits an event when the "Load More" button is clicked.

## Example Usage

```html
<app-product-list
  [items]="products"
  [showLoadMore]="canLoadMore"
  (loadMore)="handleLoadMore()">
</app-product-list>





