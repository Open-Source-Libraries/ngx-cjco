// export class RestUrlOptions {
//   public header: { [key: string]: number; } | undefined;
//   public params: { [key: string]: number; } | undefined;
//
//   public get queryString(): string {
//     if (this.params?.length === 0) {
//       return '';
//     }
//
//     return Object.keys(this.params).map((key) => {
//       return `${encodeURIComponent(key)}=${encodeURIComponent(this.params[key])}`;
//     }).join('&');
//   }
// }
