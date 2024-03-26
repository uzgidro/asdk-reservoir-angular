export const environment: EnvInterface = {
  regionId: [
    {
      id: 'and',
      name: 'Андижан',
      snowCoverage: [9.7, 60.9, 90.4, 93.1, 95.9, 98.5, 98.7, 100],
      vegetateVolume: 1009
    },
    {
      id: 'akh',
      name: 'Ахангаран',
      snowCoverage: [58.4, 100, 100, 100, 100, 100],
      vegetateVolume: 62.7
    },
    {
      id: 'psk',
      name: 'Пском',
      snowCoverage: [99.5, 100, 100, 100, 100, 100, 100],
    },
    {
      id: 'his',
      name: 'Гисарак',
      snowCoverage: [0, 39.8, 94.7, 100, 100, 100, 100],
      vegetateVolume: 41.2
    },
    {
      id: 'tup',
      name: 'Тупаланг',
      snowCoverage: [24.5, 55.2, 96.3, 100, 100, 100, 100],
      vegetateVolume: 124.5
    },
    {
      id: 'sar',
      name: 'Сардоба',
      vegetateVolume: 312.5
    }, {
      id: 'chor',
      name: 'Чарвак',
      vegetateVolume: 890
    },
    {
      id: 'chi',
      name: 'Чирчик',
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
}

