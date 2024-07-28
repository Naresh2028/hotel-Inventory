import { Component, OnInit } from '@angular/core';
import { RoomList } from '../room';
import { RoomsService } from '../services/rooms.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'hinv-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.scss'],
})
export class RoomsAddComponent implements OnInit {
  room: RoomList = {
    roomType: '',
    amenities: '',
    checkInTime: new Date(),
    checkOutTime: new Date(),
    photos: '',
    price: 0,
    rating: 0,
  };

  successMessage: string = '';

  constructor(private roomService: RoomsService) {}

  ngOnInit(): void {}

  AddRoom(roomForms: NgForm) {
    this.roomService.addRoom(this.room).subscribe((data) => {
      this.successMessage = 'rooms added successfully';
      roomForms.resetForm({
        roomType: '',
        amenities: '',
        checkInTime: new Date(),
        checkOutTime: new Date(),
        photos: '',
        price: 0,
        rating: 0,
      });
    });
  }
}
