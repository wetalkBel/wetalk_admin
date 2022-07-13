const hostApi = process.env.NODE_ENV === "development" ? "http://localhost" : "https://unicef-admin.herokuapp.com/";
const portApi = process.env.NODE_ENV === "development" ? 8080 : "";
const baseURLApi  = process.env.NODE_ENV === "production" ? `https://unicef-backend.herokuapp.com/api` : `http://localhost:8080/api`;
const redirectUrl = process.env.NODE_ENV === "production" ? `https://unicef-admin.herokuapp.com/verify-email` : "http://localhost:8081/verify-email";

export default {
  hostApi,
  portApi,
  baseURLApi,
  redirectUrl,
  remote: "https://unicef-backend.herokuapp.com/",
  isBackend: process.env.VUE_APP_BACKEND,
  auth: {
    email: '',
    password: ''
  },
  app: {
    sidebarTransitionTime: 300, //ms
    colors: {
      sidebar: "#002B49",
      navbar: "#ffffff",
      primary: "#005792",
      secondary: "#798892",
      success: "#21AE8C",
      info: "#1A86D0",
      warning: "#FDA700",
      danger: "#FD5F00",
      inverse: "#002B49",
      textColor: "#495057",
      gray: "#D7DFE6"
    },
    themeColors: [
      ['default','#002B49'],
      ['white', '#FFFFFF'],
      ['first','#004472'],
      ['second','#e9ebef'],
      ['third','#d1e7f5'],
      ['fourth','#ccdde9'],
      ['fifth','#d6dfe6'],
      ['sixth','#13191d'],
      ['seventh','#20ae8c'],
    ],
    chartColors: {
      axisColor: '#8EA1AB'
    }
  }
};
