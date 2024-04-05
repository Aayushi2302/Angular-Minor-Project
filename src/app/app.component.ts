import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './shared/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'ParkSafe';
  router = inject(Router);
  userService = inject(UserService);

  ngOnInit() {
    
  }

  getCurrentRoute(): Boolean {
    if (this.router.url === "/login") return false;
    else return true;
  }
}
