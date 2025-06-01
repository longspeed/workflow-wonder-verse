import { useEffect, useCallback } from 'react';

type KeyCombo = string | string[];
type Handler = (event: KeyboardEvent) => void;

interface ShortcutOptions {
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  meta?: boolean;
  preventDefault?: boolean;
}

export const useKeyboardShortcut = (
  keyCombo: KeyCombo,
  handler: Handler,
  options: ShortcutOptions = {}
) => {
  const {
    ctrl = false,
    alt = false,
    shift = false,
    meta = false,
    preventDefault = true,
  } = options;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const keys = Array.isArray(keyCombo) ? keyCombo : [keyCombo];
      const key = event.key.toLowerCase();

      const modifiersMatch =
        event.ctrlKey === ctrl &&
        event.altKey === alt &&
        event.shiftKey === shift &&
        event.metaKey === meta;

      if (modifiersMatch && keys.includes(key)) {
        if (preventDefault) {
          event.preventDefault();
        }
        handler(event);
      }
    },
    [keyCombo, handler, ctrl, alt, shift, meta, preventDefault]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}; 