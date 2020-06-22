import { Postinterface } from './../../interface/post/postinterface';
import { PostService } from './../../service/postservice/post.service';

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {
  private mode = 'create';
  isloading=false
  private postid: string;
  post: Postinterface;
  constructor(
    private postservice: PostService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((params: ParamMap) => {
      if (params.has('postId')) {
        this.mode = 'edit';
        this.postid = params.get('postId');
        this.isloading=true;
        this.postservice.getPost(this.postid).subscribe(data=>{
          this.isloading=false;
          this.post={
            id:data._id,
            title:data.title,
            content:data.content
          }
        });
      } else {
        this.mode = 'create';
        this.postid = null;
      }
    });
  }
  onSavePost(f: NgForm) {
    this.isloading=true;
    if (this.mode === 'create') {
      this.postservice.addPosts(f.value.title, f.value.content);
      f.resetForm();
    }
    else{
      this.postservice.updatePost(this.postid, f.value.title, f.value.content);
    }
  }
}
