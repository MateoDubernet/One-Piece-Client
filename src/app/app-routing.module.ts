import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrewComponent } from './crew/crew.component';
import { MembersComponent } from './members/members-grid.component';
import { OnePieceComponent } from './one-piece/one-piece.component';

const routes: Routes = [
  { path: '', redirectTo: 'onepiece', pathMatch: 'full' },
  { path: 'members', component: MembersComponent },
  { path: 'onepiece', component: OnePieceComponent },
  { path: 'crew', component: CrewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
