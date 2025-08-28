import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrewComponent } from './crew/crew.component';
import { MembersComponent } from './members/members.component';
import { OnePieceComponent } from './one-piece/one-piece.component';

const routes: Routes = [
  { path: '', redirectTo: 'onepiece', pathMatch: 'full' },
  { path: 'members', component: MembersComponent },
  { path: 'one_piece', component: OnePieceComponent },
  { path: 'crews', component: CrewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
