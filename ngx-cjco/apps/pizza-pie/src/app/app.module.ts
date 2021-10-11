import { MatSidenavModule } from '@angular/material/sidenav';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { PizzaDashboardModule } from './pizza-dashboard/pizza-dashboard.module';
import { PizzaLogisticsModule } from './pizza-logistics/pizza-logistics.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    PizzaDashboardModule,
    MatSidenavModule,
    PizzaLogisticsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
