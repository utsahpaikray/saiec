import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslocoModule } from '@ngneat/transloco'
import { StoreModule } from '@ngrx/store'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { DragAndDropStoreModule } from '@stores/drag-and-drop/drag-and-drop.module'
import { DropZoneComponent } from './drop-zone.component'

describe('DropZoneComponent', () => {
  let component: DropZoneComponent
  let fixture: ComponentFixture<DropZoneComponent>
  let store: MockStore

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        DragAndDropStoreModule,
        TranslocoModule,
        DropZoneComponent
      ],
      providers: [provideMockStore()]
    }).compileComponents()

    fixture = TestBed.createComponent(DropZoneComponent)
    component = fixture.componentInstance
    store = TestBed.inject(MockStore)
    store.setState({
      dragAndDrop: {
        files: null,
        error: null,
        items: null
      }
    })
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
