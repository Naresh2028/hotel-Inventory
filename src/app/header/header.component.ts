import { ConfigService } from 'src/services/config.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hinv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private configService:ConfigService) { }

  title:string = '';

  ngOnInit(): void {
  }

}
