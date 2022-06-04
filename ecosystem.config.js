module.exports = {
  apps: [
    {
      name: 'Inpacs - Reusable Calculator',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ]
}