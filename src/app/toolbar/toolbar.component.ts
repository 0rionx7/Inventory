import { ButtonModel } from './../models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  buttons: ButtonModel[] = [
    { icon: 'dialpad', content: 'Redial' },
    { icon: 'voicemail', content: 'Check voicemail' },
    { icon: 'notifications_off', content: 'Disable alerts' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
