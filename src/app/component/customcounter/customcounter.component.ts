import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { customincrement } from 'src/app/shared/store/counter.actions';
import { CounterModal } from 'src/app/shared/store/counter.modal';
import { getchannel } from 'src/app/shared/store/counter.selector';

@Component({
  selector: 'app-customcounter',
  templateUrl: './customcounter.component.html',
  styleUrls: ['./customcounter.component.scss']
})
export class CustomcounterComponent implements OnInit {

  countersubscribe!: Subscription
  constructor(private store: Store<{ counter: CounterModal }>) { }

  ngOnInit(): void {
    this.countersubscribe = this.store.select(getchannel).subscribe(data => {
      this.channelname = data;
      console.log('custom counter');
    });
  }

  counterinput!: number;
  actiontype: string ='add';

  channelname= '';
  onIncrement() {
    this.store.dispatch(customincrement({ value: +this.counterinput, action: this.actiontype }));
  }

}
