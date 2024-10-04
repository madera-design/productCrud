import React, { useState, useEffect } from 'react';
import { Product } from '../types/Product';
import { getProducts, deleteProduct } from '../api/productApi';
import { Trash2, Edit } from 'lucide-react';

interface ProductListProps {
  onEdit: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onEdit }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const fetchedProducts = await getProducts();
    setProducts(fetchedProducts);
  };

  const handleDelete = async (id: number, title: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  return (
    <div className="h-[calc(100vh-300px)] overflow-y-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal sticky top-0">
          <tr>
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Nombre</th>
            <th className="py-3 px-6 text-left">Precio</th>
            <th className="py-3 px-6 text-left">Categoria</th>
            <th className="py-3 px-6 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {products.map((product) => (
            <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{product.id}</td>
              <td className="py-3 px-6 text-left whitespace-nowrap">{product.title}</td>
              <td className="py-3 px-6 text-left">${product.price}</td>
              <td className="py-3 px-6 text-left">{product.category.name}</td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => onEdit(product.id)}
                  className="text-blue-600 hover:text-blue-900 mr-2"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(product.id, product.title)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;