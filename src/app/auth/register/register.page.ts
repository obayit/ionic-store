import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export const matchPassword: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password && confirmPassword && password.value != confirmPassword.value ?
  {matchPassword: 'Passwords don\'t match'} : null;
};

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  currentUser: User;
  currentUsername: string;
  user = new User();
  registerSpinner = false;

  constructor(public authService: AuthService,
    public alertController: AlertController,
    public afAuth: AngularFireAuth,
    public router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    if(this.authService.currentUser){
      this.authService.currentUser.subscribe(user => {
        this.currentUser = user[0];
      });
    }
  }
  async showAlert(header:string, message: string, subheader: string = ''){
    //maybe useful to show/handle backend errors;
    const alert = await this.alertController.create({
      header: header,
      subHeader: subheader,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
  userForm = this.fb.group({
    name: ['Ubay Abdelgadir', Validators.required],
    email: ['obayitWithUser@gmail.com', [Validators.required, Validators.email]],
    password: ['poakshdq!#@$DS', Validators.required],
    confirmPassword: ['poakshdq!#@$DS', Validators.required],
    address: this.fb.group({
      street: ['Al Mauna'],
      city: ['Bahri'],
      state: ['Khartoum'],
      // country: ['Sudan'] not that simple, countries have ISO code
    })
  }, { validators: matchPassword });
  async onSubmit(){
    this.registerSpinner = true;
    let user = new User();
    user.name = this.name.value;
    user.email = this.email.value;
    user.address = this.address.value;
    try{
    await this.authService.registerUser(user, this.password.value);
    }catch(error){
      this.showAlert('Registration Failed', error);
      console.log(error);
    }
    this.registerSpinner = false;
    this.router.navigateByUrl('/store-items');
  }
  get name() { return this.userForm.get('name'); }
  get email() { return this.userForm.get('email'); }
  get password() { return this.userForm.get('password'); }
  get confirmPassword() { return this.userForm.get('confirmPassword'); }
  get address() { return this.userForm.get('address'); }
}
