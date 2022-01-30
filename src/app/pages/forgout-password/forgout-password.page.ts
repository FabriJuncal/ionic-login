import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgout-password',
  templateUrl: './forgout-password.page.html',
  styleUrls: ['./forgout-password.page.scss'],
})
export class ForgoutPasswordPage implements OnInit {

  constructor(private authSvc: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  async onResetPassword(email) {
    try {

      await this.authSvc.resetPassword(email.value);
      this.router.navigate(['/login']);

    } catch (error) {
      console.log('Error->',error);
    }
  }

}
