import { Inject, Injectable } from '@angular/core';
import { RoomList } from '../room';
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { APP_SERVICE_CONFIG } from 'src/app/appConfig/appconfig.service';
import { shareReplay } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  roomList: RoomList[] = [];




  getRooms$ = this.httpClient.get<RoomList[]>('/api/rooms').pipe(shareReplay(1));

  constructor( private httpClient: HttpClient) {
    console.log('Rooms Service Initialized');

  }

  //GET
  getRooms() {
    return this.httpClient.get<RoomList[]>('/api/rooms');
  }

  //POST
  addRoom(room: RoomList) {
    return this.httpClient.post<RoomList[]>('/api/rooms', room);
  }

  editRoom(room: RoomList) {
    return this.httpClient.put<RoomList[]>(`api/rooms/${room.roomNumber}`, room);
  }

  deleteRoom(id: string) {
    return this.httpClient.delete<RoomList[]>(`api/rooms/${id}`);
  }

  getPhotos() {
    const request = new HttpRequest(
      'GET',
      `https://jsonplaceholder.typicode.com/photos`,
      {
        reportProgress: true
      }
    );
    return this.httpClient.request(request);
  }
}
