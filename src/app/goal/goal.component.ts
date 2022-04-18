import { Goals } from './../goalList';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Goal } from '../goal';
import { GoalService } from '../goal-service/goal.service';
import { Quote } from '../quote-class/quote';
import { QuoteRequestService } from '../quote-http/quote-request.service';


@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css'],
  providers: [GoalService]
})
export class GoalComponent implements OnInit {  
  
  goals:Goal[];
  quote!:Quote;
  
  goToUrl(id:number){
    this.router.navigate(['/goals',id])
  }

  deleteGoal(index:number){
    let toDelete = confirm(`Are you sure you want to delete ${this.goals[index].name}`)

    if (toDelete){
      this.goals.splice(index,1)
    }
  }
  addNewGoal(goal:any){
    let goalLength = this.goals.length;
    goal.id = goalLength+1;
    goal.completeDate = new Date(goal.completeDate)
    this.goals.push(goal)
  }
  
  // toggleDetails(index:number){
  //   this.goals[index].showDescription = !this.goals[index].showDescription;
  // }  completeGoal(isComplete:boolean, index:number){
  //   if (isComplete) {
  //     this.goals.splice(index,1);
  //   }
  // }
  // deleteGoal(isComplete:boolean, index:number){
  //   if (isComplete) {
  //     let toDelete = confirm(`Are you sure you want to delete ${this.goals[index].name}?`)      
      
  //     if (toDelete){
  //       this.goals.splice(index,1)
  //     }
  //   }
  // }
  constructor(goalService:GoalService, private http:HttpClient, private quoteService:QuoteRequestService, private router:Router) {
    this.goals = goalService.getGoals()
  }  
  
  
  ngOnInit() {

    this.quoteService.quoteRequest()
    this.quote = this.quoteService.quote

    interface ApiResponse{
      author:string;
      quote:string;
    }

    this.http.get<ApiResponse>("http://quotes.stormconsultancy.co.uk/random.json").subscribe(data=>{
      // Succesful API request
      this.quote = new Quote(data.author, data.quote)
    },err=>{
      this.quote = new Quote("Winston Churchill","Never never give up!")
      console.log("An error occurred")
    })
  }

}