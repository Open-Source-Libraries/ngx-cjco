import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RestVerb } from '../enums/rest-verbs.enum';
import { TestBed } from '@angular/core/testing';
import { ResourceUrlService } from './resource-url.service';
import { RestServiceOptions } from '../rest-service-options.model';
import { RestResourceConfig } from './models/rest-resource-config.model';
import { RestVersioningScheme } from './enums/rest-versioning-scheme.enum';
import { RestIdentifierScheme } from './enums/rest-identifier-scheme.enum';

class FakeResourceUrlService extends ResourceUrlService {
    constructor(options: RestServiceOptions) {
        super(options);
    }
}

describe('ResourceUrlService', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const validConfig: RestResourceConfig = require('../../assets/mocks/rest-resource-configs/valid.json');
  const resourceEnvironment = "local-dev";
  let sut: ResourceUrlService;

  describe('when initializing the service', () => {
    it('should be created given a valid config and resourceEnvironment', () => {
      sut = new FakeResourceUrlService({
        restResourceConfig: validConfig,
        resourceEnvironment: resourceEnvironment
      });
      expect(sut).toBeTruthy();
    });

    it('should fail when the resourceEnvironment does not exist in the config', () => {
      expect(() => {
        new FakeResourceUrlService({
          restResourceConfig: validConfig,
          resourceEnvironment: "non-existent"
        });
      }).toThrow("Environment is undefined for local-dev");
    });

    it('should fail when the resourceEnvironment is empty', () => {
      expect(() => {
        new FakeResourceUrlService({
          restResourceConfig: validConfig,
          resourceEnvironment: ""
        });
      }).toThrow("Environment is undefined for local-dev");
    });

    describe('and passing a restResourceConfig with errors', () => {
      it('should throw an exception when runningEnvironment.domain is null', () => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const invalidConfig = require('../../assets/mocks/rest-resource-configs/no-domain.json');
        expect(() => {
          sut = new FakeResourceUrlService({
            restResourceConfig: invalidConfig,
            resourceEnvironment: "no-domain"
          })
        }).toThrow('Environment must have a domain in Environment no-domain')
      });
  
      it('should throw an exception when given an endpointConfig with no resource', () => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const invalidConfig = require('../../assets/mocks/rest-resource-configs/no-resource.json');
        expect(() => {
          sut = new FakeResourceUrlService({
            restResourceConfig: invalidConfig,
            resourceEnvironment: "no-resource"
          })
        }).toThrow('Configuration does not declare the resource');
      });

      it('should throw an exception when given an endpointConfig with no url', () => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const invalidConfig = require('../../assets/mocks/rest-resource-configs/no-url.json');
        expect(() => {
          sut = new FakeResourceUrlService({
            restResourceConfig: invalidConfig,
            resourceEnvironment: "no-url"
          })
        }).toThrow('Endpoints must specify the URL. Endpoint definition invalid for resource no-url');
      });

      it('should throw an exception when given an endpointConfig with no versions', () => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const invalidConfig = require('../../assets/mocks/rest-resource-configs/no-versions.json');
        expect(() => {
          sut = new FakeResourceUrlService({
            restResourceConfig: invalidConfig,
            resourceEnvironment: "no-versions"
          })
        }).toThrow('Endpoints must specify version explicitly if not defined in environment. Endpoint definition invalid for resource fake');
      });

      it('should throw an exception when given an endpointConfig with a context with no domain', () => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const invalidConfig = require('../../assets/mocks/rest-resource-configs/no-context-domain.json');
        expect(() => {
          sut = new FakeResourceUrlService({
            restResourceConfig: invalidConfig,
            resourceEnvironment: "no-context-domain"
          })
        }).toThrow('Error loading general endpoints. Context must have a domain for Context no-context-domain');
      });
    });
  });

  describe('when calling getEndpoint', () => {
    beforeEach(() => {
      sut = new FakeResourceUrlService({
        restResourceConfig: validConfig,
        resourceEnvironment: resourceEnvironment
      });
    });

    it('should return the correct endpointConfig matching the given resource', () => {
      const endpointConfig = sut.getEndpoint('fakeChild');
      const expectedUrl = 'http://localhost:4300/fake/:id/fakeChild/:id';

      expect(endpointConfig).toBeTruthy();
      expect(endpointConfig.resource).toBe('fakeChild');
      expect(endpointConfig.url).toBe(expectedUrl);
      expect(endpointConfig.identifierScheme).toBe(RestIdentifierScheme.Array);
      expect(endpointConfig.versions).toStrictEqual([{verb: "PATCH", value: "1.0.0"}])
    });

    it('should throw an exception when no endpointConfig matches the given resource', () => {
      expect(() => {
        sut.getEndpoint('doesNotExist');
      }).toThrow('Endpoint not configured for Resource doesNotExist');
    });
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
