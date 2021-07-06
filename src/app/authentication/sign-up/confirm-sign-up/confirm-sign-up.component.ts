import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirm-sign-up',
  templateUrl: './confirm-sign-up.component.html',
  styleUrls: ['./confirm-sign-up.component.scss'],
})
export class ConfirmSignUpComponent implements OnInit {
  form: FormGroup;
  constructor(public router: Router, public activeRoute: ActivatedRoute) {
    const usernameControl = new FormControl({ value: '', disabled: 'true' }, [Validators.required]);
    const codeControl = new FormControl('', [Validators.required]);
    this.form = new FormGroup({ code: codeControl, username: usernameControl });
  }

  ngOnInit(): void {}
  async onSubmit() {
    console.debug(`Succesffully confirm-sign-up`);

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
