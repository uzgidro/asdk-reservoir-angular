import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {MessageService} from 'primeng/api';
import {Chart, registerables} from 'chart.js';
import {FormsModule} from "@angular/forms";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(FormsModule),
    MessageService,
    {
      provide: 'ChartSetup', useFactory: () => Chart.register(...registerables)
    }
  ]
};