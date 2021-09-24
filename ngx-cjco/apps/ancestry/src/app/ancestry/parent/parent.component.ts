import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ancestry } from '../models/ancestry.model';
import { Parent } from '../models/parent.model';
import { AncestryManagementService } from '../services/ancestry.management.service';

@Component({
  selector: 'rest-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {
  @Input() parent: Parent;
  @Input() ancestry: Ancestry;
  public ancestryForm: FormGroup;

  public constructor(private fb: FormBuilder, private service: AncestryManagementService) { }

  public ngOnInit(): void {
    this.initializeForm();
  }

  public getParent(): Parent {
    return this.parent;
  }

  public updateName(): void {
    this.parent.contact.name = this.ancestryForm.controls.name.value;
    this.service.saveParent(this.ancestry.id, this.parent);
  }

  private initializeForm(): void {
    this.ancestryForm = this.fb.group({
        name: [this.parent.contact.fullName]
      }
    );
  }
}
