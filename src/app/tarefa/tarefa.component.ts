import { ApiService } from './../api/api.service';
import { Component } from '@angular/core';
import { ApiModule } from '../api/api.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarefa',
  standalone: true,
  imports: [ApiModule, CommonModule],
  templateUrl: './tarefa.component.html',
  styleUrl: './tarefa.component.css'
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

    this.apiService.getDadosApi().subscribe((data) => {
      this.dadosApi = data;
      console.log('Dados da API:', this.dadosApi);
    },
      (error) => {
        console.error('Erro ao buscar dados da API:', error);
      }
    );
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

          //await this.apiService(username, password);
        }
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}
