import { RouteProp, useRoute } from '@react-navigation/native';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import useCreateAgent from '@/features/agents/hooks/useCreateAgent.ts';
import TagsSelectorBottomWindow from '@/features/agents/ui/TagsSelectorBottomWindow';
import TagsSelectorField from '@/features/agents/ui/TagsSelectorField';
import { RootNavigatorParamList } from '@/features/navigation/ui/RootNavigator/types.ts';
import useBottomWindow from '@/features/overlay/hooks/useBottomWindow';
import { RobotIcon, WarningTriangleIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import Avatar from '@/shared/ui/Avatar';
import Button from '@/shared/ui/Button';
import FieldInput from '@/shared/ui/FieldInput';
import Header from '@/shared/ui/Header';
import KeyboardAvoidingViewCustom from '@/shared/ui/KeyboardAvoidingViewCustom';
import SafeAreaViewCustom from '@/shared/ui/SafeAreaViewCustom';
import ScreenLoader from '@/shared/ui/ScreenLoader';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

const CreateAgentScreen = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { params } = useRoute<RouteProp<RootNavigatorParamList, 'CreateAgent'>>();

  const { control, onSubmit, setTags, getValues, pickImage, isLoading, isButtonDisabled, isEdit, moderationComment } =
    useCreateAgent({
      agentId: params?.id,
    });
  const { open } = useBottomWindow();

  const computedStyles = StyleSheet.create({
    warningContainer: {
      backgroundColor: colors.errorLight,
      borderColor: colors.errorDark,
    },
  });

  const openTagsSelectBottomWindow = () => {
    open(close => (
      <TagsSelectorBottomWindow close={close} previousSelectedTags={getValues('tags')} setTags={setTags} />
    ));
  };

  return (
    <>
      <SafeAreaViewCustom withHorizontalPadding={false}>
        <Header title={t(`createAgent.${isEdit ? 'updateHeader' : 'createHeader'}`)} />

        {moderationComment && (
          <View style={[styles.warningContainer, computedStyles.warningContainer]}>
            <WarningTriangleIcon width={28} height={28} fill={colors.warningBase} style={styles.warningIcon} />
            <TextCustom text={moderationComment} />
          </View>
        )}

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
                  <TagsSelectorField tags={value} onPress={openTagsSelectBottomWindow} />

                  {error?.message && (
                    <TextCustom mode={TextModes.Caption} textColor={colors.errorBase} text={t(error.message)} />
                  )}
                </View>
              )}
            />
          </View>
        </KeyboardAvoidingViewCustom>

        <Button
          isDisable={isButtonDisabled}
          title={t(`actions.${isEdit ? 'update' : 'create'}`)}
          onPress={onSubmit}
          style={styles.submitButton}
        />
      </SafeAreaViewCustom>

      <ScreenLoader isLoading={isLoading} />
    </>
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
  warningIcon: {
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 5,
    alignSelf: 'center',
  },
  warningContainer: {
    marginHorizontal: SPACING.xl,
    borderWidth: 2,
    borderRadius: RADIUS.medium,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    marginBottom: SPACING.xs,
    gap: SPACING.xxs,
  },
});

export default CreateAgentScreen;
