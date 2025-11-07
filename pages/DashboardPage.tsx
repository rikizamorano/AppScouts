
import React, { useState } from 'react';
import { User, Role, ScoutGroup, Beneficiary, GroupStatus } from '../types';
import { calculateAge } from '../utils/validation';
import { CheckCircleIcon, XCircleIcon, ClockIcon, PencilIcon, UserGroupIcon, PlusIcon } from '../components/icons';

interface DashboardPageProps {
  user: User;
  groups: ScoutGroup[];
  beneficiaries: Beneficiary[];
  updateGroup: (group: ScoutGroup) => void;
  updateBeneficiary: (beneficiary: Beneficiary) => void;
  addBeneficiary: (beneficiary: Beneficiary, user: User) => void; // Simplified for this example
}

const statusConfig = {
    [GroupStatus.Approved]: { text: 'Aprobado', icon: CheckCircleIcon, color: 'text-green-500', bg: 'bg-green-100' },
    [GroupStatus.Pending]: { text: 'Pendiente', icon: ClockIcon, color: 'text-yellow-500', bg: 'bg-yellow-100' },
    [GroupStatus.Rejected]: { text: 'Rechazado', icon: XCircleIcon, color: 'text-red-500', bg: 'bg-red-100' },
};

const GroupCard: React.FC<{group: ScoutGroup, onApprove?: () => void, onReject?: () => void}> = ({ group, onApprove, onReject }) => {
    const status = statusConfig[group.status];
    const StatusIcon = status.icon;
    return (
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-lg text-scout-purple">{group.name}</h3>
                    <p className="text-sm text-gray-600">{group.groupCode} - {group.zone}</p>
                    <p className="text-sm text-gray-500 mt-1">{group.address}</p>
                </div>
                <div className={`flex items-center text-sm font-semibold px-2 py-1 rounded-full ${status.bg} ${status.color}`}>
                    <StatusIcon className="h-4 w-4 mr-1" />
                    {status.text}
                </div>
            </div>
            <div className="mt-4 border-t pt-3 text-sm text-gray-700">
                <p><strong>Representante:</strong> {group.representativeRut}</p>
                <p><strong>Email:</strong> {group.contactEmail}</p>
            </div>
            {group.status === 'pending' && onApprove && onReject && (
                <div className="mt-4 flex space-x-2">
                    <button onClick={onApprove} className="w-full bg-scout-green hover:bg-green-700 text-white text-sm font-bold py-1 px-3 rounded transition-colors">Aprobar</button>
                    <button onClick={onReject} className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-1 px-3 rounded transition-colors">Rechazar</button>
                </div>
            )}
        </div>
    )
};

