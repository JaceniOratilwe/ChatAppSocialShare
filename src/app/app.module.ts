import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
 import { Firebase } from '@ionic-native/firebase/ngx';
import { AngularFireModule } from '@angular/fire';
import { ChatAppService} from '../app/services/chat-app.service'
import { AngularFireStorageModule } from '@angular/fire/storage';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { AngularFireFunctionsModule, FunctionsRegionToken } from '@angular/fire/functions';


var firebaseConfig = {
  apiKey: "AIzaSyApVSV7sb99R80f9d6-mWiVI6hmdPsSjpo",
  authDomain: "chatapp-862b3.firebaseapp.com",
  databaseURL: "https://chatapp-862b3.firebaseio.com",
  projectId: "chatapp-862b3",
  storageBucket: "chatapp-862b3.appspot.com",
  messagingSenderId: "766311256493",
  appId: "1:766311256493:web:770020e5ddbc81c4"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,AngularFireModule.initializeApp(firebaseConfig,environment),AngularFireFunctionsModule,AngularFirestoreModule, AngularFireDatabaseModule,AngularFireStorageModule,AngularFireAuthModule,ReactiveFormsModule,FormsModule,
    IonicModule.forRoot(), AppRoutingModule],
   
  providers: [
    StatusBar,
    SplashScreen,
    
    ChatAppService,Firebase, SocialSharing,
    File, FileChooser,
    {provide: FunctionsRegionToken,useValue:'us-central1'},
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
