import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from '../../slider/Slider'
import Products from '../../products/Products'
import Swal from "sweetalert2";

const Home = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("loggedInUser")); // Get current logged-in user

    useEffect(() => {
        if (user) {
            // Check if we need to show the welcome alert
            Swal.fire({
                icon: "success",
                title: `Welcome, ${user.username}!`,
                text: "We're glad to have you here!",
                timer: 3000,
                showConfirmButton: false,
            });
        }

        // Reset the flag
        localStorage.setItem("showWelcomeAlert", "false");
    }, [navigate, user]);

    const handleLogout = () => {
        // Remove only the logged-in user and auth token
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("authToken");

        alert("You logged out successfully!");
        navigate("/"); // Redirect to login page
    };


    return (
        <div>

            <Slider />
            <Products />
        </div>
    )
}

export default Home