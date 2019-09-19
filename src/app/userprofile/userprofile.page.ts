import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions} from '@angular/fire/functions';
import { ChatAppService } from '../services/chat-app.service';
import { NavController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';


import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

export interface MyData {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.page.html',
  styleUrls: ['./userprofile.page.scss'],
})
export class UserprofilePage implements OnInit {

  imagesFire: any;
  imageName: any;

  //image upload
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


  constructor(private storage: AngularFireStorage, private database: AngularFirestore,private chatApp : ChatAppService,public navCtrl:NavController,private fileChooser:FileChooser,private file:File) {
    this.isUploading = false;
    this.isUploaded = false;
    //Set collection where our documents/ images info will save
    this.imageCollection = database.collection<MyData>('uploadedPics');//change FreakyImages name
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
   const path = `freakyStorage/${new Date().getTime()}_${file.name}`;

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


  //Image upload For real devices 
//   choose(){
//     this.fileChooser.open().then((url)=>{
//       alert(url);

//       this.file.resolveLocalFilesystemUrl(url).then((newUrl)=>{
//         alert(JSON.stringify(newUrl));

//         let dirPath = newUrl.nativeURL;
//         let dirPathSegments = dirPath.split('/')
//         dirPathSegments.pop()
//         dirPath = dirPathSegments.join('/')

//         this.file.readAsArrayBuffer(dirPath,newUrl.name).then(async(buffer)=>{
//          await this.upload(buffer,newUrl.name);
//         })
//       })
//     })
//   }

//  async upload(buffer,name){
//     let blob = new Blob([buffer],{type:"images/jpeg"})

//     let storage = firebase.storage();

//     storage.ref('images/' + name).put(blob).then((d)=>{
//       alert("Done");
//     }).catch((error)=>{
//       alert(JSON.stringify(error))
//     })
//   }

  ngOnInit() {
    this.chatApp.read_Images().subscribe(data => {
 
      this.imagesFire = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
           Picture: e.payload.doc.data()['Picture'],// might rename to Name instead of Picture
        };
      })
      console.log(this.imagesFire);
 
    });
  }

  CreateRecord() {
    let record = {};
    record['Picture'] = this.imageName;
    // record['Age'] = this.studentAge;
    // record['Address'] = this.studentAddress;
    this.chatApp.create_NewImageCollection(record).then(resp => {
      this.imageName = "";
      // this.studentAge = undefined;
      // this.studentAddress = "";
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }
 
  RemoveRecord(rowID) {
    this.chatApp.delete_Images(rowID);
  }
 
  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Picture;
    // record.EditAge = record.Age;
    // record.EditAddress = record.Address;
  }
 
  UpdateRecord(recordRow) {
    let record = {};
    record['Picture'] = recordRow.EditName;
    // record['Age'] = recordRow.EditAge;
    // record['Address'] = recordRow.EditAddress;
    this.chatApp.update_Images(recordRow.id, record);
    recordRow.isEdit = false;
  }
 

}
