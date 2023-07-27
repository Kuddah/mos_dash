import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://localhost:3001' + '/api/v1';
export type Survey = {
  id: number;
  md: string;
  inc: string;
  azi: string;
  dl: string;
  tvd: string;
  jobrun: string;
}

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

interface ResponseData {
  success: boolean;
  data?: any;
  message?: string;
}

export class SurveyApi {

  async getListOfSurveys() {
    try {
      const response: AxiosResponse<ResponseData> = await axios.get(`${API_URL}/surveys/`,{
        params: {
          limit: 1000
        }
      });

      if (response && response.data) {
        if (response.data.success) {
          return response.data.data;
        } else {
          console.log(response.data.message);
        }
      } else {
        console.error('Response or response.data is undefined');
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  
  async getSurvey() {
    try {
      const response: AxiosResponse<ResponseData> = await axios.get(`${API_URL}/surveys/`,{
        params: {
          limit: 1000
        }
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async createSurvey(surveyFormData: Survey) {
    try {
        delete surveyFormData.id;
        const response: AxiosResponse<ResponseData> = await axios.post(
          `${API_URL}/surveys/`, surveyFormData, config);
        if (response.data.success) {
          return response.data.data;
        } else {
          console.log(response.data.message);
        }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async updateSurvey(survey: Survey): Promise<Survey> {
    try {
      const response = await axios.put(`${API_URL}/surveys/${survey.id}`, survey, config);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async deleteSurvey(survey: Survey): Promise<boolean> {
    try {
      const response = await axios.delete(`${API_URL}/surveys/${survey.id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
}
