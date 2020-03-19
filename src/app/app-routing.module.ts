import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin',  loadChildren: () => import('./sign-in/signin.module').then( m => m.signinPageModule)   },
  { path: 'signup',  loadChildren: () => import('./sign-up/signup.module').then( m => m.signupPageModule)   },
  { path: 'home',    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)          },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule) },
  {
    path: 'sign-up-service',
    loadChildren: () => import('./sign-up-service/sign-up-service.module').then( m => m.SignUpServicePageModule)
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
