import { Postinterface } from './../../interface/post/postinterface';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

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
  addPosts(title, content) {
    const temppost: Postinterface = {
      id: null,
      title: title,
      content: content,
    };
    this.hhtp
      .post<{ message: string; postid: string }>(
        'http://localhost:3000/api/posts',
        temppost
      )
      .subscribe((re) => {
        const postid = re.postid;
        temppost.id = postid;
        this.post.push(temppost);
        this.postupdates.next([...this.post]);
      });
  }
  deletepost(id) {
    this.hhtp.delete('http://localhost:3000/api/posts/' + id).subscribe(() => {
      const updatedpost = this.post.filter((post) => post.id !== id);
      this.post = updatedpost;
      this.postupdates.next([...this.post]);
    });
  }
  constructor(private hhtp: HttpClient) {}
  getPost(id: string) {
    return this.hhtp.get<{ _id: string; title: string; content: string }>(
      'http://localhost:3000/api/posts/' + id
    );
  }
  updatePost(id: string, title: string, content: string) {
    const post: Postinterface = { id: id, title: title, content: content };
    this.hhtp
      .put('http://localhost:3000/api/posts/' + id, post)
      .subscribe((response) => {
        const UpdatedConstant = [...this.post];
        const oldpostIndex = UpdatedConstant.findIndex((p) => p.id === post.id);
        UpdatedConstant[oldpostIndex] = post;
        this.post = UpdatedConstant;
        this.postupdates.next([...this.post]);
      });
  }
}
