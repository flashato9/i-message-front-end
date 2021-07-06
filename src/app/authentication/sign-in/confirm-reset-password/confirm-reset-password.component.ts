import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirm-reset-password',
  templateUrl: './confirm-reset-password.component.html',
  styleUrls: ['./confirm-reset-password.component.scss'],
})
export class ConfirmResetPasswordComponent implements OnInit {
  form: FormGroup;
  constructor(public router: Router, public activeRoute: ActivatedRoute) {
    const codeControl = new FormControl('', [Validators.required]);
    const passwordControl = new FormControl('', [Validators.required]);
    this.form = new FormGroup({ code: codeControl, password: passwordControl });
  }

  ngOnInit(): void {}
  async onSubmit() {
    console.debug(`Succesffully confirm reset password`);

    const navigationUrl = '/authentication/sign-in';
    try {
      const navigationBool = await this.router.navigate([navigationUrl]);
      if (navigationBool) {
        console.debug(`Navigation to ${navigationUrl} was succesful`);
      } else {
        console.error(`Navigation to ${navigationUrl} was unsuccesful`);
      }
    } catch (error) {
      console.error(`Error Occured when navigating to ${navigationUrl}`, error);
    }
  }
}
