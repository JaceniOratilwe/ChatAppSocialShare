import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'main', loadChildren: './main/main.module#MainPageModule' },
  { path: 'first', loadChildren: './first/first.module#FirstPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
   { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'private', loadChildren: './private/private.module#PrivatePageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'userprofile', loadChildren: './userprofile/userprofile.module#UserprofilePageModule' },
  { path: 'feeds', loadChildren: './feeds/feeds.module#FeedsPageModule' },
  
];


// tabs
// { path: 'feed', loadChildren: './feed/feed.module#FeedPageModule' },
// { path: 'uploader', loadChildren: './uploader/uploader.module#UploaderPageModule' },
// { path: 'userprofile', loadChildren: './userprofile/userprofile.module#UserprofilePageModule' },

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
