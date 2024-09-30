const { knexApiTable } = require("../db/connection");
const tableName = "apiTable";

function read(apiKey) {
  return knexApiTable(tableName).select("*").where({ api_key: apiKey }).first();
}

async function verifyApiKey(req, res, next) {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).send(`
      <html>
        <head>
          <title>API Key Error</title>
          <style>
            .error-alert {
              padding: 15px;
              margin: 10px;
              border: 1px solid #f5c6cb;
              background-color: #f8d7da;
              color: #721c24;
              font-family: Arial, sans-serif;
              border-radius: 5px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="error-alert">
            <p><strong>Error:</strong> API key is missing.</p>
            <p>If you don't have access, you can request an API key by visiting:
              <a href="https://auth-microservies-landing.onrender.com/" target="_blank">
                Request API Key
              </a>
            </p>
          </div>
        </body>
      </html>
    `);
  }

  try {
    // Check if the provided API key exists in the database
    const validApiKey = await read(apiKey);

    if (!validApiKey) {
      return res.status(403).send(`
        <html>
          <head>
            <title>API Key Error</title>
            <style>
              .error-alert {
                padding: 15px;
                margin: 10px;
                border: 1px solid #f5c6cb;
                background-color: #f8d7da;
                color: #721c24;
                font-family: Arial, sans-serif;
                border-radius: 5px;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="error-alert">
              <p><strong>Error:</strong> Invalid API key.</p>
            </div>
          </body>
        </html>
      `);
    }

    // If the API key is valid, proceed to the next middleware/route
    next();
  } catch (error) {
    console.error("Error verifying API key:", error);
    return res.status(500).send(`
      <html>
        <head>
          <title>Server Error</title>
          <style>
            .error-alert {
              padding: 15px;
              margin: 10px;
              border: 1px solid #f5c6cb;
              background-color: #f8d7da;
              color: #721c24;
              font-family: Arial, sans-serif;
              border-radius: 5px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="error-alert">
            <p><strong>Error:</strong> Internal Server Error. Please try again later.</p>
          </div>
        </body>
      </html>
    `);
  }
}

module.exports = {
  verifyApiKey,
};
