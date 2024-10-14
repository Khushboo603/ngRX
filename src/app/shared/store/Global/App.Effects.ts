import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { EMPTY, of } from "rxjs";
import { EmptyAction, ShowAlert } from "./App.Action";


@Injectable()

export class AppEffects {
    constructor(private action$: Actions, private _snackbar: MatSnackBar) { }

    _ShowAlert = createEffect(() =>
        this.action$.pipe(
            ofType(ShowAlert),
            exhaustMap(action => {
                return this.ShowsnacbarAlert(action.message, action.actionresult)
                    .afterDismissed()
                    .pipe(
                        map(() => {
                            return EmptyAction();
                        }))
            })
        )
    )

    ShowsnacbarAlert(message: string, actionresult: string = 'fail') {
        let _class = actionresult == 'pass' ? 'green-snacbar' : 'red-snacbar';
        return this._snackbar.open(message, 'OK', {
            verticalPosition: 'top',
            horizontalPosition: 'end',
            panelClass: [_class],
            duration: 5000
        })
    }
}