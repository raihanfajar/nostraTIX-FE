export interface EventWithPicture {
  id: string;
  organizerId: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  location: string;
  startDate: Date;
  endDate: Date;
  totalRating: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  pictures: EventPicture[];
}

export interface EventResponse {
  data: {
    result: EventWithPicture[];
    message: string;
    success: boolean;
  };
}

export interface EventPicture {
  id: string;
  banner: string;
  picture1: string;
  picture2?: string;
  picture3?: string;
}

export interface Category {
  category: string;
}

export interface EventWithDetails {
  id: string;
  organizerId: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  countryId: number;
  cityId: number;
  location: string;
  startDate: Date;
  endDate: Date;
  totalRating: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;

  // Related entities from service include
  pictures: EventPicture[];
  ticketCategories: TicketCategory[];
  organizer: {
    name: string;
    profilePicture: string;
    slug: string;
  };
}

export interface TicketCategory {
  id: number;
  eventId: string;
  name: string;
  description: string;
  price: number;
  seatQuota: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface TransactionResponse {
  id: string;
  quantity: number;
  totalPrice: number;
  status: string;
  event: {
    id: string;
    name: string;
    startDate: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
  };
  TicketEventCategory: {
    id: number;
    name: string;
    price: number;
  };
}

export interface WaitingConfirmationResponse {
  message: string;
  data: TransactionResponse[];
}

export interface Voucher {
  code: string;
  eventId: string;
  discount: number;
  maxDiscount: number;
  quota: number;
  expiredDate: string; // ISO date string
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface OrganizerProfile {
  id: string;
  slug: string;
  name: string;
  email: string;
  profilePicture: string;
  ratings: number;
  description: string;
  isActivated: boolean;
  createdAt: string;
  updatedAt: string;
}
