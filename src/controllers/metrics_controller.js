// Importera Prometheus-klienten
const promClient = require("prom-client");

// Skapa räknare för login-metrik
const loginCounter = new promClient.Counter({
  name: "login_counter",
  help: "Total number of user logins",
});

const getMetrics = async (req, res) => {
  try {
    const metrics = await promClient.register.metrics();
    res.set("Content-Type", promClient.register.contentType);
    res.end(metrics);
  } catch (error) {
    console.error("Error fetching metrics:", error);
    res.status(500).send("Error fetching metrics");
  }
};

module.exports = {
  loginCounter,
  getMetrics,
};
