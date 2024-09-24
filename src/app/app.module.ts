import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CounterbuttonComponent } from './component/counterbutton/counterbutton.component';
import { CounterdisplayComponent } from './component/counterdisplay/counterdisplay.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './shared/store/counter.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './Material.Module';
import { CustomcounterComponent } from './component/customcounter/customcounter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { blogReducer } from './shared/store/Blog/blog.reducer';
import { BlogComponent } from './component/blog/blog.component';
import { MenuheaderComponent } from './component/menuheader/menuheader.component';
import { CounterComponent } from './component/counter/counter.component';
import { HomeComponent } from './component/home/home.component';
import { AppState } from './shared/store/Global/App.state';
import { AddblogComponent } from './component/addblog/addblog.component';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { BlogEffects } from './shared/store/Blog/blog.Effects';

@NgModule({
  declarations: [
    AppComponent,
    CounterbuttonComponent,
    CounterdisplayComponent,
    CustomcounterComponent,
    BlogComponent,
    MenuheaderComponent,
    CounterComponent,
    HomeComponent,
    AddblogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    StoreModule.forRoot(AppState),
    BrowserAnimationsModule,
    FormsModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    ReactiveFormsModule,
    EffectsModule.forRoot([]),
    HttpClientModule,
    EffectsModule.forRoot([BlogEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
