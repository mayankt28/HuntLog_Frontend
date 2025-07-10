import React from 'react';

// Badge Component
export const Badge = ({ children, colorClass = 'bg-discord-primary', textClass = 'text-discord-text' }) => {
  return (
    <span className={`${colorClass} ${textClass} px-3 py-1 rounded-full text-sm font-pixel`}>
      {children}
    </span>
  );
};

// Tag Component
export const Tag = ({ children, borderColorClass = 'border-discord-primary' }) => {
  return (
    <span className={`bg-discord-background text-discord-text px-3 py-1 rounded-md text-sm font-pixel border ${borderColorClass}`}>
      {children}
    </span>
  );
};

// Skeleton Component
export const Skeleton = ({ widthClass = 'w-3/4', heightClass = 'h-6', roundedClass = 'rounded-md' }) => {
  return (
    <div className={`animate-pulse bg-discord-primary ${heightClass} ${widthClass} ${roundedClass}`}></div>
  );
};

// EmptyState Component
export const EmptyState = ({ title, message, showButton = true, buttonText = "Add Item", onButtonClick }) => {
  return (
    <div className="bg-discord-dark p-6 rounded-lg shadow-md text-center">
      <div className="text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="font-pixel text-lg text-discord-accent mb-2">{title || 'No items found.'}</p>
        <p className="text-sm">
          {message || "Looks like there's nothing here yet. Try adding some items to get started!"}
        </p>
        {showButton && (
          <button
            className="mt-4 bg-discord-primary text-discord-text py-2 px-4 rounded-md shadow-arcade-shadow font-pixel text-base"
            onClick={onButtonClick}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

// Divider Component
export const Divider = ({ text, lineColorClass = 'border-discord-primary' }) => {
  return (
    <div className="flex items-center">
      <hr className={`flex-grow border-t-2 ${lineColorClass}`} />
      {text && <span className="px-3 font-pixel text-discord-accent text-sm">{text}</span>}
      {text && <hr className={`flex-grow border-t-2 ${lineColorClass}`} />}
    </div>
  );
};


export const UserProfile = ({ avatarSrc, username, status, usernameColorClass = 'text-discord-accent' }) => {
  return (
    <div className="flex items-center bg-discord-background p-4 rounded-md shadow-md">
      <img src={avatarSrc} alt="User Avatar" className="rounded-full w-12 h-12 mr-4" />
      <div>
        <p className={`font-pixel ${usernameColorClass} text-lg`}>
          {username}
        </p>
        <p className="text-sm text-gray-400">
          {status}
        </p>
      </div>
    </div>
  );
};

