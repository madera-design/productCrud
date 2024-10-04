import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { getProduct } from '../api/productApi';
import { Product } from '../types/Product';
import { ArrowLeft } from 'lucide-react';


const ProductFormView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | undefined>(undefined);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const fetchedProduct = await getProduct(parseInt(id));
        setProduct(fetchedProduct);
      };
      fetchProduct();
    }
  }, [id]);

  const handleNavigate = () => {
    navigate('/');
  };
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <button
            onClick={handleNavigate}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} className="mr-2" />
          </button>
          <h2 className="text-xl font-semibold mb-6">
            {id ? 'Editar producto' : 'Crear nuevo producto'}
          </h2>

        <ProductForm product={product} onNavigate={handleNavigate} />
      </div>
    </div>
  );
};

export default ProductFormView;