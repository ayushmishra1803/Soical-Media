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
      .post<{ message: string }>('http://localhost:3000/api/posts', temppost)
      .subscribe((re) => {
        console.log(re.message);
        this.post.push(temppost);
        this.postupdates.next([...this.post]);
      });
  }
  deletepost(id:string)
  {
    this.hhtp.delete('http://localhost:3000/api/posts'+id).subscribe(re=>{
      console.log("delete");

    });
  }
  constructor(private hhtp: HttpClient) {}
}
