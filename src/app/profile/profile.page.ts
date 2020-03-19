import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CurrentuserService } from '../services/currentuser.service'
import { AngularFirestore } from '@angular/fire/firestore'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  currentuser : any = {}
  fullname : string
  firstname : string
  lastname : string
  profilePicture : string
  email : string

  constructor (
    public router : Router,
    private currentUserService : CurrentuserService
  ) { }

  ngOnInit() { 
    this.currentuser    = this.currentUserService.currentuser
    this.fullname       = this.currentUserService.fullname
    this.lastname       = this.currentUserService.lastname
    this.firstname      = this.currentUserService.firstname
    this.profilePicture = this.currentUserService.profilePicture
    this.email          = this.currentUserService.email
  }

  gohome = () => {
    this.router.navigate(['../home'])
  }
}
