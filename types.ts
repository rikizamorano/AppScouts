
export enum Role {
  NationalAdmin = 'Administrador Nacional',
  GroupAdmin = 'Administrador de Grupo',
  Beneficiary = 'Beneficiario',
}

export enum Page {
  Login,
  Dashboard,
  RegisterGroup,
  RegisterBeneficiary,
}

export interface User {
  id: string;
  rut: string;
  password?: string; // Should be hashed in a real app
  name: string;
  role: Role;
  groupId?: string; // For GroupAdmin
  beneficiaryId?: string; // For Beneficiary
}

export enum GroupStatus {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}

export interface ScoutGroup {
  id: string;
  name: string;
  groupCode: string;
  zone: string;
  address: string;
  representativeRut: string;
  contactEmail: string;
  foundationDate?: string;
  status: GroupStatus;
}

export interface Guardian {
  rut: string;
  name: string;
  surnames: string;
  phone: string;
  email: string;
}

export interface Beneficiary {
  id: string;
  groupId: string;
  rut: string;
  name: string;
  surnames: string;
  dob: string;
  branch: string;
  stage: string;
  beneficiaryNumber?: string;
  email?: string;
  guardian: Guardian;
  photoUrl: string; // URL to the uploaded image
}
