export interface IUserLogin {
  email: string;
  password: string;
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  is_active: boolean;
  is_verified: boolean;
  has_paid: boolean;
  next_payment_date: string;
  created_at: string;
  verified_at: string;
}
