import { NOTIFICATIONS_ROUTE } from '@env';

import { UpdateNotificationsTokenRequest } from '@/features/notifications/model/types.ts';
import http from '@/shared/api/http.ts';

export const updateNotificationsToken = async (data: UpdateNotificationsTokenRequest) => {
  await http.post(`${NOTIFICATIONS_ROUTE}/update`, { data });
};
