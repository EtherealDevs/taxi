export type Address = {
  display_name: string;
  lat: string;
  lon: string;
  address: {
    road?: string;
    suburb?: string;
    city_district?: string;
    town?: string;
    state?: string;
    state_district?: string;
    postcode?: string;
    country: string;
  };
};

export type FormattedAddress = {
  address: string;
  city: string;
  country: string;
  latitude: string;
  longitude: string;
};

export const formatAddresses = (
  first: Address,
  last: Address,
  extraStop: Address[]
): FormattedAddress[] => {
  // Función para formatear una sola dirección
  const format = (address: Address): FormattedAddress => ({
    address: address.address.road || address.display_name,
    city: address.address.town || address.address.city_district || "",
    country: address.address.country,
    latitude: address.lat,
    longitude: address.lon,
  });

  // Formatear todas las direcciones
  const formattedAddresses: FormattedAddress[] = [
    format(first),
    ...extraStop.map(format),
    format(last),
  ];

  return formattedAddresses;
};
