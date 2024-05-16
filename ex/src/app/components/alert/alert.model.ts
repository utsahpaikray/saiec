export class Alert {
  constructor(
    public variant: 'information' | 'success' | 'error' | 'warning',
    public message: string,
    public url?: string,
    public link?: string
  ) {}
}
