import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ChatAppService } from '../services/chat-app.service';
// import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
 email:string;
 pwd:string;
 username:string;

  constructor(private router:Router,private nav: NavController,public af:AngularFireAuth,private chatApp: ChatAppService,private formBuilder: FormBuilder,private formsModule:FormsModule) { }

  ngOnInit() {
  }

  signup(){
    this.af.auth.createUserWithEmailAndPassword(this.email,this.pwd).then(()=>{
      localStorage.setItem('userid',this.af.auth.currentUser.uid);
      this.af.auth.currentUser.updateProfile({
        displayName:this.username,
        photoURL:''
      }).then(()=>{
        this.nav.navigateRoot('/home')
      }).catch(err=>{
        alert(err.message)
      })
    }).catch(err=>{
      alert(err.message)
    })
  }

  goto_login(){
    this.nav.navigateForward('/home');
  }
}
