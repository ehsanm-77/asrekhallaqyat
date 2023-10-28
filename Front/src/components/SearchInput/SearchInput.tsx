import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-toastify';
import debounce from 'lodash/debounce';
import Image from 'next/image';

const SearchInput = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false); // Track if a search has been performed

  useEffect(() => {
    // Fetch all products when the component loads initially
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/products?limit=all`
      );
      setAllProducts(response.data.data.products);
    } catch (error) {
      console.error('Error fetching all products:', error);
    }
  };

  const debouncedHandleSearchInputChange = debounce((query) => {
    // Filter products based on the user's input
    if (query.trim() === '') {
      setFilteredProducts([]);
    } else {
      const filtered = allProducts.filter((product) =>
        product.name.includes(query)
      );
      setFilteredProducts(filtered);
    }
    setSearchPerformed(true); // Indicate that a search has been performed
  }, 1000);

  const handleSearchClick = () => {
    setIsModalOpen(true);
    setSearchQuery('');
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setFilteredProducts([]);
    setSearchQuery('');
    setSearchPerformed(false); // Reset searchPerformed when closing the modal
  };

  return (
    <>
      <div className="relative">
        <div className="search-input" onClick={handleSearchClick}>
          <input
            type="text"
            placeholder="جستجو ..."
            className="search-input-field"
            value={searchQuery}
            onChange={(event) => {
              const query = event.target.value;
              setSearchQuery(query);
              debouncedHandleSearchInputChange(query);
            }}
          />
          <FaSearch className="search-icon" />
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="fixed inset-0 backdrop-blur-sm"
              onClick={handleModalClose}
            ></div>
            <div className="absolute bg-white rounded-lg shadow p-4">
              <div className="bg-slate-200 p-2 rounded-md">
                <input
                  type="text"
                  placeholder="جستجو ..."
                  className="modal-search-input focus:outline-none bg-slate-200"
                  autoFocus
                  value={searchQuery}
                  onChange={(event) => {
                    const query = event.target.value;
                    setSearchQuery(query);
                    debouncedHandleSearchInputChange(query);
                  }}
                />
                <button
                  className="modal-close-button"
                  onClick={handleModalClose}
                >
                  ❌
                </button>
              </div>
              <div className='mt-5'>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((result) => (
                    <Link
                      href={`/SingleProduct/${result._id}`}
                      onClick={handleModalClose}
                      className="hover:bg-slate-100 "
                      key={result._id}
                    >
                      <div className='flex gap-3'>
                        <Image
                          src={`http://${result?.images[0]}`}
                          alt="Product Thumbnail"
                          className="w-10 h-auto mb-4 rounded-lg shadow-xl border border-white"
                          width={600}
                          height={600}
                        />
                        <div>{result.name}</div>
                      </div>
                    </Link>
                  ))
                ) : searchPerformed ? ( // Check if a search has been performed
                  <div>محصولی یافت نشد</div>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchInput;
