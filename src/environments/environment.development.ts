export const environment : EnvInterface = {
  regionId: [{name: 'Андижан', id: 'and'},
    {name: 'Ахангаран', id: 'akh'},
    {name: 'Сардоба', id: 'sar'},
    {name: 'Гисарак', id: 'his'},
    {name: 'Тупаланг', id: 'tup'},
    {name: 'Чарвак', id: 'chor'}]
};


export interface EnvInterface  {
 regionId: RegionInfo[]
}

export interface RegionInfo {
  name: string, id: string
}
