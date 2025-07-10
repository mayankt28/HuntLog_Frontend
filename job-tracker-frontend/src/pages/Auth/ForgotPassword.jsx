import React, { useState } from 'react';
import { PrimaryButton } from '../../components/Button';
import Card from '../../components/Card';
import { requestPasswordReset } from '../../api/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleForgot = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await requestPasswordReset({ email });
      setMessage('If this email is registered, a reset link will be sent.');
    } catch {
      setMessage('Error sending reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden px-4">
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

      <div className="relative z-20 w-full max-w-md">
        <Card header="Forgot Password" className="w-full">
          <form onSubmit={handleForgot} className="space-y-4">
            <input
              type="email"
              className="w-full p-2 rounded bg-[var(--color-discord-dark)] text-[var(--color-discord-text)] border border-[var(--color-discord-primary)] font-pixel"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <PrimaryButton type="submit" className="w-full" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </PrimaryButton>
          </form>

          {message && (
            <p className="mt-4 text-sm text-[var(--color-arcade-neonGreen)] text-center">
              {message}
            </p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
