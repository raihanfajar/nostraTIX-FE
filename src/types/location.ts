export interface Country {
  id: number;
  name: string;
  isoCode: string;
}

export interface City {
    id: number;
    name: string;
    countryId: number;
}