
import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

const FleurDeLisIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" fill="currentColor">
        <path d="M50 0L0 60h30c0 10 10 30 10 40 0 10 10 20 10 20s10-10 10-20c0-10 10-30 10-40h30L50 0zm0 70c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10z"/>
    </svg>
);


const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-scout-purple text-white shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
             <FleurDeLisIcon className="h-8 w-8 text-scout-gold mr-3"/>
            <span className="font-bold text-xl tracking-tight">Plataforma Scout</span>
          </div>
          <div className="flex items-center">
            {user && (
              <>
                <div className="hidden sm:block text-right mr-4">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-300">{user.role}</p>
                </div>
                <button
                  onClick={onLogout}
                  className="bg-scout-gold hover:bg-yellow-500 text-scout-purple font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                  Cerrar Sesión
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
