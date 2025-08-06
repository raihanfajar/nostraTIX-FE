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

export const dummyPendingTx: TxRow[] = [
    {
        id: "#TX-1001",
        customer: "Yadi",
        event: "Festival Babi",
        amount: 200_000,
        seats: 2,
        proofUrl: "/dummy-proof-1.jpg",
        usedPoints: 10_000,
        usedCoupon: "CUPON123",
        usedVoucher: "VOUCHER456",
    },
    {
        id: "#TX-1002",
        customer: "ANjing",
        event: "Festival anjing",
        amount: 200_000,
        seats: 100,
        proofUrl: "/dummy-proof-1.jpg",
        usedPoints: 10_000,
        usedCoupon: "CUPON839",
        usedVoucher: "VOUCHER894",
    },
];