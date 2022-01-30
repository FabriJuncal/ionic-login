import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgoutPasswordPage } from './forgout-password.page';

const routes: Routes = [
  {
    path: '',
    component: ForgoutPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgoutPasswordPageRoutingModule {}
