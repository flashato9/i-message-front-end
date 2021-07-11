import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticationApiContactorService } from 'src/app/service/authentication-api-contactor.service';
import { valid } from '../sign-in.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  usernameFocused: boolean = true;
  form: FormGroup;
  errorMessage: string = '';
  sub$s!: Subscription;
  constructor(public router: Router, public activeRoute: ActivatedRoute, private AACS: AuthenticationApiContactorService) {
    const usernameControl = new FormControl('', {
      updateOn: 'change',
      validators: [Validators.required],
    });
    this.form = new FormGroup({ username: usernameControl });
  }
  ngOnDestroy(): void {
    if (this.sub$s === undefined) return;
    this.sub$s.unsubscribe();
  }

  ngOnInit(): void {}
  async onSubmit() {
    this.usernameFocused = false;
    if (!valid(this.form)) {
      this.sub$s = this.form.valueChanges
        .pipe(
          tap((val) => {
            if (!valid(this.form)) {
              this.errorMessage = 'The form is not valid.';
              return;
            }
            this.errorMessage = '';
          })
        )
        .subscribe();
      this.errorMessage = 'The form is not valid.';
      return;
    }
    const username = String(this.form.controls['username'].value);

    const navigationUrl = `./${username}/confirm-reset-password`;
    try {
      const result = await this.AACS.getResetPasswordConfirmationCode({ username });
      if (!result.response_status.success) {
        this.errorMessage = result.response_status.message;
        return;
      }
      const navigationBool = await this.router.navigate([navigationUrl], { relativeTo: this.activeRoute });
      if (navigationBool) {
        console.info(`Navigation to ${navigationUrl} was succesful`);
      } else {
        console.error(`Navigation to ${navigationUrl} was unsuccesful`);
      }
    } catch (error) {
      console.error(`Error occured when sending the confirmation code`, error);
      this.errorMessage = `Error occured when sending the confirmation code. Please try again.`;
    }
  }
}
