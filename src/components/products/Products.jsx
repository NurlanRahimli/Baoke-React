import React, { useRef, useState, useEffect, useContext } from 'react';

import { Link, useNavigate } from 'react-router-dom';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Navigation } from 'swiper/modules';

// react icons
import { FaArrowLeft, FaArrowRight, FaSearch, FaStar, FaStarHalf, FaRegStar } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { IoMdCloseCircleOutline } from "react-icons/io";

import product1 from '../../assets/img/rest/product1'

import { apiURL } from '../util/api';
import Swal from 'sweetalert2';
import { useBasket } from '../pages/cart/BasketContext'
import { CurrencyContext } from '../header/currencyContext';
import { isLoggedIn } from '../pages/cart/Helper';

const Products = ({ product }) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [products, setProducts] = useState([]); // State to store products
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { addToBasket } = useBasket(); // Access addToBasket from context
    const { currency, conversionRate } = useContext(CurrencyContext);



    useEffect(() => {
        fetch('https://dummyjson.com/products') // Replace with your API link
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Fetched Products:', data); // Log the data for debugging
                setProducts(data.products); // Update state with fetched products
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []); // Empty dependency array to fetch data only once

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    };


    const convertPrice = (price) => {
        return currency === 'EUR'
            ? (price * conversionRate).toFixed(2) // Convert to euros
            : price.toFixed(2); // Default to dollars
    };


    const navigate = useNavigate();

    const handleAddToBasket = () => {
        if (!isLoggedIn()) {
            // If user is not logged in, show SweetAlert and redirect to login
            Swal.fire({
                icon: "warning",
                title: "You have to log in",
                text: "Log in to add a product to your basket.",
                showConfirmButton: true,
                confirmButtonText: "Go to Login",
            }).then(() => {
                navigate("/login"); // Redirect to login page
            });
            return;
        }

        // If logged in, add product to the basket
        addToBasket(product);
        Swal.fire({
            icon: "success",
            title: "Added to Basket",
            text: `${product.title} has been added to your basket.`,
            timer: 2000,
            showConfirmButton: false,
        });
    };

    return (
        <>
            <div className='py-10 relative font-custom'>
                <div className="container mx-auto text-center relative">
                    <h1 className='font-custom text-white font-semibold text-[30px]'>Featured Collections</h1>
                    <span className='font-custom text-white'>Contrary to popular belief, Lorem Ipsum is not simply random.</span>
                    <Swiper
                        breakpoints={{
                            0: {
                                slidesPerView: 1, // Show 2 slides on screens >= 640px
                                spaceBetween: 20,
                            },
                            680: {
                                slidesPerView: 4, // Show 4 slides on screens >= 1024px
                                spaceBetween: 30,
                            },
                        }}
                        spaceBetween={30}
                        navigation={{
                            prevEl: prevRef.current, // Attach custom previous button
                            nextEl: nextRef.current, // Attach custom next button
                        }}
                        loop={true}
                        onBeforeInit={(swiper) => {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                        }}
                        modules={[Navigation]}
                        className="mySwiper"
                    >

                        {products.length > 0 ? (
                            products.slice(0, 7).map((product) => (
                                <SwiperSlide
                                    className=' text-white md:py-[100px] py-[50px] text-center px-5 '
                                    key={product.id}

                                >
                                    <div className=" text-start shadow-lg border border-[rgba(255,255,255,.1)] group relative ">
                                        {/* image */}
                                        <Link to={`/detail/${product.id}`}>
                                            <div className='relative'>
                                                <img src={product.thumbnail} alt="" className='w-full object-cover h-[500px] md:h-full cursor-pointer' />
                                                <span className='absolute top-[5%] right-[2%] text-white bg-[#ff6162] px-4 py-2 rounded-[20px]'>{product.discountPercentage.toFixed(1)}%</span>
                                            </div>
                                        </Link>
                                        <div className="px-6 py-4">
                                            {/* title */}
                                            <div className=" text-xl mb-2 cursor-pointer inline-block hover:text-[#ff6162] transition duration-500">
                                                {/* product id */}
                                                <Link to={`/detail/${product.id}`}>
                                                    <span className=' pr-2'>{product.id}.</span>
                                                    {product.title.length > 20 ? product.title.slice(0, 20) + '...' : product.title}
                                                </Link>
                                            </div>
                                            {/* description */}
                                            {/* <p className="text-white text-[15px] pb-3 pt-2">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                                    </p> */}

                                            <div className='flex items-center gap-2'>
                                                <span className=' text-[14px] text-white  line-through pb-3'>{currency === 'USD' ? '$' : '€'} {convertPrice(product.price)}</span> {/* price */}
                                                <span className=' text-[#ff6162] font-semibold text-[20px]  pb-3 '>{currency === 'USD' ? '$' : '€'} {convertPrice((product.price - (product.price * product.discountPercentage / 100)))}</span> {/* discount-price */}
                                            </div>
                                            <StarRating rating={product.rating} />
                                        </div>
                                        <div className="px-3 pt-4 pb-2">
                                            {product.tags && product.tags.length > 0 ? (
                                                product.tags.slice(0, 3).map((tag, index) => <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{tag}</span>)
                                            ) : (
                                                null
                                            )}
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
                                </SwiperSlide>
                            ))
                        ) : (
                            <p className='text-white'>Loading products...</p>
                        )}
                        {isModalOpen && selectedProduct && (
                            <Modal product={selectedProduct} closeModal={closeModal} />
                        )}
                    </Swiper>
                    {/* Custom Buttons */}
                    <button ref={prevRef} className='border px-3 py-3 hover:bg-[#C84C53] hover:border-[#C84C53] transition duration-500 absolute top-[50%] left-[0%] z-50 text-white rounded-full  '><FaArrowLeft className='md:text-[25px] text-[17px]' /></button>
                    <button ref={nextRef} className='border px-3 py-3 hover:bg-[#C84C53] hover:border-[#C84C53] transition duration-500 absolute top-[50%] right-[0%] z-50 text-white rounded-full  '><FaArrowRight className='md:text-[25px] text-[17px]' /></button>
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
            <div className="md:bg-[#00001D] rounded-lg  p-6 w-11/12 md:w-[40%] h-[40%] relative " >
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

export default Products