export interface BackendTransaction {
    id: string;
    totalPrice: number;
    totalTickets: number;
    paymentProofUrl: string;
    usedPoints?: number;
    user?: {
        name: string;
    };
    event?: {
        name: string;
    };
    coupon?: {
        code: string;
    };
    voucher?: {
        code: string;
    };
}