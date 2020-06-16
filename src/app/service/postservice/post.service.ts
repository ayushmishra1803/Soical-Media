import { Postinterface } from './../../interface/post/postinterface';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private post: Postinterface[] = [];
  private postupdates = new Subject<Postinterface[]>();

  getPosts() {
   this.hhtp
     .get<{ message: string; post: Postinterface []}>(
       'http://localhost:3000/api/posts'
     )
     .subscribe((postdata) => {
       this.post=postdata.post;
       this.postupdates.next([...this.post])
     });
  }
  getpostupdatelistener() {
    return this.postupdates.asObservable();
  }
  addPosts(title, content) {

    const temppost: Postinterface = {
      id:null,
      title: title,
      content: content,
    };
    this.hhtp.post<{message:string}>('http://localhost:3000/api/posts',temppost).subscribe((re)=>{
      console.log(re.message);
       this.post.push(temppost);
       this.postupdates.next([...this.post]);

    })

  }
  constructor(private hhtp: HttpClient) {}
}
