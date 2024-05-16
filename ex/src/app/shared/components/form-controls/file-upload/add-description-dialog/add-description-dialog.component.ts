/**
 * @DECISIONS
 * - Labels are were re-defined to be more generic and reusable.
 * - This modal component is reusable and can be used in other places where a list of items needs to be described.
 */

import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslocoModule } from '@ngneat/transloco'
import { DIALOG_DATA, DIALOG_REF } from '@core/dialog/dialog.service'
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { Item } from '../../../../interfaces/item.interface'

export interface AddDescriptionDialogVM {
  items?: Item[]
  labels?: {
    TITLE?: string
    SUBMIT?: string
    CANCEL?: string
    FORM_TITLE?: string
    FORM_EXPLANATION?: string
    ITEM_EYEBROW?: string
    ITEM_PLACEHOLDER?: string
  }
}

const defaultLabels: Required<AddDescriptionDialogVM['labels']> = {
  TITLE: 'AddDescriptionDialog.Title',
  SUBMIT: 'AddDescriptionDialog.Submit',
  CANCEL: 'AddDescriptionDialog.Cancel',
  FORM_TITLE: 'AddDescriptionDialog.Form.Title',
  FORM_EXPLANATION: 'AddDescriptionDialog.Form.Explanation',
  ITEM_EYEBROW: 'AddDescriptionDialog.Item.Eyebrow',
  ITEM_PLACEHOLDER: 'AddDescriptionDialog.Item.Placeholder'
}

const isStringArray = (arr?: unknown[]): arr is string[] =>
  !!arr?.some((item) => typeof item === 'string')

@Component({
  selector: 'app-add-description-dialog',
  standalone: true,
  imports: [CommonModule, TranslocoModule, ReactiveFormsModule],
  templateUrl: './add-description-dialog.component.html',
  styleUrls: ['./add-description-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AddDescriptionDialogComponent {
  public dialogRef = inject(DIALOG_REF)
  public dialogData: AddDescriptionDialogVM = inject(DIALOG_DATA)
  public items = this.dialogData.items || []
  public labels = Object.assign({}, defaultLabels, this.dialogData.labels)
  public formGroups = this.items.map(
    (item) =>
      new FormGroup({
        name: new FormControl(item.name),
        description: new FormControl(item.description, [Validators.required])
      })
  )
  public form = new FormGroup({
    items: new FormArray(this.formGroups)
  })

  public submit() {
    const formItems = this.form.value.items?.map((item) => item.description)
    if (!isStringArray(formItems)) {
      return
    }
    this.dialogRef.close(
      // Merge the items with the descriptions
      this.items.map((item, i) => ({
        ...item,
        description: formItems[i]
      }))
    )
  }
}
