import { Child } from './child.model';
import { Contact } from './contact.model';
import { resource, RestResource } from '@ngx-cjco/ngx-rest';

@resource('parent')
export class Parent extends RestResource<Parent> {
  public id: string;
  public children: Child[];
  public contact: Contact;

  public fromJson(json: Parent | Parent[]) {
    if (Array.isArray(json)) {
      return json.map(this.fromJson) as Parent[];
    }

    const result = new Parent();
    const { children } = json;
    const { contact } = json;
    json.children = new Child().fromJson(children) as Child[];
    json.contact = new Contact().fromJson(contact) as Contact;

    Object.assign(result, json);
    return result;
  }
}
