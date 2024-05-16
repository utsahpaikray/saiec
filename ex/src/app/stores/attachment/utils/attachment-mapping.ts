import { AttachmentPreviewQuery } from '../graphql/attachment-preview.graphql-gen'
import { AttachmentResponse } from '../interfaces/state.interface'

type attachmentPreviewQuery = NonNullable<
  AttachmentPreviewQuery['case']
>['attachments'][0]

export const mapAttachmentPreview = (
  attachment: attachmentPreviewQuery
): AttachmentResponse => ({
  id: attachment.id,
  fileName: attachment.name,
  url: attachment.UrlWithToken,
  contentType: attachment.contentType
})
