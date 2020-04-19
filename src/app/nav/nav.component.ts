import { Component, OnInit, Input } from '@angular/core';

import { ButtonModel } from '../models';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  show = false;
  buttons: ButtonModel[] = [
    { icon: 'dialpad', content: 'Redial' },
    { icon: 'voicemail', content: 'Check voicemail' },
    { icon: 'notifications_off', content: 'Disable alerts' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
