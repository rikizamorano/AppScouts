
import React, { useState } from 'react';
import { ScoutGroup, User, GroupStatus, Role } from '../types';
import { ZONES } from '../constants';
import { validateRut, formatRut } from '../utils/validation';

interface RegisterGroupPageProps {
  onRegister: (group: ScoutGroup, adminUser: User) => void;
  navigateToLogin: () => void;
}

const RegisterGroupPage: React.FC<RegisterGroupPageProps> = ({ onRegister, navigateToLogin }) => {
  const [groupName, setGroupName] = useState('');
  const [groupCode, setGroupCode] = useState('');
  const [zone, setZone] = useState(ZONES[0]);
  const [address, setAddress] = useState('');
  const [repRut, setRepRut] = useState('');
  const [repName, setRepName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [foundationDate, setFoundationDate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateRut(repRut)) {
      setError('El RUT del representante no es válido.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if(password.length < 6){
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    
    const groupId = `group-${Date.now()}`;
    const userId = `user-${Date.now()}`;
    
    const newGroup: ScoutGroup = {
      id: groupId,
      name: groupName,
      groupCode,
      zone,
      address,
      representativeRut: repRut,
      contactEmail,
      foundationDate,
      status: GroupStatus.Pending,
    };
    
    const newAdminUser: User = {
      id: userId,
      rut: repRut,
      password,
      name: repName,
      role: Role.GroupAdmin,
      groupId: groupId,
    };
    
    onRegister(newGroup, newAdminUser);
    alert('Solicitud de registro de grupo enviada. Será revisada por un Administrador Nacional.');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">Solicitud de Registro de Grupo Scout</h2>
      <p className="text-center text-gray-600 mb-8">Complete el formulario para solicitar la creación de un nuevo grupo. El RUT del representante será su usuario de acceso.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-4 rounded-md">
          <legend className="text-lg font-semibold px-2 text-scout-purple">Información del Grupo</legend>
          <input required type="text" placeholder="Nombre del Grupo" value={groupName} onChange={e => setGroupName(e.target.value)} className="p-2 border rounded" />
          <input required type="text" placeholder="Código/N° de Grupo" value={groupCode} onChange={e => setGroupCode(e.target.value)} className="p-2 border rounded" />
          <select required value={zone} onChange={e => setZone(e.target.value)} className="p-2 border rounded bg-white">
            {ZONES.map(z => <option key={z} value={z}>{z}</option>)}
          </select>
          <input required type="text" placeholder="Dirección de Sede" value={address} onChange={e => setAddress(e.target.value)} className="p-2 border rounded" />
          <input type="date" placeholder="Fecha de Fundación" value={foundationDate} onChange={e => setFoundationDate(e.target.value)} className="p-2 border rounded" />
          <input required type="email" placeholder="Mail de Contacto del Grupo" value={contactEmail} onChange={e => setContactEmail(e.target.value)} className="p-2 border rounded" />
        </fieldset>
        
        <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-4 rounded-md">
          <legend className="text-lg font-semibold px-2 text-scout-purple">Datos del Administrador de Grupo</legend>
          <input required type="text" placeholder="Nombre completo del Representante" value={repName} onChange={e => setRepName(e.target.value)} className="p-2 border rounded" />
          <input required type="text" placeholder="RUT del Representante (será su usuario)" value={repRut} onChange={e => setRepRut(formatRut(e.target.value))} className="p-2 border rounded" />
          <input required type="password" placeholder="Contraseña para el Administrador" value={password} onChange={e => setPassword(e.target.value)} className="p-2 border rounded" />
          <input required type="password" placeholder="Confirmar Contraseña" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="p-2 border rounded" />
        </fieldset>
        
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        <div className="flex items-center justify-between pt-4">
            <button type="button" onClick={navigateToLogin} className="text-scout-purple hover:underline">
                &larr; Volver a Inicio
            </button>
            <button type="submit" className="bg-scout-purple hover:bg-purple-800 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                Enviar Solicitud
            </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterGroupPage;
