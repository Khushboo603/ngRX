import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './component/blog/blog.component';
import { CounterComponent } from './component/counter/counter.component';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
  {path: 'counter', component: CounterComponent},
  {path: 'blog', component:BlogComponent},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
