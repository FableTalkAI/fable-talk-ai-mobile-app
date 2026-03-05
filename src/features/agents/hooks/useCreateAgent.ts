import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { DEFAULT_CREATE_AGENT_VALUES } from '@/features/agents/model/constants.ts';
import { createAgentSchema } from '@/features/agents/model/schemas.ts';
import { CreateAgentValues } from '@/features/agents/model/types.ts';
import { Agent, CreateAgentRequest, Tag } from '@/features/agents/store/agents/types.ts';
import useNavigationRoutes from '@/features/navigation/hooks/useNavigationRoutes';
import useProfileStore from '@/features/profile/hooks/useProfileStore.ts';
import { useImagePick } from '@/shared/hooks/useImagePick';
import { showToast } from '@/shared/lib/toast';
import { convertImageToBase64 } from '@/shared/services/convertImageToBase64.ts';

import useAgentsStore from './useAgentsStore.ts';

type UseCreateAgentParams = {
  agentId?: string;
};

const useCreateAgent = ({ agentId }: UseCreateAgentParams) => {
  const { t } = useTranslation();

  const { profile, getUserProfileHandler } = useProfileStore();
  const { createAgentHandler, getMyAgentsHandler, myAgents, updateAgentHandler } = useAgentsStore();
  const { navigation } = useNavigationRoutes();

  const isEdit = !!agentId;
  const selectedAgent = isEdit ? myAgents.find((agent: Agent) => agent.id === agentId) : undefined;

  const defaultValues = useMemo(() => {
    if (!selectedAgent) return DEFAULT_CREATE_AGENT_VALUES;

    return {
      avatar: selectedAgent.avatarUrl,
      name: selectedAgent.name,
      subtitle: selectedAgent.description,
      description: selectedAgent.prompt,
      tags: selectedAgent.tags,
    };
  }, [selectedAgent]);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { isSubmitting, dirtyFields, isDirty },
  } = useForm<CreateAgentValues>({
    resolver: zodResolver(createAgentSchema),
    defaultValues,
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

  const setTags = (tags: Tag[]) =>
    setValue('tags', tags, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

  const onSubmit = handleSubmit(async ({ avatar, subtitle, description, ...data }: CreateAgentValues) => {
    if (!profile) return;

    const payload = {
      description: subtitle,
      prompt: description,
      ...data,
    };

    if (isEdit) {
      const changedData: Partial<CreateAgentRequest> = {};

      (Object.keys(payload) as Array<keyof CreateAgentValues>).forEach(key => {
        if (dirtyFields[key]) {
          // @ts-ignore
          changedData[key] = payload[key];
        }
      });

      if (dirtyFields.avatar) {
        changedData.avatarBase64 = await convertImageToBase64(avatar);
      }

      await updateAgentHandler({ ...changedData, agentId });
    } else {
      const avatarBase64 = await convertImageToBase64(avatar);
      const uploadData = { ...payload, avatarBase64 };
      await createAgentHandler(uploadData);
    }

    if (!profile.isCreatedAgent) await getUserProfileHandler();
    await getMyAgentsHandler();

    showToast({
      type: 'success',
      text2: t(`createAgent.${isEdit ? 'agentUpdatedSuccessfully' : 'agentCreatedSuccessfully'}`),
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
    moderationComment: selectedAgent?.moderationComment,
    isEdit,
    isButtonDisabled: isEdit ? !isDirty : false,
  };
};

export default useCreateAgent;
