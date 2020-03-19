import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router'
import { CurrentuserService } from './services/currentuser.service'
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  currentuser : any

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public afAuth : AngularFireAuth,
    public router : Router,
    private storage : Storage,
    private currentUserService : CurrentuserService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault()
      this.splashScreen.hide()
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.currentUserService.setCurrentUserEmail(user.email)
          this.currentUserService.setCurrentUserDetails()
          this.router.navigate(['./home'])
        } else {
          this.router.navigate(['./signin'])
        }
      })
    })
  }
}
