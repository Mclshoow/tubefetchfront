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

@Component({
  selector: 'app-register',
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
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit {
  form!: FormGroup;
  public registerInvalid = false;
  private formSubmitAttempt = false;
  private returnUrl = "";
  phonenumber = '';
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
      username: ['', Validators.email],
      password: ['', Validators.required],
      phonenumber: ['', Validators.required],
      cpf: ['', Validators.required]
    });
    if (await this.authService.checkAuthenticated()) {
      await this.router.navigate([this.returnUrl]);
    }
  }
  async onSubmit() {
    this.registerInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const usernameControl = this.form.get('username');
        const passwordControl = this.form.get('password');
        const phonenumberControl = this.form.get('phonenumber');
        const cpfControl = this.form.get('cpf');

        if (usernameControl && passwordControl && phonenumberControl && cpfControl) {
          const username = usernameControl.value;
          const password = passwordControl.value;
          const phonenumber = phonenumberControl.value;
          const cpf = cpfControl.value;

          // chamada da api para registro
          //await API(username, password, phonenumber, cpf);
        }
      } catch (err) {
        this.registerInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }

  formatarTelefone(event: any) {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    let formatado = '';

    if (valor.length > 0) {
      formatado = '(' + valor.substring(0, 2); // Obtém os dois primeiros dígitos
    }
    if (valor.length > 2) {
      formatado += ') ' + valor.substring(2, 7); // Adiciona o código de área e os próximos 5 dígitos
    }
    if (valor.length > 7) {
      formatado += '-' + valor.substring(7, 11); // Adiciona os últimos 4 dígitos
    }

    this.phonenumber = formatado; // Atualiza o valor do campo com a máscara
    input.value = formatado; // Atualiza o valor do campo com a máscara
  }
}
