import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Posts } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'simple-crud-app';

  posts: Posts[] = [];
  post: Posts = null;
  model: any = {};
  buttonTitle: string;
  mode: string;

  constructor(private appService: AppService) { }
  ngOnInit() {
    this.buttonTitle = "Add Post";
    this.mode = "Add";
    this.getContacts();

  }
  public getContacts() {
    this.posts = [];
    this.appService.getPostList().subscribe((posts: any) => {
      posts.forEach(post => {
        this.posts.push({
          id: post.id,
          title: post.title,
          description: post.description
        });
      });

      console.log(this.posts);
    });
  }

  addPost() {
    console.log(this.model);
    this.post = {
      id: this.model.postId,
      title: this.model.postTitle,
      description: this.model.postDesc
    }
    console.log(this.post);
    if(this.mode === "Add") {
      this.appService.addPost(this.post).subscribe(() => {
        this.getContacts();
      });
    }
    else  {
      this.appService.editPost(this.post).subscribe(() => {
        this.getContacts();
      });
    }
    this.model = {};
    this.mode = "Add";
    this.buttonTitle = "Add Post";
  }

  getPostById(id: string) {
    console.log(id);
    this.appService.GetPostById(id).subscribe((post: any) => {
      this.model.postId = post.id;
      this.model.postTitle = post.title;
      this.model.postDesc = post.description;
    });
    this.buttonTitle = "Update Post";
    this.mode = "Edit";
  }


}