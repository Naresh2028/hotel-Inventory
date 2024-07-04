import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { Room, RoomList } from './room';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { Observable, Subject, Subscription, catchError, map, of, retry } from 'rxjs';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked {

  hotelName: string = 'Hilton Hotel';

  numberOfRooms: number = 10;

  hideRoom: boolean = true;

  title: string = 'Room List';

  stream = new Observable(observer => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
  });





  selectedRoom!: RoomList;

  @ViewChild(HeaderComponent, { static: false }) headerComponent: HeaderComponent = new HeaderComponent;

  @ViewChildren(HeaderComponent) headerChildernComponenet!: QueryList<HeaderComponent>

  subscription!: Subscription;

  error$ = new Subject<string>;

  getErrors$ = this.error$.asObservable();

  roomsCount$ = this.roomsService.getRooms$.pipe(
    map((rooms) => rooms.length)
  );

  rooms$ = this.roomsService.getRooms$.pipe(
    (catchError(
      (err: string) => {
        //console.log(err);
        this.error$.next(err);
        return of([])
      })
    )

  );



  


  constructor(@SkipSelf() private roomsService: RoomsService) { }



  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5
  }

  roomList: RoomList[] = [];

  totalBytes = 0;

  ngOnInit(): void {

   

    this.roomsService.getPhotos().subscribe(
      (event) => {
        switch (event.type) {
          case HttpEventType.Sent: {
            console.log('Request has been made');
            break;
          }
          case HttpEventType.ResponseHeader: {
            console.log('Request success!')
            break;
          }
          case HttpEventType.DownloadProgress: {
            this.totalBytes += event.loaded;
            break;
          }
          case HttpEventType.Response: {
            console.log(event.body);
          }
        }
      }
    );



    this.stream.subscribe({
      next: (data) => console.log(data),
      complete: () => console.log('completed'),
      error: (err: string) => console.log(err)
    });

    this.stream.subscribe(data => {
      console.log(data)
    });

    // this.roomsService.getRooms().subscribe(rooms => {
    //   this.roomList = rooms;
    // });

    //  this.roomsService.getRooms$.subscribe(
    //     (data) => {
    //       this.roomList = data
    //     });

  }



  ngDoCheck() {
    console.log('changes are detected');
  }

  ngAfterViewInit() {
    this.headerComponent.title = "Rooms View";

    this.headerChildernComponenet.last.title = "Last Title";
    //this.headerChildernComponenet.first.title = "Last Title";

  }

  ngAfterViewChecked() {
    //this.headerComponent.title = "Rooms View";
  }

  toggle() {
    this.hideRoom = !this.hideRoom;
    this.title = 'Rooms List';
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;

  }

  addRoom() {
    const room: RoomList = {
      roomNumber: '4',
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner,Free Wi-fi,TV,Bathroom,Kitchen',
      price: 500,
      photos: 'https://pixabay.com/photos/chrysanthemum-flower-purple-flower-8206709/',
      checkInTime: new Date('11-Nov-2021'),
      checkOutTime: new Date('12-Nov-2021'),
      rating: 4.5
    };

    //this.roomList.push(room);

    //this.roomList = [...this.roomList,room];

    this.roomsService.addRoom(room).subscribe((data) => { this.roomList = data });


  }

  editRoom() {
    const room: RoomList = {
      roomNumber: '1',
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner,Free Wi-fi,TV,Bathroom,Kitchen',
      price: 500,
      photos: 'https://pixabay.com/photos/chrysanthemum-flower-purple-flower-8206709/',
      checkInTime: new Date('11-Nov-2021'),
      checkOutTime: new Date('12-Nov-2021'),
      rating: 4.5
    };

    this.roomsService.editRoom(room).subscribe(
      (data) => { this.roomList = data }
    );
  }

  deleteRoom() {
    this.roomsService.deleteRoom('2').subscribe(
      (data) => { this.roomList = data }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
