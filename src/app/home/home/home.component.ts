import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  speakers: any[] = [];

  users: any[] = [];

  constructor(private userData: DataService) {}

  ngOnInit() {
    this.userData.API_getUsers();
  }

  ionViewDidEnter() {
    this.userData.getAllUsers().then((data) => {
      this.users = data;
      // this.users.filter(obj => obj.username != )
      this.userData.getUsername().then((username) => {
        this.users = this.users.filter((obj) => obj.username != username);
      });
    });
  }
}
