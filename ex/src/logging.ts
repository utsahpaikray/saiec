export enum TagVariant {
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
  Debug = 'debug',
  Success = 'success'
}

export class Tag {
  public static readonly TagVariant = TagVariant
  public static error(text: string): Tag {
    return new Tag(text, TagVariant.Error)
  }
  public static warning(text: string): Tag {
    return new Tag(text, TagVariant.Warning)
  }
  public static debug(text: string): Tag {
    return new Tag(text, TagVariant.Debug)
  }
  public static success(text: string): Tag {
    return new Tag(text, TagVariant.Success)
  }
  public static info(text: string): Tag {
    return new Tag(text, TagVariant.Info)
  }
  public static formatSpecifier = '%c%s'

  constructor(
    public text: string,
    public variant = Tag.TagVariant.Info
  ) {}

  public get style(): string {
    const commonStyles = `
      padding: 2px 4px;
      border-radius: 2px;
      margin: 4px;
      text-transform: uppercase;
      font-size: 0.8em;
    `
    switch (this.variant) {
      case TagVariant.Warning:
        return `
            background-color: #dd8c22; 
            color: #ffffff;
            ${commonStyles}
        `
      case TagVariant.Error:
        return `
            background-color: #9e1515; 
            color: #ffffff;
            ${commonStyles}
        `
      case TagVariant.Debug:
        return `
            background-color: #1459ac; 
            color: #ffffff;
            ${commonStyles}
        `
      case TagVariant.Success:
        return `
            background-color: #157a37; 
            color: #ffffff;
            ${commonStyles}
        `
      case TagVariant.Info:
      default:
        return `
            background-color: #4b5054; 
            color: #ffffff;
            ${commonStyles}
        `
    }
  }
}

export enum LogSeverity {
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
  Debug = 'debug'
}

export class Log {
  public static log(...args: unknown[]) {
    // eslint-disable-next-line no-console
    console.log(
      args
        .map((arg) => (arg instanceof Tag ? Tag.formatSpecifier : '%O'))
        .join(''),
      ...args
        .map((arg) => (arg instanceof Tag ? [arg.style, arg.text] : arg))
        .flat()
    )
  }
  public static error(...args: unknown[]) {
    Log.log(Tag.error('error'), ...args)
  }
  public static warn(...args: unknown[]) {
    Log.log(Tag.warning('warn'), ...args)
  }
  public static debug(...args: unknown[]) {
    Log.log(Tag.debug('debug'), ...args)
  }
  public static info(...args: unknown[]) {
    Log.log(Tag.info('info'), ...args)
  }
}
