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
import {SettingsPage} from "../pages/settings/settings";
import {Settings} from "../providers/settings";

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
    SettingsPage
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
    IntroPage,
    SettingsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Helpers, Lists, Storage, Settings]
})
export class AppModule {
}
