import { Directive, Input, HostBinding, HostListener, Output, EventEmitter, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { DroppableService, DroppableEvent } from './droppable.service';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[dfDropZone]'
})
export class DropZoneDirective implements OnInit, OnDestroy {

  @Input('dfDropZone') groups = [];

  @HostBinding('class.droppable-accepting') accepting = false;
  @HostBinding('class.droppable-over') over = false;

  @Output() drop = new EventEmitter<DroppableEvent>();
  @Output() dragOver = new EventEmitter<void>();
  @Output() dragLeave = new EventEmitter<void>();
  private _dragDestroy$ = new Subject();

  private _destroy$ = new Subject();
  private _timer;

  constructor(private service: DroppableService, private _elementRef: ElementRef) {}

  ngOnInit(): void {
    this.service.dragStart$
      // .pipe(takeUntil(this._destroy$))
      .subscribe(event => {
        if (!this.groups || this.groups.indexOf(event.group) !== -1) {
          this.accepting = true;
        }
      });

    this.service.dragEnd$
      // .pipe(takeUntil(this._destroy$))
      .subscribe(event => {
          if (this.over) {
            this.drop.emit(event);
          }

          this.over = false;
          this.accepting = false;
        });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  @HostListener('pointermove')
  @HostListener('pointerdown')
  onPointerInside() {
    console.log('pointer move');
    if (this.accepting) {
      this.over = true;
      this._timer = setTimeout(() => this.dragOver.emit(), 100);
    }
  }

  @HostListener('pointerleave')
  onPointerLeave() {
    console.log('pointer leave');
    this.over = false;
    clearTimeout(this._timer);
    this.dragLeave.emit();
  }

  @HostListener('drag')
  dragover() {
    console.log('!!!!!')
  }

}
