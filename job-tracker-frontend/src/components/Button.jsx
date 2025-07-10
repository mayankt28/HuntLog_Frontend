import React from 'react';

const baseStyles = "inline-flex items-center justify-center px-4 py-2 rounded-md shadow-arcade-shadow font-pixel text-base transition-colors duration-200 ease-in-out";


export const PrimaryButton = ({ children, onClick, disabled, className = '', ...props }) => {
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  return (
    <button
      className={`${baseStyles} bg-discord-primary text-discord-text hover:bg-discord-primary-dark active:bg-discord-primary-dark ${disabledClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export const SecondaryButton = ({ children, onClick, disabled, className = '', ...props }) => {
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  return (
    <button
      className={`${baseStyles} bg-discord-background text-discord-text border border-discord-primary hover:bg-discord-dark active:bg-discord-dark ${disabledClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export const AccentButton = ({ children, onClick, disabled, className = '', ...props }) => {
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  return (
    <button
      className={`${baseStyles} bg-discord-accent text-discord-text hover:bg-discord-accent-dark active:bg-discord-accent-dark ${disabledClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};


export const DangerButton = ({ children, onClick, disabled, className = '', ...props }) => {
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  return (
    <button
      className={`${baseStyles} bg-red-600 text-white hover:bg-red-700 active:bg-red-700 ${disabledClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export const NeonButton = ({ children, onClick, disabled, className = '', ...props }) => {
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  return (
    <button
      className={`${baseStyles} bg-arcade-neonGreen text-discord-dark hover:bg-opacity-80 active:bg-opacity-70 ${disabledClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
