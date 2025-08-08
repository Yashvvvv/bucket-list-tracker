import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'bucketListStorage',
  access: (allow) => ({
    'bucket-list-images/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete']),
    ],
  }),
});
