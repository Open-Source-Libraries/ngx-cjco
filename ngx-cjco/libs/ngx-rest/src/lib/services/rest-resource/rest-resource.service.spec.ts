import {
    HttpClientTestingModule,
    HttpTestingController,
  } from '@angular/common/http/testing';
  import { Injector } from '@angular/core';
  import { TestBed } from '@angular/core/testing';
  import { RestVerb } from '../../enums/rest-verbs.enum';
  import { RestResource } from '../../models/rest-resource.model';
  import { resource } from '../../decorators/resource.decorators';
  //import { RestResourceConfig } from '../../resource-url/models/rest-resource-config.model';
  import { ResourceUrlService } from '../../resource-url/resource-url.service';
  import { RestResourceService } from './rest-resource.service';
  import { HttpClientModule } from '@angular/common/http';
  import { RestResourceEndpoint } from '../../resource-url/models/rest-resource-endpoint.model';
  import { RestRequestOptions } from './interfaces';
  import { RestIdentifierScheme } from '../../resource-url/enums/rest-identifier-scheme.enum';
  
  class MockResourceUrlService {
    public resourceUrl(resources: string, verb: RestVerb): string {
      return 'http://test-service.com';
    }
  
    public getEndpoint(resource: string): RestResourceEndpoint {
      const endpoint = new RestResourceEndpoint();
      endpoint.resource = 'fake';
      endpoint.url = 'http://test-service.com/fake';
      return endpoint;
    }
  }

  class MockResourceUrlServiceNamed {
    public resourceUrl(resources: string, verb: RestVerb): string {
      return 'http://test-service.com';
    }
  
    public getEndpoint(resource: string): RestResourceEndpoint {
      const endpoint = new RestResourceEndpoint();
      endpoint.resource = 'fake';
      endpoint.url = 'http://test-service.com/fake/name';
      endpoint.identifierScheme = RestIdentifierScheme.Named;
      return endpoint;
    }
  }
  
  @resource('fake')
  class Fake extends RestResource<Fake> {
    public id = 123;
    public name = "";
    public data = "";
  
    public fromJson(json: Fake | Fake[]): Fake | Fake[] {
      if (Array.isArray(json)) {
        return json.map(this.fromJson) as Fake[];
      }
  
      const result = new Fake();
      Object.assign(result, json);
      return result;
    }
  }

  class FakeNoResource extends RestResource<FakeNoResource> {
    public id = 123;
    public name = "";
    public data = "";
  
    public fromJson(json: Fake | Fake[]): Fake | Fake[] {
      if (Array.isArray(json)) {
        return json.map(this.fromJson) as Fake[];
      }
  
      const result = new FakeNoResource();
      Object.assign(result, json);
      return result;
    }
  }
  
  export class FakeRestService extends RestResourceService<Fake> {
    constructor(injector: Injector) {
      super(Fake, injector);
    }
  }

  export class FakeRestServiceNoResource extends RestResourceService<FakeNoResource> {
    constructor(injector: Injector) {
      super(FakeNoResource, injector);
    }
  }
  
  describe('HttpResourcesService', () => {
    let httpMock: HttpTestingController;
    //let resourceServiceMock: ResourceUrlService;
    let service: FakeRestService;
    //let clients: HttpClient;
    const fakeResource = new Fake();
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule, HttpClientTestingModule],
        providers: [
          { provide: ResourceUrlService, useClass: MockResourceUrlService },
        ],
      });
      httpMock = TestBed.inject(HttpTestingController);
      //resourceServiceMock = TestBed.inject(ResourceUrlService);
      //clients = TestBed.inject(HttpClient);
      service = new FakeRestService(TestBed);
    });
  
    afterEach(() => {
      httpMock.verify();
    });
  
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    describe('when constructor is called', () => {
      it('should fail when no resoucre name is provided', () => {
        const fakeResource = new FakeNoResource();
        expect(() => {new FakeRestServiceNoResource(TestBed)}).toThrow(Error);
      })
    })
  
    describe('when the service is called', () => {
      it('should make a GET request when the list method is invoked', () => {
        service.list().subscribe(response => {
          expect(response).toBeTruthy();
        });
  
        const fakeResponse = httpMock.expectOne(`http://test-service.com/fake`);
  
        expect(fakeResponse.request.method).toBe(RestVerb.Get);
        fakeResponse.flush({});
      });
  
      it('should make a POST request when the create method is invoked', () => {
        service.create(fakeResource).subscribe(response => {
          expect(response).toBeTruthy();
        });
  
        const fakeResponse = httpMock.expectOne(`http://test-service.com/fake`);
  
        expect(fakeResponse.request.method).toBe(RestVerb.Post);
        fakeResponse.flush({});
      });
  
      it('should make a GET request when the read method is invoked', () => {
        service.read(123).subscribe(response => {
          expect(response).toBeTruthy();
        });
  
        const fakeResponse = httpMock.expectOne(
          `http://test-service.com/fake/${fakeResource.id}`
        );
  
        expect(fakeResponse.request.method).toBe(RestVerb.Get);
        fakeResponse.flush({});
      });
  
      it('should make a single call when the update method is invoked', () => {
        service.update(fakeResource).subscribe(response => {
          expect(response).toBeTruthy();
        });
  
        const fakeResponse = httpMock.expectOne(
          `http://test-service.com/fake/${fakeResource.id}`
        );
  
        expect(fakeResponse.request.method).toBe(RestVerb.Put);
        fakeResponse.flush({});
      });
  
      it('should make a single call when the delete method is invoked', () => {
        service.delete(fakeResource).subscribe(response => {
          console.log(response);
        })
  
        const fakeResponse = httpMock.expectOne(
          `http://test-service.com/fake/${fakeResource.id}`
        );
  
        expect(fakeResponse.request.method).toBe(RestVerb.Delete);
        fakeResponse.flush({});
      });
    });
  
    describe('When reading', () => {
      it('should return an object based on the ID', () => {
        service.read(123).subscribe(response => {
          expect(response).toBeTruthy();
  
          response = response as Fake;
          expect(response.id).toBe(123);
        });
  
        const fakeResponse = httpMock.expectOne(
          `http://test-service.com/fake/${fakeResource.id}`
        );
  
        expect(fakeResponse.request.method).toBe(RestVerb.Get);
        fakeResponse.flush({});
      });
  
      it('should append the query params from options', () => {
        const options : RestRequestOptions<Fake> = {
          queryParams : {
            name: "fakeName"
          },
          //identifierParams : [123],
        };
  
        service.read(123, options).subscribe(response => {
          expect(response).toBeTruthy();
        });
  
        const fakeResponse = httpMock.expectOne(
          `http://test-service.com/fake/${fakeResource.id}?name=fakeName`
        );
  
        expect(fakeResponse.request.method).toBe(RestVerb.Get);
        fakeResponse.flush({});
      });

      //New Tests

      it('should fail when trailing slash in URL', () => {
        const options : RestRequestOptions<Fake> = {
          queryParams : {
            name: null
          },
        };

        expect(() => {service.read('123/', options).subscribe()}).toThrow(Error);
      });

      //Need to override provider to test this
      describe('named identifier', () => {

         TestBed.overrideProvider(ResourceUrlService, {useValue: MockResourceUrlServiceNamed});
        // service = new FakeRestService(TestBed);
        // resourceServiceMock = TestBed.inject(ResourceUrlService);

        it('should append the identifier params for named identifier from options', () => {
          const options : RestRequestOptions<Fake> = {
            namedIdentifierParams: {
              name: "fakeName"
            }
          };

          service.list(options).subscribe(response => {
            expect(response).toBeTruthy();
          });

          const fakeResponse = httpMock.expectOne(`http://test-service.com/fake/fakeName`);
  
          expect(fakeResponse.request.method).toBe(RestVerb.Get);
          fakeResponse.flush({});
        });
      })

      //Need to create another mock URL service to test this and override providers methods
      describe('identifier param', () => {
       it('should append the identifier params for Array identifier from options', () => {
         const options : RestRequestOptions<Fake> = {
           identifierParams: ['id']
         };

         service.list(options).subscribe(response => {
           expect(response).toBeTruthy();
         });

         const fakeResponse = httpMock.expectOne(`http://test-service.com/fake/id`);
 
         expect(fakeResponse.request.method).toBe(RestVerb.Get);
         fakeResponse.flush({});
       });
     })
    });
  });
  