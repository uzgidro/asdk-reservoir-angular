export const environment: EnvInterface = {
  regionId: [
    {
      id: 'and',
      name: 'Andijon',
      snowCoverage: [9.7, 60.9, 90.4, 93.1, 95.9, 98.5, 98.7, 100],
      vegetateVolume: 1009,
      lowerLevel: 793.8,
      gesCoefficient: 0.874,
    },
    {
      id: 'akh',
      name: 'Ohangaron',
      snowCoverage: [58.4, 100, 100, 100, 100, 100],
      vegetateVolume: 62.7,
      lowerLevel: 1004.9,
      gesCoefficient: 0.874,
    },
    {
      id: 'psk',
      name: 'Pskom',
      snowCoverage: [99.5, 100, 100, 100, 100, 100, 100],
    },
    {
      id: 'his',
      name: 'Hisorak',
      snowCoverage: [0, 39.8, 94.7, 100, 100, 100, 100],
      vegetateVolume: 41.2,
      lowerLevel: 987.2,
      gesCoefficient: 0.874,
    },
    {
      id: 'tup',
      name: 'To\'palang',
      snowCoverage: [24.5, 55.2, 96.3, 100, 100, 100, 100],
      vegetateVolume: 124.5,
      lowerLevel: 792.1,
      gesCoefficient: 0.884,
    },
    {
      id: 'sar',
      name: 'Sardoba',
      vegetateVolume: 312.5
    }, {
      id: 'chor',
      name: 'Chorvoq',
      vegetateVolume: 890,
      lowerLevel: 742,
      gesCoefficient: 0.893,
    },
    {
      id: 'chi',
      name: 'Chirchiq',
      snowCoverage: [98.9, 99.9, 100, 100, 100, 100, 100],
    }],
  dataLabels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00'],
  weatherApiKey: '6c5ef4230fa82235bbc96b67a40684bf',
};


export interface EnvInterface {
  regionId: RegionInfo[]
  dataLabels: string[]
  weatherApiKey: string
}

export interface RegionInfo {
  id: string
  name: string
  snowCoverage?: number[]
  vegetateVolume?: number
  gesCoefficient?: number
  lowerLevel?: number
}

