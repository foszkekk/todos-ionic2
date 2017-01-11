import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {ListFormPage} from "../pages/list-form/list-form";
import {ListsPage} from "../pages/lists/lists";
import {ListPage} from "../pages/list/list";
import {TrashPage} from "../pages/trash/trash";
import {Helpers} from '../providers/helpers';
import {ColorpickerPage} from "../pages/colorpicker/colorpicker";

@NgModule({
  declarations: [
    MyApp,
    ListsPage,
    ListFormPage,
    ListPage,
    TrashPage,
    ColorpickerPage
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
    ColorpickerPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Helpers]
})
export class AppModule {
}
