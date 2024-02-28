import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatDividerModule } from "@angular/material/divider";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatInputModule } from "@angular/material/input";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSelectModule } from "@angular/material/select";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AuthService } from '../auth.service';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterOutlet,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    RegisterComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [
    trigger('flip', [
      state('front', style({
        transform: 'rotateY(0deg)'
      })),
      state('back', style({
        transform: 'rotateY(180deg)'
      })),
      transition('front => back', [
        animate('1s 0s ease-out',
          keyframes([
            style({
              transform: 'perspective(400px) rotateY(0deg)',
              offset: 0
            }),
            style({
              transform: 'perspective(400px) scale3d(1.5, 1.5, 1.5) rotateY(80deg)',
              offset: 0.4
            }),
            style({
              transform: 'perspective(400px) scale3d(1.5, 1.5, 1.5) rotateY(100deg)',
              offset: 0.5
            }),
            style({
              transform: 'perspective(400px) scale3d(0.95, 0.95, 0.95) rotateY(180deg)',
              offset: 0.8
            }),
            style({
              transform: 'perspective(400px) rotateY(180deg)',
              offset: 1
            })
          ]))
      ]),
      transition('back => front', [
        animate('1s 0s ease-in',
          keyframes([
            style({
              transform: 'perspective(400px) rotateY(180deg)',
              offset: 0
            }),
            style({
              transform: 'perspective(400px) scale3d(1.5, 1.5, 1.5) rotateY(100deg)',
              offset: 0.4
            }),
            style({
              transform: 'perspective(400px) scale3d(1.5, 1.5, 1.5) rotateY(80deg)',
              offset: 0.5
            }),
            style({
              transform: 'perspective(400px) scale3d(0.95, 0.95, 0.95) rotateY(0deg)',
              offset: 0.8
            }),
            style({
              transform: 'perspective(400px) rotateY(0deg)',
              offset: 1
            })
          ]))
      ])
    ])
  ]
})

export class LoginComponent implements OnInit {
  form!: FormGroup;
  public loginInvalid = false;
  private formSubmitAttempt = false;
  private returnUrl = "";
  flipState = 'front';
  public cardFlipped = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
  }
  async ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/register';
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    if (await this.authService.checkAuthenticated()) {
      await this.router.navigate([this.returnUrl]);
    }
  }
  async onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const usernameControl = this.form.get('username');
        const passwordControl = this.form.get('password');

        if (usernameControl && passwordControl) {
          const username = usernameControl.value;
          const password = passwordControl.value;

          await this.authService.login(username, password);
        }
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }

  onFlipClick() {
    this.cardFlipped = true;
    if (this.flipState == 'front') {
      this.flipState = 'back';
    } else {
      this.flipState = 'front';
    }
  }
}
