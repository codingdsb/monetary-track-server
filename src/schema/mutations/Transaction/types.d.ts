import {
  TransactionType,
  TransactionTypeEnum,
} from "../../../entities/Transaction";

export interface IAddTransaction {
  auth_token: string;
  amount: number;
  description: string;
  date: string;
  with: string;
  transaction_type: TransactionTypeEnum;
}

export interface IDeleteTransaction {
  auth_token: string;
  transaction_id: string;
}

export interface IEditTransaction {
  auth_token: string;
  transaction_id: string;
  amount: number;
  description: string;
  date: string;
  with: string;
  transaction_type: TransactionTypeEnum;
}
