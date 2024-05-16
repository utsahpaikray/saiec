import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  input
} from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { TranslocoModule } from '@ngneat/transloco'
import { Store } from '@ngrx/store'
import { DragAndDropStoreModule } from '@stores/drag-and-drop/drag-and-drop.module'
import { dragAndDropFeature } from '@stores/drag-and-drop/drag-and-drop.state'
import { combineLatest, map } from 'rxjs'

interface DropZoneVM {
  acceptedMimeTypes?: string[]
  acceptedExtensions?: string[]
  maxSize?: number
  maxFiles?: number
}

export enum ComponentState {
  Valid = 'valid',
  FileNotAllowed = 'file-not-allowed',
  FileCountExceeded = 'file-count-exceeded',
  Hidden = 'hidden'
}

@Component({
  selector: 'app-drop-zone',
  standalone: true,
  imports: [CommonModule, DragAndDropStoreModule, TranslocoModule],
  templateUrl: './drop-zone.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropZoneComponent {
  public ComponentState = ComponentState
  public vm = input<DropZoneVM>()
  private store = inject(Store)

  @HostBinding('attr.grav-empty-state') public emptyState = true
  @HostBinding('class')
  public get hostClass() {
    const state = this.state()
    const hostClass =
      'p-l b-l d-flex items-center justify-center border-dashed rounded-m border-grey-300'
    switch (state) {
      case ComponentState.Valid:
        return `${hostClass} bg-grey-200`
      case ComponentState.FileNotAllowed:
        return `${hostClass} bg-red-100`
      case ComponentState.FileCountExceeded:
        return `${hostClass} bg-red-100`
      case ComponentState.Hidden:
        return `invisible`
    }
    return `${hostClass} bg-grey-200 opacity-90`
  }

  private draggedItems$ = this.store.select(
    dragAndDropFeature.selectDraggedItems
  )
  private draggedValidItems$ = this.store.select(
    dragAndDropFeature.selectDraggedItemsBy(
      (item) =>
        item.kind === 'file' &&
        (this.vm()?.acceptedMimeTypes || [item.type]).includes(item.type)
    )
  )
  public state$ = combineLatest({
    items: this.draggedItems$,
    validItems: this.draggedValidItems$
  }).pipe(
    map(({ items, validItems }): ComponentState => {
      const vm: Required<DropZoneVM> = {
        acceptedMimeTypes: [],
        acceptedExtensions: [],
        maxSize: Number.POSITIVE_INFINITY,
        maxFiles: Number.POSITIVE_INFINITY,
        ...this.vm()
      }
      if (!items) {
        return ComponentState.Hidden
      }
      if (items.length !== validItems.length) {
        return ComponentState.FileNotAllowed
      }
      if (vm.maxFiles < items.length) {
        return ComponentState.FileCountExceeded
      }
      return ComponentState.Valid
    })
  )
  public state = toSignal(this.state$)
}
