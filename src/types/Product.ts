export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: {
      id: number;
      name: string;
      image: string;
    };
    images: string[];
  }
  
  export interface CreateProductInput {
    title: string;
    price: number;
    description: string;
    categoryId: number;
    images: string[];
  }
  
  export interface UpdateProductInput extends Partial<CreateProductInput> {}