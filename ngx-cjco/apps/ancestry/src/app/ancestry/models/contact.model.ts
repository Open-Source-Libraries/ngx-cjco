import { resource, RestResource } from '@ngx-cjco/ngx-rest';

@resource('contact')
export class Contact extends RestResource<Contact> {
  public id: string;
  public firstName: string;
  public lastName: string;

  public fromJson(json: Contact): Contact | Contact[] {
    if (Array.isArray(json)) {
      return  json.map(this.fromJson) as Contact[];
    }

    const result = new Contact();
    Object.assign(result, json);
    return result;
  }

  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public set name(fullName: string) {
    const names = fullName.split(' ');
    this.firstName = names[0];
    this.lastName = names[1];
  }
}
