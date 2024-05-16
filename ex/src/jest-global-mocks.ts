import { icons } from '@assets/icons'
import { jest } from '@jest/globals'
import { IconProvider } from '@vanderlande-gravity/components'
import gravityIcons from '@vanderlande-gravity/core/dist/icons/icons.json'

Object.defineProperty(window, 'CSS', { value: null })

Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>'
})

Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return {
      display: 'none',
      appearance: ['-webkit-appearance']
    }
  }
})

Object.defineProperty(window, 'DragEvent', {
  value: class DragEvent {
    public preventDefault = jest.fn()
    public dataTransfer = {
      items: [],
      files: []
    }
    public constructor(
      public type: string,
      public eventInitDict: DragEventInit
    ) {}
    public stopPropagation = jest.fn()
    public stopImmediatePropagation = jest.fn()
  }
})

Object.defineProperty(window, 'DataTransfer', {
  value: class DataTransfer {
    files: File[] = []
  }
})

Object.defineProperty(window, 'ClipboardEvent', {
  value: class ClipboardEvent extends Event {
    clipboardData: DataTransfer | null = null
    constructor(type: string, eventInitDict?: ClipboardEventInit) {
      super(type, eventInitDict)
      this.clipboardData = eventInitDict?.clipboardData ?? null
    }
  }
})

/**
 * ISSUE: https://github.com/angular/material2/issues/7101
 * Workaround for JSDOM missing transform property
 */
Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true
    }
  }
})

HTMLCanvasElement.prototype.getContext = <
  typeof HTMLCanvasElement.prototype.getContext
>jest.fn()

// Mocking the clipboard API
const mockClipboard = {
  writeText: jest.fn()
}

Object.defineProperty(navigator, 'clipboard', {
  value: mockClipboard,
  writable: true
})

const allIcons = [...icons, ...gravityIcons].filter(
  (icon, index, self) => self.findIndex((i) => i.name === icon.name) === index
)
IconProvider.registerIcons([...allIcons])
