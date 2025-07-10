import React, { useState } from 'react';
import { PrimaryButton } from '../../components/Button';
import Card from '../../components/Card';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../../api/auth';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { token } = useParams();

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(token, { password });
      setMessage('Password reset successful! You can now login.');
    } catch {
      setMessage('Failed to reset password. Try again.');
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
        <Card header="Reset Password" className="w-full">
          <form onSubmit={handleReset} className="space-y-4">
            <input
              type="password"
              className="w-full p-2 rounded bg-[var(--color-discord-dark)] text-[var(--color-discord-text)] border border-[var(--color-discord-primary)] font-pixel"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <PrimaryButton type="submit" className="w-full" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
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

export default ResetPassword;
