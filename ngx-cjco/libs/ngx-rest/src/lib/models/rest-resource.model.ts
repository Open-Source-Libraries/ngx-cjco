export abstract class RestResource<T, IdType extends number | string = number | string> {
  public abstract get id(): IdType;
  protected constructor(object?: Partial<T>) {
    Object.assign(this, object);
  }

  public abstract fromJson(json: T | T[]): T | T[];

  public hasSameId?(item: RestResource<T>): boolean {
    return item && item.id === this.id;
  }
}
