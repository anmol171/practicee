import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  // posts = [
  //   {title: 'First post', content: 'This is First Post'},
  //   {title: 'Second post', content: 'This is Second Post'},
  //   {title: 'Third post', content: 'This is Third Post'}
    
  // ];
  @Input() posts: Post[] = [];
  constructor() { }

  ngOnInit() {
  }

}
