import { Component, OnInit, Input } from '@angular/core';

import { ButtonModel } from '../models';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  @Input() buttons: ButtonModel[];
  constructor() {}

  ngOnInit(): void {}
}
