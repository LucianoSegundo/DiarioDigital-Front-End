import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcoesCapituloComponent } from './opcoes-capitulo.component';

describe('OpcoesCapituloComponent', () => {
  let component: OpcoesCapituloComponent;
  let fixture: ComponentFixture<OpcoesCapituloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpcoesCapituloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpcoesCapituloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
