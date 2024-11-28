import React, { useState, useContext } from 'react';
import { useBasket } from '../../pages/cart/BasketContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CurrencyContext } from '../../header/currencyContext';

import product1 from '../../../assets/img/rest/product1'

import { IoMdCloseCircleOutline } from "react-icons/io";

const Cart = () => {
    const [count, setCount] = useState(1);
    const { basket, removeFromBasket, clearBasket, addToBasket, decrementFromBasket } = useBasket(); // Access basket state and remove function
    const { currency, conversionRate } = useContext(CurrencyContext);

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        if (count > 0) setCount(count - 1); // Prevent count from going below 0
    };

    // Handle product removal with SweetAlert confirmation
    const handleRemoveProduct = (productId) => {
        removeFromBasket(productId); // Remove product from basket
        Swal.fire('Removed!', 'The product named  has been removed from your basket.', 'success');
    };

    // Handle clear cart with SweetAlert confirmation
    const handleClearCart = () => {
        clearBasket(); // Clear the basket
        Swal.fire('Cleared!', 'Your basket has been cleared.', 'success');
    };

    // Calculate Subtotal
    const subtotal = basket.reduce((total, item) => total + (item.price - (item.price * item.discountPercentage / 100)) * item.quantity, 0);


    // Price convertor
    const convertPrice = (price) => {
        return currency === 'EUR'
            ? (price * conversionRate).toFixed(2) // Convert to euros
            : price.toFixed(2); // Default to dollars
    };

    return (
        <>
            <div className='font-custom text-white'>
                <h1 className=' text-white font-semibold bg-[#010522] py-10 text-center '><a href={`/`} className='hover:text-[#C84C53] transition duration-500'>Home</a>  / Your Shopping Cart</h1>
                <div className="text-white text-center py-10 text-[25px]">Basket ({basket.length})</div>
                <div className='md:flex pt-10 text-center justify-center hidden'>
                    <h3 className='border text-white py-3 px-5 w-[10%]'>Image</h3>
                    <h3 className='border text-white py-3 px-5 w-[20%]'>Product</h3>
                    <h3 className='border text-white py-3 px-5 w-[10%]'>Price</h3>
                    <h3 className='border text-white py-3 px-5 w-[10%]'>Quantity</h3>
                    <h3 className='border text-white py-3 px-5 w-[10%]'>Total</h3>
                    <h3 className='border text-white py-3 px-5 w-[10%]'>Remove</h3>
                </div>
                {basket.length === 0 ? (
                    <p className="text-white text-center py-7 font-semibold">Your basket is empty.</p>
                ) : (
                    <div>
                        {basket.map((item) => (
                            <div className='flex text-center justify-center gap-8 md:gap-0 h-[10%] px-2 md:px-0' key={item.id}>
                                <div className='md:w-[10%] w-[35%]  border py-3 px-5 flex justify-center items-center relative'>
                                    <Link to={`/detail/${item.id}`}>
                                        <img src={item.thumbnail} alt="" className='w-full object-cover' /> {/* Image */}
                                    </Link>
                                    <button
                                        className='absolute top-[-5%] right-[-5%] md:hidden'
                                        onClick={() => handleRemoveProduct(item.id)} // Remove product from basket
                                    >
                                        <IoMdCloseCircleOutline className='text-[22px] hover:text-[#ff6162] transition duration-500 bg-[black]' />
                                    </button> {/* Remove */}
                                </div>
                                {/* responsive design */}
                                <div className='w-[65%] md:hidden pb-5'>
                                    <h3 className='text-start'>{item.id}. {item.title}</h3> {/* Title */}
                                    <div className="flex justify-between items-center py-5">
                                        <span className=''>${(item.price - (item.price * item.discountPercentage / 100)).toFixed(2)}</span> {/* Price */}
                                        <div className="flex items-center border border-white rounded overflow-hidden">
                                            {/* Decrement Button */}
                                            <button
                                                onClick={() => decrementFromBasket(item.id)}
                                                className={`w-8 h-8 flex items-center justify-center border-r border-white ${item.quantity === 1
                                                    ? 'cursor-not-allowed'
                                                    : ' text-white hover:bg-gray-700'
                                                    } `}
                                            >
                                                -
                                            </button>

                                            {/* Display Count */}
                                            <div className="w-12 h-8 flex items-center justify-center text-white text-lg">
                                                {item.quantity}
                                            </div>

                                            {/* Increment Button */}
                                            <button
                                                onClick={() => addToBasket(item)}
                                                className="w-8 h-8 flex items-center justify-center text-white border-l border-white hover:bg-gray-700"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <span className='font-semibold text-start block'>Total: ${((item.price - (item.price * item.discountPercentage / 100)) * item.quantity).toFixed(2)}</span> {/* Total */}
                                </div>
                                <div className='w-[20%] border py-3 px-5 md:flex justify-center items-center hidden'>
                                    <h3 className=''>{item.id}. {item.title}</h3> {/* Title */}
                                </div>
                                <div className='w-[10%] border py-3 px-5 md:flex justify-center items-center hidden'>
                                    <span className=''>{currency === 'USD' ? '$' : '€'} {convertPrice((item.price - (item.price * item.discountPercentage / 100)))}</span> {/* discount-price */}
                                </div>
                                <div className='w-[10%] border py-3 px-5 md:flex justify-center items-center hidden'>
                                    <div className="flex items-center border border-white rounded overflow-hidden">
                                        {/* Decrement Button */}
                                        <button
                                            onClick={() => decrementFromBasket(item.id)}
                                            className={`w-8 h-8 flex items-center justify-center border-r border-white ${item.quantity === 1
                                                ? 'cursor-not-allowed'
                                                : ' text-white hover:bg-gray-700'
                                                } `}
                                        >
                                            -
                                        </button>

                                        {/* Display Count */}
                                        <div className="w-12 h-8 flex items-center justify-center text-white text-lg">
                                            {item.quantity}
                                        </div>

                                        {/* Increment Button */}
                                        <button
                                            onClick={() => addToBasket(item)}
                                            className="w-8 h-8 flex items-center justify-center text-white border-l border-white hover:bg-gray-700"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className='w-[10%] border py-3 px-5 md:flex justify-center items-center hidden'>
                                    <span className=''>{currency === 'USD' ? '$' : '€'} {convertPrice(((item.price - (item.price * item.discountPercentage / 100)) * item.quantity))}</span> {/* Total */}
                                </div>
                                <div className='w-[10%] border py-3 px-5 md:flex justify-center items-center hidden'>
                                    <button
                                        onClick={() => handleRemoveProduct(item.id)} // Remove product from basket
                                    >
                                        <IoMdCloseCircleOutline className='text-[20px] hover:text-[#ff6162] transition duration-500' />
                                    </button> {/* Remove */}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className='container md:mx-auto flex gap-5 md:gap-0 py-10 justify-center md:justify-between items-center'>
                    <Link to={'/shop'}
                        className='border text-white py-3 px-5 md:w-[15%] w-[45%] font-semibold hover:bg-[#ff6162] hover:border-[#ff6162] transition duration-500 text-center'

                    >
                        Continue Shopping
                    </Link>
                    <button
                        className='border text-white py-3 px-5 md:w-[15%] w-[45%] font-semibold hover:bg-[#ff6162] hover:border-[#ff6162] transition duration-500 text-center'
                        onClick={handleClearCart} // Trigger SweetAlert for Clear Cart
                    >
                        Clear
                    </button>
                </div>
                {/* Cart Totals */}
                <div className='container mx-auto flex justify-center py-10 font-custom'>
                    <div className="border border-gray-200 p-4 rounded text-center md:w-1/2 w-[80%]">
                        <h2 className="text-xl font-bold mb-4">Cart Totals</h2>
                        <table className="w-full text-left border">
                            <tbody>
                                <tr className="border-b">
                                    <td className="py-2 ps-2 text-start border">Subtotal</td>
                                    <td className="py-2 ps-2 text-start border">{currency === 'USD' ? '$' : '€'} {convertPrice(subtotal)}</td>
                                </tr>
                                <tr>
                                    <td className="py-2 font-bold border text-start ps-2">Total</td>
                                    <td className="py-2 font-bold border text-start ps-2">{currency === 'USD' ? '$' : '€'} {convertPrice(subtotal)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart