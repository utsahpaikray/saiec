export enum TicketInfo {
  Description = 'Description',
  Details = 'Details',
  Files = 'Files',
  Weblinks = 'Weblinks'
}

export interface ticketDetail {
  label: string
  information: string
}

export interface ticketInfoPanel {
  type: TicketInfo
  label: string
  total?: string
  isOpen: boolean
}
