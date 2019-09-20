import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';


const routes: Routes = [
  {
    path:'',
    component:TabsPage,
    children:[{ path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
    { path: 'main', loadChildren: './main/main.module#MainPageModule' },
    { path: 'userprofile', loadChildren: './userprofile/userprofile.module#UserprofilePageModule' }],

  }
  
    // tabs
// { path: 'feed', loadChildren: './feed/feed.module#FeedPageModule' },
// { path: 'uploader', loadChildren: './uploader/uploader.module#UploaderPageModule' },
// { path: 'userprofile', loadChildren: './userprofile/userprofile.module#UserprofilePageModule' },
     
]



@NgModule({
  imports:
    [
      RouterModule.forChild(routes)
    ],
  exports:
    [
      RouterModule
    ]
})
export class TabsPageRoutingModule {}
