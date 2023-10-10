import {Injectable} from "@angular/core";
import {Ges, GesValues} from "../interfaces";

@Injectable({providedIn: 'root'})
export class GesService {
  gesList: Ges[] = [
    {name: 'ГЭС-6 (Чорвоқ)', activePower: 666},
    {name: 'ГЭС-27 (Ходжикент)', activePower: 165},
    {name: 'ГЭС-28 (Ғазалкент)', activePower: 120},
    {name: 'ШЭҚ-750', activePower: 1},
    {name: 'ГЭС-8 (Товоқсой)', activePower: 72},
    {name: 'ГЭС-7 (Чирчиқ)', activePower: 84},
    {name: 'ГЭС-10 (Оқ-қовоқ)', activePower: 35},
    {name: 'ГЭС-15 (Оқ-қовоқ)', activePower: 9},
    {name: 'ГЭС-11 (Қибрай)', activePower: 11},
    {name: 'ГЭС-3 (Қодирия)', activePower: 15},
    {name: 'ГЭС-12 (Салар)', activePower: 11},
    {name: 'ГЭС-1 (Бўзсув)', activePower: 4},
    {name: 'ГЭС-21 (Шайхонтохур)', activePower: 4},
    {name: 'ГЭС-4 (Буржар)', activePower: 6},
    {name: 'ГЭС-9 (Оқ-тепа)', activePower: 17},
    {name: 'ГЭС-14', activePower: 15},
    {name: 'ГЭС-18', activePower: 7},
    {name: 'ГЭС-19', activePower: 11},
    {name: 'ГЭС-23', activePower: 18},
    {name: 'ГЭС-22', activePower: 4},
    {name: 'ГЭС-16', activePower: 126},
    {name: 'ГЭС-2Б (Хишрав)', activePower: 22},
    {name: 'ГЭС-3Б (Иртишар)', activePower: 6},
    {name: 'ГЭС-1Б (Талигулон 1)', activePower: 3},
    {name: 'ГЭС-5Б (Талигулон 2)', activePower: 9},
    {name: 'Угрут ГЭС', activePower: 3},
    {name: 'ГЭС-5А', activePower: 2},
    {name: 'ГЭС-6А', activePower: 7},
    {name: 'ЖФК-1', activePower: 11},
    {name: 'ЖФК-2', activePower: 8},
    {name: 'ГЭС-29', activePower: 140},
    {name: 'Кудаш ГЭС', activePower: 5},
    {name: 'ГЭС-30', activePower: 150},
    {name: 'ГЭС-34', activePower: 30},
    {name: 'ГЭС-35', activePower: 21},
    {name: 'ГЭС-36', activePower: 50},
    {name: 'ГЭС-37', activePower: 45},
    {name: 'ГЭС-38', activePower: 2},
    {name: 'ГЭС-41', activePower: 11},
    {name: 'ГЭС-8А', activePower: 6},
    {name: 'ГЭС-9А', activePower: 6}
  ]

  gesValues: GesValues[] = Array.from(this.gesList, (ges) => {
    return {
      name: ges.name,
      activePower: ges.activePower,
      activePowerAtMoment: ges.activePower * 0.3,
      difference: ges.activePower % 2 == 0 ? ges.activePower * 0.068 : -(ges.activePower * 0.068),
      reactivePower: ges.activePower * 0.4,
      frequency: 50,
      waterRelease: 100,
      idleDischarge: 30
    }
  })

  sortByName(isAscSort: boolean) {

    this.gesValues.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (isAscSort) {
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      } else {
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
      }
      return 0;
    })
  }

  sortByPower(isAscSort: boolean) {
    this.gesValues.sort((a, b) => {
        if (isAscSort) {
          return a.activePower - b.activePower
        } else {
          return b.activePower - a.activePower
        }
      }
    )
  }
}
