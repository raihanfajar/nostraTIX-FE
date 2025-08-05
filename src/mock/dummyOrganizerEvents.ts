export type EventRowReal = {
    id: string;
    name: string;
    category: string;
    country: string;
    city: string;
    location: string;
    ticketsSold: number;
    revenue: number;
    startDate: string;
    endDate: string;
};

export type EventOverviewResponse = {
    result: {
        status: string;
        message: string;
        data: EventRowReal[];
    };
};

export const dummyEvents: EventRowReal[] = [
    {
        id: "evt-1",
        name: "Festival Babi",
        category: "MUSIC",
        startDate: "2025-08-15",
        endDate: "2025-08-16",
        country: "Indonesia",
        city: "Jakarta",
        location: "BALAI JAKARTA",
        ticketsSold: 87,
        revenue: 1740000,
    },
    {
        id: "evt-2",
        name: "Parade Hukum Mati Koruptor",
        startDate: "2025-09-10",
        endDate: "2025-09-11",
        country: "Indonesia",
        city: "South Tangerang",
        location: "ICE BSD",
        ticketsSold: 300000000,
        revenue: 3600000,
        category: "MUSIC",
    },
    {
        id: "evt-3",
        name: "Festival Babi (Comeback Edition)",
        startDate: "2025-07-30",
        endDate: "2025-07-31",
        country: "Indonesia",
        city: "Surabaya",
        location: "BALAI SURABAYA",
        ticketsSold: 200,
        revenue: 2000000,
        category: "MUSIC",
    },
];