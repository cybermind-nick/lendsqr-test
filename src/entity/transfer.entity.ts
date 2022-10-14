import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { Transaction } from "./transaction.entity";
import { User } from "./user.entity";



@Entity('transfer')
export class Transfer {
    @PrimaryGeneratedColumn()
    transfer_id!: number;

    @Column({
        type: "numeric"
    })
    amount!: number;

    @ManyToOne(
        () => User,
        (user) => user.transfers
    )
    user!: User

    @OneToOne(
        () => Transaction,
        (transaction) => transaction.transfer
    )
    transaction!: Transaction
    
    @Column()
    receiver!: User
}