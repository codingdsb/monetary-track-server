import { TransactionTypeEnum } from "../../../entities/Transaction";

export interface IAddTransaction {
  auth_token: string;
  amount: number;
  description: string;
  date: string;
  with: string;
  transaction_type: TransactionTypeEnum;
}
