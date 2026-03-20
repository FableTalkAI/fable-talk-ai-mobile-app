import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import TagsSelector from '@/features/home/ui/TagsSelector';
import { SPACING } from '@/shared/model/sizes.ts';
import Button from '@/shared/ui/Button';
import { ButtonModes } from '@/shared/ui/Button/types.ts';

import { TagsSelectorBottomWindowProps } from './types.ts';

const TagsSelectorBottomWindow = ({ setTags, previousSelectedTags, close }: TagsSelectorBottomWindowProps) => {
  const { t } = useTranslation();

  const [selectedTags, setSelectedTags] = useState(previousSelectedTags);

  const onApply = () => {
    setTags(selectedTags);
    close();
  };

  const onClear = () => {
    setTags([]);
    close();
  };

  return (
    <View style={styles.wrapper}>
      <TagsSelector selectedTags={selectedTags} setSelectedTags={setSelectedTags} />

      <View style={styles.buttonWrapper}>
        <Button
          title={t('actions.clear')}
          mode={ButtonModes.Ghost}
          containerStyle={styles.buttonContainer}
          onPress={onClear}
        />
        <Button
          title={t('actions.apply')}
          mode={ButtonModes.Success}
          containerStyle={styles.buttonContainer}
          onPress={onApply}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: SPACING.m,
  },
  buttonWrapper: {
    flexDirection: 'row',
    flex: 1,
    gap: SPACING.xs,
  },
  buttonContainer: {
    paddingTop: SPACING.lg,
    flex: 1,
  },
});

export default TagsSelectorBottomWindow;
