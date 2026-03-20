import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useTheme from '@/shared/hooks/useTheme.ts';
import { SPACING } from '@/shared/model/sizes.ts';

import { BottomWindowBaseProps } from './types.ts';

const BottomWindowBase = forwardRef<BottomSheetModalMethods, BottomWindowBaseProps>(
  ({ children, disableClose = false }, ref) => {
    const bottomSheetRef = useRef<BottomSheetModalMethods>(null);

    const { colors } = useTheme();
    const insets = useSafeAreaInsets();

    const computedStyles = StyleSheet.create({
      container: {
        paddingBottom: insets.bottom ? insets.bottom + SPACING.xxs : SPACING.lg,
      },
      backgroundModal: {
        backgroundColor: colors.backgroundBase,
      },
    });

    useImperativeHandle(ref, () => bottomSheetRef.current!);

    const renderBackdrop = (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.5}
        pressBehavior={disableClose ? 'none' : 'close'}
      />
    );

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={!disableClose}
        backgroundStyle={computedStyles.backgroundModal}
      >
        <BottomSheetView style={[styles.container, computedStyles.container]}>{children}</BottomSheetView>
      </BottomSheetModal>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    minHeight: 350,
    paddingHorizontal: SPACING.lg,
  },
});

export default BottomWindowBase;
