import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, inject } from '@angular/core';
import { MenuItem } from "primeng/api";
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  userService = inject(UserService);
  authService = inject(AuthService);
  router = inject(Router);
  
  items: MenuItem[] | undefined;
  role: string;
  name: string;
  dropdownOptions: MenuItem[] | undefined;

  ngOnInit() {

    this.dropdownOptions = [
      {
        label: "View Profile",
        icon: "pi pi-user",
        command: () => {
          this.router.navigate(["view-profile"]);
        }
      },
      {
        label: "Change Password",
        icon: "pi pi-key",
        command: () => {
          this.router.navigate(["change-password"]);
        }
      },
      {
        label: "Logout",
        icon: "pi pi-sign-out",
        command: () => {
          this.authService.logout();
          this.router.navigate(["login"]);
        }
      }
    ]

    this.role = this.userService.getRole();
    this.name = this.userService.getName();
    this.items = [ 
      {
        label: this.role === "admin" ? "Employee" : "Customer", 
        routerLink: this.role === "admin" ? "employees" : "customers",
      },
      {
        label: "Vehicle Type", 
        routerLink: "vehicle-types",
      },
      {
        label: "Parking Slots",
        routerLink: "parking-slots",
      },
      {
        label: "Reservations",
        routerLink: "reservations"
      } 
    ]; 
  }
}
