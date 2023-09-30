import {Injectable} from "@angular/core";
import {Dataset} from "../interfaces";

@Injectable({providedIn: 'root'})
export class PizeoService {

  st1: Dataset[] = [
    {label: 'P23',data: [6,4,8,4,3,6,7,9,2,10], borderColor:'blue',backgroundColor:'blue', tension:0.4}
  ]
  st2: Dataset[] = [
    {label: 'P24',data: [6,4,8,4,3,6,7,9,2,10], borderColor:'blue',backgroundColor:'blue', tension:0.4},
    {label: 'P17',data: [5,3,7,3,2,5,6,10,5,1], borderColor:'red',backgroundColor:'red', tension:0.4}
  ]
  st3: Dataset[] = [
    {label: 'P25',data: [6,4,8,4,3,6,7,9,2,10], borderColor:'blue',backgroundColor:'blue', tension:0.4},
    {label: 'P7',data: [5,3,7,3,2,5,6,10,5,1], borderColor:'red',backgroundColor:'red', tension:0.4},
    {label: 'P18',data: [7,3,9,5,4,7,3,4,7,4], borderColor:'green',backgroundColor:'green', tension:0.4},
  ]
  st4: Dataset[] = [
    {label: 'P26',data: [6,4,8,4,3,6,7,9,2,10], borderColor:'blue',backgroundColor:'blue', tension:0.4},
    {label: 'P8',data: [5,3,7,3,2,5,6,10,5,1], borderColor:'red',backgroundColor:'red', tension:0.4},
    {label: 'P19',data: [7,3,9,5,4,7,3,4,7,4], borderColor:'green',backgroundColor:'green', tension:0.4},
  ]
  st5: Dataset[] = [
    {label: 'P27',data: [6,4,8,4,3,6,7,9,2,10], borderColor:'blue',backgroundColor:'blue', tension:0.4},
    {label: 'P9',data: [5,3,7,3,2,5,6,10,5,1], borderColor:'red',backgroundColor:'red', tension:0.4},
    {label: 'P1',data: [7,3,9,5,4,7,3,4,7,4], borderColor:'green',backgroundColor:'green', tension:0.4},
    {label: 'P20',data: [4,4,5,6,7,8,4,5,6,4], borderColor:'gray',backgroundColor:'gray', tension:0.4},
  ]
  st6: Dataset[] = [
    {label: 'P28',data: [6,4,8,4,3,6,7,9,2,10], borderColor:'blue',backgroundColor:'blue', tension:0.4},
    {label: 'P10',data: [5,3,7,3,2,5,6,10,5,1], borderColor:'red',backgroundColor:'red', tension:0.4},
    {label: 'P2',data: [7,3,9,5,4,7,3,4,7,4], borderColor:'green',backgroundColor:'green', tension:0.4},
  ]
  st7: Dataset[] = [
    {label: 'P29',data: [6,4,8,4,3,6,7,9,2,10], borderColor:'blue',backgroundColor:'blue', tension:0.4},
    {label: 'P11',data: [5,3,7,3,2,5,6,10,5,1], borderColor:'red',backgroundColor:'red', tension:0.4},
    {label: 'P3',data: [7,3,9,5,4,7,3,4,7,4], borderColor:'green',backgroundColor:'green', tension:0.4},
    {label: 'P21',data: [4,4,5,6,7,8,4,5,6,4], borderColor:'gray',backgroundColor:'gray', tension:0.4},
  ]
  st8: Dataset[] = [
    {label: 'P30',data: [6,4,8,4,3,6,7,9,2,10], borderColor:'blue',backgroundColor:'blue', tension:0.4},
    {label: 'P11\"',data: [5,3,7,3,2,5,6,10,5,1], borderColor:'red',backgroundColor:'red', tension:0.4},
  ]
  st9: Dataset[] = [
    {label: 'P31',data: [6,4,8,4,3,6,7,9,2,10], borderColor:'blue',backgroundColor:'blue', tension:0.4},
    {label: 'P4',data: [5,3,7,3,2,5,6,10,5,1], borderColor:'red',backgroundColor:'red', tension:0.4},
  ]
  st10: Dataset[] = [
    {label: 'P32',data: [6,4,8,4,3,6,7,9,2,10], borderColor:'blue',backgroundColor:'blue', tension:0.4},
    {label: 'P13',data: [5,3,7,3,2,5,6,10,5,1], borderColor:'red',backgroundColor:'red', tension:0.4},
    {label: 'P6',data: [7,3,9,5,4,7,3,4,7,4], borderColor:'green',backgroundColor:'green', tension:0.4},
  ]
  st11: Dataset[] = [
    {label: 'P33',data: [6,4,8,4,3,6,7,9,2,10], borderColor:'blue',backgroundColor:'blue', tension:0.4},
    {label: 'P14',data: [5,3,7,3,2,5,6,10,5,1], borderColor:'red',backgroundColor:'red', tension:0.4},
  ]
  st12: Dataset[] = [
    {label: 'P34',data: [6,4,8,4,3,6,7,9,2,10], borderColor:'blue',backgroundColor:'blue', tension:0.4}
  ]
}
