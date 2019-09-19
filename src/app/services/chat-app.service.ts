import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ReactiveFormsModule } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class ChatAppService {
  user: firebase.User;

 
  constructor(private firestore: AngularFirestore,private angularFireStore:AngularFirestore, private afAuth : AngularFireAuth,private router:Router,private reactiveFormsModule:ReactiveFormsModule) { }
 
  registerUser(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err))
    })
   }

   loginUser(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err))
    })
   }
   logoutUser(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        firebase.auth().signOut()
        .then(() => {
          console.log("LOG Out");
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }
 
  userDetailsAnon(){
    return firebase.auth().currentUser;
  }

  


  //Social sharing..... Create collection for images in firebase, upload to collection , share the image and delete to collection

  create_NewImageCollection(record) {
    return this.firestore.collection('Images').add(record);
  }

  read_Images() {
    return this.firestore.collection('Images').snapshotChanges();
  }
 
  update_Images(recordID,record){
    this.firestore.doc('Images/' + recordID).update(record);
  }
 
  delete_Images(record_id) {
    this.firestore.doc('Images/' + record_id).delete();
  }
  //Anonymous Login
  // ngOnInit() {
  //   firebase.auth().onAuthStateChanged(user=>{
  //     this.user = user;
  //   });
  // }

  // async loginAnon(): Promise<firebase.auth.UserCredential>{
  //   try{
  //     return await firebase.auth().signInAnonymously();
  //   }catch(error){
  //     console.log(error);
  //   }
  // }
 
}

