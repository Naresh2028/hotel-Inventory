import { AfterContentInit, Component, ContentChild, Host, OnInit } from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
import { RoomsService } from '../rooms/services/rooms.service';
import { RoomsComponent } from '../rooms/rooms.component';

@Component({
  selector: 'hinv-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  //providers:[RoomsService]
})
export class ContainerComponent implements AfterContentInit {

  @ContentChild(EmployeeComponent) employee! : EmployeeComponent;
  
  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterContentInit() {
    console.log(this.employee);
    this.employee.empName = 'Rick';
  }

}
