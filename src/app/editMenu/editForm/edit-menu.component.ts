import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { Subscription } from 'rxjs';

import { MenuItem } from '../../shared/models';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.scss'],
})
export class EditMenuComponent implements OnInit, OnDestroy {
  @Input() menuItems: MenuItem[];
  @Output() closeForm = new EventEmitter<void>();
  editMenuForm: FormGroup;
  valueSub: Subscription;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.editMenuForm = this.fb.group({
      mainMenu: ['', Validators.required],
      subMenusNo: [0, Validators.required],
      subMenus: this.fb.array([]),
    });
    this.addSubMenus();
    this.valueSub = this.editMenuForm
      .get('subMenusNo')
      .valueChanges.subscribe((_) => this.addSubMenus());
  }

  get mainMenus(): FormArray {
    return this.editMenuForm.get('mainMenus') as FormArray;
  }

  get subMenus(): FormArray {
    return this.editMenuForm.get('subMenus') as FormArray;
  }

  addSubMenus(): void {
    if (this.subMenus.controls.every((control) => control.value === null))
      this.subMenus.clear();
    for (let i = 0; i < this.editMenuForm.get('subMenusNo').value; i++)
      this.subMenus.push(this.fb.control(null, Validators.required));
  }

  //   patchForm(items:MenuItem[]):void {
  // items.forEach(item=> this.)
  //   }
  onSubmit(f): void {
    console.log(f);
  }

  ngOnDestroy(): void {
    this.valueSub.unsubscribe();
  }
}
