import { mimeType } from './../../validator/file/mimevalidator';
import { Postinterface } from './../../interface/post/postinterface';
import { PostService } from './../../service/postservice/post.service';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {
  private mode = 'create';
  isloading = false;
  private postid: string;
  post: Postinterface;
  imagePerview: string;
  form: FormGroup;
  constructor(
    private postservice: PostService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, { validators: Validators.required }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });
    this.router.paramMap.subscribe((params: ParamMap) => {
      if (params.has('postId')) {
        this.mode = 'edit';
        this.postid = params.get('postId');
        this.isloading = true;
        this.postservice.getPost(this.postid).subscribe((data) => {
          this.isloading = false;
          this.post = {
            id: data._id,
            title: data.title,
            content: data.content,
            imagePath: data.imagePath,
          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            image: this.post.imagePath,
          });
        });
      } else {
        this.mode = 'create';
        this.postid = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePerview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {
    this.isloading = true;
    if (this.mode === 'create') {
      this.postservice.addPosts(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    } else {
      this.postservice.updatePost(
        this.postid,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    }
    this.form.reset();
  }
}
