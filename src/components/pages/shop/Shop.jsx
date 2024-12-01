import React, { useState, useEffect, useContext } from 'react';

import { Link } from 'react-router-dom';


import { IoGridOutline } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import { FaSearch, FaStar, FaStarHalf, FaRegStar } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import { IoMdCloseCircleOutline } from "react-icons/io";

import Swal from 'sweetalert2';
import { useBasket } from '../cart/BasketContext'
import { CurrencyContext } from '../../header/currencyContext';



const Shop = () => {
    const [isOpen, setIsOpen] = useState(false); // Manage the price collapse state
    const [isClosed, setIsClosed] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { addToBasket } = useBasket(); // Access addToBasket from context
    const [sortOption, setSortOption] = useState(''); // Sorting option
    const [selectedProduct, setSelectedProduct] = useState(null);


    const [products, setProducts] = useState([]); // All products
    const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
    const [categories, setCategories] = useState([]); // List of categories
    const [selectedCategory, setSelectedCategory] = useState(''); // Selected category
    const [priceRange, setPriceRange] = useState([0, 1000]); // Price range [min, max]
    const [categoryOpen, setCategoryOpen] = useState(false) // Category collapse


    const itemsPerPage = 9; // Number of items per page
    const [startPage, setStartPage] = useState(1); // Tracks the first button in the visible range
    const buttonsPerPage = 4; // Number of buttons visible at a time
    const totalProducts = filteredProducts.length
    const totalPages = Math.ceil(totalProducts / itemsPerPage); // Total number of pages
    const [currentPage, setCurrentPage] = useState(1); // Current page state

    const { currency, conversionRate } = useContext(CurrencyContext);

    // Handle Previous Arrow Click
    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);

            // Move the range backward if at the start of the visible range
            if (currentPage - 1 < startPage) {
                setStartPage(startPage - buttonsPerPage);
            }
        }
    };

    // Handle Next Arrow Click
    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);

            // Move the range forward if at the end of the visible range
            if (currentPage + 1 > startPage + buttonsPerPage - 1) {
                setStartPage(startPage + buttonsPerPage);
            }
        }
    };

    // Generate the buttons for the current range
    const visibleButtons = Array.from(
        { length: Math.min(buttonsPerPage, totalPages - startPage + 1) },
        (_, index) => startPage + index
    );




    // Fetch products and categories from the DummyJSON API
    useEffect(() => {
        const fetchProductsAndCategories = async () => {
            try {
                // Fetch products
                const productsResponse = await fetch('https://dummyjson.com/products?limit=220');
                const productsData = await productsResponse.json();
                setProducts(productsData.products);
                setFilteredProducts(productsData.products); // Initialize with all products

                // Fetch categories
                const categoriesResponse = await fetch('https://dummyjson.com/products/category-list');
                const categoriesData = await categoriesResponse.json();
                setCategories(categoriesData);
                console.log(categoriesData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchProductsAndCategories();
    }, []);

    // Apply both price and category filters
    useEffect(() => {
        const filtered = products.filter((product) => {
            const matchesPrice =
                product.price - (product.price * product.discountPercentage) / 100 >= priceRange[0] &&
                product.price - (product.price * product.discountPercentage) / 100 <= priceRange[1];
            const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
            return matchesCategory && matchesPrice;


        });
        console.log(filtered);

        setFilteredProducts(filtered);
        setCurrentPage(1); // Reset to the first page after filtering
    }, [products, selectedCategory, priceRange]);



    // Calculate the current page's products
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Calculate total pages
    // const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    // Handle price range change
    const handlePriceChange = (event) => {
        const value = Number(event.target.value);
        const name = event.target.name;

        setPriceRange((prevRange) => {
            const newRange = [...prevRange];
            if (name === 'min') newRange[0] = value;
            if (name === 'max') newRange[1] = value;
            return newRange;
        });
    };

    // Handle category selection
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        console.log(category);

    };

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    // Modal
    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    };

    // Handle sorting
    const handleSort = (option) => {
        setSortOption(option); // Update sorting option

        const sortedProducts = [...filteredProducts];
        if (option === 'az') {
            sortedProducts.sort((a, b) => a.title.localeCompare(b.title)); // Alphabetically A-Z
        } else if (option === 'za') {
            sortedProducts.sort((a, b) => b.title.localeCompare(a.title)); // Alphabetically Z-A
        } else if (option === 'priceHigh') {
            sortedProducts.sort((a, b) => b.price - a.price); // Price High to Low
        } else if (option === 'priceLow') {
            sortedProducts.sort((a, b) => a.price - b.price); // Price Low to High
        }

        setFilteredProducts(sortedProducts); // Update filtered products
    };


    // Price convertor
    const convertPrice = (price) => {
        return currency === 'EUR'
            ? (price * conversionRate).toFixed(2) // Convert to euros
            : price.toFixed(2); // Default to dollars
    };


    return (
        <>
            <div className="font-custom">
                <h1 className=' text-white font-semibold bg-[#010522] py-10 text-center '><a href={`/`} className='hover:text-[#C84C53] transition duration-500'>Home</a> / Products</h1>
                <div className="container mx-auto px-3">
                    <div className='md:flex gap-5 py-10 '>
                        <div className="md:w-[20%] w-full">
                            <div>
                                {/* Collapsible Header */}
                                <div
                                    className="flex justify-between items-center cursor-pointer border-b border-white pb-3"
                                    onClick={() => setIsOpen(!isOpen)} // Toggle the collapse state
                                >
                                    <h2 className="text-xl font-bold text-white">Price</h2>
                                    <span className={`text-white transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                                        ▼
                                    </span>
                                </div>

                                {/* Collapsible Content */}
                                <div
                                    className={`mt-4 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'
                                        }`}
                                >
                                    <div className='flex justify-between items-center gap-4 py-5'>
                                        <span className='text-white'>Min Price: ${priceRange[0]}</span>
                                        <input
                                            type="range"
                                            name="min"
                                            min="0"
                                            max="1000"
                                            value={priceRange[0]}
                                            onChange={handlePriceChange}
                                            className="w-full"
                                        />
                                        <span className='text-white'>Max Price: ${priceRange[1]}</span>
                                        <input
                                            type="range"
                                            name="max"
                                            min="0"
                                            max="1000"
                                            value={priceRange[1]}
                                            onChange={handlePriceChange}
                                            className="w-full"
                                        />

                                    </div>
                                </div>
                                <ul
                                    className="space-y-2 mt-5   "
                                    style={{
                                        height: '300px',
                                        overflowY: 'auto',
                                        scrollbarWidth: 'none', // For Firefox
                                        msOverflowStyle: 'none', // For Internet Explorer
                                    }} >
                                    <li>
                                        {/* Collapsible Header */}
                                        <div
                                            className="flex justify-between items-center cursor-pointer border-b border-white pb-3"
                                            onClick={() => {
                                                setCategoryOpen(!categoryOpen)
                                                handleCategoryChange('')
                                            }} // Toggle the collapse state

                                        >
                                            <h2 className="text-xl font-bold text-white">Categories</h2>
                                            <span className={`text-white transform transition-transform duration-300 ${categoryOpen ? 'rotate-180' : 'rotate-0'}`}>
                                                ▼
                                            </span>
                                        </div>
                                    </li>
                                    {categories.map((category, index) => (
                                        <li key={index} className={`mt-4 transition-all duration-300 ease-in-out overflow-hidden ${categoryOpen ? 'max-h-screen' : 'max-h-0'
                                            }`}>
                                            <button
                                                className={`block w-full text-left px-4 py-2 rounded ${selectedCategory === category ? 'bg-[#C84C53] text-white' : 'bg-gray-700 text-white hover:bg-gray-600'
                                                    }`}
                                                onClick={() => handleCategoryChange(category)}
                                            >
                                                <button
                                                    className={`block w-full text-left px-4 py-2 rounded ${selectedCategory === category
                                                        ? 'bg-[#C84C53] text-white'
                                                        : 'bg-gray-700 text-white hover:bg-gray-600'
                                                        }`}
                                                    onClick={() => handleCategoryChange(category)}
                                                >
                                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                                </button>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className='md:w-[80%] w-full mt-8 md:mt-0'>
                            {/* top */}
                            <div className='flex items-center justify-between pb-8'>
                                <div>
                                    <span className='text-white '>Sort By</span>
                                    <div className="relative inline-block text-left ms-2">
                                        {/* Dropdown Trigger */}
                                        <button
                                            className="inline-flex justify-center w-full rounded-md border px-10 py-4 text-sm font-medium text-white hover:bg-[] focus:outline-none"
                                            onClick={() => setIsClosed(!isClosed)} // Toggle the collapse state
                                        >
                                            Options
                                            <svg
                                                className="-mr-1 ml-2 h-5 w-5"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>

                                        {/* Dropdown Menu */}
                                        {isClosed && (
                                            <div
                                                className="absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white z-50"
                                            >
                                                <div className="py-1">
                                                    <button
                                                        onClick={() => handleSort('az')}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                    >
                                                        Alphabetically A-Z
                                                    </button>
                                                    <button
                                                        onClick={() => handleSort('za')}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                    >
                                                        Alphabetically Z-A
                                                    </button>
                                                    <button
                                                        onClick={() => handleSort('priceHigh')}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                    >
                                                        Price High To Low
                                                    </button>
                                                    <button
                                                        onClick={() => handleSort('priceLow')}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                    >
                                                        Price Low To High
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <button>
                                        <IoGridOutline className='text-white text-[22px]' />
                                    </button>

                                    <button className='ps-5'>
                                        <AiOutlineMenu className='text-white text-[22px]' />
                                    </button>
                                </div>
                            </div>
                            {/* bottom */}
                            <div className="grid md:grid-cols-3 grid-cols-2 gap-5">
                                {currentProducts.length > 0 ? (
                                    currentProducts.map((product) => (
                                        <div
                                            className=' text-white text-center  '
                                            key={product.id}
                                        >
                                            <div className=" text-start shadow-lg border border-[rgba(255,255,255,.1)] group relative h-[400px] md:h-full">
                                                {/* image */}
                                                <Link to={`/detail/${product.id}`}>
                                                    <div className='relative'>
                                                        <img src={product.thumbnail} alt="" className='w-full object-cover  cursor-pointer' />
                                                        <span className='absolute top-[5%] right-[2%] text-white bg-[#ff6162] md:px-4 px-3 md:py-2 py-1 rounded-[20px]'>{product.discountPercentage.toFixed(1)}%</span>
                                                    </div>
                                                </Link>
                                                <div className="px-6 py-4">
                                                    {/* title */}
                                                    <div className=" md:text-xl text-[17px] mb-2 cursor-pointer inline-block hover:text-[#ff6162] transition duration-500">
                                                        {/* product id */}
                                                        <Link to={`/detail/${product.id}`}>
                                                            <span className=' pr-2'>{product.id}.</span>
                                                            {product.title.length > 20 ? product.title.slice(0, 20) + '...' : product.title}
                                                        </Link>
                                                    </div>

                                                    <div className='flex items-center gap-2'>
                                                        <span className=' text-[14px] text-white  line-through pb-3'>{currency === 'USD' ? '$' : '€'} {convertPrice(product.price)}</span> {/* price */}
                                                        <span className=' text-[#ff6162] font-semibold text-[20px]  pb-3 '>{currency === 'USD' ? '$' : '€'} {convertPrice((product.price - (product.price * product.discountPercentage / 100)))}</span> {/* discount-price */}
                                                    </div>
                                                    <StarRating rating={product.rating} />
                                                </div>
                                                <div className="px-3 pt-4 pb-2">
                                                    {/* {product.tags && product.tags.length > 0 ? (
                                                        product.tags.slice(0, 3).map((tag, index) => <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{tag}</span>)
                                                    ) : (
                                                        null
                                                    )} */}
                                                    <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>{product.category}</span>

                                                </div>
                                                {/* Hover Overlay */}
                                                <div className=" z-50 inset-0 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                    {/* Icons */}
                                                    <div className=" absolute top-[30%] left-1/2 transform flex  -translate-x-1/2 space-x-4 text-white text-xl z-50 bg-[#00001D] py-2 px-4  rounded-[20px]">
                                                        <button className="hover:text-[#C84C53] transition duration-500"
                                                            key={product.id}
                                                            onClick={() => openModal(product)}
                                                        >
                                                            <FaSearch />
                                                        </button>
                                                        <button
                                                            className="hover:text-[#C84C53] transition duration-500 ps-2"
                                                            onClick={() => addToBasket(product)} // Add product to basket
                                                        >
                                                            <FaBasketShopping />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className='text-white'>No product found</p>
                                )}
                            </div>
                            {/* Pagination Controls */}
                            {totalPages > 0 && (
                                <div className="flex items-center justify-center mt-4">
                                    {/* Previous Arrow */}
                                    <button
                                        className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white'}`}
                                        onClick={handlePrevious}
                                        disabled={currentPage === 1} // Disable if on the first page
                                    >
                                        &larr; Previous
                                    </button>

                                    {/* Page Number Buttons */}
                                    {visibleButtons.map((page) => (
                                        <button
                                            key={page}
                                            className={`mx-1 px-3 py-1 rounded ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                                                }`}
                                            onClick={() => setCurrentPage(page)}
                                        >
                                            {page}
                                        </button>
                                    ))}

                                    {/* Next Arrow */}
                                    <button
                                        className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white'
                                            }`}
                                        onClick={handleNext}
                                        disabled={currentPage === totalPages} // Disable if on the last page
                                    >
                                        Next &rarr;
                                    </button>
                                </div>

                                // <div className="flex justify-center mt-6">
                                //     <ul className="flex space-x-2">
                                //         {[...Array(totalPages)].map((_, index) => (
                                //             <li key={index}>
                                //                 <button
                                //                     className={`px-4 py-2 rounded ${currentPage === index + 1
                                //                         ? 'bg-[#C84C53] text-white'
                                //                         : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                                //                         }`}
                                //                     onClick={() => handlePageChange(index + 1)}
                                //                 >
                                //                     {index + 1}
                                //                 </button>
                                //             </li>
                                //         ))}
                                //     </ul>
                                // </div>

                            )}

                            {isModalOpen && selectedProduct && (
                                <Modal product={selectedProduct} closeModal={closeModal} />
                            )}
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
        <div className="flex items-center space-x-1 text-yellow-400">
            {Array(fullStars)
                .fill(0)
                .map((_, index) => (
                    <FaStar key={`full-${index}`} />
                ))}
            {halfStar === 1 && <FaStarHalf />}
            {Array(emptyStars)
                .fill(0)
                .map((_, index) => (
                    <FaRegStar key={`empty-${index}`} />
                ))}
        </div>
    );
};


