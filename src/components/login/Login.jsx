import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");

        // Validate user from localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(
            (user) => user.username === username && user.password === password
        );

        if (!user) {
            setError("Invalid username or password. Please try again.");
            return;
        }

        // Save user info to localStorage for the session
        localStorage.setItem("authToken", "mock-token");
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        // SweetAlert for successful login
        Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: "You logged in successfully! Redirecting to the home page...",
            timer: 2000,
            showConfirmButton: false,
        }).then(() => {
            navigate("/"); // Redirect to home page after login
        });
    };

    return (
        <>
            <div className="py-10">
                <h1 className=' text-white font-semibold bg-[#010522] py-10 text-center uppercase'><a href={`/`} className='hover:text-[#C84C53] transition duration-500'>Home</a> / Login</h1>
                <div className="max-w-md mx-auto text-white shadow-lg p-6 rounded-lg">
                    <form onSubmit={handleLogin} className="space-y-4 py-5">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-white">
                                Username
                            </label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 "
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
                            className="w-full bg-[#C84C53] text-white p-2 rounded-lg hover:bg-[#c84c52a8] transition duration-500"
                        >
                            Login
                        </button>
                    </form>
                    <p className="mt-4 text-sm text-center text-white">
                        Don't have an account?{" "}
                        <button
                            onClick={() => navigate("/signup")}
                            className="text-blue-500 hover:underline"
                        >
                            Create an Account
                        </button>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;
