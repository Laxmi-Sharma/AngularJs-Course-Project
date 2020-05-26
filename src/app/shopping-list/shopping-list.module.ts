import { NgModule } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoggingService } from '../logging.service';

@NgModule({
    declarations :[  
         ShoppingListComponent,
        ShoppingEditComponent,],
    imports:[
        RouterModule.forChild([
            {path:'',component:ShoppingListComponent},
        ]),
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ],
    // providers:[LoggingService]
})
export class ShoppingListModule{

}