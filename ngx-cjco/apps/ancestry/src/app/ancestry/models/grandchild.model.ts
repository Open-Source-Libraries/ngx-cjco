import { Contact } from './contact.model';
import { resource, RestResource } from '@rest/rest';

@resource('grandchild')
export class Grandchild extends RestResource<Grandchild> {
  public id: string;
  public contact: Contact;

  public fromJson(json: Grandchild | Grandchild[]): Grandchild | Grandchild[] {
    if (Array.isArray(json)) {
      return  json.map(this.fromJson) as Grandchild[];
    }

    const result = new Grandchild();
    const { contact } = json;
    json.contact = new Contact().fromJson(contact) as Contact;
    Object.assign(result, json);
    return result;
  }
}
