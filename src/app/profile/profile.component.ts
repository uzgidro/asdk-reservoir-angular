import { Component } from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MenuItem} from "../shared/interfaces";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLinkActive,
    RouterOutlet,
    RouterLink,
    NgClass
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  hidden = false

  toggleMenu() {
    this.hidden = !this.hidden
  }

  menuItems: MenuItem[] = [
    {
      name: 'Главная',
      path: '/profile',
    },
    {
      name: 'Заснеженность',
      path: '/profile/modsnow'
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
