import { useGetCategory } from '@/hooks/useGetCategory';
import { useGetSubCategory } from '@/hooks/useGetSubCategories';
import React, { useState } from 'react';
import { ArrowDown, ArrowUp } from '@/components/Svg/Svgs';

function FilterSection({
  setSelectedCategories,
  setSelectedSubcategories,
  setPrice,
  selectedCategories,
  selectedSubcategories,
}: FilterSection) {
  const [openSubCategory, setOpenSubCategory] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState('');
  const prices = ['صعودی', 'نزولی'];

  const { data } = useGetCategory({});
  const category = data?.categories?.map((category) => category.name);

  const { data: subCategory } = useGetSubCategory({});
  const subCategorys = subCategory?.subcategories?.map(
    (subcategory) => subcategory.name
  );

  const handleResetPrice = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const target = e.target as HTMLButtonElement;
    const selectedPrice = target.value;
    setSelectedPrice(selectedPrice);
    if (target.value === 'صعودی') {
      const sort = 'price';
      setPrice(sort);
    } else if (target.value === 'نزولی') {
      const sort = '-price';
      setPrice(sort);
    } else {
      const sort = '';
      setPrice(sort);
    }
  };

  const handlePrice = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const target = e.target as HTMLInputElement;
    const selectedPrice = target.value;
    setSelectedPrice(selectedPrice);
    if (target.value === 'صعودی') {
      const sort = 'price';
      setPrice(sort);
    } else if (target.value === 'نزولی') {
      const sort = '-price';
      setPrice(sort);
    } else {
      const sort = '';
      setPrice(sort);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const category = e.target.value;
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((c: string) => c !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSubcategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const subcategory = e.target.value;
    if (selectedSubcategories.includes(subcategory)) {
      setSelectedSubcategories(
        selectedSubcategories.filter((s: string) => s !== subcategory)
      );
    } else {
      setSelectedSubcategories([...selectedSubcategories, subcategory]);
    }
  };
  const handleSubCategoryOpen = () => {
    setOpenSubCategory(!openSubCategory);
  };

  const handleCategoryOpen = () => {
    setOpenCategory(!openCategory);
  };

  const handlePriceOpen = () => {
    setOpenPrice(!openPrice);
  };

  const removeCategoryFilter = (category: string) => {
    setSelectedCategories(
      selectedCategories.filter((c: string) => c !== category)
    );
  };

  const removeSubcategoryFilter = (subcategory: string) => {
    setSelectedSubcategories(
      selectedSubcategories.filter((s: string) => s !== subcategory)
    );
  };
  return (
    <>
      <h2 className="text-lg font-bold mb-2 bg-[#009dae] text-white flex justify-center rounded-full">
        فیلتر ها:
      </h2>
      <div>
        <div className="py-3 font-bold border-b-[1px] border-blue-400 mb-2">
          فیلتر های اعمال شده
        </div>
        {selectedCategories.length > 0 && (
          <div className="">
            <ul className="ml-2 grid md:grid-cols-2">
              {selectedCategories.map((category: any) => (
                <li
                  key={category}
                  className="inline-block bg-blue-400 text-white text-xs px-2 py-1 rounded-full ml-1 mb-1"
                >
                  <button
                    className="ml-1 text-white text-xs font-bold focus:outline-none"
                    onClick={() => removeCategoryFilter(category)}
                  >
                    &#x2716;
                  </button>
                  {category}
                </li>
              ))}
            </ul>
          </div>
        )}
        {selectedSubcategories.length > 0 && (
          <div>
            <ul className="ml-2 grid md:grid-cols-2 ">
              {selectedSubcategories.map((subcategory: any) => (
                <li
                  key={subcategory}
                  className="inline-block bg-blue-400 text-white text-xs px-2 py-1 rounded-full ml-1 mb-1"
                >
                  <button
                    className="ml-1 text-white text-xs font-bold focus:outline-none"
                    onClick={() => removeSubcategoryFilter(subcategory)}
                  >
                    &#x2716;
                  </button>
                  {subcategory}
                </li>
              ))}
            </ul>
          </div>
        )}
        {selectedPrice !== '' && (
          <div className="">
            <ul className="ml-2 grid md:grid-cols-2">
              <li
                key={selectedPrice}
                className="inline-block bg-blue-400 text-white text-xs px-2 py-1 rounded-full ml-1 mb-1"
              >
                <button
                  className="ml-1 text-white text-xs font-bold focus:outline-none"
                  onClick={(e) => {
                    setSelectedPrice('');
                    handleResetPrice(e);
                  }}
                >
                  &#x2716;
                </button>
                {selectedPrice}
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="mb-4 mt-4">
        <div className="flex justify-between">
          <h3 className="font-bold mb-2"> دسته ها :</h3>
          <div className="cursor-pointer" onClick={handleCategoryOpen}>
            {openCategory ? <ArrowDown /> : <ArrowUp />}
          </div>
        </div>
        {category?.map((category) => (
          <>
            {openCategory ? (
              <label
                key={category}
                className="flex items-center mb-2 hover:bg-blue-400 hover:text-white rounded-full"
              >
                <input
                  type="checkbox"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={handleCategoryChange}
                  className="mr-2 ml-2 appearance-none rounded border border-gray-400 w-4 h-4 checked:bg-blue-400 checked:border-transparent focus:outline-none"
                />
                {category}
              </label>
            ) : (
              ''
            )}
          </>
        ))}
      </div>
      <div>
        <div className="flex justify-between">
          <h3 className="font-bold mb-2">زیر دسته ها :</h3>
          <div className="cursor-pointer" onClick={handleSubCategoryOpen}>
            {openSubCategory ? <ArrowDown /> : <ArrowUp />}
          </div>
        </div>
        {subCategorys?.map((subcategory) => (
          <>
            {openSubCategory ? (
              <label
                key={subcategory}
                className="flex items-center mb-2 hover:bg-blue-400 hover:text-white rounded-full"
              >
                <input
                  type="checkbox"
                  value={subcategory}
                  checked={selectedSubcategories.includes(subcategory)}
                  onChange={handleSubcategoryChange}
                  className="mr-2 ml-2 appearance-none rounded border border-gray-400 w-4 h-4 checked:bg-blue-400 checked:border-transparent focus:outline-none"
                />
                {subcategory}
              </label>
            ) : (
              ''
            )}
          </>
        ))}
      </div>
      <div className="mb-4 mt-4">
        <div className="flex justify-between">
          <h3 className="font-bold mb-2">قیمت :</h3>
          <div className="cursor-pointer" onClick={handlePriceOpen}>
            {openPrice ? <ArrowDown /> : <ArrowUp />}
          </div>
        </div>
        {prices.map((price) => (
          <>
            {openPrice ? (
              <label
                key={price}
                className="flex items-center mb-2 hover:bg-blue-400 hover:text-white rounded-full"
              >
                <input
                  type="checkbox"
                  value={price}
                  checked={price === selectedPrice}
                  className="mr-2 ml-2 appearance-none rounded border border-gray-400 w-4 h-4 checked:bg-blue-400 checked:border-transparent focus:outline-none"
                  onClick={handlePrice}
                />
                {price}
              </label>
            ) : (
              ''
            )}
          </>
        ))}
      </div>
    </>
  );
}

export default FilterSection;
