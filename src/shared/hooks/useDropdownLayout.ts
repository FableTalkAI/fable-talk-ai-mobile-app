import { useMemo, useRef, useState } from 'react';
import { View } from 'react-native';

import { DROPDOWN_MAX_DROPDOWN_HEIGHT, DROPDOWN_ROW_HEIGHT, SCREEN_HEIGHT } from '@/shared/model/constants.ts';
import { SPACING } from '@/shared/model/sizes.ts';

export const useDropdownLayout = (itemCount: number) => {
  const triggerRef = useRef<View>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [shouldOpenDown, setShouldOpenDown] = useState(true);
  const [triggerLayout, setTriggerLayout] = useState({ x: 0, y: 0, w: 0, h: 0 });

  const estimatedDropdownH = useMemo(
    () =>
      Math.min(
        DROPDOWN_MAX_DROPDOWN_HEIGHT,
        itemCount * DROPDOWN_ROW_HEIGHT + (itemCount - 1) * SPACING.xs + 2 * SPACING.xs,
      ),
    [itemCount],
  );

  const top = useMemo(
    () =>
      shouldOpenDown
        ? triggerLayout.y + triggerLayout.h + SPACING.xxs
        : triggerLayout.y - (estimatedDropdownH + SPACING.xxs),
    [shouldOpenDown, triggerLayout.h, triggerLayout.y, estimatedDropdownH],
  );

  const openHandler = () => {
    requestAnimationFrame(() => {
      triggerRef.current?.measureInWindow?.((x, y, w, h) => {
        const spaceBelow = SCREEN_HEIGHT - (y + h);

        setTriggerLayout({ x, y, w, h });
        setShouldOpenDown(spaceBelow >= (estimatedDropdownH + SPACING.xxs) * 1.5);
        setIsOpen(true);
      });
    });
  };

  const closeHandler = () => setIsOpen(false);

  return {
    triggerRef,
    isOpen,
    top,
    triggerLayout,
    estimatedDropdownH,
    openHandler,
    closeHandler,
  };
};
