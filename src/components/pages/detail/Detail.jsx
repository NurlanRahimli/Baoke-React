import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CurrencyContext } from '../..//header/currencyContext';



import review from '../../../assets/img/rest/review-image.png'


const Detail = () => {
    const { id } = useParams(); // Extract the product ID from the URL
    const [product, setProduct] = useState(null);
    const { currency, conversionRate } = useContext(CurrencyContext);


    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return new Intl.DateTimeFormat("en-US", {
            month: "long", // Full month name (e.g., October)
            day: "numeric", // Numeric day without leading zero
            year: "numeric", // Full year
        }).format(date);
    };

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then((response) => response.json())
            .then((data) => setProduct(data))
            .catch((error) => console.error("Error fetching product details:", error));
    }, [id]);

    if (!product) return <p>Loading...</p>;


    // Price convertor
    const convertPrice = (price) => {
        return currency === 'EUR'
            ? (price * conversionRate).toFixed(2) // Convert to euros
            : price.toFixed(2); // Default to dollars
    };

    return (
        <>
            <div className='font-custom'>
                <h1 className=' text-white font-semibold bg-[#010522] py-10 text-center '><a href={`/`} className='hover:text-[#C84C53] transition duration-500'>Home</a>  /  {product.id}. {product.title}</h1>
                <div className='container mx-auto py-[100px] px-3'>
                    <div className='md:flex justify-between  md:gap-8'>
                        <div className='md:w-1/2 mb-5 flex justify-center'>
                            <img src={product.thumbnail} className='w-full object-cover border' alt="" />
                        </div>
                        <div className='md:w-1/2 '>
                            <h2 className='text-[23px] text-white font-custom'>{product.id}. {product.title}</h2> {/* title */}
                            <div className='flex items-center gap-2'>
                                <span className=' text-[20px] text-white line-through pb-3'>{currency === 'USD' ? '$' : '€'} {convertPrice(product.price)}</span> {/* price */}
                                <span className=' text-[#ff6162] font-semibold text-[24px]  pb-3 '>{currency === 'USD' ? '$' : '€'} {convertPrice((product.price - (product.price * product.discountPercentage / 100)))}</span> {/* discount-price */}
                            </div>
                            <span className='text-white font-custom block pt-3 text-[14px]'>SKU: {product.sku}</span> {/* SKU */}
                            <span className='text-white font-custom block pt-3 text-[14px]'>Availability: {product.stock} left in stock</span> {/* availability */}
                            <p className='text-white font-custom block pt-3 text-[14px] '>Description: {product.description}</p>
                            <span className='text-white font-custom block pt-3 text-[14px] capitalize'>Category: {product.category}</span> {/* category */}
                            <span className='text-white font-custom block pt-3 text-[14px] capitalize'>Brand: {product.brand}</span> {/* brand */}
                        </div>
                    </div>
                    <div className='py-10'>
                        <h1 className='text-white text-[30px] text-center'>Reviews ({product.reviews.length})</h1>
                        {product.reviews && product.reviews.length > 0 ? (
                            product.reviews.slice(0, 3).map((reviews, index) =>
                                <div key={index} className='border md:w-1/2 w-full text-white py-5 my-5 ps-3'>
                                    <div className='flex items-center gap-2'>
                                        <img src={review} alt="" className='w-[4%]' />
                                        <h1>{reviews.reviewerName}</h1>
                                    </div>
                                    <span className='text-white block pt-2'>Email: {reviews.reviewerEmail}</span> {/* Reviewer email */}
                                    <span className='text-white block pt-2'>Date: Reviewed in the United States on {formatDate(reviews.date)}</span> {/* date */}
                                    <span className='text-white block pt-2'>Comment: {reviews.comment}</span> {/* comment */}
                                </div>

                            )
                        ) : (
                            null
                        )}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Detail