# Admin CMS Panel - Quick Start Guide

## 🚀 5-Minute Quick Start

### Step 1: Access Login Page
```
URL: http://localhost:3000/admin/login
```

### Step 2: Login with Demo Credentials
- **Username**: `Admin`
- **Password**: `Admin@123`

### Step 3: You're In!
You should now see the Admin Dashboard with a left sidebar menu.

---

## 📌 Main Menu Options

| Menu Item | Purpose | What You Can Do |
|-----------|---------|-----------------|
| **Team Members** | Manage staff profiles | Add/Edit/Delete team members with photos and bios |
| **Articles** | Blog content management | Create publish articles with images and content |
| **Services** | Service offerings | Manage service descriptions and icons |
| **Gallery** | Photo management | Upload and organize photos |
| **Banners** | Carousel images | Set up homepage carousel banners |

---

## 📝 Common Tasks

### Add a New Team Member
1. Click **"Team Members"** in sidebar
2. Click **"Add Team Member"** button
3. Fill in the form:
   - Name
   - Role (e.g., "Director", "Manager")
   - Description
   - Image URL (e.g., `/assets/images/photo.jpg`)
   - Email
   - Phone
   - Location
4. Click **"Save"**

### Write a New Article
1. Click **"Articles"** in sidebar
2. Click **"Add Article"** button
3. Fill in:
   - Title (required)
   - Excerpt (required)
   - Author name
   - Date (auto-filled)
   - Image URL (featured image)
   - Content (full article text, required)
4. Click **"Save"**

### Add a Service
1. Click **"Services"** in sidebar
2. Click **"Add Service"** button
3. Fill in:
   - Title (required)
   - Description (required)
   - Image URL
4. Click **"Save"**

### Upload Gallery Photos
1. Click **"Gallery"** in sidebar
2. Click **"Add Gallery Item"** button
3. Fill in:
   - Image URL (required)
   - Title (optional)
   - Description (optional)
4. Preview shows in real-time
5. Click **"Save"**

### Add Banner Images
1. Click **"Banners"** in sidebar
2. Click **"Add Banner"** button
3. Paste image URL
4. Preview appears automatically
5. Click **"Save"**

---

## ✏️ Edit Content

All cards have two action icons:
- **Pencil Icon** ✏️ = Edit
- **Trash Icon** 🗑️ = Delete

Click the pencil to edit, make your changes, and click "Save".

---

## 🔐 Security Tips

- **Username**: Admin (case-sensitive)
- **Password**: Admin@123 (case-sensitive)
- Store credentials securely
- Change credentials for production use
- Logout when done
- Never share credentials

---

## 💾 Important Notes

### Image URLs
Always use paths like:
```
/assets/images/filename.jpg
/assets/images/photo.png
```

NOT:
```
C:\Users\your\path\image.jpg
https://external-site.com/image.jpg (may be blocked)
```

### Data Storage
- All data saved to `/public/data.json`
- Auto-updates `/build/data.json`
- Changes visible immediately on website

### Auto-Features
- ✅ Image preview while typing
- ✅ Success/error messages
- ✅ Session auto-logout
- ✅ Data validation
- ✅ Automatic date filling

---

## ⚠️ Troubleshooting

### "Login Failed"
- Check CAPS LOCK
- Credentials: Admin / Admin@123
- Clear browser cache

### "Changes Not Saving"
- Check internet connection
- Verify file permissions
- Check backend is running
- Look at browser console (F12)

### "Images Not Showing"
- Use correct path: `/assets/images/...`
- Check image file exists
- Try different image format

### "Can't Access Admin"
- Make sure you're logged in
- Try `/admin/login` URL
- Clear localStorage: `localStorage.clear()`

---

## 🎯 Pro Tips

1. **Always Preview** - Wait for image preview before saving
2. **Backup First** - Save data.json before big changes
3. **Test First** - Preview changes on website before finalizing
4. **Use Descriptions** - Add descriptions to help users understand
5. **Keep Fresh** - Update content regularly for engagement

---

## 📱 Works On

- ✅ Desktop (full experience)
- ✅ Tablet (responsive layout)
- ✅ Mobile (sidebar collapses)

---

## 🔄 Data Sync

When you save:
1. Data sent to backend
2. Saved to `/data.json`
3. Updated in `/build/data.json`
4. Website automatically reflects changes
5. No page refresh needed

---

## 🚪 Logout

Click **"Logout"** button in sidebar to:
- Clear your session
- Return to login page
- Protect your account

---

## 📞 Need Help?

Check these documentation files:
- **ENHANCED_ADMIN_PANEL_GUIDE.md** - Full documentation
- **ADMIN_ARCHITECTURE.md** - Technical overview
- **SETUP_SUMMARY.md** - Complete setup guide

---

## 🎉 You're Ready!

**Start by:**
1. Login to admin
2. Click any menu item
3. Click "Add" button
4. Fill form
5. Click "Save"

That's it! Your content is now live on the website.

---

## 🔒 Security Checklist

Before Production:
- [ ] Change admin password
- [ ] Enable HTTPS
- [ ] Setup database backups
- [ ] Add user authentication
- [ ] Implement audit logging
- [ ] Restrict file uploads
- [ ] Setup monitoring
- [ ] Test all features

---

**Version**: 2.0 (Enhanced with Services & Gallery)
**Last Updated**: April 28, 2026
**Status**: ✅ Ready to Use
