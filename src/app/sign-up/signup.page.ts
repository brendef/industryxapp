import { AngularFireAuth } from '@angular/fire/auth'
import { Component, OnInit } from '@angular/core'
import { AlertController } from '@ionic/angular'
import { Router } from '@angular/router'
import { AngularFirestore } from '@angular/fire/firestore'
import { CurrentuserService } from '../services/currentuser.service'

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

const validatePassword = ( password, confirmpassword ) => {
  if ( 
    password < 5                 || 
    password !== confirmpassword || 
    !/[a-z]/.test( password )    || 
    !/[0-9]/.test( password )    || 
    !/[A-Z]/.test( password )
  ) {
    if( password < 5 ) {
      return 'Passwords should contain atleast 6 characters or more'
    }
    if( password !== confirmpassword ) {
      return 'Passwords do not match'
    }  
    if( !/[a-z]/.test( password )) {
      return 'Password must contain atleast one lowercase character'
    }
    if( !/[0-9]/.test( password )) {
      return 'Password must contain atleast one numeric character'
    }
    if( !/[A-Z]/.test( password )) {
      return 'Password must contain atleast one uppercase character'
    }
  } else {
    return null
  }
}

const splitfullname = (fullname) => {
  return fullname.split(' ')
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})

export class signupPage implements OnInit {

  email            : string = ''
  fullname         : string = ''
  password         : string = ''
  confirmpassword  : string = ''

  fullnameStatement : string = ''
  emailStatement    : string = ''
  passwordStatement : string = ''

  public showhideText        : string = 'show'
  public showhideConfirmText : string = 'show'
  public showhide            : string = 'password'
  public showhideConfirm     : string = 'password'

  constructor (
    public afAuth : AngularFireAuth,
    public alertController : AlertController,
    public router : Router,
    private firestore : AngularFirestore,
    private currentUserService : CurrentuserService
  ) { }

  ngOnInit() { }

  async signup() {
    const { fullname, email, password, confirmpassword } = this

    const firstname = splitfullname(fullname)
    const profilePicture = 'https://picsum.photos/400'

    this.emailStatement = validateEmail(email)
    this.passwordStatement = validatePassword(password, confirmpassword)
    
    this.fullnameStatement = null

    if ( 
      fullname.trim() !== '' && 
      fullname.trim().includes(' ') &&
      !validateEmail(email)  &&
      !validatePassword(password, confirmpassword)
    ) {
      try {
        await this.afAuth.auth.createUserWithEmailAndPassword(
          email,
          password
        ).then(user => {
          const newuser = this.firestore.collection('users').doc(email).set({
            id : user.user.uid,
            fullname,
            email,
            profilePicture,
            firstname : firstname[0],
            lastname : fullname.substr(fullname.indexOf(" ") + 1)
          })
        })

        this.currentUserService.setCurrentUserEmail(email)
        this.currentUserService.setCurrentUserDetails()
        this.router.navigate(['../profile'])
              
      } catch ( error ) {
        this.alertController.create({
          header: 'Error',
          message: error,
          buttons: ['Okay']
        }).then(alertElement => {
          alertElement.present()
        })
      }
    } else if ( 
        fullname.trim() === '' || 
        !fullname.trim().includes(' ')
      ) {
        this.fullnameStatement = 'Please enter your full name'
    }
  }

  goToSignIn = () => {
    this.router.navigate(['../signin'])
  }

  goToSignUpService = () => {
    this.router.navigate(['../sign-up-service'])
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

  showhideConfirmPassword = () => {
    if ( this.showhideConfirm === 'password' ) {
      this.showhideConfirm = 'text'
      this.showhideConfirmText = 'hide'
    } else {
      this.showhideConfirm = 'password'
      this.showhideConfirmText = 'show'
    }
  }
}