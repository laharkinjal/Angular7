import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Posts } from './app.model';


const BACKEND_URL = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class AppService {

  // private url ="http://localhost:3000";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(
    private http: HttpClient
  ) {}

  getPostList() {
    return  this.http.get(BACKEND_URL + 'posts');
  }

  addPost( post: Posts) {
    return  this.http.post(BACKEND_URL + 'posts', post, this.httpOptions);
  }

  editPost(post: Posts) {
    return  this.http.put(BACKEND_URL + 'posts/'+post.id, post, this.httpOptions);
  }
  

  GetPostById(postId: string) {
    return  this.http.get(BACKEND_URL + 'posts/' + postId);
  }

}
