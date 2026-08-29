import { describe, expect, it } from 'vitest';

import * as sectionScroll from './sectionScroll';

const { getNextSectionIndex } = sectionScroll;

describe('getNextSectionIndex', () => {
  const sectionOffsets = [0, 788, 1576, 2364, 3152];

  it('avança somente uma seção por gesto', () => {
    expect(getNextSectionIndex(sectionOffsets, 30, 1)).toBe(1);
    expect(getNextSectionIndex(sectionOffsets, 810, 1)).toBe(2);
  });

  it('não cria um destino além da última seção', () => {
    expect(getNextSectionIndex(sectionOffsets, 3152, 1)).toBe(4);
    expect(getNextSectionIndex(sectionOffsets, 3400, 1)).toBe(4);
  });

  it('permite voltar uma seção sem ultrapassar o início', () => {
    expect(getNextSectionIndex(sectionOffsets, 1576, -1)).toBe(1);
    expect(getNextSectionIndex(sectionOffsets, 0, -1)).toBe(0);
  });

  it('reage ao primeiro delta vertical, mesmo quando ele é pequeno', () => {
    const getWheelDirection = (
      sectionScroll as typeof sectionScroll & {
        getWheelDirection?: (deltaX: number, deltaY: number) => -1 | 1 | null;
      }
    ).getWheelDirection;

    expect(typeof getWheelDirection).toBe('function');
    expect(getWheelDirection?.(0, 0.25)).toBe(1);
    expect(getWheelDirection?.(0, -0.25)).toBe(-1);
    expect(getWheelDirection?.(2, 1)).toBeNull();
  });

  it('produz deslocamento perceptível nos primeiros 80 ms', () => {
    const getSectionScrollProgress = (
      sectionScroll as typeof sectionScroll & {
        getSectionScrollProgress?: (elapsedMs: number) => number;
      }
    ).getSectionScrollProgress;

    expect(typeof getSectionScrollProgress).toBe('function');
    expect(getSectionScrollProgress?.(80)).toBeGreaterThanOrEqual(0.15);
    expect(getSectionScrollProgress?.(720)).toBe(1);
  });
});
