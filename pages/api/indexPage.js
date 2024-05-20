import axios from 'axios';

export default function handler(req, res) {


    const sendIndexingRequest = async (contentUrl, apiKey) => {
        const url = `https://indexing.googleapis.com/v3/urlNotifications:publish`;
        const data = {
          url: contentUrl,
          type: 'URL_ADDED', // or 'URL_ADDED' for new content
        };
      
        try {
          const response = await axios.post(`${url}?key=${apiKey}`, data);
          
          return response.data;
        } catch (error) {
          console.error('Error calling Indexing API:', error.message);
        } 
      };
      
    const {curl,apik}  = req.body;
    
    sendIndexingRequest(curl,apik);

    
  }
  