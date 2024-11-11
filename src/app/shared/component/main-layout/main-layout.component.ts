import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NavbarComponent} from "../navbar/navbar.component";
import {SidebarModule} from "primeng/sidebar";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {MenuItem} from "../../interfaces";
import {DropDownAnimation} from "../../animation/menu-animation";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
  animations: [DropDownAnimation],
  imports: [
    NavbarComponent,
    RouterOutlet,
    SidebarModule,
    NgClass,
    RouterLink,
    NgIf,
    NgForOf,
    RouterLinkActive
  ],
  standalone: true

})
export class MainLayoutComponent {
  isSidebarVisible = false;

  menuItems: MenuItem[] = [
    {
      name: 'Bosh sahifa',
      path: '/dashboard',
      queryParams: '',
      queryParamsHandling: 'merge'
    },
    {
      name: 'Suv resurslar',
      isActive: false,
      isOpen: false,
      children: [
        {name: 'Kunlik ma\'lumotlar', path: '/reservoir/water/current'},
        {name: 'O\'n kunlik ma\'lumotlar', path: '/reservoir/water/decade'},
        {name: 'Oylik ma\'lumotlar', path: '/reservoir/water/month'},
        {name: 'Ko\'p yillik ma\'lumotlar', path: '/reservoir/water/year'},
        {name: 'Tahliliy ma\'lumotlar', path: '/reservoir/water/analytics'},
        // {name: 'График', path: '/reservoir/water/schedule'},
      ]
    },
    {
      name: 'Gidrometriya',
      isActive: false,
      isOpen: false,
      children: [
        {name: 'Gidropostlar', path: '/reservoir/hydro/posts'},
        {name: 'Suv o\'lchash qurilmalar', path: '/reservoir/hydro/meter'},
        {name: 'Reykalar', path: '/reservoir/hydro/indicator'},
        // {name: 'Журнал и документы', path: '/reservoir/hydro/journal'},
        // {name: 'Контракты', path: '/reservoir/hydro/contract'},
        {name: 'Suv o\'lchash ishlar', path: '/reservoir/hydro/works'}
      ]
    },
    {
      name: 'MODSNOW',
      isActive: false,
      isOpen: false,
      children: [
        {name: 'Tezkor ma\'lumotlar', path: '/reservoir/snow/current'},
        {name: 'Ko\'p yillik ma\'lumotlar', path: '/reservoir/snow/all-time'}
      ]
    },
    {
      name: 'Ob-havo',
      path: '/reservoir/weather'
    },
    {
      name: 'Normativ hujjatlar',
      path: '/reservoir/docs',
    }
  ];

  toggleSidebar() {
    this.isSidebarVisible = true;
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
