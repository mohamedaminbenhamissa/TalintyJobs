import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5002/",
  timeout: 60000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDIyYmI2NzNlZDZmNDE3ODdkM2FjOTMiLCJlbWFpbCI6ImtoYWxlZEBnbWFpbC5jb20iLCJwaG9uZSI6Iis5NjYgNTAgMTIzIDQ1NjciLCJqb2IiOiLZhdiv2YrYsSDYp9mE2LHYudin2YrYqSDYp9mE2LXYrdmK2KkiLCJyb2xlIjp7InJvbGVOYW1lIjoi2YXYr9mK2LEg2KfZhNix2LnYp9mK2Kkg2KfZhNi12K3ZitipIiwicGVybWlzc2lvbnMiOnsidXNlciI6IkNSVUQiLCJyb2xlIjoiQ1JVRCIsInF1ZXN0aW9uIjoiQ1JVRCIsInRlc3QiOiJDUlVEIiwiam9iIjoiQ1JVRCIsImFwcGxpY2F0aW9uIjoiQ1JVRCIsImVtYWlsIjoiQ1JVRCIsInBhY2siOiJDUlVEIiwicmVjcnVpdG1lbnRQcm9jZXNzIjoiQ1JVRCJ9fSwiZmlyc3ROYW1lIjoi2K7Yp9mE2K8gIiwibGFzdE5hbWUiOiLYudmF2LHZiNi0IiwiYXZhdGFyIjoiNjRfMTUucG5nIiwibm90aWZpY2F0aW9uUHJlZmVyZW5jZXMiOnsiZW1haWxOb3RpZmljYXRpb24iOnRydWUsInB1c2hOb3RpZmljYXRpb24iOnRydWUsImJyb3dzZXJOb3RpZmljYXRpb24iOnRydWV9LCJpYXQiOjE3MTYyODYzODMsImV4cCI6MTcxNjM3Mjc4M30.aqL_6rJ3U_bway53li6PJo07PuBkrfzvLrtIecDmSvM`;
    config.headers["Accept-Language"] = "en";

    return config;
  },
  (error) => {
    return console.log(error);
  }
);

export default axiosInstance;
