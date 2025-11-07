
import React, { useState } from 'react';
import { formatRut } from '../utils/validation';

interface LoginPageProps {
  onLogin: (rut: string, pass: string) => boolean;
  navigateToRegisterGroup: () => void;
  navigateToRegisterBeneficiary: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, navigateToRegisterGroup, navigateToRegisterBeneficiary }) => {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRut(formatRut(e.target.value));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onLogin(rut, password)) {
      setError('RUT o contraseña incorrectos.');
    } else {
      setError('');
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
            <svg className="mx-auto h-12 w-auto text-scout-purple" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" fill="currentColor">
                <path d="M50 0L0 60h30c0 10 10 30 10 40 0 10 10 20 10 20s10-10 10-20c0-10 10-30 10-40h30L50 0zm0 70c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10z"/>
            </svg>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar sesión
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="rut" className="sr-only">RUT</label>
              <input
                id="rut"
                name="rut"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-scout-purple focus:border-scout-purple focus:z-10 sm:text-sm"
                placeholder="RUT"
                value={rut}
                onChange={handleRutChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-scout-purple focus:border-scout-purple focus:z-10 sm:text-sm"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-scout-purple hover:text-scout-green">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-scout-purple hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-scout-purple transition-colors duration-300"
            >
              Ingresar
            </button>
          </div>
        </form>
        <div className="text-center text-sm text-gray-600">
            <p className="mb-2">¿No tienes una cuenta?</p>
            <div className="space-y-2 sm:space-y-0 sm:space-x-4">
                <button onClick={navigateToRegisterGroup} className="font-medium text-scout-purple hover:text-scout-green underline">
                    Solicitar registro de Grupo
                </button>
                <span className="hidden sm:inline">|</span>
                <button onClick={navigateToRegisterBeneficiary} className="font-medium text-scout-purple hover:text-scout-green underline">
                    Registrarse como Beneficiario
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
