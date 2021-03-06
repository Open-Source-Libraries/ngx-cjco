import { Component, Input, OnInit } from '@angular/core';
import { PizzaLogisticsService } from '../../core/services/pizza-logistics/pizza-logistics.service';
import { PizzaOrder } from '../../shared/models/pizza-order.model';

@Component({
  selector: 'rest-delivered-orders-item',
  templateUrl: './delivered-orders-item.component.html',
  styleUrls: ['./delivered-orders-item.component.scss']
})
export class DeliveredOrdersItemComponent {
  @Input() order!: PizzaOrder;

  constructor(private pizzaLogisticsService: PizzaLogisticsService) { }

  public get toppings(): string {
    if (this.order === null) {
      return ';'
    }

    if (this.order.toppings.length === 0) {
      return '';
    }

    let toppings = '';

    this.order.toppings.forEach(x => {
      const topping = this.pizzaLogisticsService.getToppingById(x);
      if (topping) {
        toppings = `${toppings} ${topping.name},`;
      }
    });

    return toppings.substring(0, toppings.length - 1);
  }

  public get driver(): string {
    let driver;

    if (this.order.driverId) {
      driver = this.pizzaLogisticsService.getDriverById(this.order.driverId);
    }

    if (!driver) {
      return '';
    }

    return `${driver.firstName} ${driver.lastName}`;
  }
}
