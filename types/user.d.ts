export interface UserColumns {
  id: number;
  dni: string;
  name: string;
  last_name: string;
  phone: string;
  salary: number;
  rol: string;
}

export interface AddUserFormValues {
  dni: string;
  last_name: string;
  name: string;
  password: string;
  phone?: string;
  salary: number;
}

export interface User {
  id: number;
  dni: string;
  last_name: string;
  name: string;
  phone?: string;
  salary: number;
}

export interface EditUserFormValues {
  dni: string;
  last_name: string;
  name: string;
  phone?: string;
  salary: number;
}
