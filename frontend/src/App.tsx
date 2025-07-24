import { useEffect, useState } from 'react';
import axios from './lib/axios';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    axios.get('/api/user')
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const handleAuthSuccess = async () => {
    const res = await axios.get('/api/user');
    setUser(res.data);
  };

  const handleLogout = async () => {
    await axios.post('/logout');
    setUser(null);
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-purple-800 text-white shadow p-3 flex justify-between items-center">
        <h1 className="text-[22px] font-bold">TM</h1>
        {user && (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded"
          >
            Logout
          </button>
        )}
      </header>

      <main className="p-0">
        {!user ? (
          <div className="max-w-md mx-auto">
            {isRegistering ? (
              <>
                <Register onRegister={handleAuthSuccess} />
                <p className="text-center mt-2">
                  Already have an account?{' '}
                  <button
                    onClick={() => setIsRegistering(false)}
                    className="text-blue-600 underline"
                  >
                    Login
                  </button>
                </p>
              </>
            ) : (
              <>
                <Login onLogin={handleAuthSuccess} />
                <p className="text-center mt-0">
                  Don’t have an account?{' '}
                  <button
                    onClick={() => setIsRegistering(true)}
                    className="text-blue-600 underline"
                  >
                    Register
                  </button>
                </p>
              </>
            )}
          </div>
        ) : (
          <Dashboard />
        )}
      </main>
    </div>
  );
}

export default App;
