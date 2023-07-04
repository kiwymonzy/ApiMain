export default interface IDefaultState {
  properties: Property[];
  featuredProperties: Property[];
  favouriteProperties: Property[];
  selectedProperty: Property;
}

export interface IQueryParams {
  starting_price?: number;
  end_price?: number;
  category?: number;
  city_id?: number;
  property_status?: string;
}

export interface IResidentialProperty {
  rooms: number;
  bedrooms: number;
  living_rooms: number;
  bathrooms: number;
  kitchen: number;
  store: number;
  servant_quarter: number;
  patio: number;
  area: number;
}

export interface ICategory {
  category_name: string;
  category_id: number;
}

export interface ICommercialProperty {
  dry_cleaner?: string;
  dry_cleaning_service?: string;
  bakery?: string;
  bank?: string;
  beauty_salon?: string;
  cafe?: string;
  car_rental?: string;
  store: string;
  restaurant?: string;
  fast_food?: string;
  fashion?: string;
  gift_store?: string;
  fresh_produce?: string;
}

export interface IIndustrialProperty {
  plot_size: number;
  area: number;
}

export interface ILandProperty {
  land_size: number;
}

export interface Property {
  property_id: number;
  property_name: string;
  property_description: string;
  property_status: string;
  price: string;
  is_available: boolean;
  images: string[];
  address: IAddress;
  category: ICategory;
  created_at: string;
  updated_at: string;
  owner: {
    user_id: number;
    full_name: string;
    address: IAddress;
    phone_number: string;
    property_count: number;
  };
  property_features?:
    | IResidentialProperty
    | ICommercialProperty
    | IIndustrialProperty
    | ILandProperty;
}

export interface IAddress {
  address_id?: number;
  address: string;
  address2: string;
  district: string;
  postal_code: string;
  phone_number: string;
  city_id?: number;
  city?: string;
  geo_location?: {
    latitude: number;
    longitude: number;
  };
  latitude?: number;
  longitude?: number;
}
