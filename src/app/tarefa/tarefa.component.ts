import { Tarefa } from './tarefa.model';
import { ApiService } from './../api/api.service';
import { Component } from '@angular/core';
import { ApiModule } from '../api/api.module';
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
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

@Component({
  selector: 'app-tarefa',
  standalone: true,
  imports: [ApiModule,
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzCardModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    FlexLayoutModule
  ],
  templateUrl: './tarefa.component.html',
  styleUrl: './tarefa.component.css',
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
export class TarefaComponent {
  dadosApi: any[] = [];
  form!: FormGroup;
  tarefa!: Tarefa;
  private formSubmitAttempt = false;

  constructor(private apiService: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      title: ['', Validators.required]
    });

    this.chamarApi();
  }

  async onSubmit() {
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const titleControl = this.form.get('title');
        const nameControl = this.form.get('name');
        const emailControl = this.form.get('email');

        if (titleControl && nameControl && emailControl) {
          debugger;
          this.tarefa = {
            title: titleControl.value,
            name: nameControl.value,
            email: emailControl.value
          };

          let enviarCadastroTarefa = await this.apiService.postAsync(this.tarefa);
          console.log('Tarefa cadastrada com sucesso:', enviarCadastroTarefa);
        }
      } catch (err) {
        console.log('Erro ao criar tarefa:', err);
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
