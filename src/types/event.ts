export interface EventWithPicture {
  id: string;
  organizerId: string;
  name: string;
  slug: string;
  description: string;
  category: String;
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
  picture2?: String;
  picture3?: String;
}

export interface Category {
  category: string;
}
