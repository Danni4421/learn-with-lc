/**
 * Authentication Type Definition
 */

export type LoginProps = {
  email: string;
  password: string;
};

export type RegisterProps = {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
};
