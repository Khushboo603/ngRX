import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CounterModal } from "./counter.modal";

const getcounterstate=createFeatureSelector<CounterModal>('counter');

export const getcounter = createSelector(getcounterstate, (state)=>{
    return state.counter;
})

export const getchannel = createSelector(getcounterstate, (state)=>{
    return state.channelname;
})