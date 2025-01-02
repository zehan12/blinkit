module.exports = {
    apps: [
        {
            name: "backend-api-server-1",
            script: "./dist/server.js",
            instances: 1, // Number of instances (adjust as needed)
            autorestart: true,
            max_memory_restart: "1G",
            env: {
                PORT: 3001,
                NODE_ENV: "development",
                // Add other development-specific environment variables here
            },
            env_production: {
                PORT: 3001,
                NODE_ENV: "production",
                // Add other production-specific environment variables here
            },
        },
        {
            name: "backend-api-server-2",
            script: "./dist/server.js",
            instances: 1,
            autorestart: true,
            max_memory_restart: "1G",
            env: {
                PORT: 3002,
                NODE_ENV: "development",
            },
            env_production: {
                PORT: 3002,
                NODE_ENV: "production",
            },
        },
        {
            name: "backend-api-server-3",
            script: "./dist/server.js",
            instances: 1,
            autorestart: true,
            max_memory_restart: "1G",
            env: {
                PORT: 3003,
                NODE_ENV: "development",
            },
            env_production: {
                PORT: 3003,
                NODE_ENV: "production",
            },
        },
    ],
};