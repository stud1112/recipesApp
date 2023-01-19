import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { entityServiceToken } from 'src/app/core/services/entityService'
import { EPermission, SuppliersClient } from 'src/app/services/web-api-client'
import { WorkbenchComponent } from './workbench.component'
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { MatSelectModule } from '@angular/material/select'
import { MatRadioModule } from '@angular/material/radio'
import { MatButtonModule } from '@angular/material/button'
import { ReactiveFormsModule } from '@angular/forms'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'

const routes: Routes = [{ path: '', component: WorkbenchComponent, data: { permissions: [EPermission.Suppliers_View] } }]

@NgModule({
  declarations: [WorkbenchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatIconModule,
    MatMenuModule,
  ],
  // providers: [{ provide: entityServiceToken, useClass: SuppliersClient }],
})
export class WorkbenchModule {}
