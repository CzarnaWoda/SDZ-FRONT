import { AnimalsService } from './../animals.service';
import { data } from 'autoprefixer';
import { AuthService } from './../auth/auth.service';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Information, InformationService } from './information.service';
import { Modal, initFlowbite } from 'flowbite';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrErrorComponent } from '../toastr/toastrerror.component';
import { ToastrService } from 'ngx-toastr';
import { Animal } from '../animals.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  @ViewChild('buttonContainer', { static: false }) buttonContainer!: ElementRef;


  information!: Information;

  form!: FormGroup;

  avatar!: string;

  adminAccess!: boolean;

  favorites: Animal[] = [];



  constructor(private auth: AuthService,private animalService: AnimalsService,private service: InformationService,private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService) {

    this.form = this.formBuilder.group({
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postal_code: ['', [Validators.required]],
      phone_number: ['' ,[Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    });
  }
  routeFavourites(): void {
    this.router.navigate(['/profile/favorites']);
  }
  routeMeetings(): void {
    this.router.navigate(['/profile/meetings']);
  }

  ngOnInit(): void {

    this.route.data.subscribe(data => {
      //this.information = data.Information;
      console.log(data[0].information);

      this.information = data[0].information;


      this.avatar = this.information.firstName.charAt(0).toUpperCase() + this.information.lastName.charAt(0).toUpperCase();


      setTimeout(() => {
        initFlowbite();
      }, 100);

    });
    setTimeout(() => {
      initFlowbite();
    }, 100);


    this.auth.checkAdminAccess();
    this.auth.getAdminAccess().subscribe(adminAccess => {
      this.adminAccess = adminAccess;

      if(adminAccess){
        //            <a  [class.hidden]="!admin" type="button" (click)="adminTools()" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Admin Tools</a>
        const adminToolsLink = document.createElement('a');
        adminToolsLink.textContent = 'Admin Tools';
        adminToolsLink.classList.add('inline-flex', 'items-center', 'px-4', 'py-2', 'text-sm', 'font-medium', 'text-center', 'text-white', 'bg-red-700', 'rounded-lg', 'hover:bg-red-800', 'focus:ring-4', 'focus:outline-none', 'focus:ring-red-300', 'dark:bg-red-600', 'dark:hover:bg-red-700', 'dark:focus:ring-red-800');
        adminToolsLink.addEventListener('click', () => this.adminTools());
        this.buttonContainer.nativeElement.appendChild(adminToolsLink);

      }
    });

  }
  adminTools(){
    console.log("admin");
    this.router.navigate(['/admintools']);
  }

  onSubmit(event: Event){
    let postInfo: Information = {
      firstName: this.form.controls['firstName'].value,
      lastName: this.form.controls['lastName'].value,
      street: this.form.controls['street'].value,
      city: this.form.controls['city'].value,
      postal_code: this.form.controls['postal_code'].value,
      phone_number: this.form.controls['phone_number'].value
    };
    console.log(postInfo);

    if(this.form.controls['street'].invalid || this.form.controls['city'].invalid || this.form.controls['postal_code'].invalid){
      this.toastr.error('Podaj poprawny adres', 'Podaj poprawny adres', {
        toastComponent: ToastrErrorComponent
      });
      return;
    }
    if(this.form.controls['firstName'].invalid || this.form.controls['lastName'].invalid || this.form.controls['phone_number'].invalid){
      this.toastr.error('Podaj poprawne dane!', 'Podaj poprawne dane!', {
        toastComponent: ToastrErrorComponent
      });
      return;
    }

    this.service.postInformation(postInfo).subscribe(
      data => console.log('Success!', data),
      error => console.log('Error!', error)
    );

    const target = document.getElementById('crud-modal');

    const modal = new Modal(target);

    modal.hide();

    this.service.getInformation().subscribe(data => {
      this.information = data.information;
      console.log(this.information);


      this.avatar = this.information.firstName.charAt(0).toUpperCase() + this.information.lastName.charAt(0).toUpperCase();
    });

  }

}
