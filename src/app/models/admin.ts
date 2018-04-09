export interface Admin {
  $key?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  adress?: string;
  username?: string;
  password?: string;
  conf_pass?: string;
  enabled?: boolean;
  role: 'ROLE_ADMIN';
}
