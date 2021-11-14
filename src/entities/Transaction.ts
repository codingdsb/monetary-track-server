import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./User";

export enum TransactionType {
  INCOME = "income",
  EXPENSE = "expense",
}

@Entity()
export default class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  amount: number;

  @Column()
  description: string;

  @Column()
  date: string;

  @Column()
  with: string;

  @Column({
    type: "enum",
    enum: TransactionType,
    default: TransactionType.EXPENSE,
  })
  transaction_type: TransactionType;

  @ManyToOne(() => User, (user) => user.transactions, {
    onDelete: "CASCADE",
  })
  user: User;
}
