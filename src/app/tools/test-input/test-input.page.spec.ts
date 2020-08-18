import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TestInputPage } from './test-input.page';

describe('TestInputPage', () => {
  let component: TestInputPage;
  let fixture: ComponentFixture<TestInputPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestInputPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestInputPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
