import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Order } from '../models/order/order';
import { AuthService } from '../services/auth.service';
import { OrdersService } from '../services/orders.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authService: AuthService;
  let ordersService: OrdersService
  let router: Router;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['logout']);
    ordersService = jasmine.createSpyObj('OrdersService', ['getOrders']);
    let orders: Order[] = [];
    ordersService.getOrders = jasmine.createSpy().and.returnValue(of(orders));
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [
        {provide: AuthService, useValue: authService}, 
        {provide: OrdersService, useValue: ordersService}, 
        {provide: Router, useValue: router}
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get orders', () => {
    expect(component.orders).toBeTruthy();
  });

  it('should call logout method', () => {
    component.logOut();
    expect(authService.logout).toHaveBeenCalledWith();
    expect(authService.logout).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['']);
    expect(router.navigate).toHaveBeenCalledTimes(1);
  });

});
