import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeTarefasComponent } from './lista-de-tarefas.component';

describe('ListaDeTarefasComponent', () => {
  let component: ListaDeTarefasComponent;
  let fixture: ComponentFixture<ListaDeTarefasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDeTarefasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaDeTarefasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
