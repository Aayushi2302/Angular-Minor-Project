import { Component, OnInit } from '@angular/core';
import { UserInterface } from '../../shared/user/user.interface';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.css'
})
export class ViewProfileComponent implements OnInit{

  userData: UserInterface;

  ngOnInit() {
    this.userData = JSON.parse(sessionStorage.getItem("user"));
  }
}
