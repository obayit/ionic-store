import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = 'obayitWithUser@gmail.com';
  password: string = 'poakshdq!#@$DS';
  loginSpinner = false;

  constructor(
    public alertController: AlertController,
    public afAuth: AngularFireAuth,
    public router: Router,
    public authService: AuthService,
  ) { }

  ngOnInit() {
  }
  async login(){
    this.loginSpinner = true;
    try{
      let res = await this.authService.login(this.email, this.password);
      this.router.navigateByUrl('store-items');
    }catch(error){
      const alert = await this.alertController.create({
        header: 'Login Failed',
        subHeader: '',
        message: error,
        buttons: ['OK']
      });
      console.log(error);
      await alert.present();
    }
    this.loginSpinner = false;
  }

}
