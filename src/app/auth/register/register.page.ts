import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user = new User();

  constructor(public authService: AuthService,
    public alertController: AlertController,
    private fb: FormBuilder) { }

  ngOnInit() {
  }
  register(){
    this.validateData();
    this.authService.registerUser(this.user);
  }
  validateData(){
    let validationHeader = 'Input Error';
    if(this.user.password ) { //!= this.confirmPassword){
      this.showAlert(validationHeader, 'Password Mismatch',
      'The "password" and "confirm password" don\'t match');
    }
    if(this.user.name === ''){
      this.showAlert(validationHeader, 'Empty Name',
      'Please enter a username');
    }
    // if(this.user.password.regex.match('^([a-z0-9_.]){5,30}$')){
    //   this.showAlert(validationHeader, 'Empty Password',
    //   'Please enter a password');
    // }
    this.authService.registerUser(this.user);
  }
  async showAlert(header:string, message: string, subheader: string){
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
    email: ['obayit@gmail.com', Validators.required],
    password: ['poakshdq!#@$DS', Validators.required],
    confirmPassword: ['poakshdq!#@$DS', Validators.required],
    address: this.fb.group({
      street: ['Al Mauna'],
      city: ['Bahri'],
      state: ['Khartoum'],
    }),
  });
  onSubmit(){
    console.log(this.userForm);
  }
}
