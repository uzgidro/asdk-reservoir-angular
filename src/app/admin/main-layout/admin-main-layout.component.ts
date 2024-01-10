import {Component} from '@angular/core';
import {MenuItem} from "../../shared/interfaces";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-main-layout',
  templateUrl: './admin-main-layout.component.html',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf,
    RouterLink,
    NgClass,
    NgIf,
    RouterLinkActive,
    RouterOutlet
  ],
  styleUrl: './admin-main-layout.component.css'
})
export class AdminMainLayoutComponent {
  hidden = false

  toggleMenu() {
    this.hidden = !this.hidden
  }

  menuItems: MenuItem[] = [
    {
      name: 'Заснеженность',
      path: '/admin/modsnow'
    },
    {
      name: 'Срочные данные',
      path: '/admin/water/current'
    },
    {
      name: 'Измерительные работы',
      path: '/admin/hydro/works'
    },
    {
      name: 'Выйти',
      path: '/region'
    }
  ];

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
