import axios from "axios";

const baseUrl = "http://localhost:8084/api/v1/ai";

const bearerToken = localStorage.getItem("token");
var config = {
  headers: {
    Authorization: `Bearer ${bearerToken}`,
  },
};

class AIService {
  getAIRecommendation = async (symptomForAIDiagnosis) => {
    return await axios.post(`${baseUrl}`, symptomForAIDiagnosis, config);
  };
}

export default new AIService();
