import { Component, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PizzaOrder } from '../../shared/models/pizza-order.model';

@Component({
  selector: 'rest-delivered-orders',
  templateUrl: './delivered-orders.component.html',
  styleUrls: ['./delivered-orders.component.scss']
})
export class DeliveredOrdersComponent {
  @Input() orders$!: Observable<PizzaOrder[]>;

  private subscriptions = new Subscription();
}
