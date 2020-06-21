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

import { MenuItem } from '../../navigation/models/menuItem';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.scss'],
  preserveWhitespaces: true,
})
export class EditMenuComponent implements OnInit, OnDestroy {
  @ViewChild('subMenusNo', { static: true }) subMenusNo: FormControl;
  @ViewChild('selectedMain', { static: true }) selectedMain: FormControl;
  @Input() menuItems: MenuItem[];
  @Output() closeForm = new EventEmitter<void>();
  editMenuForm: FormGroup;
  valueSub: Subscription;
  valueSub2: Subscription;
  constructor(private fb: FormBuilder, private afs: AngularFirestore) {}

  ngOnInit(): void {
    this.editMenuForm = this.fb.group({
      mainMenu: ['', Validators.required],
      icon: ['', Validators.required],
      subMenus: this.fb.array([]),
    });
    this.addSubMenus();
    this.valueSub = this.subMenusNo.valueChanges.subscribe((_) => {
      this.addSubMenus();
    });
    this.valueSub2 = this.selectedMain.valueChanges.subscribe((value) => {
      if (value) {
        this.fillForm(value);
      }
    });
  }

  get subMenus(): FormArray {
    return this.editMenuForm.get('subMenus') as FormArray;
  }

  fillForm(value: MenuItem) {
    this.subMenus.clear();
    if (value.subMenus)
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
    const existing = this.menuItems.filter(
      (el) =>
        el.mainMenu === editMenuForm.value.mainMenu ||
        el.mainMenu === this.selectedMain.value.mainMenu
    );
    const id =
      existing.length != 0
        ? existing[0].id
        : this.menuItems.slice(-1)[0].id + 1;
    this.afs
      .doc('menuItems/sideMenu1')
      .set({ [id]: { ...editMenuForm.value, id } }, { merge: true });
    this.closeForm.emit();
  }

  ngOnDestroy(): void {
    this.valueSub.unsubscribe();
    this.valueSub2.unsubscribe();
  }
}
