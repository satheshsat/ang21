import { Component } from '@angular/core';
import { Auth } from '../../service/auth';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Storage } from '../../service/storage';
import { Cookie } from '../../service/cookie';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  form!: FormGroup;
    loading = false;
    submitted = false;

    message = null;

    constructor(
        private authService: Auth,
        private formBuilder: FormBuilder,
        private router: Router,
        private storageService: Storage,
        private cookieService: Cookie
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9][a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]*?[a-zA-Z0-9._-]?@[a-zA-Z0-9][a-zA-Z0-9._-]*?[a-zA-Z0-9]?\\.[a-zA-Z]{2,63}$")]],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        this.message = null;

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.authService.login(this.f['email'].value, this.f['password'].value).subscribe((res: any)=>{
          console.log(res);
          this.storageService.set('userData', JSON.stringify(res.data))
          this.cookieService.set('accessToken', res.accessToken)
          this.cookieService.set('refreshToken', res.refreshToken)
          this.router.navigateByUrl('/account/profile');
        }, (err)=>{
          this.message = err.error?.message ? err.error?.message : 'Something went wrong please try again';
          this.loading = false;
          console.log(err);
        })
    }
}
