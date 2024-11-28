import React, { useEffect, Dispatch, SetStateAction, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { apiURL } from '../util/api';

import Swal from 'sweetalert2';

import logo from '../../assets/img/rest/logo.png'
import product1 from '../../assets/img/rest/product1'

import { IconType } from "react-icons";
import {
    FiShoppingBag,
    FiUser,
    FiEdit,
    FiChevronDown,
    FiTrash,
    FiShare,
    FiPlusSquare,
    FiDollarSign,
} from 'react-icons/fi';
import { FaTimes, FaSearch } from 'react-icons/fa';// Icons for cart and user
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";

import { motion } from "framer-motion";

import { useBasket } from '../pages/cart/BasketContext';
import { CurrencyContext } from './currencyContext';


const Header = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { basket, removeFromBasket, clearBasket, addToBasket, decrementFromBasket } = useBasket(); // Access basket state and remove function
    const { currency, setCurrency } = useContext(CurrencyContext);



    const toggleCart = () => {
        setIsCartOpen(open ? false : !isCartOpen);
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const Option = ({ text, Icon, setOpen }) => {
        return (
            <motion.li
                variants={itemVariants}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-[#C84C53] text-white  transition-colors cursor-pointer"
            >
                <motion.span variants={actionIconVariants}>
                    <Icon />
                </motion.span>
                <span>{text}</span>
            </motion.li>
        );
    };

    const handleSearch = async (query) => {
        if (query.trim() === '') {
            setFilteredProducts([]);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
            const data = await response.json();

            if (data.products.length === 0) {
                // Show SweetAlert and clear input if no products are found
                Swal.fire({
                    title: 'Product Not Found',
                    text: `No products matched "${query}". Clearing input.`,
                    icon: 'error',
                    confirmButtonText: 'OK',
                }).then(() => {
                    setSearchQuery(''); // Clear the search input
                });
            } else {
                setFilteredProducts(data.products || []);
            }

            setFilteredProducts(data.products || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        handleSearch(query); // Call search API as the user types
    };

    const handleProductClick = (productId) => {
        setSearchQuery(''); // Clear the search input
        setFilteredProducts([]);
        navigate(`/detail/${productId}`); // Navigate to product detail page
    };

    const subtotal = basket.reduce((total, item) => total + (item.price - (item.price * item.discountPercentage / 100)) * item.quantity, 0);



    return (
        <>
            <header className="bg-[#00001D] py-4">
                <div className="container mx-auto px-2 flex items-center justify-between">
                    {/* Logo */}
                    <div className="text-white text-2xl font-bold md:w-1/5 w-1/2">
                        <Link to={'/'}>
                            <img src={logo} alt="" />
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="md:flex items-center bg-[#00001D] overflow-hidden  md:w-[50%] hidden ">


                        {/* Search Input */}
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="bg-[#00001D] text-white px-4 py-3 w-full focus:outline-none border border-[rgba(255,255,255,.1)] placeholder:font-custom placeholder:font-normal placeholder:text-[#666666]"
                            value={searchQuery}
                            onChange={handleInputChange}
                        />

                        {/* Loading Indicator */}
                        {isLoading && <div className="absolute left-4 top-3 text-sm text-gray-500">Loading...</div>}

                        {/* Search Results Dropdown */}
                        {filteredProducts.length > 0 && (
                            <div className="absolute max-h-60 overflow-y-auto left-[30%] mt-2 top-[7%] shadow-lg rounded-lg z-[10000]">
                                {filteredProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="p-2 hover:bg-gray-100 cursor-pointer flex overflow-auto items-center z-[1000] bg-white border"
                                        onClick={() => handleProductClick(product.id)}
                                    // onClick={() => alert(`Selected: ${product.title}`)}
                                    >
                                        <img
                                            src={product.thumbnail}
                                            alt={product.title}
                                            className="w-10 h-10 mr-2 rounded object-cover"
                                        />
                                        {product.title}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* No Results Message */}
                        {/* {!isLoading && searchQuery.trim() !== '' && filteredProducts.length === 0 && (
                            <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg p-2 text-gray-500">
                                No results found.
                            </div>
                        )} */}



                        <div className=" relative ">
                            <button className=" relative inline-flex items-center justify-start overflow-hidden font-medium transition-all bg-[#ff6162] rounded-[3px]  group py-3 px-[40px]">
                                <span className="w-56 h-48 rounded-[3px] bg-white absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0 "></span>
                                <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-[#ff6162] font-custom">Search</span>
                            </button>
                        </div>
                    </div>

                    {/* Icons */}
                    <div className="flex md:space-x-6 space-x-4 text-white text-2xl md:w-[20%]">
                        {/* Cart Icon */}
                        <div className="relative cursor-pointer">
                            <FiShoppingBag onClick={toggleCart} />
                            <span className="absolute -top-2 -right-2 bg-[#C84C53] text-xs text-white rounded-full px-1">{basket.length}</span>
                        </div>

                        {/* Shopping Cart Dropdown */}
                        {open ? (!isCartOpen) : isCartOpen && (
                            <div className="absolute overflow-hidden z-[10000] md:right-[20%] md:top-[7%] right-[5%] top-[7%] w-[70%]  md:h-[360px] mt-2 md:w-[15%] bg-[#00001D]
                             text-white p-4 rounded animate-fadeIn shadow-sm shadow-white">
                                {/* Cart Header */}
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="md:text-lg font-custom text-[15px]">Shopping Cart ({basket.length})</h2>
                                    <button onClick={toggleCart} className="text-gray-400 hover:text-white">
                                        <FaTimes />
                                    </button>
                                </div>
                                <hr className="border-1  " />
                                {/* Cart Content */}
                                {/* <p className="text-center text-gray-400 font-custom text-[20px]">Your cart is empty now.</p> */}
                                <div className=' overflow-y-auto h-[150px]'>
                                    {basket.length > 0 ? basket.map((item) => (
                                        <div className='flex justify-between gap-2 items-center py-5'>
                                            <div className='w-[30%] relative'>
                                                <Link to={`/detail/${item.id}`}>
                                                    <img src={item.thumbnail} className='w-full' alt="" />
                                                </Link>
                                                <button
                                                    onClick={() => removeFromBasket(item.id)} // Remove product from basket
                                                    className='absolute right-0 top-0'
                                                >
                                                    <IoMdCloseCircleOutline className='text-[20px] hover:text-[#ff6162] transition duration-500 ' />
                                                </button> {/* Remove */}
                                            </div>
                                            <div className='w-[70%] text-[16px]'>
                                                <span>{item.id}. {item.title}</span>
                                                <p>{item.quantity} x ${(item.price - (item.price * item.discountPercentage / 100)).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    )) : <p className='font-custom text-center py-5 text-[18px]'>Your cart is empty now</p>}
                                </div>
                                <div className='flex border-t border-b py-3 mb-6 text-[16px] justify-between'>
                                    <span>Total:</span>
                                    <p>${subtotal.toFixed(2)}</p>
                                </div>
                                <Link
                                    to={'/cart'}
                                    className='font-custom text-[20px] font-semibold border w-full block py-3 text-center hover:bg-[#C84C53] hover:border-[#C84C53] transition duration-500 cursor-pointer'>
                                    VIEW CART
                                </Link>
                            </div>
                        )}


                        {/* User Icon */}
                        {/* <FiUser className="cursor-pointer" /> */}
                        <motion.div animate={open ? "open" : "closed"} className="relative">
                            <button
                                onClick={() => setOpen((pv) => isCartOpen ? false : !pv)}
                                className="flex items-center  rounded-md text-indigo-50  transition-colors"
                            >
                                <FiUser className="cursor-pointer" />
                                <motion.span variants={iconVariants}>
                                    <FiChevronDown />
                                </motion.span>
                            </button>

                            <motion.ul
                                initial={wrapperVariants.closed}
                                variants={wrapperVariants}
                                style={{ originY: "top", translateX: "-50%" }}
                                className="flex flex-col gap-2 py-2 rounded-lg bg-[#00001D] absolute top-[120%] md:left-[50%]  w-48 overflow-hidden z-50"
                            >
                                <span className='font-custom pt-3 pb-1 px-2 text-[19px] font-semibold'>Currency</span>
                                <span className='border mb-1'></span>
                                {/* <Option setOpen={setOpen} Icon={FiDollarSign} text="USD - US Dollar" onClick={() => setCurrency('USD')} />
                                <Option setOpen={setOpen} Icon={FiPlusSquare} text="EUR - Euro" onClick={() => setCurrency('EUR')} />
                                <Option setOpen={setOpen} Icon={FiShare} text="GBP - British Pound" /> */}
                                <button
                                    variants={itemVariants}
                                    onClick={() => setCurrency('USD')}
                                    className={`flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md  duration-500 transition-colors cursor-pointer ${currency === 'USD' ? 'bg-[#C84C53]' : 'text-white'}`}
                                >
                                    💵 USD - US Dollar
                                </button>
                                <button
                                    onClick={() => setCurrency('EUR')}
                                    className={`flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md   duration-500 transition-colors cursor-pointer ${currency === 'EUR' ? 'bg-[#C84C53]' : 'text-white '}`}
                                >
                                    💶 EUR - Euro
                                </button>
                                <span className='font-custom px-2 text-[19px] font-semibold'>Account</span>
                                <span className='border mb-1'></span>
                                <span className='text-[16px] font-custom px-2 cursor-pointer hover:text-[#C84C53] transition duration-500'>Login</span>
                                <span className='text-[16px] font-custom px-2 pb-2 cursor-pointer hover:text-[#C84C53] transition duration-500'>Create Account</span>

                            </motion.ul>
                        </motion.div>

                        {/* Sidebar icon for responsible design */}
                        <IoIosMenu className="cursor-pointer md:hidden" onClick={toggleSidebar} />

                        <div className='flex overflow-hidden md:hidden z-[1000000] '>
                            <div
                                className={`fixed top-0 right-0 h-full bg-[#00001D] border border-white p-5 w-64 transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                                    } md:translate-x-0`}
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-white text-2xl font-semibold ">My Sidebar</h2>
                                    {/* Toggle x button */}
                                    <button
                                        onClick={toggleSidebar}
                                        className="md:hidden  text-white  rounded-md focus:outline-none"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                                <div className='flex  border-white'>
                                    <input className="placeholder-gray-500 border bg-transparent focus:outline-none w-[80%] placeholder:text-[15px] font-custom ps-2 pb-2 pt-1" placeholder="Search our store"></input>
                                    <button className=' text-white border w-[20%] flex justify-center items-center'>
                                        <IoSearchSharp />
                                    </button>
                                </div>
                                <div className="border my-7"></div>
                                <ul className="space-y-4">
                                    <li className="text-white flex items-center space-x-2 hover:bg-[#C84C53] p-2 rounded-md cursor-pointer">
                                        <Link to={'/'}>
                                            <span>Home</span>
                                        </Link>
                                    </li>
                                    <li className="text-white flex items-center space-x-2 hover:bg-[#C84C53] p-2 rounded-md cursor-pointer">
                                        <Link to={'/shop'}>
                                            <span>Shop</span>
                                        </Link>
                                    </li>
                                    <li className="text-white flex items-center space-x-2  p-2 rounded-md cursor-pointer">
                                        <Link to={'/blog'}>
                                            <span>Blog</span>
                                        </Link>
                                    </li>
                                    <li className="text-white flex items-center space-x-2 hover:bg-[#C84C53] p-2 rounded-md cursor-pointer">
                                        <Link to={'/cart'}>
                                            <span>Cart</span>
                                        </Link>
                                    </li>
                                    <li className="text-white flex items-center space-x-2 hover:bg-[#C84C53] p-2 rounded-md cursor-pointer">
                                        <Link to={'/account'}>
                                            <span>Account</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </header>

            <div className="bg-[#00001D] py-4 border-t border-[#1A1A34] hidden md:block">
                <div className='container mx-auto px-2 flex gap-10 justify-center'>
                    <Link to={'/'}>
                        <span className='text-white font-custom text-[18px] hover:text-[#C84C53] transition duration-500'>Home</span>
                    </Link>
                    <Link to={'/blog'}>
                        <span className='text-white font-custom text-[18px] hover:text-[#C84C53] transition duration-500'>Blog</span>
                    </Link>
                    <Link to={'/shop'}>
                        <span className='text-white font-custom text-[18px] hover:text-[#C84C53] transition duration-500'>Shop</span>
                    </Link>
                    <Link to={'/contact'}>
                        <span className='text-white font-custom text-[18px] hover:text-[#C84C53] transition duration-500'>Contact</span>
                    </Link>
                    <Link to={'/about'}>
                        <span className='text-white font-custom text-[18px] hover:text-[#C84C53] transition duration-500'>About</span>
                    </Link>
                    <Link to={'/cart'}>
                        <span className='text-white font-custom text-[18px] hover:text-[#C84C53] transition duration-500'>Cart</span>
                    </Link>
                </div>
            </div>
        </>
    );
};


const wrapperVariants = {
    open: {
        scaleY: 1,

    },
    closed: {
        scaleY: 0,

    },
};

const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
};

const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: {
            when: "beforeChildren",
        },
    },
    closed: {
        opacity: 0,
        y: -15,
        transition: {
            when: "afterChildren",
        },
    },
};

const actionIconVariants = {
    open: { scale: 1, y: 0 },
    closed: { scale: 0, y: -7 },
};


export default Header;

