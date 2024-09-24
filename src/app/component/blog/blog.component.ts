import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppModule } from 'src/app/app.module';
import { BlogModel, Blogs } from 'src/app/shared/store/Blog/blog.model';
import { getblog, getbloginfo } from 'src/app/shared/store/Blog/blog.selector';
import { AddblogComponent } from '../addblog/addblog.component';
import { AppStateModel } from 'src/app/shared/store/Global/AppState.Model';
import { deleteblog, loadblog } from 'src/app/shared/store/Blog/blog.actions';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(private store: Store<AppStateModel>, private dailog: MatDialog) { }

  bloglist !: BlogModel[];
  bloginfo !: Blogs;
  ngOnInit(): void {
    this.store.dispatch(loadblog())
    // this.store.select(getblog).subscribe(item => {
    //   this.bloglist = item;
    //   console.log(this.bloglist);
    // })
    this.store.select(getbloginfo).subscribe(item => {
      this.bloginfo = item;
      console.log(this.bloginfo);
    })
  }

  AddBlog(){
    this.OpenPopup(0, 'Add Blog')
  }

  OpenPopup(id: any, title: any, isedit= false) {
    this.dailog.open(AddblogComponent, {
      width: '40%',
      data: {
        id: id,
        title: title,
        isedit: isedit
      }
    })
  }

  EditBlog(id:any) {
    console.log(id);
    this.OpenPopup(id, 'Edit Blog', true);
  }

  DeleteBlog(id:any) {
    if(confirm('Are you sure want to remove?')) {
      this.store.dispatch(deleteblog({id:id}));
    }
  }

}
