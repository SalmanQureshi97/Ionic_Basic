import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDetailComponent } from './home-detail/home-detail.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: ':username',
    component: HomeDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
