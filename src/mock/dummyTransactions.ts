export type TxRow = {
    id: string;
    customer: string;
    event: string;
    amount: number;
    seats: number;
    proofUrl: string;
    usedPoints?: number;
    usedCoupon?: string;
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
    },
    {
        id: "#TX-1002",
        customer: "Bames Jond",
        event: "Festival Babi (Comeback Edition)",
        amount: 350_000,
        seats: 1,
        proofUrl: "/dummy-proof-2.jpg",
    },
];