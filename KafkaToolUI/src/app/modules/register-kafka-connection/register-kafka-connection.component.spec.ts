import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterKafkaConnectionComponent } from './register-kafka-connection.component';

describe('RegisterKafkaConnectionComponent', () => {
  let component: RegisterKafkaConnectionComponent;
  let fixture: ComponentFixture<RegisterKafkaConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterKafkaConnectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterKafkaConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
