import { Postinterface } from './../../interface/post/postinterface';
import { PostService } from './../../service/postservice/post.service';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
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
  form:FormGroup;
  constructor(
    private postservice: PostService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form=new FormGroup({
      'title':new FormControl(null,{validators: [Validators.required,Validators.minLength(3)]}),
      'content':new FormControl(null,{validators:Validators.required})
    })
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
          this.form.setValue({'title':this.post.title,'content':this.post.content})
        });
      } else {
        this.mode = 'create';
        this.postid = null;
      }
    });
  }
  onSavePost( ) {
    this.isloading=true;
    if(this.mode === 'create') {
      this.postservice.addPosts(this.form.value.title, this.form.value.content);

    }
    else{
      this.postservice.updatePost(this.postid, this.form.value.title, this.form.value.content);
    }
    this.form.reset();
  }
}
