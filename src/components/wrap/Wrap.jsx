import React from 'react'
import { Link } from 'react-router-dom'

const Wrap = () => {
    return (
        <>
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
                </div>
            </div>
        </>
    )
}

export default Wrap