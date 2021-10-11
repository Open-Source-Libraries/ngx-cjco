import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Grandchild } from '../models/grandchild.model';
import { AncestryManagementService } from '../services/ancestry.management.service';

@Component({
  selector: 'rest-grandchild',
  templateUrl: './grandchild.component.html',
  styleUrls: ['./grandchild.component.scss']
})
export class GrandchildComponent implements OnInit {
  @Input() grandchild: Grandchild;
  public ancestryForm: FormGroup;

  public constructor(private fb: FormBuilder, private service: AncestryManagementService) { }

  public ngOnInit(): void {
    this.initializeForm();
  }

  public updateName(): void {
    this.grandchild.contact.name = this.ancestryForm.controls.name.value;
    this.service.saveGrandchild(this.grandchild);
  }

  private initializeForm(): void {
    this.ancestryForm = this.fb.group({
        name: [this.grandchild.contact.fullName]
      }
    );
  }
}
