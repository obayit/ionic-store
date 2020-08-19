import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-indicator',
  templateUrl: './user-indicator.component.html',
  styleUrls: ['./user-indicator.component.scss'],
})
export class UserIndicatorComponent implements OnInit {
  currentUser: User;
  currentUsername: string;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    if(this.authService.currentUser){
      this.authService.currentUser.subscribe(user => {
        this.currentUser = user[0];
      });
    }
  }

}
