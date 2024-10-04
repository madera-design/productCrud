import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from '../components/ProductList';
import { PlusCircle } from 'lucide-react';

const ProductListView: React.FC = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate('/create');
  };

  const handleEdit = (id: number) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-[calc(100vh-135px)]">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Lista de productos</h2>
          <button
            onClick={handleCreate}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <PlusCircle size={20} className="mr-2" />
            Crear producto
          </button>
        </div>
      </div>
      <div className="flex-grow overflow-hidden">
        <ProductList onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default ProductListView;