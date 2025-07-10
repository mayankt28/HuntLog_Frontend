import React, { useState, useContext } from 'react';
import { PrimaryButton } from '../../components/Button';
import Card from '../../components/Card';
import { Link } from 'react-router-dom';
import { registerUser } from '../../api/auth';
import { AuthContext } from '../../context/AuthContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await registerUser({ email, name, password });
      login({ user: data.user, token: data.accessToken });
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
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
        <Card header="Register" className="w-full">
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              className="w-full p-2 rounded bg-[var(--color-discord-dark)] text-[var(--color-discord-text)] border border-[var(--color-discord-primary)] font-pixel"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
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
              {loading ? 'Registering...' : 'Sign Up'}
            </PrimaryButton>
          </form>

          <div className="mt-4 text-center text-sm text-gray-400">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="text-[var(--color-discord-accent)] underline">
                Login
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
