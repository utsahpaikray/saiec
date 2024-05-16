import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { DocumentTableFolderComponent } from './document-table-folder.component'
import { ExpansionPanelComponent } from '@components/expansion-panel/expansion-panel.component'
import { DocumentTableFileComponent } from '../document-table-file/document-table-file.component'
import { FileSizePipe } from '@core/pipes/file-size.pipe'
import { SortByPipe } from '@core/pipes/sort-by.pipe'
import { DocumentDownloadService } from '../../../core/document-download/document-download.service'

describe('DocumentTableFolderComponent', () => {
  let component: DocumentTableFolderComponent
  let fixture: ComponentFixture<DocumentTableFolderComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DocumentTableFolderComponent,
        DocumentTableFileComponent,
        ExpansionPanelComponent,
        FileSizePipe,
        SortByPipe
      ],
      providers: [
        {
          provide: DocumentDownloadService,
          useValue: {
            download: () => {}
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentTableFolderComponent)
    component = fixture.componentInstance
    component.isParentOpen = true
    component.document = {
      name: 'Folder',
      depth: 0,
      children: [
        {
          name: 'Sub-File',
          contentLength: 483802,
          depth: 1
        },
        {
          name: 'Sub-Folder',
          depth: 1,
          children: [
            {
              name: 'Sub-Sub-File',
              contentLength: 2551398,
              depth: 2
            }
          ]
        }
      ]
    }

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render correct name', () => {
    const name = fixture.debugElement.query(
      By.css('[data-testid="table-folder-name"]')
    )

    expect(name.nativeElement.textContent.trim()).toBe(component.document.name)
  })

  it('should have a sub file & folder', () => {
    const tableFileComponent = fixture.debugElement.query(
      By.directive(DocumentTableFileComponent)
    )
    const tableFolderComponent = fixture.debugElement.query(
      By.directive(DocumentTableFolderComponent)
    )

    expect(tableFileComponent).toBeTruthy()
    expect(tableFolderComponent).toBeTruthy()
  })

  it('should toggle folder correctly', () => {
    const chevron = fixture.debugElement.query(
      By.css('[data-testid="table-folder-chevron"]')
    )

    expect(chevron.nativeElement.name).toBe('chevron-down-outline')

    const expansionPanelComponent = fixture.debugElement.query(
      By.directive(ExpansionPanelComponent)
    )
    expansionPanelComponent.triggerEventHandler('toggleEvent', true)
    fixture.detectChanges()

    expect(component.isOpen).toBe(true)
    expect(chevron.nativeElement.name).toBe('chevron-up-outline')
  })

  it('should not have identation', () => {
    const icon = fixture.debugElement.query(
      By.css('[data-testid="table-folder-icon"]')
    )

    expect(icon.nativeElement.style.marginLeft).toBe('0rem')
    expect(icon.nativeElement.classList.value).toBe('')
  })

  it('should have correct identation', () => {
    component.document.depth = 2
    fixture.detectChanges()

    const icon = fixture.debugElement.query(
      By.css('[data-testid="table-folder-icon"]')
    )

    expect(icon.nativeElement.style.marginLeft).toBe(
      `${component.identationLeft * component.document.depth}rem`
    )
    expect(icon.nativeElement.classList.value).toBe(
      'table-folder-icon d-flex items-start gap-xs before:mt-xs before:block before:h-3 before:w-m before:border-l before:border-b before:border-blue-500'
    )
  })
})
