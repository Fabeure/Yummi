export interface ProductItem {
    title: string;
    username: string;
    image: string;
    userImage: string;
    date: string;
    comments: string;
    category: string;
  }
  

export const categories = [
  'Desserts', 'Seafood', 'Italian', 'FastFood', 'Vegan', 'Salads', 'Beverages'
];

export const ALL_ITEMS: ProductItem[] = Array.from({ length: 30 }, (_, i) => {
  const index = i + 1;
  // Cycle through images from (1) to (11)
  const imageIndex = (index % 11) === 0 ? 11 : (index % 11);
  // Cycle through categories
  const category = categories[i % categories.length];
  
  return {
    title: `Delicious Meal #${index}`,
    username: `Chef ${String.fromCharCode(65 + (i % 26))}`, // Chef A, Chef B, etc.
    image: `images (${imageIndex}).jpeg`,
    userImage: 'profile.jpg', 
    date: `2024-07-${(index < 10 ? '0' : '') + index}`, // e.g. 2024-07-01, 2024-07-02, ...
    comments: `This is a tasty ${category.toLowerCase()} dish, carefully prepared and served fresh!`,
    category: category
  };
});


export interface FetchItemsFilters {
    search?: string;
    category?: string;
  }
  
  /**
   * Simulates an API call that fetches ProductItems by page and optional filters.
   * @param page The current page number (1-based index)
   * @param pageSize Number of items per page
   * @param filters Optional filters such as search term and category
   * @returns Promise resolving to { total: number; items: ProductItem[] }
   */
  export function fetchItemsFromApi(
    page: number = 1,
    pageSize: number = 10,
    filters?: FetchItemsFilters
  ): Promise<{ total: number; items: ProductItem[] }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Clone the data to avoid mutating original
        let filteredItems = [...ALL_ITEMS];
  
        // Apply search filter (case-insensitive)
        if (filters?.search) {
          const searchTerm = filters.search.toLowerCase();
          filteredItems = filteredItems.filter(item =>
            item.title.toLowerCase().includes(searchTerm) ||
            item.comments.toLowerCase().includes(searchTerm)
          );
        }
  
        // Apply category filter
        if (filters?.category) {
          filteredItems = filteredItems.filter(
            item => item.category.toLowerCase() === filters.category!.toLowerCase()
          );
        }
  
        const total = filteredItems.length;
  
        // Apply pagination: calculate start and end index
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const items = filteredItems.slice(startIndex, endIndex);
  
        resolve({
          total,
          items
        });
      }, 800); // Simulate ~800ms network latency
    });
  }
  
