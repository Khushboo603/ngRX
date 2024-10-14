import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MasterService } from "../../master.service";
import { LOAD_BLOG, addblog, addblogsuccess, deleteblog, deleteblogsuccess, loadblogfail, loadblogsuccess, loadspinner, updateblog, updateblogsuccess } from "./blog.actions";
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { EMPTY, of } from "rxjs";
import { BlogModel } from "./blog.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EmptyAction, ShowAlert } from "../Global/App.Action";

@Injectable()

export class BlogEffects {
    constructor(private action$: Actions, private service: MasterService, private _snackbar: MatSnackBar) {

    }

    _blog = createEffect(() => {
        return this.action$.pipe(
            ofType(LOAD_BLOG),
            exhaustMap((action) => {
                return this.service.GetAllBlogs().pipe(
                    map((data) => {
                        return loadblogsuccess({ bloglist: data });
                    }),
                    catchError((_error) => of(loadblogfail({ Errortext: _error.message }),loadspinner({isloaded:false})))
                );
            })
        );
    })

    // _Addblog = createEffect(() =>
    //     this.action$.pipe(
    //         ofType(addblog),
    //         exhaustMap((action) => {
    //             return this.service.createBlog(action.bloginput).pipe(
    //                 map((data) => {
    //                     // return addblogsuccess({bloginput: action.bloginput})
    //                     return addblogsuccess({ bloginput: data as BlogModel })

    //                 }),
    //                 catchError((_error) => of(loadblogfail({ Errortext: _error.message })))
    //             );
    //         })
    //     )
    // )

    _Addblog = createEffect(() =>
        this.action$.pipe(
            ofType(addblog),
            switchMap((action) => 
                this.service.createBlog(action.bloginput).pipe(
                    switchMap((data) => of(
                        addblogsuccess({ bloginput: data as BlogModel }),
                        ShowAlert({message: 'Added Successfully.', actionresult: 'pass'})

                    )),
                    catchError((_error) => of(ShowAlert({message: 'Created fail.', actionresult: 'fail'}), loadspinner({isloaded:false})
                    ))
                )
            )
        )
    )

    // _Updateblog = createEffect(() =>
    //     this.action$.pipe(
    //         ofType(updateblog),
    //         exhaustMap((action) => {
    //             return this.service.UpdatedBLog(action.bloginput).pipe(
    //                 map((data) => {
    //                     return updateblogsuccess({ bloginput: action.bloginput })
    //                     // updateblogsuccess({ bloginput: action.bloginput })
    //                     // return ShowAlert({message: 'Updated Successfully'})
    //                 }),
    //                 catchError((_error) => of(loadblogfail({ Errortext: _error.message })))
    //             );
    //         })
    //     )
    // )

    _Updateblog = createEffect(() =>
        this.action$.pipe(
            ofType(updateblog),
            switchMap((action) => 
                this.service.UpdatedBLog(action.bloginput).pipe(
                    switchMap(res => of(
                        updateblogsuccess({ bloginput: action.bloginput }),
                        ShowAlert({message: 'Updated Successfully.', actionresult: 'pass'})
                    )),
                    catchError((_error) => of(ShowAlert({message: 'Updated Failed - Due to '+_error.message, actionresult: 'fail'}), loadspinner({isloaded:false})))
                )
            )
        )
    )

    // _Deleteblog = createEffect(() =>
    //     this.action$.pipe(
    //         ofType(deleteblog),
    //         exhaustMap((action) => {
    //             return this.service.DeleteBlog(action.id).pipe(
    //                 map((data) => {
    //                     return deleteblogsuccess({ id: action.id })
    //                 }),
    //                 catchError((_error) => of(loadblogfail({ Errortext: _error.message })))
    //             );
    //         })
    //     )
    // );

    _Deleteblog = createEffect(() =>
        this.action$.pipe(
            ofType(deleteblog),
            switchMap((action) => 
                this.service.DeleteBlog(action.id).pipe(
                    switchMap((data) => of(
                        deleteblogsuccess({ id: action.id }),
                        ShowAlert({message: 'Deleted Successfully.', actionresult: 'pass'})
                    )),
                    catchError((_error) => of(ShowAlert({message: 'Deletion failed.', actionresult: 'fail'}), loadspinner({isloaded:false})
                    ))
                )
            )
        )
    );
}