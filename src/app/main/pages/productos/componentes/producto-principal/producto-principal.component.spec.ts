import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoPrincipalComponent } from './producto-principal.component';

describe('ProductoPrincipalComponent', () => {
  let component: ProductoPrincipalComponent;
  let fixture: ComponentFixture<ProductoPrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoPrincipalComponent]
    });
    fixture = TestBed.createComponent(ProductoPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
