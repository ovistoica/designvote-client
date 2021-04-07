import {Key} from 'ts-key-enum'

const useKeyboardShortcut: (keys: Key[], callback: () => void) => void

declare module 'use-keyboard-shortcut' {
  export default useKeyboardShortcut
}
