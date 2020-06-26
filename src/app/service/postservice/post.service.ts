import { Postinterface } from './../../interface/post/postinterface';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private post: Postinterface[] = [];
  private postupdates = new Subject<Postinterface[]>();

  getPosts() {
    this.hhtp
      .get<{ message: string; post: any }>('http://localhost:3000/api/posts')
      .pipe(
        map((postData) => {
          return postData.post.map((post) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              imagePath:post.imagePath

            };
          });
        })
      )
      .subscribe((transformedpost) => {
        this.post = transformedpost;
        this.postupdates.next([...this.post]);
      });
  }
  getpostupdatelistener() {
    return this.postupdates.asObservable();
  }
  addPosts(title, content,image : File) {
    const postData=new FormData();
    postData.append("title",title)
    postData.append('content',content);
    postData.append('image',image,title)
    this.hhtp
      .post<{ message: string; post: Postinterface }>(
        'http://localhost:3000/api/posts',
       postData
      )
      .subscribe((re) => {
        const post :Postinterface={
          id:re.post.id,
          title:title,
          content:content,
          imagePath:re.post.imagePath

        }

        this.post.push(post);
        this.postupdates.next([...this.post]);
        this.Router.navigate(['/'])
      });
  }
  deletepost(id) {
    this.hhtp.delete('http://localhost:3000/api/posts/' + id).subscribe(() => {
      const updatedpost = this.post.filter((post) => post.id !== id);
      this.post = updatedpost;
      this.postupdates.next([...this.post]);
    });
  }

  getPost(id: string) {
    return this.hhtp.get<{ _id: string; title: string; content: string }>(
      'http://localhost:3000/api/posts/' + id
    );
  }
  updatePost(id: string, title: string, content: string) {
    const post: Postinterface = { id: id, title: title, content: content,imagePath:null };
    this.hhtp
      .put('http://localhost:3000/api/posts/' + id, post)
      .subscribe((response) => {
        const UpdatedConstant = [...this.post];
        const oldpostIndex = UpdatedConstant.findIndex((p) => p.id === post.id);
        UpdatedConstant[oldpostIndex] = post;
        this.post = UpdatedConstant;
        this.postupdates.next([...this.post]);
         this.Router.navigate(['/']);
      });
  }
  constructor(private hhtp: HttpClient,private Router:Router) {}
}
