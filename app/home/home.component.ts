import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { OrdersService } from '../services/orders.service';
import { Order } from '../models/order/order';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  orders: Order[] | undefined;

  constructor(private authService: AuthService, private ordersService: OrdersService, private router: Router) { }

  ngOnInit(): void {
    this.ordersService.getOrders().subscribe(orders => {
      this.orders = orders;
      console.log('Orders:', orders);
    });
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
