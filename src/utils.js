// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// ----------------------------------------------------------------------------

function getAuthHeader(accessToken) {
    // Function to append Bearer against the Access Token
    return "Bearer ".concat(accessToken);
}

function validateConfig() {
    // Validation function to check whether the environment variables are properly set

    const guid = require("guid");

    // Check Authentication Mode
    if (!process.env.AUTHENTICATION_MODE) {
        return "AUTHENTICATION_MODE is empty. Please set it to MasterUser or ServicePrincipal in environment variables.";
    }

    if (
        process.env.AUTHENTICATION_MODE.toLowerCase() !== "masteruser" &&
        process.env.AUTHENTICATION_MODE.toLowerCase() !== "serviceprincipal"
    ) {
        return "AUTHENTICATION_MODE is incorrect. Please set it to MasterUser or ServicePrincipal in environment variables.";
    }

    // Check Client ID
    if (!process.env.CLIENT_ID) {
        return "CLIENT_ID is empty. Please set it in environment variables.";
    }

    if (!guid.isGuid(process.env.CLIENT_ID)) {
        return "CLIENT_ID must be a valid GUID. Please set it in environment variables.";
    }

    // Check Report ID
    if (!process.env.REPORT_ID) {
        return "REPORT_ID is empty. Please set it in environment variables.";
    }

    if (!guid.isGuid(process.env.REPORT_ID)) {
        return "REPORT_ID must be a valid GUID. Please set it in environment variables.";
    }

    // Check Workspace ID
    if (!process.env.WORKSPACE_ID) {
        return "WORKSPACE_ID is empty. Please set it in environment variables.";
    }

    if (!guid.isGuid(process.env.WORKSPACE_ID)) {
        return "WORKSPACE_ID must be a valid GUID. Please set it in environment variables.";
    }

    // Check Authority URL
    if (!process.env.AUTHORITY_URL) {
        return "AUTHORITY_URL is empty. Please set it in environment variables.";
    }

    // Check Authentication Mode-specific Variables
    if (process.env.AUTHENTICATION_MODE.toLowerCase() === "masteruser") {
        if (!process.env.PBI_USERNAME || !process.env.PBI_USERNAME.trim()) {
            return "PBI_USERNAME is empty. Please set it in environment variables.";
        }

        if (!process.env.PBI_PASSWORD || !process.env.PBI_PASSWORD.trim()) {
            return "PBI_PASSWORD is empty. Please set it in environment variables.";
        }
    } else if (process.env.AUTHENTICATION_MODE.toLowerCase() === "serviceprincipal") {
        if (!process.env.CLIENT_SECRET || !process.env.CLIENT_SECRET.trim()) {
            return "CLIENT_SECRET is empty. Please set it in environment variables.";
        }

        if (!process.env.TENANT_ID) {
            return "TENANT_ID is empty. Please set it in environment variables.";
        }

        if (!guid.isGuid(process.env.TENANT_ID)) {
            return "TENANT_ID must be a valid GUID. Please set it in environment variables.";
        }
    }
}

module.exports = {
    getAuthHeader: getAuthHeader,
    validateConfig: validateConfig,
};
