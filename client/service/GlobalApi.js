import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Intercepteur pour ajouter le token d'authentification si présent
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//CV

const CreateNewResume = (data) => axiosClient.post("/resumes", data);

const GetUserResumes = (userEmail) =>
  axiosClient.get(`/resumes?userEmail=${userEmail}`);

const UpdateResumeDetail = (id, data) =>
  axiosClient.put(`/resumes/${id}`, data);

const GetResumeById = (id) => axiosClient.get(`/resumes/${id}`);

const DeleteResumeById = (id) => axiosClient.delete(`/resumes/${id}`);

//Portfolio

const CreateNewPortfolio = (data) => axiosClient.post("/portfolios", data);

const GetUserPortfolios = (userEmail) =>
  axiosClient.get(`/portfolios?userEmail=${userEmail}`);

const UpdatePortfolioDetail = (id, data) =>
  axiosClient.put(`/portfolios/${id}`, data);

const GetPortfolioById = (id) => axiosClient.get(`/portfolios/${id}`);

const DeletePortfolioById = (id) => axiosClient.delete(`/portfolios/${id}`);

export default {
  CreateNewResume,
  GetUserResumes,
  UpdateResumeDetail,
  GetResumeById,
  DeleteResumeById,

  CreateNewPortfolio,
  GetUserPortfolios,
  UpdatePortfolioDetail,
  GetPortfolioById,
  DeletePortfolioById,
};
