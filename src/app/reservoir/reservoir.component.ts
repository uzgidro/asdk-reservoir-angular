import {Component} from '@angular/core';
import {MenuItem} from "../shared/interfaces";

@Component({
  selector: 'app-reservoir',
  templateUrl: './reservoir.component.html',
  styleUrls: ['./reservoir.component.css']
})
export class ReservoirComponent {
  readonly HOURLY_CATEGORY = 1;
  readonly DAILY_CATEGORY = 2;

  menuItems: MenuItem[] = [
    {
      name: 'Главная',
      path: '/reservoir/dashboard',
    },
    {
      name: 'Вода',
      isActive: false,
      children: [
        {name: 'Срочные данные', path: '/reservoir/water/current'},
        {name: '10 дней', path: '/reservoir/water/10-days'},
        {name: 'Данные за год', path: '/reservoir/water/year'},
        {name: 'Аналитика', path: '/reservoir/water/analytics'}
      ]
    },
    {
      name: 'Заснеженность',
      isActive: false,
      children: [
        {name: 'Срочные данные', path: '/reservoir/snow/current'},
        {name: 'За все время', path: '/reservoir/snow/all-time'}
      ]
    },
    {
      name: 'Гидрометрия',
      isActive: false,
      children: [
        {name: 'Гидропосты', path: '/reservoir/meter/hydro-post'},
        {name: 'Водоизмерители', path: '/reservoir/meter/water-meter'},
        {name: 'Датчики воды', path: '/reservoir/meter/indicator'},
        {name: 'Журнал и документы', path: '/reservoir/meter/journal'},
        {name: 'Контракты', path: '/reservoir/meter/contract'},
        {name: 'Водомерные работы', path: '/reservoir/meter/work-meter-works'}
      ]
    },
    {
      name: 'Нормативные документы',
      path: '/reservoir/docs',
    }
  ];

  selectedCategory: number = this.HOURLY_CATEGORY

  changeCategory(category: number) {
    this.selectedCategory = category
  }

  selectItem(item: MenuItem): void {
    this.resetActivity(this.menuItems);
    if (item.path) {
      item.isActive = true;
    }
    const parent = this.findParent(this.menuItems, item);
    if (parent) {
      parent.isActive = true;
    }
  }

  resetActivity(items: MenuItem[]): void {
    items.forEach(item => {
      item.isActive = false;
      if (item.children) {
        this.resetActivity(item.children);
      }
    });
  }

  findParent(items: MenuItem[], child: MenuItem): MenuItem | undefined {
    for (const item of items) {
      if (item.children && item.children.includes(child)) {
        return item;
      } else if (item.children) {
        const parent = this.findParent(item.children, child);
        if (parent) {
          return parent;
        }
      }
    }
    return undefined;
  }
}
