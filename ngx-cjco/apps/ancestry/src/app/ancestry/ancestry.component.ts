import { Component, OnInit } from '@angular/core';
import { Ancestry } from './models/ancestry.model';
import { AncestryManagementService } from './services/ancestry.management.service';

@Component({
  selector: 'rest-generic-http',
  templateUrl: './ancestry.component.html',
  styleUrls: ['./ancestry.component.scss']
})
export class AncestryComponent implements OnInit {
  public ancestry: Ancestry;

  public getAncestry(): any {
    return this.ancestry;
  }

  constructor(private service: AncestryManagementService) {
  }

  public ngOnInit(): void {
    this.subscribeAncestries();
  }

  private subscribeAncestries(): void {
    // this.service.getAncestry(82041);
    this.service.getAncestry(82041).subscribe(
      data => this.ancestry = data
    );
  }
}
