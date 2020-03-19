import { Component, OnInit } from '@angular/core'
import { AngularFireAuth } from "@angular/fire/auth"
import { AlertController } from '@ionic/angular'
import { Router } from '@angular/router'
import { AngularFirestore } from '@angular/fire/firestore'
import { CurrentuserService } from '../services/currentuser.service'
import { Storage } from '@ionic/storage'


const validateEmail = ( email ) => {
  if ( 
    email.trim() === '' &&
    !/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email) &&
    !email.trim().includes('@') ||
    !email.trim().includes('.')
  ) {
    return 'Please enter a valid email address'
  } else {
    return null
  }
}

const validatePassword = ( password ) => {
  if ( 
    password < 5                 || 
    !/[a-z]/.test( password )    || 
    !/[0-9]/.test( password )    || 
    !/[A-Z]/.test( password )
  ) {
    return "Password invalid"
  } else {
    return null
  }
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})

export class signinPage implements OnInit {

  email    : string = ''
  password : string = ''

  emailStatement    : string = ''
  passwordStatement : string = ''

  emailValidation : string = ''
  showhide        : string = 'password'
  showhideText    : string = 'show'

  constructor(
    public afAuth : AngularFireAuth,
    public alertController : AlertController,
    public router : Router,
    public firestore : AngularFirestore,
    private currentUserService : CurrentuserService,
    private storage : Storage
  ) { }

  ngOnInit() { }

  async signin() {
    const { email, password } = this
    
    this.emailStatement = validateEmail(email)
    this.passwordStatement = validatePassword(password)

    if (
      !validateEmail(email)  &&
      !validatePassword(password)
    ) {
      try {
        const user = await this.afAuth.auth.signInWithEmailAndPassword(
          email,
          password
        )

        this.currentUserService.setCurrentUserEmail(email)
        this.currentUserService.setCurrentUserDetails()
        // this.storage.set('currentuser', email)
        this.router.navigate(['../home'])
      
      } catch (error) {
        this.alertController.create({
          header: 'Error',
          message: error,
          buttons: ['Okay']
        }).then(alertElement => {
          alertElement.present()
        })
      }
    } 
  }

  goToSignUp() {
    this.router.navigate(['../signup'])
  }

  showhidePassword = () => {    
    if ( this.showhide === 'password' ) {
      this.showhide = 'text'
      this.showhideText = 'hide'
    } else {
      this.showhide = 'password'
      this.showhideText = 'show'
    }
  }
}