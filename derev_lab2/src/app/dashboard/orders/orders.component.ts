import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { Order } from 'src/app/models/order.model';
import { OrdersService } from 'src/app/core/api/orders.service';
import { UsersService } from 'src/app/core/api/users.service';
import { User } from 'src/app/models/user.model';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-orders',
  templateUrl: './ngx-orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[];
  isLoading = false;

  constructor(private ordersService: OrdersService,
              private usersService: UsersService,
              private loadingService: LoadingService) {
  }

  ngOnInit() {
    this.isLoading = true;
    // this.loadingService.setLoadingState(true);

    this.usersService.currentUser
      .subscribe((user: User) => console.log('currentUser', user));

    // this.ordersService.getOrders()
    //   .subscribe((orders: Order[]) => this.orders = orders);

    forkJoin(
      this.ordersService.getOrders(),
      this.usersService.getUserName()
    ).subscribe(([orders, userName]) => {
      this.orders = orders;
      this.isLoading = false;

      this.loadingService.setLoadingState(false);

      console.log('Orders:', orders);
      console.log('UserName:', userName);
    });
  }
}
