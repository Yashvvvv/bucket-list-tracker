# API Documentation

## GraphQL API Overview

The Bucket List Tracker uses AWS AppSync GraphQL API for all data operations. The API provides real-time capabilities and offline support.

### Base Configuration

```javascript
import { generateClient } from 'aws-amplify/data';
import { Amplify } from 'aws-amplify';
import amplifyconfig from './amplifyconfig.json';

Amplify.configure(amplifyconfig);
const client = generateClient();
```

## Data Model

### BucketListItem

```graphql
type BucketListItem {
  id: ID!
  title: String!
  description: String
  location: String
  priority: Priority!
  completed: Boolean!
  imageUrl: String
  owner: String
  createdAt: AWSDateTime!
  updatedAt: AWSDateTime!
}

enum Priority {
  low
  medium
  high
}
```

## Mutations

### Create Bucket List Item

```graphql
mutation CreateBucketListItem($input: CreateBucketListItemInput!) {
  createBucketListItem(input: $input) {
    id
    title
    description
    location
    priority
    completed
    imageUrl
    createdAt
    updatedAt
  }
}
```

**JavaScript Example:**
```javascript
const createItem = async (itemData) => {
  try {
    const result = await client.graphql({
      query: createBucketListItem,
      variables: {
        input: {
          title: itemData.title,
          description: itemData.description,
          location: itemData.location,
          priority: itemData.priority,
          completed: false
        }
      }
    });
    return result.data.createBucketListItem;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
};
```

### Update Bucket List Item

```graphql
mutation UpdateBucketListItem($input: UpdateBucketListItemInput!) {
  updateBucketListItem(input: $input) {
    id
    title
    description
    location
    priority
    completed
    imageUrl
    updatedAt
  }
}
```

**JavaScript Example:**
```javascript
const updateItem = async (id, updates) => {
  try {
    const result = await client.graphql({
      query: updateBucketListItem,
      variables: {
        input: {
          id: id,
          ...updates
        }
      }
    });
    return result.data.updateBucketListItem;
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
};
```

### Delete Bucket List Item

```graphql
mutation DeleteBucketListItem($input: DeleteBucketListItemInput!) {
  deleteBucketListItem(input: $input) {
    id
  }
}
```

**JavaScript Example:**
```javascript
const deleteItem = async (id) => {
  try {
    const result = await client.graphql({
      query: deleteBucketListItem,
      variables: {
        input: { id }
      }
    });
    return result.data.deleteBucketListItem;
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};
```

## Queries

### Get Single Item

```graphql
query GetBucketListItem($id: ID!) {
  getBucketListItem(id: $id) {
    id
    title
    description
    location
    priority
    completed
    imageUrl
    createdAt
    updatedAt
  }
}
```

### List All Items

```graphql
query ListBucketListItems(
  $filter: ModelBucketListItemFilterInput
  $limit: Int
  $nextToken: String
) {
  listBucketListItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      description
      location
      priority
      completed
      imageUrl
      createdAt
      updatedAt
    }
    nextToken
  }
}
```

**JavaScript Example:**
```javascript
const listItems = async (filter = null) => {
  try {
    const result = await client.graphql({
      query: listBucketListItems,
      variables: {
        filter: filter,
        limit: 50
      }
    });
    return result.data.listBucketListItems.items;
  } catch (error) {
    console.error('Error listing items:', error);
    throw error;
  }
};

// Filter by completion status
const listCompletedItems = () => {
  return listItems({
    completed: { eq: true }
  });
};

// Filter by priority
const listHighPriorityItems = () => {
  return listItems({
    priority: { eq: 'high' }
  });
};
```

## Subscriptions

### Real-time Updates

```graphql
subscription OnCreateBucketListItem {
  onCreateBucketListItem {
    id
    title
    description
    location
    priority
    completed
    imageUrl
    createdAt
  }
}

subscription OnUpdateBucketListItem {
  onUpdateBucketListItem {
    id
    title
    description
    location
    priority
    completed
    imageUrl
    updatedAt
  }
}

subscription OnDeleteBucketListItem {
  onDeleteBucketListItem {
    id
  }
}
```

**JavaScript Example:**
```javascript
const subscribeToItemChanges = (onItemCreated, onItemUpdated, onItemDeleted) => {
  // Subscribe to item creation
  const createSub = client.graphql({
    query: onCreateBucketListItem
  }).subscribe({
    next: ({ data }) => {
      onItemCreated(data.onCreateBucketListItem);
    },
    error: (error) => console.error('Create subscription error:', error)
  });

  // Subscribe to item updates
  const updateSub = client.graphql({
    query: onUpdateBucketListItem
  }).subscribe({
    next: ({ data }) => {
      onItemUpdated(data.onUpdateBucketListItem);
    },
    error: (error) => console.error('Update subscription error:', error)
  });

  // Subscribe to item deletions
  const deleteSub = client.graphql({
    query: onDeleteBucketListItem
  }).subscribe({
    next: ({ data }) => {
      onItemDeleted(data.onDeleteBucketListItem);
    },
    error: (error) => console.error('Delete subscription error:', error)
  });

  // Return unsubscribe function
  return () => {
    createSub.unsubscribe();
    updateSub.unsubscribe();
    deleteSub.unsubscribe();
  };
};
```

