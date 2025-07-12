import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppleIcon } from '@/assets/icons';
import Button from '@/components/atoms/Button';

const Man = () => {
  const { t } = useTranslation();

  console.log('ssss');
  return (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
      <AppleIcon />
      <Text>{t('test')}</Text>
      <Button title={'res'} />
    </View>
  );
};

export default Man;
