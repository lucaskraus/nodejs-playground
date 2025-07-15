export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'credit' | 'debit';
  created_at: string;
}
