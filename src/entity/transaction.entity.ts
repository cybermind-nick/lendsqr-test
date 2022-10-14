import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, BaseEntity, CreateDateColumn } from "typeorm";
import { Transfer } from "./transfer.entity";
import { User } from "./user.entity";

@Entity('transaction')
export class Transaction {

    @PrimaryGeneratedColumn()
    transaction_id!: number

    @Column(
        {
            type: "text"
        }
    )
    transaction_type!: string

    @Column({
        type: "numeric"
    })
    transaction_amount!: number

    @ManyToOne(
        () => User,
        (user) => user.transactions,
        {
            onDelete: 'CASCADE'
        }
    )
    user!: User;

    @OneToOne(
        () => Transfer,
        (transfer) => transfer.transaction
    )
    transfer: Transfer | undefined

    @CreateDateColumn()
    created_at!: Date
    
}