import React from 'react'

const Contact = () => {
    return (
        <>
            <div className=" text-center  font-custom">
                <h1 className=' text-white font-semibold bg-[#010522] py-10 text-center uppercase'><a href={`/`} className='hover:text-[#C84C53] transition duration-500'>Home</a> / Contact</h1>
                <div className="min-h-screen container mx-auto text-white flex justify-center items-center">
                    <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                        {/* Left Section */}
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-start">Contact</h2>
                            <ul className="space-y-6 text-lg">
                                <li className="flex items-center">
                                    <span className="text-2xl mr-4">📍</span>
                                    <p>Address goes here, street, Crossroad 123.</p>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-2xl mr-4">📧</span>
                                    <p>
                                        info@example.com / info@example.com
                                    </p>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-2xl mr-4">📞</span>
                                    <p>+1 35 776 859 000 / +1 35 776 859 011</p>
                                </li>
                            </ul>
                        </div>

                        {/* Right Section */}
                        <div>
                            <form className="space-y-6">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Subject"
                                        className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <textarea
                                        placeholder="Message"
                                        className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                                    ></textarea>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full bg-gray-700 hover:bg-[#C84C53] text-white p-3 rounded-md font-semibold transition duration-500"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Contact