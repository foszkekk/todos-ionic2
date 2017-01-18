import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {ListFormPage} from "../pages/list-form/list-form";
import {ListsPage} from "../pages/lists/lists";
import {ListPage} from "../pages/list/list";
import {TrashPage} from "../pages/trash/trash";
import {Helpers} from '../providers/helpers';
import {ColorpickerPage} from "../pages/colorpicker/colorpicker";
import {Lists} from "../providers/lists";
import {Storage} from '@ionic/storage';
import {ViewListPage} from "../pages/view-list/view-list";
import {IntroPage} from "../pages/intro/intro";

@NgModule({
  declarations: [
    MyApp,
    ListsPage,
    ListFormPage,
    ListPage,
    TrashPage,
    ColorpickerPage,
    ViewListPage,
    IntroPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListsPage,
    ListFormPage,
    ListPage,
    TrashPage,
    ColorpickerPage,
    ViewListPage,
    IntroPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Helpers, Lists, Storage]
})
export class AppModule {
}
