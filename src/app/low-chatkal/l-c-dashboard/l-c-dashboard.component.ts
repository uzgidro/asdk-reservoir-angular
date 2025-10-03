import {Component, OnInit} from '@angular/core';
import {GalleriaModule} from "primeng/galleria";
import {CardWrapperComponent} from "../../shared/component/card-wrapper/card-wrapper.component";
import {CardHeaderComponent} from "../../shared/component/card-header/card-header.component";
import {ReservoirAnalyticsComponent} from "../../reservoir/reservoir-analytics/reservoir-analytics.component";

@Component({
  selector: 'app-l-c-dashboard',
  standalone: true,
  imports: [
    CardWrapperComponent,
    CardHeaderComponent,
    GalleriaModule,
    ReservoirAnalyticsComponent,
  ],
  templateUrl: './l-c-dashboard.component.html',
  styleUrls: ['./l-c-dashboard.component.css']
})
export class LCDashboardComponent implements OnInit {
  images: any[] | undefined;

  ngOnInit() {
    // В реальном приложении пути к изображениям будут вести на ваши файлы в /assets
    this.images = [
      {
        itemImageSrc: 'assets/img/ges.png',
        alt: 'GES',
      },
      {
        itemImageSrc: 'assets/img/promiv.png',
        alt: 'Promiv',
      },
      {
        itemImageSrc: 'assets/img/sbros.png',
        alt: 'Sbros',
      }
    ];
  }
}
