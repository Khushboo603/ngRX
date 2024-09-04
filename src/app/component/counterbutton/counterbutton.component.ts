import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { changechannelname, decrement, increment, reset } from 'src/app/shared/store/counter.actions';
import { CounterModal } from 'src/app/shared/store/counter.modal';

@Component({
  selector: 'app-counterbutton',
  templateUrl: './counterbutton.component.html',
  styleUrls: ['./counterbutton.component.scss']
})
export class CounterbuttonComponent implements OnInit {

  constructor(private store: Store<{counter:CounterModal}>) { }

  ngOnInit(): void {
  }

  OnIncrement() {
    this.store.dispatch(increment());
  }

  OnDecrement() {
    this.store.dispatch(decrement());
  }

  OnReset() {
    this.store.dispatch(reset());
  }

  OnRename() {
    this.store.dispatch(changechannelname({channel: 'Welcome Nihira Techiees'}))
  }

}
