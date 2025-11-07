
import { User, Role, ScoutGroup, GroupStatus, Beneficiary } from './types';

export const initialUsers: User[] = [
  { id: 'user-1', rut: '11.111.111-1', password: 'admin', name: 'Admin Nacional', role: Role.NationalAdmin },
  { id: 'user-2', rut: '22.222.222-2', password: 'admin', name: 'Jefe Grupo A', role: Role.GroupAdmin, groupId: 'group-1' },
  { id: 'user-3', rut: '33.333.333-3', password: 'user', name: 'Juan Perez', role: Role.Beneficiary, beneficiaryId: 'beneficiary-1', groupId: 'group-1' },
  { id: 'user-4', rut: '44.444.444-4', password: 'user', name: 'Maria Gonzalez', role: Role.Beneficiary, beneficiaryId: 'beneficiary-2', groupId: 'group-1' },
  { id: 'user-5', rut: '55.555.555-5', password: 'admin', name: 'Jefa Grupo B', role: Role.GroupAdmin, groupId: 'group-2' },
];

export const initialGroups: ScoutGroup[] = [
  {
    id: 'group-1',
    name: 'Grupo San Jorge',
    groupCode: 'SJO-01',
    zone: 'Santiago Oriente',
    address: 'Av. Apoquindo 123',
    representativeRut: '22.222.222-2',
    contactEmail: 'sanjorge@scout.cl',
    foundationDate: '1985-05-10',
    status: GroupStatus.Approved,
  },
  {
    id: 'group-2',
    name: 'Grupo Brownsea',
    groupCode: 'BRO-02',
    zone: 'Valparaíso Costa',
    address: 'Calle Falsa 123',
    representativeRut: '55.555.555-5',
    contactEmail: 'brownsea@scout.cl',
    status: GroupStatus.Approved,
  },
  {
    id: 'group-3',
    name: 'Grupo Baden Powell',
    groupCode: 'BAP-03',
    zone: 'Concepción Centro',
    address: 'O\'Higgins 456',
    representativeRut: '66.666.666-6',
    contactEmail: 'badenpowell@scout.cl',
    status: GroupStatus.Pending,
  },
];

export const initialBeneficiaries: Beneficiary[] = [
  {
    id: 'beneficiary-1',
    groupId: 'group-1',
    rut: '33.333.333-3',
    name: 'Juan',
    surnames: 'Perez Rojas',
    dob: '2010-03-15',
    branch: 'Tropa',
    stage: 'Pista',
    email: 'juan.perez@email.com',
    guardian: {
      rut: '77.777.777-7',
      name: 'Carlos',
      surnames: 'Perez Soto',
      phone: '+56911112222',
      email: 'carlos.perez@email.com',
    },
    photoUrl: 'https://picsum.photos/seed/juan/200/200',
  },
  {
    id: 'beneficiary-2',
    groupId: 'group-1',
    rut: '44.444.444-4',
    name: 'Maria',
    surnames: 'Gonzalez Lopez',
    dob: '2012-08-20',
    branch: 'Manada',
    stage: 'Salto',
    guardian: {
      rut: '88.888.888-8',
      name: 'Ana',
      surnames: 'Lopez Diaz',
      phone: '+56933334444',
      email: 'ana.lopez@email.com',
    },
    photoUrl: 'https://picsum.photos/seed/maria/200/200',
  },
];


export const ZONES = ['Arica y Parinacota', 'Tarapacá', 'Antofagasta', 'Atacama', 'Coquimbo', 'Valparaíso Costa', 'Santiago Oriente', 'Santiago Poniente', 'Metropolitana Sur', 'O\'Higgins', 'Maule', 'Ñuble', 'Biobío', 'La Araucanía', 'Los Ríos', 'Los Lagos', 'Aysén', 'Magallanes'];
export const BRANCHES = ['Manada (Lobatos/Golondrinas)', 'Tropa (Scouts/Guías)', 'Comunidad (Pioneros)', 'Clan (Caminantes)'];
export const STAGES = ['Inicio', 'Pista', 'Ruta', 'Travesía', 'Salto', 'Vuelo'];
