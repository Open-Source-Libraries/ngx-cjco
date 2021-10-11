import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Child } from '../models/child.model';
import { Parent } from '../models/parent.model';
import { AncestryManagementService } from '../services/ancestry.management.service';

@Component({
  selector: 'rest-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {
  @Input() child: Child;
  @Input() parent: Parent;
  public ancestryForm: FormGroup;

  public constructor(private fb: FormBuilder, private service: AncestryManagementService) { }

  public ngOnInit(): void {
    this.initializeForm();
    this.service.getGrandchildren(this.child.id);
  }

  public updateName(): void {
    this.child.contact.name = this.ancestryForm.controls.name.value;
    this.service.saveChild(this.child);
  }

  private initializeForm(): void {
    this.ancestryForm = this.fb.group({
        name: [this.child.contact.fullName]
      }
    );
  }
}
