import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  constructor(public router: Router, public activeRoute: ActivatedRoute) {
    const usernameControl = new FormControl('', [Validators.required]);
    const passwordControl = new FormControl('', [Validators.required]);
    this.form = new FormGroup({ username: usernameControl, password: passwordControl });
  }

  ngOnInit(): void {}
  async onSubmit() {
    console.debug(`Succesffully Sign-in`);

    const navigationUrl = '/home-page';
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
