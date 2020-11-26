import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public email: string = '';
  public password: string = '';
  public isError: boolean = false;
  public msgError: string = '';
  uploadPercent: Observable<number>;
  public urlImagen: Observable<string>;

  @ViewChild('imageUser', { static: true }) inputImageUser: ElementRef;
  constructor(
    private authService: AuthService,
    private router: Router,
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
  }

  onAddUser() {
    this.authService.registerUser(this.email, this.password)
      .then((res) => {
        this.authService.isAuth().subscribe( user => {
          if (user) {
            user.updateProfile({
              displayName: '',
              photoURL: this.inputImageUser.nativeElement.value
            }).then( () => {
              this.router.navigate(['admin/list-books']);
            }).catch( (err) => console.log('err', err));
          }
        });
      }).catch(
        err => {
          console.log('Error', err.message);
          this.msgError = err.message;
          this.isError = true;
      });
  }

  onUpload(e) {
    // Generar id unico de la imagen
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImagen = ref.getDownloadURL())).subscribe();
  }

  onLoginGoogle(): void {
    this.authService.loginGoogleUser()
      .then((res) => {
        this.onLoginRedirect();
      }).catch((err) => console.log('Error', err.message));
  }

  onLoginFacebook(): void {
    this.authService.loginFacebookUser()
      .then( (res) => {
        this.onLoginRedirect();
      }).catch((err) => console.log('Error', err.message));
  }

  onLoginRedirect(): void {
    this.router.navigate(['admin/list-books']);
  }

  onLogout() {
    this.authService.logoutUser();
  }

}
