import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Order } from '../models/order/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('https://pnitfunctions.azurewebsites.net/api/GetOrders').pipe(
      map((orders: any[]) => orders.map((order: any) => new Order(order.name, order.category, order.price))),
      filter((orders: Order[]) => !!orders),
      tap((orders: Order[]) => {
        localStorage.setItem('ordersCount', orders.length.toString());
        console.log('Recieved orders:', orders);
      })
    );
  }
}
