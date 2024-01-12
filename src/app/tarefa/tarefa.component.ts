import { ApiService } from './../api/api.service';
import { Component } from '@angular/core';
import { ApiModule } from '../api/api.module';
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-tarefa',
  standalone: true,
  imports: [ApiModule,
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzCardModule,
  ],
  templateUrl: './tarefa.component.html',
  styleUrl: './tarefa.component.css',
})
export class TarefaComponent {
  dadosApi: any[] = [];
  form!: FormGroup;
  public loginInvalid = false;
  private formSubmitAttempt = false;

  constructor(private apiService: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });

    this.chamarApi();
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

          // chamar api
        }
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }

  async chamarApi() {
    try {
      let dados = await this.apiService.getDadosApi();
      console.log(dados);
    }
    catch (error) {
      console.log("F");
    }
  }
}
