# Enhanced Admin CMS Panel - Complete Guide

## Overview

The admin CMS panel is a secure, feature-rich content management system for managing all aspects of the Women Empowerment NGO website. It includes authentication, left-side navigation, and management interfaces for:

- **Team Members** - Manage staff and team profiles
- **Articles** - Create and manage blog content
- **Services** - Maintain service descriptions
- **Gallery** - Upload and organize photos
- **Banners** - Manage carousel images

## Quick Start

### Access the Admin Panel

1. Navigate to: `http://localhost:3000/admin/login`
2. Enter credentials:
   - **Username**: Admin
   - **Password**: Admin@123
3. Click "Login"

### Main Dashboard

After login, you'll see the admin dashboard with:
- Left sidebar navigation menu
- Main content area for managing content
- Logout button in the sidebar

## Features

### 1. Authentication System

#### Login Page
- Secure login interface with demo credentials
- Session storage for authentication state
- Auto-redirect to login if session expires
- Protected routes prevent unauthorized access

**Default Credentials:**
- Username: `Admin`
- Password: `Admin@123`

⚠️ **Security Note**: For production use, implement proper authentication with:
- Hashed passwords
- Database-backed user management
- Role-based access control
- Session expiration and refresh tokens

### 2. Team Members Management

#### Add Team Member
1. Click "Team Members" in sidebar
2. Click "Add Team Member" button
3. Fill in fields:
   - **Name** - Full name (required)
   - **Role** - Position/Title (required)
   - **Description** - Short bio
   - **Image URL** - Profile photo path
   - **Email** - Contact email
   - **Phone** - Contact number
   - **Location** - City/Region
4. Click "Save"

#### Edit Team Member
1. Find the member in the grid
2. Click the Edit icon (pencil)
3. Modify fields as needed
4. Click "Save"

#### Delete Team Member
1. Find the member in the grid
2. Click the Delete icon (trash)
3. Confirm deletion

### 3. Articles Management

