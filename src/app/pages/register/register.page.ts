import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authSvc: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  // Registra un nuevo usuario
  async onRegister(email, password) {
    try {
      const user = await this.authSvc.register(email.value, password.value);

      if(user){
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }
    } catch (error) {
      console.log('Error',error);
    }
  }

  // Verifica que el email del usuario se encuentre verificado y redirecciona
  private redirectUser(isVerified: boolean): void {
    if(isVerified){
      this.router.navigateByUrl('/admin');
    }else{
      this.router.navigateByUrl('/verify-email');
    }
  }

}
