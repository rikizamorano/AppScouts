
import React, { useState, useMemo } from 'react';
import { Beneficiary, User, Role, ScoutGroup, Guardian } from '../types';
import { BRANCHES, STAGES } from '../constants';
import { validateRut, formatRut, calculateAge } from '../utils/validation';

interface RegisterBeneficiaryPageProps {
  onRegister: (beneficiary: Beneficiary, user: User) => void;
  approvedGroups: ScoutGroup[];
  navigateToLogin: () => void;
}

const RegisterBeneficiaryPage: React.FC<RegisterBeneficiaryPageProps> = ({ onRegister, approvedGroups, navigateToLogin }) => {
  const [beneficiary, setBeneficiary] = useState<Omit<Beneficiary, 'id' | 'photoUrl'>>({
    groupId: '',
    rut: '',
    name: '',
    surnames: '',
    dob: '',
    branch: BRANCHES[0],
    stage: STAGES[0],
    email: '',
    beneficiaryNumber: '',
    guardian: { rut: '', name: '', surnames: '', phone: '', email: '' }
  });

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [error, setError] = useState('');

  const photoPreview = useMemo(() => {
    if (photo) return URL.createObjectURL(photo);
    return 'https://picsum.photos/seed/placeholder/200/200';
  }, [photo]);

  const handleBeneficiaryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBeneficiary(prev => ({ ...prev, [name]: value }));
  };

  const handleGuardianChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBeneficiary(prev => ({ ...prev, guardian: { ...prev.guardian, [name]: value } }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateRut(beneficiary.rut) || !validateRut(beneficiary.guardian.rut)) {
      setError('Uno de los RUT ingresados no es válido.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (!photo) {
      setError('Debe subir una foto del beneficiario.');
      return;
    }
    if (!beneficiary.groupId) {
        setError('Debe seleccionar un grupo.');
        return;
    }

    const beneficiaryId = `beneficiary-${Date.now()}`;
    const userId = `user-${Date.now()}`;

    const newBeneficiary: Beneficiary = {
      ...beneficiary,
      id: beneficiaryId,
      photoUrl: URL.createObjectURL(photo),
    };
    
    const newUser: User = {
      id: userId,
      rut: beneficiary.rut,
      password,
      name: `${beneficiary.name} ${beneficiary.surnames}`,
      role: Role.Beneficiary,
      beneficiaryId: beneficiaryId,
      groupId: beneficiary.groupId
    };

    onRegister(newBeneficiary, newUser);
    alert('Registro de beneficiario exitoso. Ahora puede iniciar sesión.');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">Registro de Beneficiario</h2>
      <p className="text-center text-gray-600 mb-8">Crea tu cuenta para unirte a un grupo scout. Tu RUT será tu usuario de acceso.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
            <img src={photoPreview} alt="Foto del beneficiario" className="w-32 h-32 rounded-full object-cover shadow-md" />
            <input required type="file" accept="image/jpeg, image/png" onChange={handlePhotoChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-scout-purple file:text-white hover:file:bg-purple-800"/>
        </div>

        <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-4 rounded-md">
          <legend className="text-lg font-semibold px-2 text-scout-purple">Datos del Beneficiario</legend>
          <select required name="groupId" value={beneficiary.groupId} onChange={handleBeneficiaryChange} className="p-2 border rounded bg-white md:col-span-2">
            <option value="" disabled>-- Selecciona tu Grupo Scout --</option>
            {approvedGroups.map(g => <option key={g.id} value={g.id}>{g.name} - {g.zone}</option>)}
          </select>
          <input required name="name" placeholder="Nombres" value={beneficiary.name} onChange={handleBeneficiaryChange} className="p-2 border rounded" />
          <input required name="surnames" placeholder="Apellidos" value={beneficiary.surnames} onChange={handleBeneficiaryChange} className="p-2 border rounded" />
          <input required name="rut" placeholder="RUT" value={beneficiary.rut} onChange={e => setBeneficiary(prev => ({ ...prev, rut: formatRut(e.target.value) }))} className="p-2 border rounded" />
          <div>
            <input required name="dob" type="date" value={beneficiary.dob} onChange={handleBeneficiaryChange} className="p-2 border rounded w-full" />
            {beneficiary.dob && <p className="text-sm text-gray-500 mt-1">Edad: {calculateAge(beneficiary.dob)} años</p>}
          </div>
          <select name="branch" value={beneficiary.branch} onChange={handleBeneficiaryChange} className="p-2 border rounded bg-white">
            {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          <select name="stage" value={beneficiary.stage} onChange={handleBeneficiaryChange} className="p-2 border rounded bg-white">
            {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <input name="email" type="email" placeholder="Email (opcional)" value={beneficiary.email} onChange={handleBeneficiaryChange} className="p-2 border rounded" />
          <input name="beneficiaryNumber" type="text" placeholder="N° Beneficiario (opcional)" value={beneficiary.beneficiaryNumber} onChange={handleBeneficiaryChange} className="p-2 border rounded" />
        </fieldset>

        <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-4 rounded-md">
          <legend className="text-lg font-semibold px-2 text-scout-purple">Datos del Responsable</legend>
          <input required name="name" placeholder="Nombres del Responsable" value={beneficiary.guardian.name} onChange={handleGuardianChange} className="p-2 border rounded" />
          <input required name="surnames" placeholder="Apellidos del Responsable" value={beneficiary.guardian.surnames} onChange={handleGuardianChange} className="p-2 border rounded" />
          <input required name="rut" placeholder="RUT del Responsable" value={beneficiary.guardian.rut} onChange={e => handleGuardianChange({ target: { name: 'rut', value: formatRut(e.target.value) } } as React.ChangeEvent<HTMLInputElement>)} className="p-2 border rounded" />
          <input required name="phone" type="tel" placeholder="Teléfono del Responsable" value={beneficiary.guardian.phone} onChange={handleGuardianChange} className="p-2 border rounded" />
          <input required name="email" type="email" placeholder="Email del Responsable" value={beneficiary.guardian.email} onChange={handleGuardianChange} className="p-2 border rounded md:col-span-2" />
        </fieldset>

         <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-4 rounded-md">
          <legend className="text-lg font-semibold px-2 text-scout-purple">Crear Cuenta</legend>
          <input required type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} className="p-2 border rounded" />
          <input required type="password" placeholder="Confirmar Contraseña" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="p-2 border rounded" />
        </fieldset>
        
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        <div className="flex items-center justify-between pt-4">
            <button type="button" onClick={navigateToLogin} className="text-scout-purple hover:underline">
                &larr; Volver a Inicio
            </button>
            <button type="submit" className="bg-scout-purple hover:bg-purple-800 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                Registrarme
            </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterBeneficiaryPage;
