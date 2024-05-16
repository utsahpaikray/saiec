import { ModalComponent } from './modal.component'
import { ModalService } from './modal.service'

describe('ModalService', () => {
  let service: ModalService

  const mockedModal = {
    id: 'modal-1',
    open: () => {},
    close: () => {}
  }

  beforeEach(() => {
    service = new ModalService()
    service.add(mockedModal as ModalComponent)
  })

  it('should add modal', () => {
    expect(service.modals.length).toEqual(1)
    expect(service.modals[0].id).toEqual('modal-1')
  })

  it('should remove modal', () => {
    service.remove('modal-1')
    expect(service.modals).toEqual([])
  })

  it('should call open function inside modal instance', () => {
    const modelOpen = spyOn(mockedModal, 'open')
    service.open('modal-1')
    expect(modelOpen).toHaveBeenCalled()
  })

  it('should call close function inside modal instance', () => {
    const modelClose = spyOn(mockedModal, 'close')
    service.close('modal-1')
    expect(modelClose).toHaveBeenCalled()
  })
})
