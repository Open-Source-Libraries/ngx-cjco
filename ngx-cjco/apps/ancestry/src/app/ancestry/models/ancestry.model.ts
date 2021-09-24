import { Parent } from './parent.model';
import { resource, RestResource } from '@rest/rest';

@resource('ancestry')
export class Ancestry extends RestResource<Ancestry> {
  public id: string;
  public name: string;
  public parents: Parent[];

  public get ancestryName() {
    return this.name;
  }

  public fromJson(json: Ancestry | Ancestry[]): Ancestry | Ancestry[] {
    if (Array.isArray(json)) {
      return  json.map(this.fromJson) as Ancestry[];
    }

    const result = new Ancestry();
    const { parents } = json;
    json.parents = new Parent().fromJson(parents) as Parent[];
    Object.assign(result, json);
    return result;
  }
}
