export type EventRow = {
    id: string;
    title: string;
    date: string;
    location: string;
    ticketsSold: number;
    revenue: number;
    status: "ACTIVE" | "ENDED" | "CANCELLED" | "ONGOING";
};

export const dummyEvents: EventRow[] = [
    {
        id: "evt-1",
        title: "Festival Babi",
        date: "2025-08-15",
        location: "Jakarta",
        ticketsSold: 87,
        revenue: 1_740_000,
        status: "ACTIVE",
    },
    {
        id: "evt-2",
        title: "Parade Hukum Mati Koruptor",
        date: "2025-09-10",
        location: "Jakarta",
        ticketsSold: 300_000_000,
        revenue: 3_600_000,
        status: "ENDED",
    },
    {
        id: "evt-3",
        title: "Festival Babi (Comeback Edition)",
        date: "2025-07-30",
        location: "Surabaya",
        ticketsSold: 200,
        revenue: 2_000_000,
        status: "ENDED",
    },
];