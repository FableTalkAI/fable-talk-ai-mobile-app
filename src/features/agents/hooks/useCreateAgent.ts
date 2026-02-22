import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { DEFAULT_CREATE_AGENT_VALUES } from '@/features/agents/model/constants.ts';
import { createAgentSchema } from '@/features/agents/model/schemas.ts';
import { CreateAgentValues } from '@/features/agents/model/types.ts';
import { useImagePick } from '@/shared/hooks/useImagePick';

const useCreateAgent = () => {
  const { control, handleSubmit, setValue, getValues } = useForm<CreateAgentValues>({
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

  const onSubmit = handleSubmit((data: CreateAgentValues) => {
    console.log(data);
  });

  return {
    control,
    onSubmit,
    setTags,
    getValues,
    pickImage,
  };
};

export default useCreateAgent;
