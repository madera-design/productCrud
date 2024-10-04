import React, { useState, useEffect } from 'react';
import { Product, CreateProductInput, UpdateProductInput } from '../types/Product';
import { createProduct, updateProduct } from '../api/productApi';

interface ProductFormProps {
  product?: Product;
  onNavigate: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onNavigate }) => {
  const [formData, setFormData] = useState<CreateProductInput | UpdateProductInput>({
    title: '',
    price: 1,
    description: '',
    categoryId: 1,
    images: ['https://i.imgur.com/1twoaDy.jpeg'],
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        price: product.price,
        description: product.description,
        categoryId: product.category.id,
        images: ['https://i.imgur.com/1twoaDy.jpeg'],
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === 'price' ? parseFloat(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (product) {
        await updateProduct(product.id, formData as UpdateProductInput);
      } else {
        await createProduct(formData as CreateProductInput);
      }
      onNavigate();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          type="number"
          name="price"
          id="price"
          value={formData.price}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        ></textarea>
      </div>
      <div>
        <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
          Category ID
        </label>
        <input
          type="number"
          name="categoryId"
          id="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          required
          min="1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {product ? 'Actualizar' : 'Crear'} producto
      </button>
      <button
        type="submit"
        className="inline-flex justify-center ml-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-indigo focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Cancelar
      </button>
    </form>
  );
};

export default ProductForm;