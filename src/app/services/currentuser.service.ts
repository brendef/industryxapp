import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CurrentuserService {

  currentuser
  currentUserEmail : string
  fullname : string
  lastname : string
  firstname : string
  profilePicture : string
  email

  constructor(
    private firestore : AngularFirestore
  ) { }

  setCurrentUserEmail = (email) => {
    this.currentUserEmail = email
  }

  setCurrentUserDetails = () => {
    this.firestore.collection('users').doc(this.currentUserEmail).valueChanges().subscribe(res => {
      this.currentuser = res
      this.fullname = this.currentuser.fullname
      this.firstname = this.currentuser.firstname
      this.profilePicture = this.currentuser.profilePicture
      this.email = this.currentUserEmail
      this.lastname = this.currentuser.lastname
    })
  }
}