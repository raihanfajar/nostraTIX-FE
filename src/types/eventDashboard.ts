export type EventRowReal = {
    id: string;
    name: string;
    description: string;
    category: string;
    country: string;
    city: string;
    location: string;
    ticketsSold: number;
    revenue: number;
    startDate: string;
    endDate: string;
};

export type EventsSummaryResponse = {
    result: {
        status: string;
        message: string;
        data: EventRowReal[];
    };
};