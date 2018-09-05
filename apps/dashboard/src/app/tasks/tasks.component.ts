import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, TasksFacade } from '@workspace/common-data';
import { Pomo, PomosFacade } from '@workspace/common-data'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks$: Observable<Task[]> = this.tasksFacade.allTasks$;
  taskPomos$: Observable<Pomo[]> = this.pomosFacade.taskPomos$;
  pomos$: Observable<Pomo[]>= this.pomosFacade.allPomos$;
  currentTask$: Observable<Task> = this.tasksFacade.currentTask$;

  constructor(private tasksFacade: TasksFacade, private pomosFacade: PomosFacade) { }

  ngOnInit() {
    this.tasksFacade.loadAll();
    this.pomosFacade.loadAll();
    this.tasksFacade.mutations$.subscribe(_ => this.resetCurrentTask());
    this.resetCurrentTask();
  }

  resetCurrentTask() {
    this.selectTask({id: null});
  }

  selectTask(task) {
    this.tasksFacade.selectTask(task.id);
    this.taskPomos$.subscribe(val => console.log(val))
  }

  saveTask(task) {
    if (!task.id) {
      this.tasksFacade.addTask(Task);
    } else {
      this.tasksFacade.updateTask(Task);
    }
  }

  deleteTask(task) {
    this.tasksFacade.deleteTask(Task);
  }
}
