import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterModal } from 'src/app/shared/store/counter.modal';
import { Observable, Subscription } from 'rxjs'
import { getcounter } from 'src/app/shared/store/counter.selector';
import { AppModule } from 'src/app/app.module';
import { AppStateModel } from 'src/app/shared/store/Global/AppState.Model';

@Component({
  selector: 'app-counterdisplay',
  templateUrl: './counterdisplay.component.html',
  styleUrls: ['./counterdisplay.component.scss']
})
export class CounterdisplayComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppStateModel>) {

  }
  
  counterDisplay!: number;
  channelname!: string;
  countersubscribe!: Subscription
  counter$!: Observable<CounterModal>
  ngOnInit(): void {
   this.countersubscribe = this.store.select(getcounter).subscribe(data => {
      this.counterDisplay = data;
      // this.channelname = data.channelname;
      console.log('counter display');
    });
    
    // this.counter$ = this.store.select('counter');
  }

  ngOnDestroy(): void { 
    if (this.countersubscribe){
      this.countersubscribe.unsubscribe();
      console.log('this.countersubscribe', this.countersubscribe);
    }
    
  }
}
