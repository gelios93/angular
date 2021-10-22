import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { OrdersService } from './api/orders.service';
import { UsersService } from './api/users.service';

@NgModule({
  declarations: [],
  imports: [ HttpClientModule ],
  providers: [
    OrdersService,
    UsersService
  ]
})
export class CoreModule { }
