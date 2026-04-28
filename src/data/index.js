import axios from 'axios';

const DATA_URL = '/data.json';

// Fetch NGO data at runtime from remote JSON
export async function fetchNgoData() {
  try {
    const response = await axios.get(DATA_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching NGO data:', error);
    throw error;
  }
}

// Usage in components:
// import { fetchNgoData } from '../data';
// useEffect(() => { 
//   fetchNgoData().then(data => {
//     setCarouselImages(data.carouselImages);
//     setArticles(data.articles);
//     setTeamMembers(data.teamMembers);
//   }).catch(err => console.error(err));
// }, []);