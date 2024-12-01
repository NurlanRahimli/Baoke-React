import React, { useEffect, useState } from "react";

const Auth = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Retrieve users from localStorage
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        setUsers(storedUsers);
    }, []);

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Registered Users</h2>
            {users.length > 0 ? (
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2 text-left">#</th>
                            <th className="border border-gray-300 p-2 text-left">Username</th>
                            <th className="border border-gray-300 p-2 text-left">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 p-2">{index + 1}</td>
                                <td className="border border-gray-300 p-2">{user.username}</td>
                                <td className="border border-gray-300 p-2">{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center text-gray-500">No users have signed up yet.</p>
            )}
        </div>
    );
};

export default Auth;
