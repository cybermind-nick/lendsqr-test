import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, PrimaryColumn, LessThan } from "typeorm";
import { User } from "./user.entity";



@Entity('account')
export class Account extends User {
    @PrimaryColumn({
       type: "numrange",
       length: 10,
       generated: true
    })
    account_number!: number;

    @Column({
        type: "numeric"
    })
    balance!: number;

    @ManyToOne(
        () => User,
        (user) => user.accounts
    )
    user!: User
}