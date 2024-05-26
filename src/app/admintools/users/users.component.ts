import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInformation, UsersService } from './users.service';
import { ToastrService } from 'ngx-toastr';
import { ToastrErrorComponent } from '../../toastr/toastrerror.component';
import { ToastrSuccessComponent } from '../../toastr/toastrsucess.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  users!: UserInformation[];
  constructor(private route: ActivatedRoute, private service: UsersService, private toastr: ToastrService, private router: Router) {

  }


  ngOnInit(): void {
    this.route.data.subscribe(data => {
      console.log(data[0].data);

      this.users = data[0].data;

      console.log('test', this.users);

    });
  }


  removeUser(id:number): void{
    this.service.removeUser(id).subscribe(data => {
      this.toastr.success("Uzytkownik zostal usuniety", "Uzytkownik zostal usuniety", {
        toastComponent: ToastrSuccessComponent
      });
      this.router.navigate(['admintools']);
    }, error => {
      this.toastr.error("Wystapil blad", "Wystapil blad", {
        toastComponent: ToastrErrorComponent
      })
    });
  }
  addAdmin(id: number): void {
    this.service.grantAdmin(id).subscribe(data => {

      this.toastr.success("Uzytkownik zostal uprawniony do zarzadzania", "Uzytkownik zostal uprawniony do zarzadzania", {
        toastComponent: ToastrSuccessComponent
      })
    }, error => {
      this.toastr.error("Wystapil blad", "Wystapil blad", {
        toastComponent: ToastrErrorComponent
      })
    });

  }
  removeAdmin(id: number): void {
    this.service.removeAdmin(id).subscribe(data => {

      this.toastr.success("Uzytkownikowi zostaly zabrane uprawnienia", "Uzytkownikowi zostaly zabrane uprawnienia", {
        toastComponent: ToastrSuccessComponent
      })
    }, error => {
      this.toastr.error("Wystapil blad", "Wystapil blad", {
        toastComponent: ToastrErrorComponent
      })
    });

  }



}
