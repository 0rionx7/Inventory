import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';

import { Subscription } from 'rxjs';

import { MenuItem } from '../../shared/models';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.scss'],
})
export class EditMenuComponent implements OnInit, OnDestroy {
  @ViewChild('subMenusNo', { static: true }) subMenusNo: FormControl;
  @ViewChild('selectedMain', { static: true }) selectedMain: FormControl;
  @Input() menuItems: MenuItem[];
  @Output() closeForm = new EventEmitter<void>();
  editMenuForm: FormGroup;
  valueSub: Subscription;
  checked = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.editMenuForm = this.fb.group({
      mainMenu: ['', Validators.required],
      subMenus: this.fb.array([]),
    });
    this.addSubMenus();
    this.valueSub = this.subMenusNo.valueChanges.subscribe((_) =>
      this.addSubMenus()
    );
    this.selectedMain.valueChanges.subscribe((value) =>
      this.editMenuForm.patchValue({ mainMenu: value.mainMenu })
    );
  }

  get subMenus(): FormArray {
    return this.editMenuForm.get('subMenus') as FormArray;
  }

  addSubMenus(): void {
    if (this.subMenus.controls.every((control) => control.value === null))
      this.subMenus.clear();
    for (let i = 0; i < this.subMenusNo.value; i++)
      this.subMenus.push(this.fb.control(null, Validators.required));
  }

  //   patchForm(items:MenuItem[]):void {
  // items.forEach(item=> this.)
  //   }
  onSubmit(f): void {
    console.log(f);
    // this.editMenuForm.get();
  }

  ngOnDestroy(): void {
    this.valueSub.unsubscribe();
  }

  onSelect() {
    console.log('aleeee');
  }
}
