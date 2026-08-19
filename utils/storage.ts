import { User, ScoutGroup, Beneficiary } from '../types';
import { initialUsers, initialGroups, initialBeneficiaries } from '../constants';

const KEYS = {
  USERS: 'appscouts_users',
  GROUPS: 'appscouts_groups',
  BENEFICIARIES: 'appscouts_beneficiaries',
};

// Cargar datos (si no existen en localStorage, guarda y retorna los iniciales)
export const loadData = () => {
  const users = localStorage.getItem(KEYS.USERS);
  const groups = localStorage.getItem(KEYS.GROUPS);
  const beneficiaries = localStorage.getItem(KEYS.BENEFICIARIES);

  return {
    users: users ? JSON.parse(users) : initialUsers,
    groups: groups ? JSON.parse(groups) : initialGroups,
    beneficiaries: beneficiaries ? JSON.parse(beneficiaries) : initialBeneficiaries,
  };
};

// Guardar datos en localStorage
export const saveData = (users: User[], groups: ScoutGroup[], beneficiaries: Beneficiary[]) => {
  localStorage.setItem(KEYS.USERS, JSON.stringify(users));
  localStorage.setItem(KEYS.GROUPS, JSON.stringify(groups));
  localStorage.setItem(KEYS.BENEFICIARIES, JSON.stringify(beneficiaries));
};

// Exportar la base de datos completa a un archivo .json de descarga
export const exportToJSONFile = (users: User[], groups: ScoutGroup[], beneficiaries: Beneficiary[]) => {
  const data = { users, groups, beneficiaries };
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', jsonString);
  downloadAnchor.setAttribute('download', `backup_appscouts_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};