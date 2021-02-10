import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController } from '@ionic/angular';
import { categories } from 'src/models/category';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  categories : any[];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController
  ) {
    this.categories = categories;
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.navCtrl.navigateRoot('/home');
    });
  }
  showCategory(catTitle:string):void {
    this.navCtrl.navigateForward('/category/'+catTitle);
    console.log('catTitle',catTitle);
  }
   goTo(route: string) : void {
    console.log('route', route);
    this.navCtrl.navigateForward(`/${route}`);
  }
}
