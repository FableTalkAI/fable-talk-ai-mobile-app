import { View } from 'react-native';

import useCreateAgent from '@/features/agents/hooks/useCreateAgent.ts';
import Button from '@/shared/ui/Button';
import FieldInput from '@/shared/ui/FieldInput';
import Header from '@/shared/ui/Header';
import SafeAreaViewCustom from '@/shared/ui/SafeAreaViewCustom';

const CreateAgentScreen = () => {
  const { control, onSubmit } = useCreateAgent();

  return (
    <SafeAreaViewCustom>
      <Header title="Create Agent" />

      <View style={{ gap: 12, marginBottom: 36 }}>
        <FieldInput name="username" control={control} label="Никнейм" placeholder="Например, ivan_ivanov" />

        <FieldInput
          name="email"
          control={control}
          label="Электронная почта"
          placeholder="example@mail.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <FieldInput name="age" control={control} label="Возраст" placeholder="18" keyboardType="numeric" />
      </View>
      <Button title="test" onPress={onSubmit} />
    </SafeAreaViewCustom>
  );
};

export default CreateAgentScreen;
