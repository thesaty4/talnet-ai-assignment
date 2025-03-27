import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalOfficeFormComponent } from './regional-office-form.component';

describe('RegionalOfficeFormComponent', () => {
  let component: RegionalOfficeFormComponent;
  let fixture: ComponentFixture<RegionalOfficeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionalOfficeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionalOfficeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
