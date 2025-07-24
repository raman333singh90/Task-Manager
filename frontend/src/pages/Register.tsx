import { useState, useEffect } from 'react';
import axios from '../lib/axios';

export default function Register({ onRegister }: { onRegister: () => void }) {
    const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    /*************  ✨ Windsurf Command ⭐  *************/
    /**
     * Handles the registration process.
     * 
     * The function sends a request to the register API endpoint with the form data.
     * If the request is successful, it calls the onRegister function to navigate to the login page.
     * Otherwise, it alerts the user with an error message.
     */
    /*******  9dc41a3d-3197-4eec-b0ca-49ef138e0477  *******/
    const handleRegister = async () => {
        try {
            setLoading(true);
            await axios.get('/sanctum/csrf-cookie'); // Must be FIRST!
            await axios.post('/register', form);
            onRegister();
        } catch (err) {
            alert('Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center ">
            <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="name"
                            required
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-purple-400"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-purple-400"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-purple-400"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password_confirmation" className="block mb-1 text-sm font-medium text-gray-700">
                            Password Confirmation
                        </label>
                        <input
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            required
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-purple-400"
                            onChange={handleChange}
                        />
                    </div>
                    {/* {error && <div className="text-red-600 text-sm">{error}</div>} */}
                    <button
                        type="button"
                        onClick={handleRegister}
                        className="w-full bg-purple-400 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded"
                    >
                        {loading ? "Loading..." : "Register"}
                    </button>
                </form>
            </div>
        </div>
        // <div className="p-6 max-w-md mx-auto">
        //     <input name="name" onChange={handleChange} placeholder="Name" className="border p-2 w-full mb-2" />
        //     <input name="email" onChange={handleChange} placeholder="Email" className="border p-2 w-full mb-2" />
        //     <input name="password" onChange={handleChange} placeholder="Password" type="password" className="border p-2 w-full mb-2" />
        //     <input name="password_confirmation" onChange={handleChange} placeholder="Confirm Password" type="password" className="border p-2 w-full mb-2" />
        //     <button onClick={handleRegister} className="bg-green-500 text-white px-4 py-2">Register</button>
        // </div>
    );
}
