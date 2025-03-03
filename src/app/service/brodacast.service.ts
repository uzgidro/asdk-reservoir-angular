import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BrodacastService implements OnDestroy{

  private channel: BroadcastChannel;
  private reservoirSubject = new Subject<number>();

  // Observable для подписки на входящие сообщения
  public reservoir = this.reservoirSubject.asObservable();

  constructor() {
    // Инициализация канала с именем 'app_channel'
    this.channel = new BroadcastChannel('app_channel');

    // Подписка на входящие сообщения
    this.channel.onmessage = (event: MessageEvent) => {
      this.reservoirSubject.next(event.data);
    };
  }

  // Метод для отправки сообщений
  changeReservoir(reservoirId: number): void {
    this.channel.postMessage(reservoirId);
  }

  ngOnDestroy(): void {
    this.channel.close();
  }
}
