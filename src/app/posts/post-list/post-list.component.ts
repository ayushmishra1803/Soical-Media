import { PostService } from './../../service/postservice/post.service';
import { Postinterface } from './../../interface/post/postinterface';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnDestroy {
  constructor(private postservice: PostService) {}
  isloading = false;
  totalpost = 10;
  postperpage = 2;
  pageSizeoptions = [1, 2, 5, 10];
  ngOnDestroy(): void {
    this.postsub.unsubscribe();
  }

  postsub: Subscription;
  posts: Postinterface[] = [];
  ngOnInit(): void {
    this.isloading = true;
    //this.postservice.getPosts();
    //Error in Post Return

    this.postsub = this.postservice
      .getpostupdatelistener()
      .subscribe((re: Postinterface[]) => {
        this.isloading = false;
        this.posts = re;
      });
  }
  ondelete(id: string) {
    this.postservice.deletepost(id);
  }
  onChange(event:PageEvent){

  }
}
