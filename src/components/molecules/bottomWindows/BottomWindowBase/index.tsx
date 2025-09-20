import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SPACING } from '@/core/constants/sizes.ts';
import useTheme from '@/hooks/useTheme.ts';

import { BottomWindowBaseProps } from './types.ts';

const BottomWindowBase = forwardRef<BottomSheetModalMethods, BottomWindowBaseProps>(({ children }, ref) => {
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
      onPress={() => {
        bottomSheetRef.current?.close();
      }}
    />
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      backgroundStyle={computedStyles.backgroundModal}
    >
      <BottomSheetView style={[styles.container, computedStyles.container]}>{children}</BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  container: {
    minHeight: 350,
    paddingHorizontal: SPACING.lg,
  },
});

export default BottomWindowBase;
