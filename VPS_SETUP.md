# VPS Deployment & Analytics Setup Guide

This guide covers deploying your Next.js application on a VPS with built-in analytics.

## Table of Contents

1. [VPS Requirements](#vps-requirements)
2. [Initial Server Setup](#initial-server-setup)
3. [Install Dependencies](#install-dependencies)
4. [Configure PM2](#configure-pm2)
5. [Setup Nginx](#setup-nginx)
6. [SSL Certificate](#ssl-certificate)
7. [Deploy Application](#deploy-application)
8. [Analytics Dashboard](#analytics-dashboard)
9. [Monitoring & Maintenance](#monitoring--maintenance)

---

## VPS Requirements

| Resource  | Minimum    | Recommended |
| --------- | ---------- | ----------- |
| CPU       | 1 vCPU     | 2+ vCPU     |
| RAM       | 1 GB       | 2+ GB       |
| Storage   | 20 GB SSD  | 50+ GB SSD  |
| Bandwidth | 1 TB/month | Unlimited   |

### Recommended VPS Providers

- DigitalOcean (Droplets)
- Linode (Akamai)
- Vultr
- Hetzner Cloud
- AWS EC2 (t3.small+)

---

## Initial Server Setup

### 1. Connect to your VPS

```bash
ssh root@your-server-ip
```

### 2. Update system

```bash
apt update && apt upgrade -y
```

### 3. Create deployment user

```bash
adduser deploy
usermod -aG sudo deploy
su - deploy
```

### 4. Install essential tools

```bash
sudo apt install -y curl git unzip zip build-essential
```

---

## Install Dependencies

### 1. Install Node.js (using nvm)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
node -v  # Verify installation
```

### 2. Install pnpm

```bash
npm install -g pnpm
```

### 3. Install PM2

```bash
sudo npm install -g pm2
pm2 startup
# Follow the instructions to set up PM2 auto-restart
```

### 4. Install Nginx

```bash
sudo apt install -y nginx
sudo systemctl enable nginx
```

---

## Configure PM2

Your project includes `ecosystem.config.js` for PM2 configuration:

```javascript
{
  "name": "budgetndiostory-production",
  "script": "node_modules/next/dist/bin/next",
  "args": "start -p $PORT",
  "instances": "max",           // Use all CPU cores
  "exec_mode": "cluster",       // Cluster mode for better performance
  "watch": false,
  "max_memory_restart": "500M",
  "env": {
    "NODE_ENV": "production",
    "PORT": 3000
  }
}
```

---

## Setup Nginx

### 1. Copy nginx configuration

```bash
sudo cp nginx.conf /etc/nginx/sites-available/budgetndiostory
sudo ln -s /etc/nginx/sites-available/budgetndiostory /etc/nginx/sites-enabled/
```

### 2. Test and reload Nginx

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 3. Configure firewall (if using ufw)

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

---

## SSL Certificate

### Using Let's Encrypt (free)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### Auto-renewal

```bash
sudo crontab -e
# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

---

## Deploy Application

### 1. Clone and setup project

```bash
mkdir -p /var/www
cd /var/www
sudo git clone https://github.com/your-username/budgetndiostory.git
sudo chown -R deploy:deploy budgetndiostory
cd budgetndiostory
```

### 2. Install dependencies and build

```bash
pnpm install --frozen-lockfile
pnpm build
```

### 3. Start with PM2

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # Run if not already set up
```

### 4. Verify deployment

```bash
pm2 status
curl -I http://localhost:3000
```

---

## Analytics Dashboard

Your application includes a built-in analytics system:

### Accessing Analytics

Visit: `https://your-domain.com/analytics`

### Features

- **Page Views**: Track all page views with timestamps
- **Unique Visitors**: Count unique IPs
- **Events**: Track custom events (buttons, links, etc.)
- **Top Pages**: Most visited pages
- **Top Referrers**: Traffic sources
- **Daily Charts**: Visual representation of traffic

### Using Analytics in Your Components

```tsx
import { useAnalytics, trackButtonClick } from "@/components/Analytics";

function MyComponent() {
  const { trackEvent } = useAnalytics();

  const handleClick = () => {
    // Track button clicks
    trackButtonClick("Button", "Click", "CTA Button");

    // Or use the hook
    trackEvent({
      category: "Form",
      action: "Submit",
      label: "Contact Form",
    });
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

### API Endpoints

| Endpoint                                   | Method | Description            |
| ------------------------------------------ | ------ | ---------------------- |
| `/api/analytics`                           | POST   | Send page views/events |
| `/api/analytics?startDate=...&endDate=...` | GET    | Fetch analytics data   |

---

## Monitoring & Maintenance

### PM2 Commands

```bash
# View logs
pm2 logs

# Monitor in real-time
pm2 monit

# Restart application
pm2 restart budgetndiostory-production

# Stop application
pm2 stop budgetndiostory-production

# View status
pm2 status

# Save process list
pm2 save
```

### Log Rotation

```bash
sudo pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 50M
pm2 set pm2-logrotate:retain 30
```

### Health Check Script

```bash
#!/bin/bash
# health-check.sh

if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200"; then
    echo "✅ Application is healthy"
    exit 0
else
    echo "❌ Application is down, restarting..."
    pm2 restart budgetndiostory-production
    exit 1
fi
```

Add to crontab:

```bash
*/5 * * * * /home/deploy/health-check.sh >> /var/log/health-check.log 2>&1
```

---

## Performance Optimization

### 1. Enable SWC Minification

Your `next.config.mjs` already has optimizations. Ensure production build:

```bash
pnpm build  # Uses SWC by default in Next.js 14+
```

### 2. Image Optimization

Images are automatically optimized with WebP/AVIF formats.

### 3. Static File Caching

Nginx config caches static assets for 1 year.

### 4. Gzip Compression

Enabled in Nginx configuration.

---

## Troubleshooting

### Application won't start

```bash
pm2 logs budgetndiostory-production --lines 100
```

### Port already in use

```bash
sudo lsof -i :3000
pm2 kill
pm2 start ecosystem.config.js
```

### Memory issues

```bash
# Check memory usage
free -h

# Increase Node.js memory limit in ecosystem.config.js
"node_args": "--max-old-space-size=4096"
```

### Nginx 502 Bad Gateway

```bash
# Check if Next.js is running
pm2 status

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log
```

---

## Backup & Restore

### Create Backup

```bash
tar -czf backup_$(date +%Y%m%d).tar.gz .next
```

### Restore Backup

```bash
tar -xzf backup_20240101.tar.gz
```

---

## Security Best Practices

1. **Keep Node.js updated**: `nvm install --lts`
2. **Use environment variables** for sensitive data
3. **Disable server tokens**: Already configured in Nginx
4. **Use HTTPS only**: Let’s Encrypt provides free SSL
5. **Regular updates**: `sudo apt update && sudo apt upgrade`
6. **Firewall**: Configure ufw properly

---

## Next Steps

1. Set up domain DNS to point to your VPS
2. Configure SSL with Let's Encrypt
3. Set up automated backups
4. Configure monitoring alerts
5. Consider using Redis for analytics data storage in production
