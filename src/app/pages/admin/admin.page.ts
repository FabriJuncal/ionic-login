import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(private authSvc: AuthService) { }

  ngOnInit() {
  }

  // Deslogea al usuario
  async onLogout(){
    await this.authSvc.logout();
  }

}
