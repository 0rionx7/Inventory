import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-array-input',
  template: './array-input.component.html',
  styles: [``],
})
export class ArrayInputComponent implements OnInit {
  @Input() name: string;
  @Input() itemsArray: string[];
  constructor() {}

  ngOnInit(): void {}
}
