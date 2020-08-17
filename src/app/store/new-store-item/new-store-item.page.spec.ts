import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewStoreItemPage } from './new-store-item.page';

describe('NewStoreItemPage', () => {
  let component: NewStoreItemPage;
  let fixture: ComponentFixture<NewStoreItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewStoreItemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewStoreItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
