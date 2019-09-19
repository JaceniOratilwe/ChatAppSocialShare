import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ChatAppService } from '../services/chat-app.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  userEmail: string;
  constructor(private navCtrl: NavController,private chatApp : ChatAppService) { }

  ngOnInit() {
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

}
