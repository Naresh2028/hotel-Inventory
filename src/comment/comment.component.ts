import { Component, OnInit } from '@angular/core';
import { Comments} from './comment';
import { CommentService } from './comment.service';
import { ActivatedRoute } from '@angular/router';
import { map, pluck } from 'rxjs';
import { Comment } from '@angular/compiler';

@Component({
  selector: 'hinv-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {



  comments$ = this.commenService.getComments(); 

  comment$ = this.activatedRoute.data.pipe(pluck('comments'));

  comment : Comments[] = [];

  constructor(private commenService:CommentService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) =>{
      this.comment = data['comments'];
    })
  }



}
