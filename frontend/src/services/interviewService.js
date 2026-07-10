import api from "./api";

export const createInterview = (data) =>
  api.post("/interview/save", data);

export const updateInterview = (id, average) =>
  api.put(`/interview/update/${id}`, null, {
    params: { average_score: average },
  });

export const saveQuestion = (data) =>
  api.post("/interview/question/save", data);

export const getHistory = (userId) =>
  api.get(`/interview/history/${userId}`);

export const getQuestions = (id) =>
  api.get(`/interview/question/${id}`);