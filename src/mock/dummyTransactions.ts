export type TxRow = {
    id: string;
    customer: string;
    event: string;
    amount: number;
    seats: number;
    proofUrl: string;
    usedPoints?: number;
    usedCoupon?: string;
    usedVoucher?: string;
};