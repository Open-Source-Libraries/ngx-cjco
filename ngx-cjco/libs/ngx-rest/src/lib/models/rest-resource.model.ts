
export abstract class RestResource<T, IdType extends number | string = number | string> {
  public abstract get id(): IdType;
  public constructor(object?: Partial<T>,) {
  }

  public abstract fromJson(json: T | T[]): T | T[]
  // public fromJson(json: T | T[]): T | T[] {
  //   if (Array.isArray(json)) {
  //     return json.map(this.fromJson) as T[];
  //   }
  //
  //   Object.getOwnPropertyNames(json).forEach((name) => {
  //     if (json[name] instanceof RestResource) {
  //
  //     }
  //   })
  // }

  public hasSameId?(item: RestResource<T>): boolean {
    return item && item.id === this.id;
  }
}
