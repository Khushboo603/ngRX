import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppModule } from 'src/app/app.module';
import { addblog, updateblog } from 'src/app/shared/store/Blog/blog.actions';
import { BlogModel } from 'src/app/shared/store/Blog/blog.model';
import { getblogbyid } from 'src/app/shared/store/Blog/blog.selector';
import { AppStateModel } from 'src/app/shared/store/Global/AppState.Model';

@Component({
  selector: 'app-addblog',
  templateUrl: './addblog.component.html',
  styleUrls: ['./addblog.component.scss']
})
export class AddblogComponent implements OnInit {

  pagetitle='';
  editblogid=0;
  editdata!:BlogModel;
  constructor(private dailogref: MatDialogRef<AddblogComponent>, private fb: FormBuilder, private store: Store<AppStateModel>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.pagetitle=this.data.title;
    console.log(this.data);
    if(this.data.isedit) {
      this.editblogid = this.data.id;
      this.store.select(getblogbyid(this.editblogid)).subscribe(data => {
        this.editdata = data;
        this.blogform.setValue({id: this.editdata.id, title: this.editdata.title, description: this.editdata.description})
      })
    }
  }

  closepopup() {
    this.dailogref.close()
  }

  blogform = this.fb.group({
    id: this.fb.control(0),
    title: this.fb.control('', Validators.required),
    description: this.fb.control('', Validators.required)
  })

  submit() {
    if(this.blogform.valid) {
      const _bloginput:BlogModel={
        id:0,
        title: this.blogform.value.title as string,
        description: this.blogform.value.description as string
      }
      if (this.data.isedit) {
        _bloginput.id = this.blogform.value.id as number;
        this.store.dispatch(updateblog({bloginput:_bloginput}));
      } else {
        this.store.dispatch(addblog({bloginput:_bloginput}));
      }
      this.closepopup();
    }
  }
}
