import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  currentuser : any

  constructor(
    public router : Router,
    public afAuth : AngularFireAuth
  ) { }

  ngOnInit() {
  }

  goToProfile = () => {
    this.router.navigate(['../profile'])
  }

}
