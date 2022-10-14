import { json } from 'stream/consumers';
import { DataSource } from 'typeorm';
import { get_fee } from '../utils/get_fee';
import { hashCompare } from '../utils/hash';
import { Transaction } from './transaction.entity';
import { User } from './user.entity';
import db from './db.init';

const transaction_type = {
  deposit: "deposit",
  withdrawal: "withdrawal",
  transfer: "transfer"
}

// create table specific connections to the DB
const userTable = db.getRepository(User)
const transactionTable = db.getRepository(Transaction)

// export function depositTransaction(transaction: Transaction)

export async function getAmount(user_id: any): Promise<any> {

    const user = await userTable.find({
      select: {
        balance: true
      },
      where: {
        user_id: user_id
      }
    })

    return user
}

export async function createUserQuery(db: DataSource, user: any) {

  const new_user = userTable.create({
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    password: user.password,
    email: user.email
  });

  await userTable.save(new_user)
}

// export function createUserAccount(db: DataSource, user_id: string) {
//   db('account').insert({
//     user_id,
//     balance: 0
//   });
// }

export async function depositQuery(user: User, amount: number) {

  const user_id = user.user_id
  let balance = await getAmount(user_id)
  const update = userTable.upsert(
      {
        user_id: user_id, balance: balance + amount
      },
    ['user']
    )

    const new_transaction = transactionTable.create({
      transaction_type: transaction_type.deposit,
      transaction_amount: amount,
      user: user
    })

    // await new_transaction
}


export async function withdrawQuery(id: number, amount: number) {

  let balance = await getAmount(id)
  if (balance < amount) return "Insufficent amount"
  else {
    const update =  userTable.upsert(
      {
        user_id: id, balance: balance + amount
      },
    ['user']
    )
  }
}

export async function transferQuery(
  sender: number,
  receipient: string,
  amount: number
) {
  // first check if balance is sufficinet
  const total = amount + get_fee(amount);
  let sender_balance = await getAmount(sender);
  const receipientU = await getUserID(receipient)
  let receipientID = 0
  receipientU ? (receipientID = receipientU.user_id ) : null
  let receiver_balance = await getAmount(receipient);
  if (sender_balance < total) {
    return { error: 'insufficient balance for transaction' };
  } else {
    // reduce sender balance
    sender_balance = sender_balance - total;

    // increase receiver balance
    receiver_balance = receiver_balance + amount;

    // update sender amount in db
      await userTable.upsert(
        {
          user_id: sender, balance: sender_balance
        },
      ['user']
      )

    // update receiver amount in db
    await userTable.upsert(
      {
        user_id: receipientID, balance: receiver_balance
      },
    ['user']
    )
  }
}


export async function getUserID(username: string) {
  return userTable.findOne({
    where: {
      username: username
    }
  })
}

// For Authetication
export async function getUser(username: string, password: string) {
  return await userTable.findOne({
    where: {
      username: username,
      password: password
    }
  })
}
