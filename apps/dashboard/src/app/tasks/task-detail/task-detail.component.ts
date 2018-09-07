
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, Pomo } from '@workspace/common-data';
import { TotalTimePipe } from './../../shared/pipes/total-time.pipe';

@Component({
  selector: 'app-task-detail',
  template: `
  <mat-card>
  <mat-card-header>
    <mat-card-title>
      <h1>
        <span *ngIf="selectedTask.id; else prompt">{{originalContent}}</span>
        <ng-template #prompt>Task Pomos</ng-template>
      </h1>
    </mat-card-title>
  </mat-card-header>
  <form (submit)="saved.emit(selectedTask)">
    <mat-card-content>
      <mat-form-field class="full-width">
        <input readonly matInput placeholder="project_id" [(ngModel)]="selectedTask.project_id" type="text" name="project_id">
      </mat-form-field>
      <mat-form-field class="full-width">
        <input readonly matInput placeholder="completed" [(ngModel)]="selectedTask.completed" type="text" name="completed">
      </mat-form-field>
      <mat-list>
        <mat-list-item *ngFor="let pomo of taskPomos">
          <h2 mat-line>{{pomo.notes}}</h2>
          <h3 mat-line>{{pomo.date}}</h3>
          <h4 mat-line>{{pomo.task_id}}</h4>
        </mat-list-item>
      </mat-list>
      <h5>Total Time Worked on Task: {{ taskPomos.length }}</h5>
    </mat-card-content>
    <mat-card-actions>
    </mat-card-actions>
  </form>
</mat-card>

  `,
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent {
  originalContent: string;
  selectedTask: Task;

  @Input() taskPomos: Pomo[];
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  @Input() set task(value: Task) {
    if (value) { this.originalContent = value.content; }
    this.selectedTask = Object.assign({}, value);
  }
}
