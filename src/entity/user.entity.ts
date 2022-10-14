import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany, CreateDateColumn } from "typeorm";
import { Account } from "./account.entity";
import { Transaction } from "./transaction.entity";
import { Transfer } from "./transfer.entity";

@Entity('user')
@Unique(['username', 'email'])
export class User {
    @PrimaryGeneratedColumn()
    user_id!: number

    @Column()
    first_name!: string

    @Column()
    last_name!: string

    @Column()
    username!: string

    @Column()
    password!: string

    @Column()
    email!: string

    @Column({
        type: "numeric",
        default: 0.0
    })
    balance: number | undefined

    @OneToMany(
        () => Transaction,
        (transaction) => transaction.user
    )
    transactions: Transaction[] | undefined;

    @OneToMany(
        () => Account,
        (account) => account.user
    )
    accounts: Account[] | undefined

    @OneToMany(
        () => Transfer,
        (transfer) => transfer.user
    )
    transfers: Transfer[] | undefined

    @CreateDateColumn()
    joined!: Date

}