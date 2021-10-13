import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RestVerb } from '../enums/rest-verbs.enum';
import { TestBed } from '@angular/core/testing';
import { ResourceUrlService } from './resource-url.service';
import { RestServiceOptions } from '../rest-service-options.model';
import { RestResourceConfig } from './models/rest-resource-config.model';
import { RestVersioningScheme } from './enums/rest-versioning-scheme.enum';

class FakeResourceUrlService extends ResourceUrlService {
    constructor(options: RestServiceOptions) {
        super(options);
    }
}

describe('ResourceUrlService', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const endpointConfig: RestResourceConfig = require('../../assets/mocks/default-restResourceConfig.json');
  const resourceEnvironment = "local-dev";
  let sut: ResourceUrlService;
  beforeEach(() => {
    sut = new FakeResourceUrlService({restResourceConfig: endpointConfig, resourceEnvironment: resourceEnvironment});
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  it('should fail when resourceEnvironment is invalid', () => {
    expect(() => {
      new FakeResourceUrlService({
        restResourceConfig: endpointConfig,
        resourceEnvironment: "non-existent"
      })
    }).toThrow("Environment is undefined for local-dev");
  });

  /*describe('when retrieving a configuration URI for environment local-dev', () => {
    xit('should return the specific version for a given verb if defined', () => {
      //environment.resourceEnvironment = 'local-dev';

      //const resultUri = sut.resourceUrl('ResourceOne', RestVerb.Get);
      //const resultUri = 'sut.resourceUrl('ResourceOne', RestVerb.Get);'

      //expect(resultUri.endpoint).toEqual(`${BaseUri}/ones`);
    });

    xit('should return the default version for a given verb if undefined', () => {
      //environment.resourceEnvironment = 'local-dev';

      //const resultUri = sut.resourceUrl('ResourceOne', RestVerb.Post);

      //expect(resultUri.endpoint).toEqual(`${BaseUri}/ones`);
    });

    xit('should return undefined for the URI if the configuration is incorrect', () => {
      //environment.resourceEnvironment = 'local-dev';

      //const resultUri = sut.resourceUrl('Something', RestVerb.Get);

      //expect(resultUri).toEqual(undefined);
    });
  });

  describe('when retrieving a configuration URI for environment local-mock', () => {
    xit('should return the specific version for a given verb if defined', () => {
      //environment.resourceEnvironment = 'local-mock';

      ////const resultUri = sut.resourceUrl('ResourceOne', RestVerb.Get);

      //expect(resultUri.endpoint).toEqual(`${BaseUri}/ones`);
    });

    xit('should return the default version for a given verb if undefined', () => {
      //environment.resourceEnvironment = 'local-mock';

      //const resultUri = sut.resourceUrl('ResourceOne', RestVerb.Post);

      //expect(resultUri.endpoint).toEqual(`${BaseUri}/ones`);
    });

    xit('should return undefined for the URI if the configuration is incorrect', () => {
     // environment.resourceEnvironment = 'local-mock';

     /// const resultUri = sut.resourceUrl('Something', RestVerb.Get);

      //expect(resultUri).toEqual(undefined);
    });
  });*/
});
