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

import { AngularFirestore } from '@angular/fire/firestore';
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
  valueSub2: Subscription;
  checked = false;
  constructor(private fb: FormBuilder, private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.editMenuForm = this.fb.group({
      mainMenu: ['', Validators.required],
      subMenus: this.fb.array([]),
    });
    this.addSubMenus();
    this.valueSub = this.subMenusNo.valueChanges.subscribe((_) => {
      this.addSubMenus();
    });
    this.valueSub2 = this.selectedMain.valueChanges.subscribe((value) => {
      if (value) this.fillForm(value);
    });
  }

  get subMenus(): FormArray {
    return this.editMenuForm.get('subMenus') as FormArray;
  }

  fillForm(value: MenuItem) {
    this.subMenus.clear();
    value.subMenus.forEach((_) =>
      this.subMenus.push(this.fb.control(null, Validators.required))
    );
    this.editMenuForm.patchValue(value);
  }

  addSubMenus(): void {
    if (this.subMenus.controls.every((control) => control.value === null))
      this.subMenus.clear();
    for (let i = 0; i < this.subMenusNo.value; i++)
      this.subMenus.push(this.fb.control(null, Validators.required));
  }

  onSubmit(editMenuForm: FormGroup): void {
    this.firestore
      .doc('menuItems/sideMenu')
      .set({ test: 'ale' }, { merge: true });
  }

  ngOnDestroy(): void {
    this.valueSub.unsubscribe();
    this.valueSub2.unsubscribe();
  }
}
