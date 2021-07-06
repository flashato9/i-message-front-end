import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  constructor(public router: Router, public activeRoute: ActivatedRoute) {
    const usernameControl = new FormControl('', [Validators.required]);
    this.form = new FormGroup({ username: usernameControl });
  }

  ngOnInit(): void {}
  async onSubmit() {
    console.info(`Succesffully Reset Password`);

    const navigationUrl = './confirm-reset-password';

    try {
      const navigationBool = await this.router.navigate([navigationUrl], { relativeTo: this.activeRoute });
      if (navigationBool) {
        console.info(`Navigation to ${navigationUrl} was succesful`);
      } else {
        console.error(`Navigation to ${navigationUrl} was unsuccesful`);
      }
    } catch (error) {
      console.error(`Error Occured when navigating to ${navigationUrl}`, error);
    }
  }
}
