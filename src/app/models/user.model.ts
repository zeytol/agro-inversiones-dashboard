export interface User {
  id: number;
  username: string;
  email: string;
  state: number; // 1 = Activo, 0 = Inactivo
  enabled: boolean; // Nuevo campozz
}
