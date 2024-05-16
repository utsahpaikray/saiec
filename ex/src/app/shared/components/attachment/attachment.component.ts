import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  computed,
  input
} from '@angular/core'

export enum AttachmentVariant {
  Thumbnail = 'thumbnail',
  Document = 'document',
  Mfe = 'mfe',
  Minimal = 'minimal'
}

export interface AttachmentVM {
  variant?: AttachmentVariant
  prefixIconKey?: string
}

const defaultVM: Required<AttachmentVM> = {
  variant: AttachmentVariant.Thumbnail,
  prefixIconKey: ''
}

@Component({
  selector: 'app-attachment',
  standalone: true,
  templateUrl: './attachment.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttachmentComponent {
  public AttachmentVariant = AttachmentVariant

  @HostBinding('class')
  public class = 'd-inline-flex flex-col p-s rounded-m bg-white'
  // TODO: Move this to class once gravity fixed it. (filter drop-shadow-s)
  @HostBinding('style')
  public style = 'box-shadow: var(--global-box-shadow-s); max-width: 208px'
  public vm = input<AttachmentVM>(defaultVM)
  public vmWithDefaults = computed<Required<AttachmentVM>>(() => ({
    ...defaultVM,
    ...this.vm()
  }))
}
