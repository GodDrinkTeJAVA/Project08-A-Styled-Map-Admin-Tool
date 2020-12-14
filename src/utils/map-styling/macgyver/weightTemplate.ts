export type WeightTemplateProperty = string | number | (string | number)[];
interface WeightTemplate {
  [subFeature: string]: {
    [element: string]: (weight: number) => WeightTemplateProperty[];
  };
}

const weightTemplate: WeightTemplate = {
  all: {
    fill: (weight: number): WeightTemplateProperty[] => [
      'interpolate',
      ['exponential', 1.5],
      ['zoom'],
      12,
      weight,
      14,
      weight * 2 + 2,
      18,
      weight * 10 + 5,
    ],
    stroke: (weight: number): WeightTemplateProperty[] => [
      'interpolate',
      ['exponential', 1.5],
      ['zoom'],
      12,
      weight,
      20,
      weight * 1.5 + 1,
    ],
  },
  highway: {
    fill: (weight: number): WeightTemplateProperty[] => [
      'interpolate',
      ['exponential', 1.5],
      ['zoom'],
      5,
      weight,
      18,
      weight * 5 + 25,
    ],
    stroke: (weight: number): WeightTemplateProperty[] => [
      'interpolate',
      ['exponential', 1.5],
      ['zoom'],
      12,
      weight,
      14,
      weight * 2,
      18,
      weight * 2 + 10,
    ],
  },
  arterial: {
    fill: (weight: number): WeightTemplateProperty[] => [
      'interpolate',
      ['exponential', 1.5],
      ['zoom'],
      5,
      weight,
      18,
      weight * 5 + 25,
    ],
    stroke: (weight: number): WeightTemplateProperty[] => [
      'interpolate',
      ['exponential', 1.5],
      ['zoom'],
      10,
      weight,
      18,
      weight * 1.5 + 1,
    ],
  },
  local: {
    fill: (weight: number): WeightTemplateProperty[] => [
      'interpolate',
      ['exponential', 1.5],
      ['zoom'],
      12,
      weight,
      14,
      weight * 2 + 2,
      18,
      weight * 20 + 5,
    ],
    stroke: (weight: number): WeightTemplateProperty[] => [
      'interpolate',
      ['exponential', 1.5],
      ['zoom'],
      12,
      weight,
      20,
      weight * 1.5 + 1,
    ],
  },
  sidewalk: {
    fill: (weight: number): WeightTemplateProperty[] => [
      'interpolate',
      ['exponential', 1.5],
      ['zoom'],
      14,
      weight,
      18,
      weight * 15 + 5,
    ],
    stroke: (weight: number): WeightTemplateProperty[] => [
      'interpolate',
      ['exponential', 1.5],
      ['zoom'],
      14,
      weight,
      18,
      weight * 5 + 5,
    ],
  },
};

export default weightTemplate;
