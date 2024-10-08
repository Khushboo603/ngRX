import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MasterService } from "../../master.service";
import { LOAD_BLOG, addblog, addblogsuccess, loadblogfail, loadblogsuccess } from "./blog.actions";
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { EMPTY, of } from "rxjs";
import { BlogModel } from "./blog.model";

@Injectable()

export class BlogEffects{
    constructor(private action$: Actions, private service: MasterService){

    }

    _blog=createEffect(() => {
        return this.action$.pipe(
            ofType(LOAD_BLOG),
            exhaustMap((action) => {
                return this.service.GetAllBlogs().pipe(
                    map((data) => {
                        return loadblogsuccess({ bloglist: data });
                    }),
                    catchError((_error)=> of(loadblogfail({Errortext: _error.message})))
                );
            })
        );
    })

    _Addblog=createEffect(() => 
        this.action$.pipe(
            ofType(addblog),
            exhaustMap((action) => {
                return this.service.createBlog(action.bloginput).pipe(
                    map((data) => {
                        // return addblogsuccess({bloginput: action.bloginput})
                        return addblogsuccess({bloginput: data as BlogModel})

                    }),
                    catchError((_error)=> of(loadblogfail({Errortext: _error.message})))
                );
            })
        )
    )
}