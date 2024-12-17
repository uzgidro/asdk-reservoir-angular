import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
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
    NgIf,
    NgForOf,
    RouterLinkActive,
    RouterLink
  ],
  standalone: true

})
export class MainLayoutComponent implements OnInit {
  isSidebarVisible = false
  currentUrl: string = ''
  selectedReservoir: string | undefined

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
      path: '/water',
      children: [
        {name: 'Kunlik ma\'lumotlar', path: '/current'},
        {name: 'O\'n kunlik ma\'lumotlar', path: '/decade'},
        {name: 'Oylik ma\'lumotlar', path: '/month'},
        {name: 'Ko\'p yillik ma\'lumotlar', path: '/year'},
        {name: 'Sath-xajm', path: '/lv'},
        {name: 'Filterlash', path: '/filter'},
        {name: 'Tahliliy ma\'lumotlar', path: '/analytics'},
        // {name: 'График', path: '/schedule'},
      ]
    },
    {
      name: 'Gidrometriya',
      isActive: false,
      isOpen: false,
      path: '/hydro',
      children: [
        {name: 'Gidropostlar', path: '/posts'},
        {name: 'Suv o\'lchash qurilmalar', path: '/meter'},
        {name: 'Reykalar', path: '/indicator'},
        // {name: 'Журнал и документы', path: '/journal'},
        // {name: 'Контракты', path: '/contract'},
        {name: 'Suv o\'lchash ishlar', path: '/works'}
      ]
    },
    {
      name: 'MODSNOW',
      isActive: false,
      isOpen: false,
      path: '/snow',
      children: [
        {name: 'Tezkor ma\'lumotlar', path: '/current'},
        {name: 'Ko\'p yillik ma\'lumotlar', path: '/all-time'}
      ]
    },
    {
      name: 'Ob-havo',
      path: '/weather'
    },
    {
      name: 'Elspluatatsiya qoidalari',
      path: '/rules',
    },
    {
      name: 'Normativ hujjatlar',
      path: '/docs',
    },
  ];


  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects; // Получаем актуальный URL
      }
    });
    this.activatedRoute.queryParams.subscribe({
      next: value => {
        this.selectedReservoir = value['reservoir']
      }
    })
  }


  toggleSidebar() {
    this.isSidebarVisible = true;
  }

  selectItem(item: MenuItem): void {
    if (!item.children) {
      this.resetActivity(this.menuItems);
    }
    if (!item.children) {
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
