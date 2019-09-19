import { Component } from '@angular/core';
import { ChatAppService } from '../services/chat-app.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { AuthService } from '../AuthController';
import * as firebase from 'firebase';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
 email:string;
 pwd:string;


 
  constructor(public fs:AngularFirestore,private chatApp: ChatAppService,public auth : AngularFireAuth,public nav:NavController,private formBuilder: FormBuilder,private form:FormsModule, private reactiveFomrsModule:ReactiveFormsModule) {}

  login(){
    this.auth.auth.signInWithEmailAndPassword(this.email,this.pwd).then(()=>{
      this.nav.navigateRoot('/tabs')
    }).catch(err=>{
      alert(err.message);
    })
  }
  goto_signup(){
    this.nav.navigateForward('/signup');
  }

  //anon login
  anonLogin():Promise<any>{

    return firebase.auth().signInAnonymously()
        .then(resp => {
          console.log(resp);this.nav.navigateForward('/main');
        })
        
  }

  signOut(){
    firebase.auth().signOut();
    }
}
