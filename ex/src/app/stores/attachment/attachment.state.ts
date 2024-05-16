import {
  ActionReducer,
  createFeature,
  createReducer,
  createSelector,
  on
} from '@ngrx/store'
import attachmentActions from './attachment.actions'
import { AttachmentState } from './interfaces/state.interface'

const initialState: AttachmentState = {
  attachment: null,
  contentType: null,
  loading: false,
  error: null
}

export const reducer: ActionReducer<AttachmentState> = createReducer(
  initialState,
  on(attachmentActions.getAttachment, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(
    attachmentActions.getAttachmentSuccess,
    (state, { id, fileName, blob, contentType }) => {
      if (state.attachment?.objectUrl) {
        URL.revokeObjectURL(state.attachment.objectUrl)
      }
      const objectUrl = URL.createObjectURL(blob)
      return {
        ...state,
        attachment: { id, objectUrl, type: blob.type, fileName },
        contentType,
        loading: false,
        error: null
      }
    }
  ),
  on(attachmentActions.getAttachmentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(attachmentActions.downloadAttachmentSuccess, (state, { url, name }) => {
    // If we don't have a name, we open the URL in a new tab in order to let the
    // browser handle the download. Hopefully with a filename.
    if (!name) {
      window.open(url, '_blank')
      return state
    }
    // Otherwise, we download the file with an anchor as it will not open a new
    // tab.
    const anchor = document.createElement('a')
    anchor.setAttribute('href', url)
    anchor.setAttribute('download', name)
    anchor.setAttribute('target', '_blank')
    anchor.click()
    // We don't need to alter tha state
    return state
  })
)

export const attachmentFeature = createFeature({
  name: 'attachment',
  reducer,
  extraSelectors: ({ selectAttachment }) => ({
    selectAttachmentId: createSelector(
      selectAttachment,
      (attachment) => attachment?.id
    )
  })
})
