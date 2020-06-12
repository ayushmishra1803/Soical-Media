import { Postinterface } from './../../interface/post/postinterface';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private post:Postinterface[]=[];
  private postupdates=new Subject<Postinterface[]>();

  getPosts(){
    return [...this.post];
   }
   getpostupdatelistener(){
    return this.postupdates.asObservable();
   }
   addPosts(title,content){
     const temppost:Postinterface={
       title:title,
       content:content
     }
     this.post.push(temppost);
     this.postupdates.next([...this.post]);
   }
  constructor() { }
}
