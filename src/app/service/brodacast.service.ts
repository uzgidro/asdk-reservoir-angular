import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BrodacastService {

  private channel: BroadcastChannel;
  private messageSubject = new Subject<any>();

  // Observable для подписки на входящие сообщения
  public message$ = this.messageSubject.asObservable();

  constructor() {
    // Инициализация канала с именем 'app_channel'
    this.channel = new BroadcastChannel('app_channel');

    // Подписка на входящие сообщения
    this.channel.onmessage = (event: MessageEvent) => {
      this.messageSubject.next(event.data);
    };
  }

  // Метод для отправки сообщений
  sendMessage(message: any): void {
    this.channel.postMessage(message);
  }

  // Очистка ресурсов при уничтожении сервиса
  ngOnDestroy(): void {
    this.channel.close();
  }
}
