import {Component} from '@angular/core';
import {MenuItem} from "../shared/interfaces";
import {DropDownAnimation} from "../shared/animation/menu-animation";

@Component({
  selector: 'app-reservoir',
  templateUrl: './reservoir.component.html',
  styleUrls: ['./reservoir.component.css'],
  animations: [DropDownAnimation]
})
export class ReservoirComponent {

  menuItems: MenuItem[] = [
    {
      name: 'Главная',
      path: '/reservoir/dashboard',
    },
    {
      name: 'Вода',
      isActive: false,
      isOpen: false,
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
      isOpen: false,
      children: [
        {name: 'Срочные данные', path: '/reservoir/snow/current'},
        {name: 'За все время', path: '/reservoir/snow/all-time'}
      ]
    },
    {
      name: 'Гидрометрия',
      isActive: false,
      isOpen: false,
      children: [
        {name: 'Гидропосты', path: '/reservoir/hydro/posts'},
        {name: 'Водоизмерители', path: '/reservoir/hydro/meter'},
        {name: 'Рейки', path: '/reservoir/hydro/indicator'},
        {name: 'Журнал и документы', path: '/reservoir/hydro/journal'},
        {name: 'Контракты', path: '/reservoir/hydro/contract'},
        {name: 'Водомерные работы', path: '/reservoir/hydro/works'}
      ]
    },
    {
      name: 'Нормативные документы',
      path: '/reservoir/docs',
    }
  ];

  selectItem(item: MenuItem): void {
    this.resetActivity(this.menuItems);
    if (item.path) {
      item.isActive = true;
    } else {
      item.isOpen = !item.isOpen
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
