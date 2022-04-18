import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Goal } from '../goal';
import {  ActivatedRoute, ParamMap } from '@angular/router';
import { GoalService } from '../goal-service/goal.service';

@Component({
  selector: 'app-goal-detail',
  templateUrl: './goal-detail.component.html',
  styleUrls: ['./goal-detail.component.css']
})
export class GoalDetailComponent implements OnInit {


  @Input() 'goal': Goal;
  @Output() isComplete = new EventEmitter<boolean>();

  goalDelete(complete:boolean){
    this.isComplete.emit(complete);
  }
  constructor(private route:ActivatedRoute, private service:GoalService) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.goal = this.service.getGoal(id)
  }

}
// import { Component, Input, OnInit } from '@angular/core';
// import { Goal } from '../goal';

// @Component({
//   selector: 'app-goal-detail',
//   templateUrl: './goal-detail.component.html',
//   styleUrls: ['./goal-detail.component.css']
// })
// export class GoalComponent implements OnInit {
  
  
//     toggleDetails(index){
//       this.goals[index].showDescription = !this.goals[index].showDescription;
//     }
  
//     constructor() { }
  
//     ngOnInit() {
//     }
  
//   }
  
// export class GoalDetailComponent implements OnInit {

//   @Input() 'goal': Goal;
//   constructor() { }

//   ngOnInit(): void {
//   }

// }
