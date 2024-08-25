module.exports = {
  apps: [
    {
      name: "lentera-cendekia-app",
      script: "npm",
      args: "start",
      cwd: ".",
      watch: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
