export interface Transaction {
  id: number;
  type: string;
  amount: number;
  name: string;
  description: string;
  date: string;
  pending: boolean;
  user: string;
  payment: boolean;
  status: boolean;
  bank: string;
  logo: string;
}

export interface UserResponse {
  points: number;
  money: number;
  user: string;
}
