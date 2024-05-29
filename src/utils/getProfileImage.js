import axios from "axios";

const getProfilePicture = async(username) =>{
    const options = {
        method: 'GET',
        url: 'https://instagram-scraper-api2.p.rapidapi.com/v1/info',
        params: {
          username_or_id_or_url: 'https://www.instagram.com/nooralamfiroz'
        },
        headers: {
          'X-RapidAPI-Key': '07bb522e05mshd50570e3c101e3cp1742cfjsnb73d48e6ef88',
          'X-RapidAPI-Host': 'instagram-scraper-api2.p.rapidapi.com'
        }
      };
      
      try {
          const {data} = await axios.request(options);
          return data
      } catch (error) {
          console.error(error, 'printing error');
          throw Error(error)
      }
}

export default getProfilePicture