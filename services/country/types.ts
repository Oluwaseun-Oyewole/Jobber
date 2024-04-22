export type CountryByGeoCodeRequestBody = {
  lat: number;
  lng: number;
};

export type CountryByGeoCodeResponseBody = {
  plus_code: { compound_code: string };
};
export type StateByCountryNameRequestBody = {
  country: string;
};

export type StateByCountryNameResponseBody = {
  states: { name: string; state_code: string };
};
