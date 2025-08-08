import { useState, useEffect } from 'react'
import { StorageManager } from '@aws-amplify/ui-react-storage'
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Upload, 
  MapPin, 
  Calendar,
  Star,
  Image
} from 'lucide-react'
import './BucketListApp.css'

const BucketListApp = ({ user, client }) => {
  const [bucketItems, setBucketItems] = useState([])
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    location: '',
    priority: 'medium',
    completed: false
  })
  const [editingId, setEditingId] = useState(null)
  const [editingItem, setEditingItem] = useState({})
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  // Mock data for demo purposes
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setBucketItems([
        {
          id: '1',
          title: 'Visit the Northern Lights',
          description: 'Experience the magical Aurora Borealis in Iceland',
          location: 'Iceland',
          priority: 'high',
          completed: false,
          imageUrl: null,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Learn to Scuba Dive',
          description: 'Get certified and explore underwater coral reefs',
          location: 'Great Barrier Reef',
          priority: 'medium',
          completed: true,
          imageUrl: null,
          createdAt: new Date().toISOString()
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const addItem = () => {
    if (!newItem.title.trim()) return

    const item = {
      id: Date.now().toString(),
      ...newItem,
      createdAt: new Date().toISOString()
    }
    
    setBucketItems([...bucketItems, item])
    setNewItem({
      title: '',
      description: '',
      location: '',
      priority: 'medium',
      completed: false
    })
  }

  const deleteItem = (id) => {
    setBucketItems(bucketItems.filter(item => item.id !== id))
  }

  const toggleComplete = (id) => {
    setBucketItems(bucketItems.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ))
  }

  const startEdit = (item) => {
    setEditingId(item.id)
    setEditingItem({ ...item })
  }

  const saveEdit = () => {
    setBucketItems(bucketItems.map(item =>
      item.id === editingId ? editingItem : item
    ))
    setEditingId(null)
    setEditingItem({})
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingItem({})
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4757'
      case 'medium': return '#ffa502'
      case 'low': return '#2ed573'
      default: return '#747d8c'
    }
  }

  const filteredItems = bucketItems.filter(item => {
    if (filter === 'completed') return item.completed
    if (filter === 'pending') return !item.completed
    return true
  })

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your bucket list...</p>
      </div>
    )
  }

  return (
    <div className="bucket-list-app">
      <div className="app-container">
        
        {/* Add New Item Form */}
        <div className="add-item-section">
          <h2>Add New Adventure</h2>
          <div className="add-item-form">
            <div className="form-row">
              <input
                type="text"
                placeholder="What's your dream adventure?"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                className="title-input"
              />
              <select
                value={newItem.priority}
                onChange={(e) => setNewItem({ ...newItem, priority: e.target.value })}
                className="priority-select"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
            
            <textarea
              placeholder="Describe your adventure..."
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              className="description-input"
              rows="3"
            />
            
            <div className="form-row">
              <input
                type="text"
                placeholder="Location"
                value={newItem.location}
                onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                className="location-input"
              />
              <button onClick={addItem} className="add-btn">
                <Plus size={20} />
                Add to List
              </button>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="filter-section">
          <button 
            className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('all')}
          >
            All ({bucketItems.length})
          </button>
          <button 
            className={filter === 'pending' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('pending')}
          >
            Pending ({bucketItems.filter(item => !item.completed).length})
          </button>
          <button 
            className={filter === 'completed' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('completed')}
          >
            Completed ({bucketItems.filter(item => item.completed).length})
          </button>
        </div>

        {/* Bucket List Items */}
        <div className="bucket-list">
          {filteredItems.length === 0 ? (
            <div className="empty-state">
              <h3>No adventures found</h3>
              <p>Start adding your dream destinations and experiences!</p>
            </div>
          ) : (
            filteredItems.map(item => (
              <div key={item.id} className={`bucket-item ${item.completed ? 'completed' : ''}`}>
                {editingId === item.id ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      value={editingItem.title}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="edit-title-input"
                    />
                    <textarea
                      value={editingItem.description}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      className="edit-description-input"
                      rows="2"
                    />
                    <div className="edit-row">
                      <input
                        type="text"
                        value={editingItem.location}
                        onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                        className="edit-location-input"
                        placeholder="Location"
                      />
                      <select
                        value={editingItem.priority}
                        onChange={(e) => setEditingItem({ ...editingItem, priority: e.target.value })}
                        className="edit-priority-select"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    <div className="edit-actions">
                      <button onClick={saveEdit} className="save-btn">
                        <Check size={16} />
                        Save
                      </button>
                      <button onClick={cancelEdit} className="cancel-btn">
                        <X size={16} />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="item-header">
                      <div className="item-title-section">
                        <h3 className="item-title">{item.title}</h3>
                        <div 
                          className="priority-badge"
                          style={{ backgroundColor: getPriorityColor(item.priority) }}
                        >
                          <Star size={12} />
                          {item.priority}
                        </div>
                      </div>
                      <div className="item-actions">
                        <button
                          onClick={() => toggleComplete(item.id)}
                          className={`complete-btn ${item.completed ? 'completed' : ''}`}
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() => startEdit(item)}
                          className="edit-btn"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="delete-btn"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <p className="item-description">{item.description}</p>
                    
                    {item.location && (
                      <div className="item-location">
                        <MapPin size={14} />
                        <span>{item.location}</span>
                      </div>
                    )}
                    
                    <div className="item-meta">
                      <div className="item-date">
                        <Calendar size={14} />
                        <span>Added {new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                      
                      {/* Image Upload Section */}
                      <div className="image-upload-section">
                        <StorageManager
                          acceptedFileTypes={['image/*']}
                          path={`bucket-list-images/${user.username}/${item.id}/`}
                          maxFileCount={1}
                          components={{
                            Container({ children }) {
                              return (
                                <div className="image-upload-container">
                                  <Image size={14} />
                                  <span>Add Image</span>
                                  {children}
                                </div>
                              )
                            }
                          }}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default BucketListApp
