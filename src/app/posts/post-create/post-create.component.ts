import { PostService } from './../../service/postservice/post.service';

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {
  constructor(private postservice: PostService) {}

  ngOnInit(): void {}
  onAddPost(f: NgForm) {
    this.postservice.addPosts(f.value.title, f.value.content);
    f.resetForm();
  }
}
