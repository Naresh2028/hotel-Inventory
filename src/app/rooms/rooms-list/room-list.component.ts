import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Room, RoomList } from '../room';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'hinv-rooms-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
  //changeDetection:ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnInit, OnChanges,OnDestroy {

  @Input() rooms:RoomList[] = [];

  @Input() title: string = '';

  @Input() price = 0;

  @Output() selectedRoom = new EventEmitter<RoomList>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);

    if(changes['title'])
      {
        this.title = changes['title'].currentValue.toUpperCase();
      }
  }

  ngOnInit(): void {
  }

  selectRoom(room:RoomList){
    this.selectedRoom.emit(room);
  }

  ngOnDestroy() {
    console.log('the component was destroyed');
  }

}
