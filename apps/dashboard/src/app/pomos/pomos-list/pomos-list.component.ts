import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pomo } from '@workspace/common-data';

@Component({
  selector: 'app-pomos-list',
  templateUrl: './pomos-list.component.html',
  styleUrls: ['./pomos-list.component.css']
})
export class PomosListComponent {
  @Input() pomos: Pomo[];
  @Input() readonly = false;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
