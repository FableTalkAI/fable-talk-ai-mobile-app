import { GOOGLE_SHEET_MODERATION_URL } from '@env';

import { CreateAgentRequest } from '@/features/agents/store/agents/types.ts';

export type SaveAgentToSheetsParams = {
  id: string;
  avatarUrl: string;
} & Omit<CreateAgentRequest, 'avatarBase64'>;

export const saveAgentToSheets = async (data: SaveAgentToSheetsParams) => {
  try {
    await fetch(GOOGLE_SHEET_MODERATION_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(error);
  }
};
