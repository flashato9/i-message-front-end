import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'input-errors',
  templateUrl: './input-errors.component.html',
  styleUrls: ['./input-errors.component.scss'],
})
export class InputErrorsComponent implements OnInit, OnDestroy {
  @Input('control') formControl!: AbstractControl;
  errors: string[] = [];
  sub$s!: Subscription;
  @Input() hideErrors: boolean = true;
  constructor() {}
  ngOnDestroy(): void {
    this.sub$s.unsubscribe();
  }

  ngOnInit(): void {
    this.sub$s = (<FormControl>this.formControl).valueChanges
      .pipe(
        tap((val) => {
          this.populateErrors();
        })
      )
      .subscribe();
    this.populateErrors();
  }

  notNull(obj: any) {
    if (obj !== null && obj !== undefined) {
      //console.log('is notnull', obj);
      return true;
    }
    // console.log('is null');
    return false;
  }
  getError() {
    let result: string;
    if (this.errors.length > 0 && !this.hideErrors) {
      result = this.errors[0];
    } else result = '';
    return result;
  }
  populateErrors() {
    this.errors = [];
    if (this.formControl.errors?.min) {
      const errorString = `Input must be >= ${this.formControl.errors.min.min}.`;
      this.errors.push(errorString);
    }
    if (this.formControl.errors?.max) {
      const errorString = `Input must be <= ${this.formControl.errors.max.max}.`;
      this.errors.push(errorString);
    }
    if (this.formControl.errors?.required) {
      const errorString = `Input is required.`;
      this.errors.push(errorString);
    }
    if (this.formControl.errors?.email) {
      const errorString = `Input must be a valid email address.`;
      this.errors.push(errorString);
    }
    if (this.formControl.errors?.minlength) {
      const errorString = `Input length must be >= ${this.formControl.errors.minlength.requiredLength}. Current length:${this.formControl.errors.minlength.actualLength}`;
      this.errors.push(errorString);
    }
    if (this.formControl.errors?.maxlength) {
      const errorString = `Input length must be <= ${this.formControl.errors.maxlength.requiredLength}. Current length:${this.formControl.errors.maxlength.actualLength}`;
      this.errors.push(errorString);
    }
    if (this.formControl.errors?.strongpassword?.nospace) {
      const errorString = `${this.formControl.errors.strongpassword.nospace}`;
      this.errors.push(errorString);
    }
    if (this.formControl.errors?.strongpassword?.lowercase) {
      const errorString = `${this.formControl.errors.strongpassword.lowercase}`;
      this.errors.push(errorString);
    }
    if (this.formControl.errors?.strongpassword?.uppercase) {
      const errorString = `${this.formControl.errors.strongpassword.uppercase}`;
      this.errors.push(errorString);
    }
    if (this.formControl.errors?.strongpassword?.number) {
      const errorString = `${this.formControl.errors.strongpassword.number}`;
      this.errors.push(errorString);
    }
    if (this.formControl.errors?.strongpassword?.specialchar) {
      const errorString = `${this.formControl.errors.strongpassword.specialchar}`;
      this.errors.push(errorString);
    }
    if (this.formControl.errors?.alphanume) {
      const errorString = ` ${this.formControl.errors.alphanume}`;
      this.errors.push(errorString);
    }
  }
}
