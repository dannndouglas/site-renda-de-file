import { animate, type AnimationPlaybackControls } from 'framer-motion';
import { type RefObject, useEffect } from 'react';

const enhancedScrollQuery = '(min-width: 56rem) and (min-height: 42rem) and (pointer: fine)';
const sectionScrollDurationMs = 720;

export function getWheelDirection(deltaX: number, deltaY: number): -1 | 1 | null {
  if (deltaY === 0 || Math.abs(deltaY) <= Math.abs(deltaX)) return null;
  return deltaY > 0 ? 1 : -1;
}

const sectionScrollEase = (progress: number) => 1 - ((1 - progress) ** 2);

export function getSectionScrollProgress(elapsedMs: number) {
  const progress = Math.min(1, Math.max(0, elapsedMs / sectionScrollDurationMs));
  return sectionScrollEase(progress);
}

export function getNextSectionIndex(
  sectionOffsets: number[],
  scrollPosition: number,
  direction: -1 | 1,
) {
  if (sectionOffsets.length === 0) return 0;

  const currentIndex = sectionOffsets.reduce((closestIndex, offset, index) => {
    const closestDistance = Math.abs(sectionOffsets[closestIndex] - scrollPosition);
    const distance = Math.abs(offset - scrollPosition);
    return distance < closestDistance ? index : closestIndex;
  }, 0);

  return Math.min(
    sectionOffsets.length - 1,
    Math.max(0, currentIndex + direction),
  );
}

export function useSectionScroll(
  containerRef: RefObject<HTMLElement | null>,
  reduceMotion: boolean | null,
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container || reduceMotion) return;

    const mediaQuery = window.matchMedia(enhancedScrollQuery);
    const page = document.documentElement;
    let animation: AnimationPlaybackControls | null = null;
    let lockedUntil = 0;

    const sectionOffsets = () => {
      const header = document.querySelector<HTMLElement>('.delicate-header');
      const headerHeight = header?.getBoundingClientRect().height ?? 0;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      return Array.from(container.querySelectorAll<HTMLElement>('[data-home-section]')).map(
        (section) => Math.min(
          maxScroll,
          Math.max(0, section.getBoundingClientRect().top + window.scrollY - headerHeight),
        ),
      );
    };

    const syncMode = () => {
      if (mediaQuery.matches) {
        page.dataset.delicateSectionScroll = 'enhanced';
      } else {
        delete page.dataset.delicateSectionScroll;
      }
    };

    const handleWheel = (event: WheelEvent) => {
      const direction = getWheelDirection(event.deltaX, event.deltaY);
      if (
        !mediaQuery.matches
        || event.ctrlKey
        || direction === null
      ) return;

      event.preventDefault();

      if (animation || performance.now() < lockedUntil) return;

      const offsets = sectionOffsets();
      const nextIndex = getNextSectionIndex(offsets, window.scrollY, direction);
      const destination = offsets[nextIndex];

      if (destination === undefined || Math.abs(destination - window.scrollY) < 1) return;

      animation = animate(window.scrollY, destination, {
        duration: sectionScrollDurationMs / 1000,
        ease: sectionScrollEase,
        onUpdate: (position) => window.scrollTo(0, position),
        onComplete: () => {
          window.scrollTo(0, destination);
          animation = null;
          lockedUntil = performance.now() + 80;
        },
      });
    };

    syncMode();
    mediaQuery.addEventListener('change', syncMode);
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      animation?.stop();
      mediaQuery.removeEventListener('change', syncMode);
      window.removeEventListener('wheel', handleWheel);
      delete page.dataset.delicateSectionScroll;
    };
  }, [containerRef, reduceMotion]);
}
