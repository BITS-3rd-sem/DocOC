import axios from "axios";

const baseUrl = "http://localhost:8084/api/v1/ai";

const bearerToken = localStorage.getItem("token");
// const authorizationToken = "Bearer " + bearerToken;
class AIService {
    getAIRecommendation = async (symptomForAIDiagnosis) =>{
        return await axios.post(`${baseUrl}`, symptomForAIDiagnosis, `Bearer ${bearerToken}`);
    }
}

export default new AIService();
