import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms.component';
import { RoomsAddComponent } from './rooms-add/rooms-add.component';
import { RoomsListComponent } from './rooms-list/room-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderModule } from '../header/header.module';
import { RoomsBookingComponent } from './rooms-booking/rooms-booking.component';
import { RouteConfigToken } from 'src/services/routeConfig.service';
import { FilterPipe } from './filter.pipe';



@NgModule({
  declarations: [
    RoomsComponent,
    RoomsAddComponent,
    RoomsListComponent,
    RoomsBookingComponent,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    FormsModule,
    HeaderModule,
    ReactiveFormsModule
    
  ],
  providers:[
    {
      provide:RouteConfigToken,
      useValue:{
        title:'Rooms'
      }
    }
  ]
})
export class RoomsModule { }