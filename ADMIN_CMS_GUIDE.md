# Admin CMS Panel Documentation

## Overview
The Admin CMS Panel is a content management system that allows you to manage:
- **Team Members** - Add, edit, and delete team members
- **Articles** - Create, update, and remove blog articles
- **Banners** - Manage carousel/banner images

## Access the Admin Panel
Navigate to: `http://localhost:3000/admin`

## Features

### 1. Manage Team Members

#### Add Team Member
1. Click the "Add Team Member" button
2. Fill in the following fields:
   - **Name** - Team member's full name
   - **Role** - Job title/position
   - **Description** - Short bio or description
   - **Image URL** - Path to member's photo
   - **Email** - Contact email
   - **Phone** - Contact phone number
   - **Location** - City/location

#### Edit Team Member
1. Locate the team member card
2. Click the Edit icon (pencil icon)
3. Modify the required fields
4. Click "Save"

#### Delete Team Member
1. Locate the team member card
2. Click the Delete icon (trash icon)
3. Confirm the deletion

### 2. Manage Articles

#### Add Article
1. Click the "Add Article" button
2. Fill in the following fields:
   - **Title** - Article headline (required)
   - **Excerpt** - Short summary/preview (required)
   - **Author** - Author name
   - **Date** - Publication date
   - **Image URL** - Featured image path
   - **Content** - Full article text (required)
3. Click "Save"

#### Edit Article
1. Locate the article card
2. Click the Edit icon
3. Modify the content
4. Click "Save"

#### Delete Article
1. Locate the article card
2. Click the Delete icon
3. Confirm the deletion

### 3. Manage Banners

#### Add Banner
1. Click the "Add Banner" button
2. Enter the image URL path
3. The preview will show as you type
4. Click "Save"

#### Edit Banner
1. Locate the banner card
2. Click the Edit icon
3. Update the image URL
4. Click "Save"

#### Delete Banner
1. Locate the banner card
2. Click the Delete icon
3. Confirm the deletion

## Data Storage

All data is stored in `data.json` and updated via the `update-data.ashx` backend endpoint.

### data.json Structure
```json
{
  "carouselImages": [
    "/assets/images/bg1.png",
    "/assets/images/bg2.png"
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
  ]
}
```

## Backend API

### Endpoint
- **URL**: `/api/update-data.ashx`
- **Method**: POST
- **Content-Type**: application/json

### Request Format
```json
{
  "data": {
    "carouselImages": [...],
    "articles": [...],
    "teamMembers": [...]
  }
}
```

### Response Format
```json
{
  "success": true,
  "message": "Data saved successfully!",
  "filePath": "...",
  "timestamp": "2024-04-15 10:30:45"
}
```

## File Structure
```
src/components/admin/
├── AdminPanel.js          # Main admin panel component
├── ManageTeam.js         # Team management interface
├── ManageArticle.js      # Article management interface
├── ManageBanner.js       # Banner management interface
├── apiService.js         # API communication service
└── index.js              # Barrel export file
```

## Best Practices

1. **Image URLs** - Use relative paths like `/assets/images/image.jpg`
2. **Content Formatting** - Use line breaks in article content for better readability
3. **Required Fields** - Always fill in required fields (marked with asterisks)
4. **Backup Data** - Keep backups of your data.json file
5. **Test Changes** - Verify changes on the website after updates

## Troubleshooting

### Changes Not Saving
- Check browser console for errors
- Verify the update-data.ashx endpoint is accessible
- Ensure data.json file has write permissions

### Images Not Showing
- Verify the image file exists at the specified path
- Check the image URL format (should be `/assets/images/filename.ext`)
- Ensure images are stored in the public folder

### Missing Data
- Refresh the admin panel page
- Check if data.json file is properly formatted
- Verify all required fields are filled

## API Service Methods

### apiService.getData()
Fetches all data from data.json
```javascript
const data = await apiService.getData();
```

### apiService.updateData(updateData)
Updates data with merged changes
```javascript
await apiService.updateData({
  teamMembers: updatedTeamArray,
  articles: null,
  carouselImages: null
});
```

### apiService.updateTeamMembers(members)
Shortcut to update only team members
```javascript
await apiService.updateTeamMembers(updatedTeamArray);
```

### apiService.updateArticles(articles)
Shortcut to update only articles
```javascript
await apiService.updateArticles(updatedArticlesArray);
```

### apiService.updateBanners(images)
Shortcut to update only banners
```javascript
await apiService.updateBanners(updatedImagesArray);
```

## Security Considerations

⚠️ **Important**: The current implementation doesn't have authentication. For production use, consider:

1. **Add Authentication**
   - Implement login mechanism
   - Add role-based access control

2. **Validate Input**
   - Sanitize HTML content
   - Validate file types for images

3. **Backup System**
   - Create automated backups of data.json
   - Implement version history

4. **Rate Limiting**
   - Implement request throttling
   - Prevent spam updates

## Development Notes

- The admin panel uses Material-UI (MUI) components
- All components are functional React components with hooks
- Data updates trigger full page refresh to reflect changes
- Error messages display for 3 seconds then auto-dismiss

## Support

For issues or questions, check:
1. Browser console for error messages
2. Network tab to verify API calls
3. File permissions on data.json
4. ASP.NET application logs (if applicable)
