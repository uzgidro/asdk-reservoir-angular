export const environment: EnvInterface = {
  regionId: [
    {
      id: 'and',
      name: 'Андижан',
      waterIncome: [40, 39, 40, 41, 41, 37, 37, 39, 49, 48, 41, 50, 49],
      waterRelease: [50, 50, 50, 25, 50, 25, 25, 25, 50, 75, 42, 75, 75],
      waterVolume: [805, 804, 803, 804, 805, 806, 807, 809, 811, 811, 816, 814, 811],
      waterLevel: [880, 880, 880, 880, 880, 880, 881, 881, 881, 881, 881, 881, 881],
      currentLevel: 895,
      currentRelease: 200,
      currentVolume: 1370

    },
    {
      id: 'akh',
      name: 'Ахангаран',
      waterIncome: [6, 7, 6, 6, 5, 7, 7, 7, 11, 10, 7, 9, 10],
      waterRelease: [10, 11, 10, 9, 9, 10, 10, 9, 10, 10, 10, 10, 10],
      waterVolume: [57, 57, 56, 56, 55, 55, 55, 55, 56, 56, 56, 56, 55],
      waterLevel: [1037, 1036, 1036, 1036, 1036, 1036, 1036, 1036, 1036, 1036, 1036, 1036, 1036],
      currentLevel: 1070,
      currentRelease: 30,
      currentVolume: 189
    },
    {
      id: 'sar',
      name: 'Сардоба',
      waterIncome: [30, 30, 30, 30, 30, 30, 30, 30, 30, 40, 31, 40, 40],
      waterRelease: [45, 45, 45, 45, 55, 55, 55, 55, 55, 40, 49, 40, 40],
      waterLevel: [286, 286, 286, 285, 285, 285, 285, 285, 285, 285, 285, 285, 285],
      waterVolume: [260, 258, 257, 255, 253, 251, 249, 246, 244, 243, 243, 242, 242],
      currentLevel: 284,
      currentRelease: 223,
      currentVolume: 60
    },
    {
      id: 'his',
      name: 'Гисарак',
      waterIncome: [6, 5, 6, 7, 7, 6, 5, 4, 4, 4, 5, 3, 3],
      waterRelease: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      waterLevel: [1060, 1061, 1061, 1062, 1063, 1063, 1064, 1064, 1065, 1065, 1065, 1066, 1066],
      waterVolume: [32, 32, 33, 33, 34, 34, 35, 35, 36, 36, 36, 37, 37],
      currentLevel: 1106,
      currentRelease: 24,
      currentVolume: 128
    },
    {
      id: 'tup',
      name: 'Тупаланг',
      waterIncome: [10, 10, 12, 14, 14, 15, 17, 17, 17, 14, 14, 17, 11],
      waterRelease: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      waterLevel: [835, 836, 837, 838, 839, 841, 842, 843, 844, 846, 847, 848, 848],
      waterVolume: [12, 13, 14, 15, 16, 18, 19, 21, 22, 23, 25, 26, 27],
      currentLevel: 945,
      currentRelease: 70,
      currentVolume: 394
    },
    {
      id: 'chor',
      name: 'Чарвак',
      waterIncome: [64, 57, 61, 63, 64, 57, 67, 66, 76, 77, 65, 75, 72],
      waterRelease: [155, 122, 120, 142, 148, 144, 148, 141, 138, 150, 140, 180, 228],
      waterLevel: [860, 860, 860, 860, 859, 859, 859, 859, 858, 858, 858, 857, 857],
      waterVolume: [995, 990, 982, 976, 969, 959, 952, 946, 941, 934, 925, 911, 905],
      currentLevel: 889,
      currentRelease: 259,
      currentVolume: 1986
    }],
  dataLabels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00']
};


export interface EnvInterface {
  regionId: RegionInfo[]
  dataLabels: string[]
}

export interface RegionInfo {
  id: string
  name: string
  waterIncome: number[]
  waterRelease: number[]
  waterVolume: number[]
  waterLevel: number[]
  currentLevel: number
  currentVolume: number
  currentRelease: number
}
