import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from "../../shared/posts.service";
import {Post} from "../../shared/interfaces";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[]
  subPost: Subscription;
  search: '';

  constructor(
    private postService: PostsService
  ) {}
  
  ngOnInit(): void {
    this.subPost = this.postService.getAll().subscribe(posts => {
      this.posts = posts
    });
  }

  ngOnDestroy(): void {
    this.subPost.unsubscribe();
  }

  remove(id: string) {
    console.log(id);
  }
}
