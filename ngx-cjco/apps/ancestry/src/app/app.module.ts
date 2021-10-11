import { NgModule } from '@angular/core';

import { AppRoutingModule } from './rest-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import * as EndpointsFile from '../assets/config/resource-endpoints.json';
import { CoreModule } from './core/core.module';
import { environment } from '../environments/environment';
import { RestModule, RestResourceConfig } from '@ngx-cjco/ngx-rest';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    NoopAnimationsModule,
    MatSnackBarModule,
    // RestModule.forRoot((EndpointsFile as any).default as RestResourceConfig, environment.resourceEnvironment),
    RestModule.forRoot({
      resourceEnvironment: environment.resourceEnvironment,
      restResourceConfig: (EndpointsFile as any).default as RestResourceConfig
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
