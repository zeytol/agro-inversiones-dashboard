import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RolesComponent } from './roles.component';

describe('RolesComponent', () => {
  let component: RolesComponent;
  let fixture: ComponentFixture<RolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RolesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial roles', () => {
    expect(component.roles.length).toBe(3);
  });

  it('should delete a role', () => {
    const initialLength = component.roles.length;
    component.deleteRole(1); // Elimina el rol con id 1
    expect(component.roles.length).toBe(initialLength - 1);
  });
});
