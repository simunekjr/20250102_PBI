// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// ----------------------------------------------------------------------------

const getAccessToken = async function () {
    // Use MSAL.js for authentication
    const msal = require("@azure/msal-node");

    const msalConfig = {
        auth: {
            clientId: process.env.CLIENT_ID,
            authority: `${process.env.AUTHORITY_URL || "https://login.microsoftonline.com/"}${process.env.TENANT_ID}`,
        }
    };

    // Check for the MasterUser Authentication
    if (process.env.AUTHENTICATION_MODE.toLowerCase() === "masteruser") {
        const clientApplication = new msal.PublicClientApplication(msalConfig);

        const usernamePasswordRequest = {
            scopes: [process.env.SCOPE_BASE || "https://analysis.windows.net/powerbi/api/.default"],
            username: process.env.PBI_USERNAME,
            password: process.env.PBI_PASSWORD
        };

        return clientApplication.acquireTokenByUsernamePassword(usernamePasswordRequest);
    }

    // Service Principal authentication
    if (process.env.AUTHENTICATION_MODE.toLowerCase() === "serviceprincipal") {
        msalConfig.auth.clientSecret = process.env.CLIENT_SECRET;
        const clientApplication = new msal.ConfidentialClientApplication(msalConfig);

        const clientCredentialRequest = {
            scopes: [process.env.SCOPE_BASE || "https://analysis.windows.net/powerbi/api/.default"],
        };

        return clientApplication.acquireTokenByClientCredential(clientCredentialRequest);
    }
}

module.exports.getAccessToken = getAccessToken;
