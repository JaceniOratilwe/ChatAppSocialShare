// import firebase from "firebase/app";
// import "firebase/auth";
// import { async } from '@angular/core/testing';
// // import firebase = require('firebase/app');

 //class AuthController{
//     public user : firebase.User;

//     constructor(){
//         this.init();
//     }

//     init(){
//       const   firebaseConfig = {
//             apiKey: "AIzaSyApVSV7sb99R80f9d6-mWiVI6hmdPsSjpo",
//             authDomain: "chatapp-862b3.firebaseapp.com",
//             databaseURL: "https://chatapp-862b3.firebaseio.com",
//             projectId: "chatapp-862b3",
//             storageBucket: "",
//             messagingSenderId: "766311256493",
//             appId: "1:766311256493:web:770020e5ddbc81c4"
//           };
//           firebase.initializeApp(firebaseConfig);

//           firebase.auth().onAuthStateChanged(user=>{
//               this.user = user;
//           });
//         }

        
//           async loginAnon(): Promise<firebase.auth.UserCredential>{
//               try{
//                   return await firebase.auth().signInAnonymously
//               }catch(error){
//                   console.log(error);
//               }
              
//           }
//}

// export const AuthService = new AuthController();