import { Routes } from '@angular/router';
import { ExpenseComponent } from './pages/expense/expense.component';
import { ExpenseFormComponent } from './pages/expense-form/expense-form.component';

export const routes: Routes = [
    {path:'',component:ExpenseComponent},
    {path:'expense-form',component:ExpenseFormComponent},
    {path:'expense-form/:id',component:ExpenseFormComponent},
];
