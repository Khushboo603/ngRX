import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogModel } from './store/Blog/blog.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  haveaccess() {
    return true;
  }
  GetAllBlogs(): Observable<BlogModel[]> {
    return this.http.get<BlogModel[]>('https://jsonplaceholder.typicode.com/posts')
  }
  createBlog(bloginpu: BlogModel) {
    return this.http.post('https://jsonplaceholder.typicode.com/posts', bloginpu).pipe(
      tap(() => {
        this.http.get<BlogModel>("https://jsonplaceholder.typicode.com/posts?_limit=1&_sort=id&_order=desc");
      })
    )
  }
}
