import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IExpense } from '../../core/services/models/common.model';
import { ExpenseService } from '../../core/services/expense.service';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})
export class ExpenseComponent implements OnInit{
  expenses: IExpense[]=[];
  totalExpenses=0;
  constructor(private expenseService:ExpenseService, private router:Router){}
  ngOnInit(): void {
    this.getAllExpenses();
  }
  getAllExpenses(){
    this.expenseService.getAllExpenses().snapshotChanges().subscribe({
      next: (data)=>{
        this.expenses=[];
        data.forEach((item)=>{
          let expense= item.payload.toJSON() as IExpense;
          this.totalExpenses += parseInt(expense.price);
          this.expenses.push({
            key: item.key || '',
            title: expense.title,
            description: expense.description,
            price: expense.price
          })
        }) 
      },
    });
  }
  editExpense(key:string){
    console.log(key);
    this.router.navigate(['/expense-form/' + key]);
   
  }
  removeExpense(key:string){
    if(window.confirm('Are you sure to remove?')){
      this.expenseService.deleteExpense(key);
    }
  }
}