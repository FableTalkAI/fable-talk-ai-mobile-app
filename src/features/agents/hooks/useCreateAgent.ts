import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { DEFAULT_CREATE_AGENT_VALUES } from '@/features/agents/model/constants.ts';
import { createAgentSchema } from '@/features/agents/model/schemas.ts';
import { CreateAgentValues } from '@/features/agents/model/types.ts';
import { saveAgentToSheets } from '@/features/agents/services/saveAgentToSheets.ts';
import useNavigationRoutes from '@/features/navigation/hooks/useNavigationRoutes';
import useProfileStore from '@/features/profile/hooks/useProfileStore.ts';
import { useImagePick } from '@/shared/hooks/useImagePick';
import { showToast } from '@/shared/lib/toast';
import { convertImageToBase64 } from '@/shared/services/convertImageToBase64.ts';

import useAgentsStore from './useAgentsStore.ts';

const useCreateAgent = () => {
  const { t } = useTranslation();

  const { profile } = useProfileStore();
  const { createAgentHandler, getAgentsHandler, getMyAgentsHandler } = useAgentsStore();
  const { navigation } = useNavigationRoutes();

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { isSubmitting },
  } = useForm<CreateAgentValues>({
    resolver: zodResolver(createAgentSchema),
    defaultValues: DEFAULT_CREATE_AGENT_VALUES,
    mode: 'onChange',
  });

  const { pickImage } = useImagePick({
    onSuccess: uri => {
      setValue('avatar', uri, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    },
  });

  const setTags = (tags: string[]) =>
    setValue('tags', tags, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

  const onSubmit = handleSubmit(async ({ avatar, subtitle, description, ...data }: CreateAgentValues) => {
    if (!profile) return;

    const avatarBase64 = await convertImageToBase64(avatar);

    const uploadData = {
      ...data,
      description: subtitle,
      prompt: description,
    };

    const agent = await createAgentHandler({ ...uploadData, avatarBase64 });
    await Promise.all([
      saveAgentToSheets({ ...uploadData, avatarUrl: agent.avatarUrl, id: agent.id }),
      getAgentsHandler(),
      getMyAgentsHandler(),
    ]);

    showToast({
      type: 'success',
      text2: t('createAgent.agentCreatedSuccess'),
      visibilityTime: 5000,
    });

    navigation.goBack();
  });

  return {
    control,
    onSubmit,
    setTags,
    getValues,
    pickImage,
    isLoading: isSubmitting,
  };
};

export default useCreateAgent;
