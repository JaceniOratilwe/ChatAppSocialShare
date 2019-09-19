import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ChatAppService } from '../services/chat-app.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MyData } from '../myData';
import { tap, finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import * as firebase from 'firebase';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userEmail: string;

  //uploading a pic
  // Upload Task 
  task: AngularFireUploadTask;
 
  // Progress in percentage
  percentage: Observable<number>;
 
  // Snapshot of uploading file
  snapshot: Observable<any>;
 
  // Uploaded File URL
  UploadedFileURL: Observable<string>;
 
  //Uploaded Image List
  images: Observable<MyData[]>;

  //File details  
  fileName:string;
  fileSize:number;
 
  //Status check 
  isUploading:boolean;
  isUploaded:boolean;

  private imageCollection: AngularFirestoreCollection<MyData>;

  // social sharing
  text = 'Check out the Ionic Academy!';
  url = 'https://console.firebase.google.com/project/chatapp-862b3/storage/chatapp-862b3.appspot.com/files~2FfreakyStorage~2F';
  constructor(private socialSharing: SocialSharing, private file: File,private firestore: AngularFirestore,private navCtrl: NavController,private chatApp : ChatAppService,private storage: AngularFireStorage, private database: AngularFirestore ) { 

    //uploading a picture

    this.isUploading = false;
    this.isUploaded = false;

    this.imageCollection = database.collection<MyData>('freakyImages');
    this.images = this.imageCollection.valueChanges();
  }

  uploadFile(event: FileList) {
    
 
    // The File object
    const file = event.item(0)
 
    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') { 
     console.error('unsupported file type :( ')
     return;
    }
 
    this.isUploading = true;
    this.isUploaded = false;
 
 
    this.fileName = file.name;
 
    // The storage path
    const path = 'freakyStorage/${new Date().getTime()}_${file.name}';
 
    // Totally optional metadata
    const customMetadata = { app: 'Freaky Image Upload Demo' };
 
    //File reference
    const fileRef = this.storage.ref(path);
 
    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });
 
    // Get file progress percentage
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      
      finalize(() => {
        // Get uploaded file storage path
        this.UploadedFileURL = fileRef.getDownloadURL();
        
        this.UploadedFileURL.subscribe(resp=>{
          this.addImagetoDB({
            name: file.name,
            filepath: resp,
            size: this.fileSize
          });
          this.isUploading = false;
          this.isUploaded = true;
        },error=>{
          console.error(error);
        })
      }),
      tap(snap => {
          this.fileSize = snap.totalBytes;
      })
    )
  }
 
  addImagetoDB(image: MyData) {
    //Create an ID for document
    const id = this.database.createId();
 
    //Set document id with value in database
    this.imageCollection.doc(id).set(image).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log("error " + error);
    });
  }

  ngOnInit() {
   // userDetailsAnon()
   if(this.chatApp.userDetailsAnon()){
    this.userEmail = this.chatApp.userDetailsAnon().email;
  }else{
    this.navCtrl.navigateBack('');
  }
  }

  logout(){
    this.chatApp.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    })
  }
  update_Student(recordID,record){
    this.firestore.doc('chats/' + recordID).update(record);
  }

  goto_chatgroup(){
    this.navCtrl.navigateForward('/main');
  }

  goto_privategroup(){
    this.navCtrl.navigateForward('/private');
  }
// Social Sharing
async shareTwitter() {
  // Either URL or Image
  this.socialSharing.shareViaTwitter(null, null, this.url).then(() => {
    // Success
  }).catch((e) => {
    // Error!
  });
}

async shareWhatsApp() {
  // Text + Image or URL works
  this.socialSharing.shareViaWhatsApp(this.text, null, this.url).then(() => {
    // Success
  }).catch((e) => {
    // Error!
  });
}

async resolveLocalFile() {
  return this.file.copyFile('${this.file.applicationDirectory}www/assets/imgs/', 'academy.jpg', this.file.cacheDirectory, `${new Date().getTime()}.jpg`);
}

removeTempFile(name) {
  this.file.removeFile(this.file.cacheDirectory, name);
}

async shareEmail() {
  let file = await this.resolveLocalFile();

  this.socialSharing.shareViaEmail(this.text, 'My custom subject', ['chsnjay@gmail.com'], null, null, file.nativeURL).then(() => {
    this.removeTempFile(file.name);
  }).catch((e) => {
    // Error!
  });
}

async shareFacebook() {
  let file = await this.resolveLocalFile();

  // Image or URL works
  this.socialSharing.shareViaFacebook(null, file.nativeURL, null).then(() => {
    this.removeTempFile(file.name);
  }).catch((e) => {
    // Error!
  });
}

}
