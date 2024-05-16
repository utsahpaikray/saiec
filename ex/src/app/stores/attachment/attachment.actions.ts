import { createActionGroup, props } from '@ngrx/store'

export default createActionGroup({
  source: 'Attachment',
  events: {
    getAttachment: props<{ id: string }>(),
    getAttachmentSuccess: props<{
      id: string
      fileName: string
      blob: Blob
      contentType: string
    }>(),
    getAttachmentFailure: props<{ error: Error }>(),
    downloadAttachment: props<{ id: string }>(),
    downloadAttachmentSuccess: props<{ url: string; name?: string }>(),
    downloadAttachmentFailure: props<{ error: Error }>()
  }
})