#### Create New Article
1. Click "Articles" in sidebar
2. Click "Add Article" button
3. Fill in all required fields:
   - **Title** - Article headline (required)
   - **Excerpt** - Summary/preview (required)
   - **Author** - Writer name
   - **Date** - Publication date (auto-filled with today's date)
   - **Image URL** - Featured image
   - **Content** - Full article text (required)
4. Click "Save"

#### Edit Article
1. Locate the article card
2. Click Edit icon
3. Update content
4. Click "Save"

#### Delete Article
1. Locate the article card
2. Click Delete icon
3. Confirm deletion

### 4. Services Management

#### Add Service
1. Click "Services" in sidebar
2. Click "Add Service" button
3. Fill in fields:
   - **Title** - Service name (required)
   - **Description** - Detailed description (required)
   - **Image URL** - Service icon/image
4. Click "Save"

#### Edit/Delete Service
- Same process as other modules (Edit icon and Delete icon)

### 5. Gallery Management

#### Add Gallery Item
1. Click "Gallery" in sidebar
2. Click "Add Gallery Item" button
3. Fill in fields:
   - **Title** - Image title (optional)
   - **Image URL** - Image path (required)
   - **Description** - Image description (optional)
4. Preview shows as you type
5. Click "Save"

#### Organize Gallery
- Drag to reorder (future feature)
- Delete unwanted images
- Edit descriptions and titles

### 6. Banner Management

#### Add Banner
1. Click "Banners" in sidebar
2. Click "Add Banner" button
3. Enter image URL
4. Preview appears automatically
5. Click "Save"

#### Edit/Delete Banners
- Click Edit to update image URL
- Click Delete to remove banner
- Banners display in carousel order

## File Structure

```
src/components/admin/
├── AdminPanel.js          # Main dashboard with left navigation
├── AdminLogin.js         # Login page component
├── AuthContext.js        # Authentication state management
├── ProtectedRoute.js     # Route protection wrapper
├── ManageTeam.js         # Team management interface
├── ManageArticle.js      # Article management interface
├── ManageServices.js     # Service management interface
├── ManageGallery.js      # Gallery management interface
├── ManageBanner.js       # Banner management interface
├── apiService.js         # API communication layer
└── index.js              # Barrel exports
```

## Data Structure

### data.json Format

```json
{
  "carouselImages": [
    "/assets/images/banner1.jpg",
    "/assets/images/banner2.jpg"
  ],
  "articles": [
    {
      "id": 1,
      "title": "Article Title",
      "excerpt": "Short excerpt",
      "image": "/assets/images/article.jpg",
      "author": "Author Name",
      "date": "April 15, 2024",
      "content": "Full article content..."
    }
  ],
  "teamMembers": [
    {
      "id": 1,
      "name": "Member Name",
      "role": "Position",
      "description": "Bio",
      "image": "/assets/images/member.jpg",
      "email": "email@example.com",
      "phone": "+91 XXXXXXXXXX",
      "location": "City, State"
    }
  ],
  "services": [
    {
      "id": 1,
      "title": "Service Title",
      "description": "Service description",
      "image": "/assets/images/service.jpg"
    }
  ],
  "gallery": [
    {
      "id": 1,
      "title": "Image Title",
      "image": "/assets/images/gallery.jpg",
      "description": "Image description"
    }
  ]
}
```

## API Integration

### Backend Endpoint
- **URL**: `/api/update-data.ashx`
- **Method**: POST
- **Content-Type**: application/json

### Request Format
```json
{
  "data": {
    "carouselImages": [...],
    "articles": [...],
    "teamMembers": [...],
    "services": [...],
    "gallery": [...]
  }
}
```

### Response Format
```json
{
  "success": true,
  "message": "Data saved successfully!",
  "filePath": "path/to/data.json",
  "timestamp": "2024-04-15 10:30:45"
}
```

## API Service Methods

### Core Methods

```javascript
// Fetch all data
const data = await apiService.getData();

// Update specific section
await apiService.updateTeamMembers(teamArray);
await apiService.updateArticles(articlesArray);
await apiService.updateServices(servicesArray);
await apiService.updateGallery(galleryArray);
await apiService.updateBanners(imagesArray);

// Generic update (handles merging)
await apiService.updateData({
  teamMembers: updatedTeamArray,
  articles: null,
  services: null,
  gallery: null,
  carouselImages: null
});
```

## Routing

### Admin Routes
- `/admin/login` - Login page
- `/admin/dashboard` - Main admin dashboard
- `/admin/*` - All admin panel routes (protected)

### Protected Routes
All admin routes require authentication. Unauthenticated users are redirected to `/admin/login`.

## Authentication Flow

1. **User visits `/admin/login`** → Login form displayed
2. **User enters credentials** → Validated against hardcoded defaults
3. **Login successful** → User info stored in localStorage
4. **User navigates to `/admin/*`** → ProtectedRoute checks localStorage
5. **If authenticated** → AdminPanel renders
6. **If not authenticated** → Redirected to login
7. **User clicks Logout** → localStorage cleared, redirected to login

## Styling & UI

### Design System
- Material-UI (MUI) components
- Gradient color scheme (purple: #667eea to #764ba2)
- Responsive design (mobile, tablet, desktop)
- Left sidebar navigation (collapsible on mobile)

### Key UI Elements
- AppBar with title
- Sidebar with menu items
- Content cards with action buttons
- Dialog forms for add/edit
- Alert messages for feedback
- Loading spinners for async operations

## Error Handling

### Common Issues

**"Changes Not Saving"**
- Check browser console for errors
- Verify network connectivity
- Ensure data.json has write permissions
- Check update-data.ashx endpoint is accessible

**"Images Not Showing"**
- Verify image files exist in the specified path
- Use absolute paths: `/assets/images/filename.ext`
- Check file format is supported (jpg, png, gif, webp)

**"Authentication Failed"**
- Verify credentials: Admin / Admin@123
- Check browser's localStorage isn't cleared
- Clear cookies and try again

**"Data Loss"**
- Always backup data.json
- Check both /public and /build folders have same data
- Verify update-data.ashx updated both locations

## Best Practices

1. **Image Management**
   - Store images in `/public/assets/images/`
   - Use consistent naming conventions
   - Optimize images for web (reduce file size)
   - Use relative paths in URLs

2. **Content Creation**
   - Keep titles concise and descriptive
   - Write engaging excerpts
   - Use proper formatting in article content
   - Add relevant images for better engagement

3. **Data Backup**
   - Regularly backup data.json
   - Keep version history
   - Test restore procedures
   - Store backups securely

4. **Security**
   - Change default credentials before production
   - Use HTTPS for all connections
   - Implement proper authentication
   - Add audit logging for changes

## Production Deployment

### Before Going Live

1. **Change Admin Credentials**
   ```javascript
   // In AdminLogin.js
   if (username === 'YourUsername' && password === 'YourSecurePassword')
   ```

2. **Enable HTTPS**
   - Configure SSL certificates
   - Force HTTPS redirects

3. **Implement Authentication**
   - Replace hardcoded credentials
   - Add database-backed user management
   - Implement JWT or session tokens

4. **Add Audit Logging**
   - Log who changed what and when
   - Track changes for accountability
   - Enable admin notifications

5. **Database Integration**
   - Replace JSON file storage
   - Use database transactions
   - Implement backups

6. **Monitoring**
   - Setup error logging
   - Monitor API performance
   - Setup alerts for failures

## Troubleshooting

### Admin Panel Won't Load
- Clear browser cache
- Check console for JavaScript errors
- Verify all dependencies are installed
- Check network tab for failed requests

### Changes Not Persisting
- Verify update-data.ashx is running
- Check IIS application pool is running
- Verify file permissions on data.json
- Check disk space availability

### Images Not Loading
- Verify file exists at specified path
- Check image permissions
- Try absolute path instead of relative
- Check file format is supported

### Login Issues
- Clear localStorage: `localStorage.clear()`
- Verify credentials are correct
- Check browser console for errors
- Try private/incognito mode

## Support & Maintenance

### Regular Tasks
- Monitor data.json file size
- Backup data weekly
- Review access logs
- Update security credentials

### Performance Tips
- Compress images before uploading
- Limit article content length
- Archive old articles
- Clean up unused gallery items

### Future Enhancements
- Search/filter functionality
- Bulk operations
- User roles and permissions
- Advanced image editor
- SEO optimization tools
- Preview before publishing

## Contact & Support

For issues or feature requests, please refer to:
- [ADMIN_CMS_GUIDE.md](../ADMIN_CMS_GUIDE.md)
- Backend logs in IIS
- Browser console (F12)
- Network tab for API debugging
