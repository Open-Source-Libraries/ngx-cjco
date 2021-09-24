import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestResourceService } from './services';

import { RestServiceOptions } from './rest-service-options.model';
import { ResourceUrlService, RestResourceConfig } from './resource-url';

export { ResourceUrlService };
export { RestServiceOptions };

@NgModule({
  imports: [CommonModule],
  providers: [
    ResourceUrlService
  ]
})
export class NgxRestModule {
  public static forRoot(restModuleOptions: RestModuleOptions): ModuleWithProviders<NgxRestModule> {
    // resourceConfig.resourceEnvironment = resourceEnvironment;
    return ({
      ngModule: NgxRestModule,
      providers: [
        {
          provide: FOR_ROOT_REST_MODULE_OPTIONS_TOKEN,
          useValue: restModuleOptions
        },
        {
          provide: RestServiceOptions,
          useFactory: provideRestModuleOptions,
          deps: [ FOR_ROOT_REST_MODULE_OPTIONS_TOKEN ]
        }
      ]
    })
  }
}

export interface RestModuleOptions {
  restResourceConfig: RestResourceConfig;
  resourceEnvironment: string;
}

export const FOR_ROOT_REST_MODULE_OPTIONS_TOKEN = new InjectionToken<RestModuleOptions>("forRoot() RestResourceUrl configuration");

export function provideRestModuleOptions(restModuleOptions?: RestModuleOptions): RestServiceOptions {
  const options = new RestServiceOptions();

  if (restModuleOptions) {
    options.restResourceConfig = restModuleOptions?.restResourceConfig;
    options.resourceEnvironment = restModuleOptions?.resourceEnvironment;
  }

  return options;
}
