// import { Injectable } from '@angular/core';
// import { HttpCodeMessageConfig } from './models/rest-resource-code-message-config.model';
// import { HttpCodeMessage } from './models/rest-resource-code-message.model';
// import { RestVerb } from '../../enums/rest-resource-verbs.enum';
//
// @Injectable({
//   providedIn: NgxRestModule
// })
// export class HttpCodeMessageService {
//   private httpCodeMessageConfig : HttpCodeMessageConfig;
//
//   /**
//    * Loads the error code messages config.
//    * @param config
//    */
//   public load(config: string): void {
//     try {
//       this.httpCodeMessageConfig = JSON.parse(config) as HttpCodeMessageConfig;
//     }
//     catch(error) {
//       throw new Error(`Failed loading resource URL config: ${error}`);
//     }
//   }
//
//   /**
//    * Finds the corresponding error message basedon the status code,
//    * verb and the name of the resource.
//    * @param statusCode
//    * @param verb
//    * @param resourceName
//    */
//   public errorMessage(statusCode: number, verb: RestVerb, resourceName: string): HttpCodeMessage {
//     return this.httpCodeMessageConfig.resources
//         .find(x => x.resourceName === resourceName && x.httpCode === statusCode) ||
//       this.httpCodeMessageConfig.messages
//         .find(x => x.httpCode === statusCode);
//   }
// }
