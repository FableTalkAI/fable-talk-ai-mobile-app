import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import useCreateAgent from '@/features/agents/hooks/useCreateAgent.ts';
import TagsSelector from '@/features/agents/ui/TagsSelector';
import TagsSelectorBottomWindow from '@/features/agents/ui/TagsSelectorBottomWindow';
import useBottomWindow from '@/features/bottomWindow/hooks/useBottomWindow';
import { RobotIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme.ts';
import { SPACING } from '@/shared/model/sizes.ts';
import Avatar from '@/shared/ui/Avatar';
import Button from '@/shared/ui/Button';
import FieldInput from '@/shared/ui/FieldInput';
import Header from '@/shared/ui/Header';
import KeyboardAvoidingViewCustom from '@/shared/ui/KeyboardAvoidingViewCustom';
import SafeAreaViewCustom from '@/shared/ui/SafeAreaViewCustom';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

const CreateAgentScreen = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const { control, onSubmit, setTags, getValues, pickImage } = useCreateAgent();
  const { open } = useBottomWindow();

  const openTagsSelectBottomWindow = () => {
    open(close => (
      <TagsSelectorBottomWindow close={close} previousSelectedTags={getValues('tags')} setTags={setTags} />
    ));
  };

  return (
    <SafeAreaViewCustom withHorizontalPadding={false}>
      <Header title={t('createAgent.header')} />

      <KeyboardAvoidingViewCustom scrollContentStyle={styles.scrollContent}>
        <Controller
          control={control}
          name="avatar"
          render={({ field: { value }, fieldState: { error } }) => (
            <View style={styles.avatar}>
              <Avatar
                onPickImage={pickImage}
                uri={value}
                placeholderComponent={<RobotIcon width={70} height={70} fill={colors.textSecondary} />}
              />

              {error?.message && (
                <TextCustom mode={TextModes.Caption} textColor={colors.errorBase} text={t(error.message)} />
              )}
            </View>
          )}
        />

        <View style={styles.inputContainer}>
          <FieldInput
            name="name"
            control={control}
            label={t('createAgent.name.label')}
            placeholder={t('createAgent.name.placeholder')}
          />

          <FieldInput
            withCharCount
            multiline
            height={60}
            maxLength={100}
            name="subtitle"
            control={control}
            label={t('createAgent.subtitle.label')}
            placeholder={t('createAgent.subtitle.placeholder')}
          />

          <FieldInput
            withCharCount
            multiline
            height={120}
            maxLength={500}
            name="description"
            control={control}
            label={t('createAgent.description.label')}
            placeholder={t('createAgent.description.placeholder')}
          />

          <Controller
            control={control}
            name="tags"
            render={({ field: { value }, fieldState: { error } }) => (
              <View>
                <TagsSelector tags={value} onPress={openTagsSelectBottomWindow} />

                {error?.message && (
                  <TextCustom mode={TextModes.Caption} textColor={colors.errorBase} text={t(error.message)} />
                )}
              </View>
            )}
          />
        </View>
      </KeyboardAvoidingViewCustom>

      <Button title={t('actions.create')} onPress={onSubmit} style={styles.submitButton} />
    </SafeAreaViewCustom>
  );
};

const styles = StyleSheet.create({
  avatar: {
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
    gap: SPACING.xs,
  },
  scrollContent: {
    paddingHorizontal: SPACING.xl,
  },
  submitButton: {
    marginHorizontal: SPACING.xl,
    marginTop: SPACING.xs,
  },
  inputContainer: {
    gap: SPACING.lg,
  },
});

export default CreateAgentScreen;
