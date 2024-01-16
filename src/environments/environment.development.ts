export const environment: EnvInterface = {
  regionId: [{
    id: 'and',
    name: 'Андижан',
    waterIncome: [194, 211, 188, 195, 213, 213, 194, 211, 188, 195, 213, 213],
    currentLevel: 895,
    currentRelease: 200,
    currentVolume: 1370

  },
    {
      id: 'akh',
      name: 'Ахангаран',
      waterIncome: [34, 34, 41, 38, 37, 36, 34, 34, 41, 38, 37, 36],
      currentLevel: 1070,
      currentRelease: 30,
      currentVolume: 189
    },
    {
      id: 'sar',
      name: 'Сардоба',
      waterIncome: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      currentLevel: 284,
      currentRelease: 223,
      currentVolume: 60
    },
    {
      id: 'his',
      name: 'Гисарак',
      waterIncome: [30, 34, 30, 30, 31, 31, 30, 34, 30, 30, 31, 31],
      currentLevel: 1106,
      currentRelease: 24,
      currentVolume: 128
    },
    {
      id: 'tup',
      name: 'Тупаланг',
      waterIncome: [167, 133, 133, 135, 137, 138, 167, 133, 133, 135, 137, 138],
      currentLevel: 945,
      currentRelease: 70,
      currentVolume: 394
    },
    {
      id: 'chor',
      name: 'Чарвак',
      waterIncome: [545, 545, 545, 547, 547, 547, 545, 545, 545, 547, 547, 547],
      currentLevel: 889,
      currentRelease: 259,
      currentVolume: 1986
    }]
};


export interface EnvInterface {
  regionId: RegionInfo[]
}

export interface RegionInfo {
  id: string
  name: string
  waterIncome: number[]
  currentLevel: number
  currentVolume: number
  currentRelease: number
}
