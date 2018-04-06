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
  role: 'ROLE_ADMIN';
}
