// API Service for handling data updates via update-data.ashx endpoint

const API_URL = '/api/update-data.ashx';

export const apiService = {
  /**
   * Fetch all data from the server
   */
  async getData() {
    try {
      const response = await fetch('/data.json');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },

  /**
   * Update data on the server
   * @param {Object} updateData - Object containing articles, teamMembers, services, gallery, or carouselImages to update
   */
  async updateData(updateData) {
    try {
      // First get the existing data
      const existingData = await this.getData();

      // Merge the updates with existing data
      const mergedData = {
        carouselImages: updateData.carouselImages !== null ? updateData.carouselImages : existingData.carouselImages,
        articles: updateData.articles !== null ? updateData.articles : existingData.articles,
        teamMembers: updateData.teamMembers !== null ? updateData.teamMembers : existingData.teamMembers,
        services: updateData.services !== null ? updateData.services : existingData.services,
        gallery: updateData.gallery !== null ? updateData.gallery : existingData.gallery,
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: mergedData
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || 'Update failed');
      }
      return result;
    } catch (error) {
      console.error('Error updating data:', error);
      throw error;
    }
  },

  /**
   * Update team members
   */
  async updateTeamMembers(members) {
    return this.updateData({
      teamMembers: members,
      articles: null,
      carouselImages: null,
      services: null,
      gallery: null,
    });
  },

  /**
   * Update articles
   */
  async updateArticles(articles) {
    return this.updateData({
      articles: articles,
      teamMembers: null,
      carouselImages: null,
      services: null,
      gallery: null,
    });
  },

  /**
   * Update carousel banners
   */
  async updateBanners(images) {
    return this.updateData({
      carouselImages: images,
      articles: null,
      teamMembers: null,
      services: null,
      gallery: null,
    });
  },

  /**
   * Update services
   */
  async updateServices(services) {
    return this.updateData({
      services: services,
      articles: null,
      teamMembers: null,
      carouselImages: null,
      gallery: null,
    });
  },

  /**
   * Update gallery
   */
  async updateGallery(gallery) {
    return this.updateData({
      gallery: gallery,
      articles: null,
      teamMembers: null,
      carouselImages: null,
      services: null,
    });
  }
};
