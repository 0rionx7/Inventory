import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  style,
  state,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-side-nav-sm',
  templateUrl: './side-nav-sm.component.html',
  styleUrls: ['./side-nav-sm.component.scss'],
  animations: [
    trigger('toggle', [
      state(
        'closed',
        style({
          transform: 'translateX(0)',
          margin: '8px',
        })
      ),
      state(
        'opened',
        style({
          transform: 'translateX(240px) rotate(180deg)',
          margin: '8px',
        })
      ),
      transition('opened <=> closed', animate('0.3s')),
    ]),
  ],
})
export class SideNavSmComponent implements OnInit {
  @Output() toggleExpantion = new EventEmitter<void>();
  toggle = 'closed';

  constructor() {}

  ngOnInit(): void {}

  onToggle() {
    this.toggle = this.toggle === 'closed' ? 'opened' : 'closed';
    this.toggleExpantion.emit();
  }
}
