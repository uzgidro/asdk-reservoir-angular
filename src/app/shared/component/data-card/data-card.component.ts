import {Component, Input} from '@angular/core';
import {DecimalPipe, NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-data-card',
  standalone: true,
  imports: [NgClass, DecimalPipe, NgIf],
  template: `
    <div class="flex flex-col justify-start border border-gray-500 rounded-xl px-4 py-2 text-xl h-full">
      <div class="flex flex-col space-y-2 justify-center items-start h-full">
        <p class="font-bold">{{ title }}</p>
        <p class="self-end text-3xl font-light" *ngIf="data">
          {{ data.value }} /
          <span [ngClass]="{'text-red-500': data.difference < 0, 'text-green-500': data.difference > 0}">
            {{ data.difference | number:numberFormat }}
          </span>
        </p>
      </div>
    </div>
  `,
})
export class DataCardComponent {
  @Input() title: string = '';
  @Input() data?: { value: number; difference: number };
  @Input() numberFormat: string = '0.0-0';
}