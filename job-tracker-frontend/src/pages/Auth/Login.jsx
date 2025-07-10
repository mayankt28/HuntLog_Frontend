import React, { useState, useContext } from 'react';
import { PrimaryButton } from '../../components/Button';
import Card from '../../components/Card';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { loginUser } from '../../api/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await loginUser({ email, password });
      login({ user: data.user, token: data.accessToken });
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/media/form-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/60 z-10" />

      <div className="relative z-20 px-4 w-full max-w-md">
        <Card header="Login" className="w-full">
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              className="w-full p-2 rounded bg-[var(--color-discord-dark)] text-[var(--color-discord-text)] border border-[var(--color-discord-primary)] font-pixel"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <input
              type="password"
              className="w-full p-2 rounded bg-[var(--color-discord-dark)] text-[var(--color-discord-text)] border border-[var(--color-discord-primary)] font-pixel"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <PrimaryButton type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
            </PrimaryButton>
          </form>

          <div className="mt-4 text-center text-sm text-gray-400">
            <p>
              Forgot password?{' '}
              <Link to="/forgot-password" className="text-[var(--color-discord-accent)] underline">
                Reset
              </Link>
            </p>
            <p className="mt-1">
              New here?{' '}
              <Link to="/register" className="text-[var(--color-discord-accent)] underline">
                Register
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
