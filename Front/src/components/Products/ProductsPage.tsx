import React, { useState } from 'react';
import { FilterSection, Product } from './components';
import { FaFilter } from 'react-icons/fa';

const ProductPage = () => {
  const [price, setPrice] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    []
  );
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const openFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const closeFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  return (
    <div className="flex md:mt-0 md:pt-0 pt-5">
      <div className="absolute left-10 top-60">
        <button
          onClick={openFilterModal}
          className="md:hidden text-blue-900 mt-5 md:mt-0 px-3 py-2 rounded-md"
        >
          <FaFilter />
        </button>
        {isFilterModalOpen && (
          <div className="md:hidden fixed top-40 inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-md shadow-md w-4/5 h-[350px] overflow-y-scroll">
              <FilterSection
                setSelectedCategories={setSelectedCategories}
                setSelectedSubcategories={setSelectedSubcategories}
                setPrice={setPrice}
                selectedCategories={selectedCategories}
                selectedSubcategories={selectedSubcategories}
              />
              <button
                onClick={closeFilterModal}
                className="mt-4 bg-blue-600 text-white px-3 py-2 rounded-md"
              >
                بستن
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="w-2/5 lg:w-1/5 p-4 mx-5 mb-5 mt-5 rounded-md shadow-md bg-secondary text-blue-900 hidden md:block">
        <FilterSection
          setSelectedCategories={setSelectedCategories}
          setSelectedSubcategories={setSelectedSubcategories}
          setPrice={setPrice}
          selectedCategories={selectedCategories}
          selectedSubcategories={selectedSubcategories}
        />
      </div>
      <div className="md:w-3/5 lg:w-4/5 w-full ml-4 mr-4 mb-5 mt-5">
        <Product
          price={price}
          selectedCategories={selectedCategories}
          selectedSubcategories={selectedSubcategories}
        />
      </div>
    </div>
  );
};

export default ProductPage;