// Modal
const Modal = ({ product, closeModal }) => {
    const { addToBasket } = useBasket(); // Access addToBasket from context
    const { currency, conversionRate } = useContext(CurrencyContext);

    // Handle Add to Cart button click
    const handleAddToCart = () => {
        addToBasket(product); // Add product to the basket

        // Show SweetAlert notification
        Swal.fire({
            title: 'Added to Cart',
            text: `${product.title} has been added to the cart.`,
            icon: 'success',
            confirmButtonText: 'OK',
            timer: 2000, // Automatically close after 2 seconds
        });

        // Close the modal (optional)
        closeModal();
    };



    // Price convertor
    const convertPrice = (price) => {
        return currency === 'EUR'
            ? (price * conversionRate).toFixed(2) // Convert to euros
            : price.toFixed(2); // Default to dollars
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex md:items-center pt-5 md:pt-0 justify-center z-[100000] text-white font-custom" >
            <div className="md:bg-[#00001D] rounded-lg  p-6 w-11/12 md:w-[40%] h-[40%] relative ">
                <div
                    className='absolute top-0 right-0 cursor-pointer'
                    onClick={closeModal}
                >
                    <IoMdCloseCircleOutline
                        className=' text-white text-[30px] hover:text-[#C84C53] transition duration-500 cursor-pointer'
                    />
                </div>
                <div className="bg-[#00001D] flex md:text-start text-center flex-col md:flex-row items-center z-[10000]">
                    <Link to={`/detail/${product.id}`} className='w-full'>
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-full object-cover rounded-lg"
                        />
                    </Link>

                    <div className="md:ml-4 px-2 mt-4 md:mt-0 z-[10000]">
                        <h2 className="text-xl font-semibold">{product.title}</h2>
                        <p className="text-gray-600 my-2">{product.description}</p>
                        <div className='flex justify-center md:justify-start items-center gap-2'>
                            <span className=' text-[14px] text-white  line-through pb-3'>{currency === 'USD' ? '$' : '€'} {convertPrice(product.price)}</span> {/* price */}
                            <span className=' text-[#ff6162] font-semibold text-[20px]  pb-3 '>{currency === 'USD' ? '$' : '€'} {convertPrice((product.price - (product.price * product.discountPercentage / 100)))}</span> {/* discount-price */}
                        </div>
                        <div className='flex justify-center md:justify-start'>
                            <StarRating rating={product.rating} />
                        </div>
                        <button
                            className='bg-[#ffffff80] px-4 py-3 text-black mt-5 hover:bg-[#C84C53] hover:text-white transition duration-500'
                            onClick={handleAddToCart} // Add to cart and show SweetAlert
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop