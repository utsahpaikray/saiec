import { Toast } from './toast/toast.model'
import { ToasterService } from './toaster.service'

describe('ToasterService', () => {
  let service: ToasterService

  const info = new Toast(
    'information',
    'A new software update is available. See what’s new in version 2.0.4.',
    '#',
    'Link'
  )
  const success = new Toast(
    'success',
    'There were 2 errors with your submission',
    '#',
    'Link'
  )
  const error = new Toast(
    'information',
    'A new software update is available. See what’s new in version 2.0.4.',
    '#',
    'Link'
  )

  beforeEach(() => {
    service = new ToasterService()
  })

  it('should add one toast', () => {
    // Add one toast (info)
    service.addToast(info)

    // Should have the info toast
    expect(service.getToasts()).toEqual([info])
  })

  it('should add three toasts', () => {
    // Add three toasts (info, success & error)
    service.addToast(info)
    service.addToast(success)
    service.addToast(error)

    // Should have the info, success & error's toasts
    expect(service.getToasts()).toEqual([info, success, error])
  })

  it('should remove toast', () => {
    // Add two toasts (info & success)
    service.addToast(info)

    expect(service.getToasts()).toEqual([info])

    // Remove one toast (info)
    service.removeToast(info)

    // Should only have the success toast
    expect(service.getToasts()).toEqual([])
  })
})
