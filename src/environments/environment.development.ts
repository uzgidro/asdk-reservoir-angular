export const environment: EnvInterface = {
  regionId: [
    {
      id: 'and',
      name: 'Andijon',
      vegetateVolume: 1009,
      lowerLevel: 793.8,
      gesCoefficient: 0.874,
    },
    {
      id: 'akh',
      name: 'Ohangaron',
      vegetateVolume: 62.7,
      lowerLevel: 1004.9,
      gesCoefficient: 0.874,
    },
    {
      id: 'psk',
      name: 'Pskom',
    },
    {
      id: 'his',
      name: 'Hisorak',
      vegetateVolume: 41.2,
      lowerLevel: 987.2,
      gesCoefficient: 0.874,
    },
    {
      id: 'tup',
      name: 'To\'palang',
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
  vegetateVolume?: number
  gesCoefficient?: number
  lowerLevel?: number
}

