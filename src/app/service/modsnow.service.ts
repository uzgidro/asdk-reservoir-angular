import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {catchError, Observable, of, timeout} from "rxjs";
import {ModsnowImageResponse, ModsnowPercentResponse} from "../shared/response/modsnow-response";

const BASE_URL: string = 'https://speedwagon.uz'
const MODSNOW: string = '/snow'
const PERCENT: string = '/percent'
const COVER: string = '/cover'
const DYNAMICS: string = '/dynamics'

@Injectable({
  providedIn: 'root'
})
export class ModsnowService {

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  private rivers = [
    'Andijon',
    'Ohangaron',
    'Chorvoq',
    // 'Pskom',
    // 'Chotqol',
    // 'Ugam',
    'Hisorak',
    'To\'palang',
    // 'Norin',
    // 'Zarafshon',
  ]

  private coverUrl = [
    'https://storage.googleapis.com/modsnow-a1c82.appspot.com/riverimages/eaf3208d-cb74-432c-a754-e3bb2e0fe507.jpeg', // karadaryo andijan
    'https://storage.googleapis.com/modsnow-a1c82.appspot.com/riverimages/635e898d-52c9-4049-85a8-6e0223f7145a.jpeg', // ahangaran irtash
    'https://storage.googleapis.com/modsnow-a1c82.appspot.com/riverimages/8b977d36-8af0-42b3-a95d-e757a91179f4.jpeg', // chirchik
    // 'https://storage.googleapis.com/modsnow-a1c82.appspot.com/riverimages/c4ec88de-551d-4ec2-bf0d-9be0225d1578.jpeg', // piskem mullala
    // 'https://storage.googleapis.com/modsnow-a1c82.appspot.com/riverimages/c923925b-8b62-4c4e-91e6-bc97354b1a83.jpeg', // chatkal hudaydodsay
    // 'https://storage.googleapis.com/modsnow-a1c82.appspot.com/riverimages/e5d71d13-0c7d-4c26-ba76-0d699ca2d5fe.jpeg', // ugam
    'https://storage.googleapis.com/modsnow-a1c82.appspot.com/riverimages/d51db803-1688-4fa7-9fb7-5db05018c8d2.jpeg', // akdarya gissarak
    'https://storage.googleapis.com/modsnow-a1c82.appspot.com/riverimages/6a033d9a-cb35-4eef-835c-1219a8951367.jpeg', // tupalang zarchob
    // 'https://storage.googleapis.com/modsnow-a1c82.appspot.com/riverimages/f486eaa2-1b9b-4491-a46b-7d92e765ed01.jpeg', // naryn
    // 'https://storage.googleapis.com/modsnow-a1c82.appspot.com/riverimages/18603eb9-71bf-4ed3-a48f-fb9590677241.jpeg', // zerafshan dupuli
  ]

  private dynamicsUrl = [
    'https://storage.googleapis.com/modsnow-a1c82.appspot.com/riverimages/4548cd13-6993-4227-9711-41eccbdf56c7.png', // karadaryo andijan
    'https://storage.googleapis.com/modsnow-a1c82.appspot.com/riverimages/ab4715b0-2f38-47ff-a2f1-4ee27c8202a3.png', // ahangaran irtash
    'https://storage.googleapis.com/modsnow-a1c82.appspot.com/riverimages/2679b634-5c38-4be5-a66d-ea91d2316d34.png', // chirchik
    // 'https://storage.googleapis.com/modsnow-a1c82.appspot.com/riverimages/a5786f0d-4f74-4b8d-9e6b-7a9f07ca216b.png', // piskem mullala
    // 'https://storage.googleapis.com/modsnow-a1c82.appspot.com/riverimages/0036a350-5d85-40fb-a73f-b340a8321ec7.png', // chatkal hudaydodsay
    // 'https://storage.googleapis.com/modsnow-a1c82.appspot.com/riverimages/2b0ac303-4d1e-4dbb-9dc0-96e280d6a8e0.png', // ugam
    'https://storage.googleapis.com/modsnow-a1c82.appspot.com/riverimages/62b2b795-6a44-4ead-86f2-fceb5a88f225.png', // akdarya gissarak
    'https://storage.googleapis.com/modsnow-a1c82.appspot.com/riverimages/51b7449e-e964-4314-8b73-8bd767e4c130.png', // tupalang zarchob
    // 'https://storage.googleapis.com/modsnow-a1c82.appspot.com/riverimages/bf600a54-b7bb-4672-8d6d-63bab87e5d22.png', // naryn
    // 'https://storage.googleapis.com/modsnow-a1c82.appspot.com/riverimages/8d37c1b6-21ad-498e-9a29-492ecfc871db.png', // zerafshan dupuli
  ]

  private currentPercent = [
    94,
    94,
    97,
    // 98,
    // 98,
    // 89,
    93,
    81,
    // 64,
    // 65
  ]

  getPercent(): Observable<ModsnowPercentResponse[]> {
    return this.http.get<ModsnowPercentResponse[]>(BASE_URL + MODSNOW + PERCENT).pipe(
      timeout(3000),
      catchError((error) => {
        // this.messageService.add({severity: 'error', summary: 'Ошибка', detail: error.message})
        return this.getTempPercent();
      })
    )
  }

  getCover(): Observable<ModsnowImageResponse[]> {
    return of([
      {name: 'Andijon', url: 'assets/img/and_cover.jpeg'},
      {name: 'Ohangaron', url: 'assets/img/akh_cover.jpeg'},
      {name: 'Chorvoq', url: 'assets/img/chor_cover.jpeg'},
      {name: 'Hisorak', url: 'assets/img/his_cover.jpeg'},
      {name: 'To\'palang', url: 'assets/img/tup_cover.jpeg'},
    ])
  }

  getDynamics(): Observable<ModsnowImageResponse[]> {
    return of([
      {name: 'Andijon', url: 'assets/img/and_dynamics.png'},
      {name: 'Ohangaron', url: 'assets/img/akh_dynamics.png'},
      {name: 'Chorvoq', url: 'assets/img/chor_dynamics.png'},
      {name: 'Hisorak', url: 'assets/img/his_dynamics.png'},
      {name: 'To\'palang', url: 'assets/img/tup_dynamics.png'},
    ])
  }

  private getTempPercent(): Observable<ModsnowPercentResponse[]> {
    const tempData = this.rivers.map((river, index) => ({
      name: river,
      percent: this.currentPercent[index],
    }));
    return of(tempData)
  }

  private getTempCover(): Observable<ModsnowImageResponse[]> {
    const tempData = this.rivers.map((river, index) => ({
      name: river,
      url: this.coverUrl[index],
    }));
    return of(tempData)
  }

  private getTempDynamics(): Observable<ModsnowImageResponse[]> {
    const tempData = this.rivers.map((river, index) => ({
      name: river,
      url: this.dynamicsUrl[index],
    }));
    return of(tempData)
  }
}
