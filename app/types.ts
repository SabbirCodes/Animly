export interface Animal {
    name: string;
    taxonomy: {
      kingdom: string;
      phylum: string;
      class: string;
      order: string;
      family: string;
      genus: string;
      scientific_name: string;
    };
    locations: string[];
    characteristics: {
      prey: string;
      name_of_young: string;
      group_behavior: string;
      estimated_population_size: string;
      biggest_threat: string;
      most_distinctive_feature: string;
      gestation_period: string;
      habitat: string;
      diet: string;
      average_litter_size: string;
      lifestyle: string;
      common_name: string;
      number_of_species: string;
      location: string;
      slogan: string;
      group: string;
      color: string;
      skin_type: string;
      top_speed: string;
      lifespan: string;
      weight: string;
      height: string;
      age_of_sexual_maturity: string;
      age_of_weaning: string;
    };
  }
  
  