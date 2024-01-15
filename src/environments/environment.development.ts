export const environment : EnvInterface = {
  regionId: [{id: 'and', name: 'Андижан', waterIncome: [194,211,188,195,213,213,194,211,188,195,213,213]},
    {id: 'akh', name: 'Ахангаран', waterIncome: [34,34,41,38,37,36,34,34,41,38,37,36]},
    {id: 'sar', name: 'Сардоба', waterIncome: [5,5,5,5,5,5,5,5,5,5,5,5]},
    {id: 'his', name: 'Гисарак', waterIncome: [30,34,30,30,31,31,30,34,30,30,31,31]},
    {id: 'tup', name: 'Тупаланг', waterIncome: [167,133,133,135,137,138,167,133,133,135,137,138]},
    {id: 'chor', name: 'Чарвак', waterIncome: [545,545,545,547,547,547,545,545,545,547,547,547]}]
};


export interface EnvInterface  {
 regionId: RegionInfo[]
}

export interface RegionInfo {
  id: string
  name: string
  waterIncome: number[]
}
