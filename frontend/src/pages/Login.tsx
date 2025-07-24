import { useState, useEffect } from 'react'
import axios from '../lib/axios';

export default function Login({ onLogin }: { onLogin: () => void }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        try {
            setLoading(true);
            await axios.get('/sanctum/csrf-cookie'); // Must be FIRST!
            await axios.post('/login', { email, password });
            onLogin();
        } catch (err) {
            alert('Login failed');
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
                        <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-purple-400"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-purple-400"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    {/* {error && <div className="text-red-600 text-sm">{error}</div>} */}
                    <button
                        type="button"
                        onClick={handleLogin}
                        className="w-full bg-purple-400 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded"
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    )
}
