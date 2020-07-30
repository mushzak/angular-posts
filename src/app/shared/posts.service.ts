import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FbCreateRequest, Post} from "./interfaces";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({providedIn: "root"})

export class PostsService {
  constructor(private http: HttpClient) {
  }

  create(post: Post): Observable<Post> {
    return this.http.post(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(map((response: FbCreateRequest) => {
          return {
            ...post,
            id: response.name,
            date: new Date(post.date)
          };
        })
      );
  }

  getAll(){
    return this.http.get(`${environment.fbDbUrl}/posts.json`)
      .pipe(
        map( res => {
        return Object.keys(res).map( key => {
            return {
              ...res[key],
              id: key,
              date: new Date(res[key].date)
            }
          })
        })
      )
  }
}

