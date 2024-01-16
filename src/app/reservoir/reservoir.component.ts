import {Component, OnInit} from '@angular/core';
import {MenuItem} from "../shared/interfaces";
import {DropDownAnimation, SideMenuAnimation} from "../shared/animation/menu-animation";
import {ActivatedRoute, Router} from "@angular/router";
import {EnvService} from "../shared/service/env.service";

@Component({
  selector: 'app-reservoir',
  templateUrl: './reservoir.component.html',
  styleUrls: ['./reservoir.component.css'],
  animations: [DropDownAnimation, SideMenuAnimation]
})
export class ReservoirComponent implements OnInit {

  menuItems: MenuItem[] = [
    {
      name: 'Главная',
      path: '/reservoir/dashboard',
      queryParams: '',
      queryParamsHandling: 'merge'
    },
    {
      name: 'Водные ресурсы',
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
  reservoirs = this.env.getRegions()
  selectedReservoir: string = ''
  hidden = false

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private env: EnvService) {
  }

  ngOnInit() {
    console.log(this.reservoirs)
    this.resetActivity(this.menuItems)
    const url = this.router.url
    const selectedItem = this.findMenuByPath(this.menuItems, url)
    if (selectedItem) {
      this.selectItem(selectedItem)
    }
    this.activatedRoute.queryParams.subscribe({
      next: value => this.selectedReservoir = value['reservoir']
    })
  }

  toggleMenu() {
    this.hidden = !this.hidden
  }

  changeReservoir(id: string) {
    if (this.router.url == '/reservoir/dashboard') {
      this.router.navigate(['/reservoir/water/current'], {
        relativeTo: this.activatedRoute,
        queryParams: {reservoir: id},
        queryParamsHandling: 'merge'
      });
      this.hidden = true
    } else {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: {reservoir: id},
        queryParamsHandling: 'merge'
      });
    }
  }

  findMenuByPath(items: MenuItem[], path: string): MenuItem | undefined {
    for (const menuItem of items) {
      if (menuItem.path === path) {
        return menuItem; // Найден элемент с нужным path
      }

      if (menuItem.children) {
        const foundInChildren = this.findMenuByPath(menuItem.children, path);
        if (foundInChildren) {
          return foundInChildren; // Найден элемент во вложенных детях
        }
      }
    }
    return undefined
  }

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
