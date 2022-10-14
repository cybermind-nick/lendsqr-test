
/**
 * get_fee - Calculate a transaction fee
*/

export function get_fee(amount: number): number {
    if (amount <= 50000) {
        return 50;
    } else {
        return 100;
    }
}