import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authSvc: AuthService,
              private router: Router) { }

  ngOnInit() {
    // Muestra los datos de la Sesión del Usuario en la consola
    // this.authSvc.authStateUser()
    // .subscribe(user => {
    //   console.log('userdata->',user);
    // });
  }

  // Logea al usuario con Email y Contraseña
  async onLogin(email, password) {
    try {
      const user = await this.authSvc.login(email.value, password.value);
      if(user){
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }
    } catch (error) {
      console.log('Error->', error);
    }
  }

  // Logea al usuario con Google
  async onLoginGoogle() {
    try {
      const user = await this.authSvc.loginGoogle();
      if(user){
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }
    } catch (error) {
      console.log('Error->', error);
    }
  }

  // Verifica que el email del usuario se encuentre verificado y redirecciona
  private  redirectUser(isVerified: boolean): void {
    if(isVerified){
      this.router.navigateByUrl('/home');
    }else{
      this.router.navigateByUrl('/verify-email');
    }
  }

}
