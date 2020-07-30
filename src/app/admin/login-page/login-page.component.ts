import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/interfaces";
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  message: string;

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required, Validators.minLength(6)
      ]),
    });
    this.route.queryParams.subscribe( (params: Params) => {
      if(params['loginAgain']){
        this.message = "Please login";
      }else if(params['authFailed']){
        this.message = "Auth Failed";
      }
    })
  }

  submit() {
    if(this.form.invalid){
      return;
    }
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password

    }
    this.auth.login(user).subscribe( (response) => {
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard'])
    })
  }
}
