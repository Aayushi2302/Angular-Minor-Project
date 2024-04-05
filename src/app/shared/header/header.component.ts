import { Component, OnInit, inject } from '@angular/core';
import { MenuItem } from "primeng/api";
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;
  role: string;
  userService = inject(UserService);

  ngOnInit() {
    this.role = this.userService.getRole();
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
      {label: "Reservations"} 
    ]; 
  }
}
