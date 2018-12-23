import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  // posts = [
  //   {title: 'First post', content: 'This is First Post'},
  //   {title: 'Second post', content: 'This is Second Post'},
  //   {title: 'Third post', content: 'This is Third Post'}

  // ];
  
  posts: Post[] = [];
  private postsSub: Subscription; 

  constructor(public postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts:Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}