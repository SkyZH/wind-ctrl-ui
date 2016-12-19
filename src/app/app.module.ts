import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgReduxModule, NgRedux } from 'ng2-redux';
import reduxLogger from 'redux-logger';
import { rootReducer, IAppState } from './shared';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ApiService } from './shared';
import { IO_SERVICE_PROVIDER } from './shared';

import { routing } from './app.routing';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    NgReduxModule.forRoot()
  ],
  declarations: [
    AppComponent,
    HomeComponent
  ],
  providers: [
    ApiService,
    IO_SERVICE_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(rootReducer, {}, [ createLogger() ]);
  }
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
