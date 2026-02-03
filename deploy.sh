#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting deployment...${NC}"

# Configuration
PROJECT_DIR="/var/www/budgetndiostory"
BACKUP_DIR="/var/backups/budgetndiostory"
DATE=$(date +%Y%m%d_%H%M%S)

# Check if running as root or with sudo
if [ "$EUID" -ne 0 ]; then
  echo -e "${YELLOW}Warning: Not running as root. Some operations may fail.${NC}"
fi

# Step 1: Create backup
echo -e "${YELLOW}📦 Creating backup...${NC}"
mkdir -p "$BACKUP_DIR"
tar -czf "$BACKUP_DIR/backup_$DATE.tar.gz" -C "$PROJECT_DIR" .next 2>/dev/null || true
echo -e "${GREEN}✅ Backup created: backup_$DATE.tar.gz${NC}"

# Step 2: Install dependencies
echo -e "${YELLOW}📥 Installing dependencies...${NC}"
pnpm install --frozen-lockfile
echo -e "${GREEN}✅ Dependencies installed${NC}"

# Step 3: Build the application
echo -e "${YELLOW}🔨 Building application...${NC}"
pnpm build
echo -e "${GREEN}✅ Build complete${NC}"

# Step 4: Restart PM2
echo -e "${YELLOW}🔄 Restarting PM2...${NC}"
pm2 restart ecosystem.config.js || pm2 start ecosystem.config.js
pm2 save
echo -e "${GREEN}✅ PM2 restarted${NC}"

# Step 5: Verify the application
echo -e "${YELLOW}🔍 Verifying application...${NC}"
sleep 3
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200\|304"; then
  echo -e "${GREEN}✅ Application is running!${NC}"
else
  echo -e "${YELLOW}⚠️ Application may need more time to start. Check logs: pm2 logs${NC}"
fi

# Step 6: Reload Nginx (if needed)
if command -v nginx &> /dev/null; then
  echo -e "${YELLOW}🔄 Reloading Nginx...${NC}"
  nginx -t && systemctl reload nginx 2>/dev/null || nginx -s reload 2>/dev/null || true
  echo -e "${GREEN}✅ Nginx reloaded${NC}"
fi

echo -e "${GREEN}🎉 Deployment complete!${NC}"
echo -e ""
echo -e "Useful commands:"
echo -e "  - View logs:      pm2 logs"
echo -e "  - Monitor:        pm2 monit"
echo -e "  - Restart:        pm2 restart budgetndiostory-production"
echo -e "  - Check status:   pm2 status"
