import { Country } from "../models/country.model";

export class CountryMapper {

  static fromGeoJson(properties: any): Country {
    return {
      name: properties.name,
      nameEs: properties.name_es,
      iso2: properties.iso_a2,
      iso3: properties.iso_a3,
      continent: properties.continent
    };
  }

}
