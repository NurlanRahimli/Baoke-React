import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        setError("");

        // Save user to localStorage (mock signup)
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = users.find((user) => user.username === username);

        if (userExists) {
            setError("Username already exists. Please choose a different one.");
            return;
        }

        const newUser = { username, password, email };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        // SweetAlert for successful signup
        Swal.fire({
            icon: "success",
            title: "Account Created!",
            text: `Welcome, ${username}! Your account has been created successfully.`,
            showConfirmButton: true,
            confirmButtonText: "Go to Login",
        }).then(() => {
            navigate("/login"); // Redirect to login page after successful signup
        });
    };

    return (
        <>
            <div className="py-10">
                <h1 className=' text-white font-semibold bg-[#010522] py-10 text-center uppercase'><a href={`/`} className='hover:text-[#C84C53] transition duration-500'>Home</a> / Sign up</h1>
                <div className="max-w-md mx-auto mt-10  shadow-lg p-6 rounded-lg">
                    <form onSubmit={handleSignup} className="space-y-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-white">
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-white">
                                Username
                            </label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-white">
                                Password
                            </label>
                            <input
                                type="password"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button
                            type="submit"
                            className="bg-[#C84C53] text-white p-2 rounded-lg hover:bg-[#c84c52a8] transition duration-500 w-full"
                        >
                            Sign Up
                        </button>
                    </form>
                    <p className="mt-4 text-sm text-center text-white">
                        Already have an account?{" "}
                        <button
                            onClick={() => navigate("/login")}
                            className="text-blue-500 hover:underline"
                        >
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </>

    );
};

export default Signup;
