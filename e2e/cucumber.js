export default {
  default: {
    paths: ["features/**/*.feature"],
    require: ["steps/*.js"],
    format: ["progress", "json:reports/cucumber-report.json"],
    publishQuiet: true,
  },
};
