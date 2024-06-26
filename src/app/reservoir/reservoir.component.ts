// noinspection JSIgnoredPromiseFromCall

import {Component, OnInit} from '@angular/core';
import {MenuItem} from "../shared/interfaces";
import {DropDownAnimation, SideMenuAnimation} from "../shared/animation/menu-animation";
import {ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {ApiService} from "../service/api.service";
import {ReservoirResponse} from "../shared/response/reservoir-response";
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-reservoir',
  templateUrl: './reservoir.component.html',
  styleUrls: ['./reservoir.component.css'],
  animations: [DropDownAnimation, SideMenuAnimation],
  imports: [
    NgForOf,
    NgClass,
    NgIf,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    RouterLinkActive
  ],
  standalone: true
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
        {name: 'Декада', path: '/reservoir/water/decade'},
        {name: 'Пе месяцам', path: '/reservoir/water/month'},
        {name: 'По годам', path: '/reservoir/water/year'},
        {name: 'Аналитика', path: '/reservoir/water/analytics'},
        {name: 'График', path: '/reservoir/water/schedule'},
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
        // {name: 'Журнал и документы', path: '/reservoir/hydro/journal'},
        // {name: 'Контракты', path: '/reservoir/hydro/contract'},
        {name: 'Водомерные работы', path: '/reservoir/hydro/works'}
      ]
    },
    {
      name: 'MODSNOW',
      isActive: false,
      isOpen: false,
      children: [
        {name: 'Срочные данные', path: '/reservoir/snow/current'},
        {name: 'За все время', path: '/reservoir/snow/all-time'}
      ]
    },
    {
      name: 'Погода',
      path: '/reservoir/weather'
    },
    {
      name: 'Нормативные документы',
      path: '/reservoir/docs',
    }
  ];

  waterMenuItem = this.menuItems[1]
  reservoirs: { id: number, name: string }[] = []
  selectedReservoirId: number = 0
  sideMenuVisible = false

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private api: ApiService) {
  }

  ngOnInit() {
    this.api.getReservoirs().subscribe({
      next: (response: ReservoirResponse[]) => {
        this.reservoirs = response
      }
    })
    this.resetActivity(this.menuItems)
    // get url and remove query params to find menu item

    this.activatedRoute.queryParams.subscribe({
      next: value => {
        this.selectedReservoirId = value['reservoir']
        const url = this.router.url.split('?')[0]
        const selectedItem = this.findMenuByPath(url)
        if (selectedItem) {
          this.selectItem(selectedItem)
        }
        if (!url.includes('dashboard')) {
          this.sideMenuVisible = true
        } else if (url.includes('dashboard')) {
          this.menuItems.forEach(i => i.isOpen = false)
        }
      }
    })
  }

  toggleMenu() {
    this.sideMenuVisible = !this.sideMenuVisible
  }

  changeReservoir(id: number) {
    if (this.router.url == '/reservoir/dashboard') {
      // noinspection JSIgnoredPromiseFromCall
      this.router.navigate(['/reservoir/water/current'], {
        relativeTo: this.activatedRoute,
        queryParams: {reservoir: id},
        queryParamsHandling: 'merge'
      });
      const menuItem = this.findMenuByPath('/reservoir/water/current')
      if (menuItem) {
        this.selectItem(menuItem)
      }
      this.sideMenuVisible = true
    } else {
      if (id === this.selectedReservoirId) {
        // noinspection JSIgnoredPromiseFromCall
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {reservoir: null},
          queryParamsHandling: 'merge',
        });
      } else {
        // noinspection JSIgnoredPromiseFromCall
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {reservoir: id},
          queryParamsHandling: 'merge'
        });
      }
    }
  }

  findMenuByPath(path: string, items: MenuItem[] = this.menuItems): MenuItem | undefined {
    for (const menuItem of items) {
      if (menuItem.path === path) {
        return menuItem; // Найден элемент с нужным path
      }

      if (menuItem.children) {
        const foundInChildren = this.findMenuByPath(path, menuItem.children);
        if (foundInChildren) {
          return foundInChildren; // Найден элемент во вложенных детях
        }
      }
    }
    return undefined
  }

  selectItem(item: MenuItem): void {
    if (!item.children) {
      this.resetActivity(this.menuItems);
    }
    if (item.path) {
      item.isActive = true;
    } else {
      item.isOpen = !item.isOpen
    }
    const parent = this.findParent(this.menuItems, item);
    if (parent) {
      parent.isActive = true;
      parent.isOpen = true
    }
  }

  private resetActivity(items: MenuItem[]): void {
    items.forEach(item => {
      item.isActive = false;
      if (item.children) {
        this.resetActivity(item.children);
      }
    });
  }

  private findParent(items: MenuItem[], child: MenuItem): MenuItem | undefined {
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
