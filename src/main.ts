import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { ViewPortModule } from 'src/app/view-port/view-port.module';
import { AppModule } from 'app/app.module';
import { environment } from './environments/environment';
import './styles/styles.scss';
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
