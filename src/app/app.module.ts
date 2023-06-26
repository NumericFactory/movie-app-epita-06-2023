import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { ActionbarComponent } from './actionbar/actionbar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PrintImgPipe } from './shared/pipes/print-img.pipe';
import { StarsComponent } from './shared/components/stars/stars.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { ErrorInterceptor } from './error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    SearchbarComponent,
    ActionbarComponent,
    PrintImgPipe,
    StarsComponent,
    MovieDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
