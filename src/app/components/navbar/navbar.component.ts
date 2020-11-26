import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  public app_name = 'BookStore';
  public isLogged = false;
  constructor(
    private authService: AuthService,
    private afsAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(
      auth => {
        if (auth) {
          console.log('Is logged');
          this.isLogged = true;
        } else {
          console.log('Not logged');
          this.isLogged = false;
        }
      }
    );
  }

  onLogout() {
    this.afsAuth.signOut();
  }

}
