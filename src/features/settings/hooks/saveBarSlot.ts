import { createContext } from 'react';

/**
 * DOM node at the bottom of the settings layout where pages portal their save bar,
 * so the bar spans the full content width (under the settings sub-navigation too).
 */
export const SaveBarSlotContext = createContext<HTMLElement | null>(null);
