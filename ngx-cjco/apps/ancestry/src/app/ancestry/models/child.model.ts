import { Grandchild } from './grandchild.model';
import { Contact } from './contact.model';
import { resource, RestResource } from '@rest/rest';

@resource('child')
export class Child extends RestResource<Child> {
  public id: string;
  public grandchildren: Grandchild[];
  public contact: Contact;

  public fromJson(json: Child | Child[]): Child | Child[] {
    if (Array.isArray(json)) {
      return  json.map(this.fromJson) as Child[];
    }

    const result = new Child();
    const { grandchildren } = json;
    const { contact } = json;
    json.grandchildren = new Grandchild().fromJson(grandchildren) as Grandchild[];
    json.contact = new Contact().fromJson(contact) as Contact;
    Object.assign(result, json);
    return result;
  }
}
