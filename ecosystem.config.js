{
  "name": "budgetndiostory-production",
  "script": "node_modules/next/dist/bin/next",
  "args": "start -p $PORT",
  "instances": "max",
  "exec_mode": "cluster",
  "watch": false,
  "max_memory_restart": "500M",
  "node_args": "--max-old-space-size=4096",
  "env": {
    "NODE_ENV": "production",
    "PORT": 3000
  },
  "log_file": "logs/pm2.log",
  "out_file": "logs/out.log",
  "error_file": "logs/err.log",
  "log_date_format": "YYYY-MM-DD HH:mm:ss Z",
  "autorestart": true,
  "max_restarts": 10,
  "min_uptime": "10s",
  "restart_delay": 5000
}
