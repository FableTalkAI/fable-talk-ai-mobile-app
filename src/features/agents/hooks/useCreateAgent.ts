import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { DEFAULT_CREATE_AGENT_VALUES } from '@/features/agents/model/constants.ts';
import { createAgentSchema } from '@/features/agents/model/schemas.ts';
import { CreateAgentValues } from '@/features/agents/model/types.ts';

const useCreateAgent = () => {
  const { control, handleSubmit } = useForm<CreateAgentValues>({
    resolver: zodResolver(createAgentSchema),
    defaultValues: DEFAULT_CREATE_AGENT_VALUES,
    mode: 'onChange',
  });

  const onSubmit = handleSubmit((data: CreateAgentValues) => {
    console.log(data);
  });

  return {
    control,
    onSubmit,
  };
};

export default useCreateAgent;
