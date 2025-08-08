import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  BucketListItem: a
    .model({
      title: a.string().required(),
      description: a.string(),
      location: a.string(),
      priority: a.enum(['low', 'medium', 'high']),
      completed: a.boolean().default(false),
      imageUrl: a.string(),
      owner: a.string()
    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
