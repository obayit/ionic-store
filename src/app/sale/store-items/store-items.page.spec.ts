import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StoreItemsPage } from './store-items.page';

describe('StoreItemsPage', () => {
  let component: StoreItemsPage;
  let fixture: ComponentFixture<StoreItemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreItemsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StoreItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
