export interface EventWithPicture {
  id: String;
  organizerId: String;
  name: String;
  slug: String;
  description: String;
  category: String;
  location: String;
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
    message: String;
    success: Boolean;
  };
}

export interface EventPicture {
  id: string;
  banner: String;
  picture1: String;
  picture2?: String;
  picture3?: String;
}

export interface Category {
  category: String;
}