## File Upload API

### Storage Configuration

```javascript
import { uploadData, getUrl, remove } from 'aws-amplify/storage';

// Upload image
const uploadImage = async (file, itemId) => {
  try {
    const key = `bucket-list-images/${itemId}/${file.name}`;
    const result = await uploadData({
      key,
      data: file,
      options: {
        accessLevel: 'private'
      }
    });
    return key;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Get image URL
const getImageUrl = async (key) => {
  try {
    const url = await getUrl({
      key,
      options: {
        accessLevel: 'private',
        expiresIn: 3600 // URL expires in 1 hour
      }
    });
    return url.url;
  } catch (error) {
    console.error('Error getting image URL:', error);
    throw error;
  }
};

// Delete image
const deleteImage = async (key) => {
  try {
    await remove({
      key,
      options: {
        accessLevel: 'private'
      }
    });
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};
```

## Error Handling

### Common Error Types

1. **Authentication Errors**
   ```javascript
   if (error.errors[0].errorType === 'Unauthorized') {
     // Handle authentication error
     // Redirect to login or refresh token
   }
   ```

2. **Validation Errors**
   ```javascript
   if (error.errors[0].errorType === 'ValidationException') {
     // Handle validation error
     // Display field-specific error messages
   }
   ```

3. **Network Errors**
   ```javascript
   if (error.networkError) {
     // Handle network connectivity issues
     // Show offline indicator
   }
   ```

### Error Handling Best Practices

```javascript
const handleApiError = (error, operation) => {
  console.error(`Error in ${operation}:`, error);
  
  if (error.errors) {
    error.errors.forEach(err => {
      switch (err.errorType) {
        case 'Unauthorized':
          // Redirect to login
          window.location.href = '/login';
          break;
        case 'ValidationException':
          // Show validation error
          showErrorMessage(err.message);
          break;
        case 'ConditionalCheckFailedException':
          // Handle optimistic locking
          showErrorMessage('Item was modified by another user. Please refresh and try again.');
          break;
        default:
          showErrorMessage('An unexpected error occurred. Please try again.');
      }
    });
  } else if (error.networkError) {
    showErrorMessage('Network error. Please check your connection.');
  } else {
    showErrorMessage('An unexpected error occurred. Please try again.');
  }
};
```

## Rate Limiting and Throttling

### AppSync Limits
- **Query rate**: 1000 requests per second per API
- **Subscription connections**: 5000 concurrent connections
- **Mutation rate**: 1000 requests per second per API

### Best Practices
1. Implement exponential backoff for retries
2. Use batch operations when possible
3. Cache frequently accessed data
4. Implement proper loading states

## Authentication Integration

### JWT Token Handling

```javascript
import { fetchAuthSession } from 'aws-amplify/auth';

const getAuthHeaders = async () => {
  try {
    const session = await fetchAuthSession();
    return {
      Authorization: `Bearer ${session.tokens.idToken.toString()}`
    };
  } catch (error) {
    console.error('Error getting auth session:', error);
    throw error;
  }
};
```

### User Context

```javascript
import { getCurrentUser } from 'aws-amplify/auth';

const getCurrentUserInfo = async () => {
  try {
    const user = await getCurrentUser();
    return {
      userId: user.userId,
      username: user.username,
      email: user.signInDetails?.loginId
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};
```

## Testing the API

### Unit Tests

```javascript
import { createMockClient } from '@aws-amplify/api-graphql/testing';

const mockClient = createMockClient();

test('should create bucket list item', async () => {
  const mockResult = {
    data: {
      createBucketListItem: {
        id: '123',
        title: 'Test Item',
        completed: false
      }
    }
  };

  mockClient.graphql.mockResolvedValue(mockResult);

  const result = await createItem({
    title: 'Test Item',
    description: 'Test Description'
  });

  expect(result).toEqual(mockResult.data.createBucketListItem);
});
```

### Integration Tests

```javascript
// Test with real AWS resources (staging environment)
describe('BucketListItem API Integration', () => {
  let testItemId;

  beforeAll(async () => {
    // Setup test user authentication
    await signIn('test@example.com', 'password');
  });

  afterAll(async () => {
    // Cleanup test data
    if (testItemId) {
      await deleteItem(testItemId);
    }
    await signOut();
  });

  test('should create, read, update, and delete item', async () => {
    // Create
    const newItem = await createItem({
      title: 'Integration Test Item',
      priority: 'medium'
    });
    testItemId = newItem.id;
    expect(newItem.title).toBe('Integration Test Item');

    // Read
    const retrievedItem = await getItem(testItemId);
    expect(retrievedItem.id).toBe(testItemId);

    // Update
    const updatedItem = await updateItem(testItemId, {
      completed: true
    });
    expect(updatedItem.completed).toBe(true);

    // Delete
    await deleteItem(testItemId);
    testItemId = null;
  });
});
```
