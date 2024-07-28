import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanDeactivate } from '@angular/router';
import { BookingComponent } from './booking.component';
import { RoomGuard } from '../guards/room.guard';
import { BookingGuard } from './Guard/booking.guard';

const routes: Routes = [{ path: '', component: BookingComponent , canDeactivate:[BookingGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