const BeneficiaryCard: React.FC<{beneficiary: Beneficiary, groupName: string, onEdit: () => void}> = ({ beneficiary, groupName, onEdit }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4 hover:shadow-md transition-shadow">
            <img src={beneficiary.photoUrl} alt={`${beneficiary.name} ${beneficiary.surnames}`} className="w-20 h-20 rounded-full object-cover"/>
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg text-scout-purple">{beneficiary.name} {beneficiary.surnames}</h3>
                    <button onClick={onEdit} className="text-gray-400 hover:text-scout-purple"><PencilIcon className="h-5 w-5"/></button>
                </div>
                <p className="text-sm text-gray-600">RUT: {beneficiary.rut} | {calculateAge(beneficiary.dob)} años</p>
                <p className="text-sm text-gray-500">{beneficiary.branch} - {beneficiary.stage}</p>
                <p className="text-sm font-semibold text-scout-green mt-1">{groupName}</p>
            </div>
        </div>
    )
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user, groups, beneficiaries, updateGroup, updateBeneficiary }) => {
  const handleGroupStatusChange = (group: ScoutGroup, status: GroupStatus) => {
    updateGroup({ ...group, status });
  };
  
  const getGroupName = (groupId: string) => groups.find(g => g.id === groupId)?.name || 'N/A';
  
  const renderNationalAdminDashboard = () => {
      const pendingGroups = groups.filter(g => g.status === 'pending');
      const otherGroups = groups.filter(g => g.status !== 'pending');
      return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center"><UserGroupIcon className="h-7 w-7 mr-2 text-scout-purple"/>Gestión de Grupos</h2>
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h3 className="font-bold text-lg text-gray-700 mb-3">Solicitudes Pendientes ({pendingGroups.length})</h3>
                {pendingGroups.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {pendingGroups.map(group => 
                            <GroupCard 
                                key={group.id} 
                                group={group} 
                                onApprove={() => handleGroupStatusChange(group, GroupStatus.Approved)}
                                onReject={() => handleGroupStatusChange(group, GroupStatus.Rejected)}
                            />
                        )}
                    </div>
                ) : <p className="text-gray-500">No hay solicitudes pendientes.</p>}
            </div>
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h3 className="font-bold text-lg text-gray-700 mb-3">Grupos Registrados ({otherGroups.length})</h3>
                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {otherGroups.map(group => <GroupCard key={group.id} group={group}/>)}
                </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-8 flex items-center"><UserGroupIcon className="h-7 w-7 mr-2 text-scout-purple"/>Gestión de Beneficiarios</h2>
            <div className="bg-white p-4 rounded-lg shadow">
                 <div className="grid md:grid-cols-2 gap-4">
                    {beneficiaries.map(b => <BeneficiaryCard key={b.id} beneficiary={b} groupName={getGroupName(b.groupId)} onEdit={() => alert(`Editing ${b.name}`)} />)}
                 </div>
            </div>
        </div>
      );
  };
  
  const renderGroupAdminDashboard = () => {
      const myGroup = groups.find(g => g.id === user.groupId);
      const myBeneficiaries = beneficiaries.filter(b => b.groupId === user.groupId);
      
      if (!myGroup) return <p>No se encontró tu grupo.</p>

      return (
         <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Mi Grupo: {myGroup.name}</h2>
            <div className="mb-6">
                 <GroupCard group={myGroup} />
            </div>

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Beneficiarios ({myBeneficiaries.length})</h2>
                <button className="bg-scout-purple hover:bg-purple-800 text-white font-bold py-2 px-4 rounded inline-flex items-center transition-colors">
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Añadir Beneficiario
                </button>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
                 <div className="grid md:grid-cols-2 gap-4">
                    {myBeneficiaries.map(b => <BeneficiaryCard key={b.id} beneficiary={b} groupName={myGroup.name} onEdit={() => alert(`Editing ${b.name}`)} />)}
                 </div>
            </div>
        </div>
      )
  };

  const renderBeneficiaryDashboard = () => {
      const myProfile = beneficiaries.find(b => b.id === user.beneficiaryId);
      if(!myProfile) return <p>No se encontró tu perfil.</p>
      const myGroup = groups.find(g => g.id === myProfile.groupId);

      return (
         <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Mi Perfil</h2>
            <div className="bg-white p-6 rounded-lg shadow max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                    <img src={myProfile.photoUrl} alt={`${myProfile.name} ${myProfile.surnames}`} className="w-32 h-32 rounded-full object-cover shadow-md"/>
                    <div className="flex-1 text-center sm:text-left">
                        <h3 className="font-bold text-2xl text-scout-purple">{myProfile.name} {myProfile.surnames}</h3>
                        <p className="text-gray-600">RUT: {myProfile.rut}</p>
                        <p className="text-gray-600">{calculateAge(myProfile.dob)} años ({new Date(myProfile.dob).toLocaleDateString('es-CL')})</p>
                        {myGroup && <p className="font-semibold text-scout-green mt-1">Grupo {myGroup.name}</p>}
                    </div>
                </div>
                <div className="mt-6 border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <div><strong>Rama:</strong> {myProfile.branch}</div>
                    <div><strong>Etapa:</strong> {myProfile.stage}</div>
                    {myProfile.email && <div><strong>Email:</strong> {myProfile.email}</div>}
                    {myProfile.beneficiaryNumber && <div><strong>N° Beneficiario:</strong> {myProfile.beneficiaryNumber}</div>}
                </div>
                <div className="mt-6 border-t pt-4">
                    <h4 className="font-bold text-lg text-gray-800 mb-2">Datos del Responsable</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                        <div><strong>Nombre:</strong> {myProfile.guardian.name} {myProfile.guardian.surnames}</div>
                        <div><strong>RUT:</strong> {myProfile.guardian.rut}</div>
                        <div><strong>Teléfono:</strong> {myProfile.guardian.phone}</div>
                        <div><strong>Email:</strong> {myProfile.guardian.email}</div>
                    </div>
                </div>
                <div className="mt-6 text-right">
                    <button className="bg-scout-purple hover:bg-purple-800 text-white font-bold py-2 px-4 rounded inline-flex items-center transition-colors">
                        <PencilIcon className="h-5 w-5 mr-2" />
                        Editar mis datos
                    </button>
                </div>
            </div>
        </div>
      )
  };

  switch (user.role) {
    case Role.NationalAdmin:
      return renderNationalAdminDashboard();
    case Role.GroupAdmin:
      return renderGroupAdminDashboard();
    case Role.Beneficiary:
      return renderBeneficiaryDashboard();
    default:
      return <p>Rol de usuario no reconocido.</p>;
  }
};

export default DashboardPage;
