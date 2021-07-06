import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  constructor(public router: Router, public activeRoute: ActivatedRoute) {
    const usernameControl = new FormControl('', [Validators.required]);
    const passwordControl = new FormControl('', [Validators.required]);
    const emailControl = new FormControl('', [Validators.required]);
    this.form = new FormGroup({ username: usernameControl, password: passwordControl, email: emailControl });
  }

  ngOnInit(): void {}
  async onSubmit() {
    console.debug(`Succesffully Sign-up`);

    const navigationUrl = './confirm-sign-up';
    try {
      const navigationBool = await this.router.navigate([navigationUrl], { relativeTo: this.activeRoute });
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
