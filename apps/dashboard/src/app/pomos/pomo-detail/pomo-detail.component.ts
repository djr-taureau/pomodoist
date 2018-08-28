import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pomo } from '@workspace/common-data';

@Component({
  selector: 'app-pomo-detail',
  templateUrl: './pomo-detail.component.html',
  styleUrls: ['./pomo-detail.component.css']
})
export class PomoDetailComponent {
  originalNotes: string;
  selectedPomo: Pomo;
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  @Input() set pomo(value: Pomo) {
    if (value) { this.originalNotes = value.notes; }
    this.selectedPomo = Object.assign({}, value);
  }
}
