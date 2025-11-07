
export const validateRut = (rut: string): boolean => {
  if (!/^[0-9]+-[0-9kK]{1}$/.test(rut)) {
    return false;
  }
  const tmp = rut.split('-');
  let digv = tmp[1];
  const body = tmp[0];
  if (digv === 'K') digv = 'k';

  let M = 0;
  let S = 1;
  for (; M < body.length; M++) {
    S = (S + parseInt(body.charAt(M)) * (9 - M % 6)) % 11;
  }
  const v = S > 0 ? '' + (S - 1) : 'k';
  return v === digv;
};

export const formatRut = (rut: string): string => {
  let value = rut.replace(/\./g, '').replace('-', '');
  if (value.match(/^(\d{2})(\d{3}){2}(\w{1})$/)) {
    value = value.replace(/^(\d{2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4');
  } else if (value.match(/^(\d)(\d{3}){2}(\w{0,1})$/)) {
    value = value.replace(/^(\d)(\d{3})(\d{3})(\w{0,1})$/, '$1.$2.$3-$4');
  } else if (value.match(/^(\d)(\d{3})(\d{0,2})$/)) {
    value = value.replace(/^(\d)(\d{3})(\d{0,2})$/, '$1.$2.$3');
  } else if (value.match(/^(\d)(\d{0,2})$/)) {
    value = value.replace(/^(\d)(\d{0,2})$/, '$1.$2');
  }
  return value;
};

export const calculateAge = (dob: string): number => {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};
