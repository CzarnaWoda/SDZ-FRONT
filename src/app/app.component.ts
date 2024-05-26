import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'SDZ';

  constructor(private authService: AuthService, private router: Router){
    const token = localStorage.getItem('token');
    if (token != null) {
      this.authService.checkLoginStatus();
    }
    router.navigate(["/"]);

  }

  ngOnInit(): void {
      initFlowbite();
  }
}
