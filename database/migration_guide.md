# Neon → Self-Hosted VPS PostgreSQL Migration Guide

## Budget Ndio Story - Migration from Neon Serverless to Self-Hosted VPS

### Overview

This guide covers migrating your Budget Ndio Story database from **Neon serverless PostgreSQL** to a **self-hosted PostgreSQL on a cheap VPS** (~$4-8/month).

---

## Pre-Migration Checklist

### 1. Assess Current Neon Usage

```sql
-- Check current storage usage on Neon
SELECT 
    pg_size_pretty(pg_database_size(current_database())) AS database_size,
    pg_size_pretty(pg_total_relation_size('contents')) AS contents_size,
    pg_size_pretty(pg_total_relation_size('analytics_logs')) AS analytics_size;
```

### 2. Export Current Schema and Data

```bash
# Full database dump (from Neon)
pg_dump "postgresql://user:password@ep-xxx.region.neon.tech/database" \
    --file=neon_backup_$(date +%Y%m%d).sql \
    --verbose \
    --clean \
    --if-exists
```

### 3. Check for Deprecated Tables

The VPS-optimized schema removes these tables:
- ❌ `media_library` - videos/podcasts are external
- ❌ `content_categories_ref` - redundant with enum
- ❌ `search_history` - optional, can re-add later
- ❌ `content_relationships` - implement via tags later
- ❌ `newsletter_subscriptions` - merged into `engagements`
- ❌ `contact_submissions` - merged into `engagements`

---

## Migration Steps

### Step 1: Provision VPS

```bash
# Example: Provision on Contabo (€4.99/month)
# Ubuntu 24.04 LTS, 2 vCPU, 4 GB RAM, 50 GB NVMe SSD

# SSH into VPS
ssh root@your_vps_ip

# Update system
apt update && apt upgrade -y

# Install PostgreSQL 16
sh <(curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc) | gpg --dearmor -o /usr/share/keyrings/postgresql-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/postgresql-archive-keyring.gpg] http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list
apt update
apt install -y postgresql-16 postgresql-contrib

# Start PostgreSQL
systemctl start postgresql
systemctl enable postgresql

# Secure PostgreSQL
passwd postgres
sudo -i -u postgres
psql
```

### Step 2: Configure PostgreSQL for VPS

```bash
# Edit postgresql.conf for low-memory optimization
vim /etc/postgresql/16/main/postgresql.conf

# Key settings for 2-4 GB RAM VPS:
# shared_buffers = 256MB (1/4 of RAM)
# effective_cache_size = 1GB (1/2 of RAM)
# work_mem = 16MB
# maintenance_work_mem = 128MB
# max_connections = 50
# random_page_cost = 1.1 (for SSD)
# effective_io_concurrency = 200 (for SSD)
```

```ini
# /etc/postgresql/16/main/postgresql.conf
shared_buffers = 256MB
effective_cache_size = 1GB
work_mem = 16MB
maintenance_work_mem = 128MB
max_connections = 50
random_page_cost = 1.1
effective_io_concurrency = 200
log_min_duration_statement = 1000
log_line_prefix = '%t [%p]: [%l-1] user=%u,db=%d '
log_lock_waits = on
log_statement = 'ddl'

# WAL and Checkpoint settings for SSDs
wal_buffers = 16MB
checkpoint_completion_target = 0.9
```

### Step 3: Configure pg_hba.conf

```bash
# /etc/postgresql/16/main/pg_hba.conf
# Allow local connections
local   all             all                                     trust
# Allow remote connections (use strong passwords or SSL)
host    all             all             0.0.0.0/0               md5
host    all             all             ::/0                    md5

# Restart PostgreSQL
systemctl restart postgresql
```

### Step 4: Create Database and User

```sql
-- As postgres user
psql

CREATE USER budget_user WITH PASSWORD 'strong_password_here';
CREATE DATABASE budget_db OWNER budget_user;
GRANT ALL PRIVILEGES ON DATABASE budget_db TO budget_user;

\c budget_db
GRANT ALL ON SCHEMA public TO budget_user;

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
```

### Step 5: Import Optimized Schema

```bash
# Import the VPS-optimized schema
psql -U budget_user -d budget_db -f schema_vps_optimized.sql
```

### Step 6: Migrate Data (Selective)

```bash
# Option A: Full migration (if starting fresh)
psql -U budget_user -d budget_db < neon_backup_$(date +%Y%m%d).sql

# Option B: Selective migration (recommended)
# Create migration script to map old tables to new schema
```

#### Data Migration Script (`migrate_data.sql`)

```sql
-- Migration script: Neon schema → VPS-optimized schema

-- 1. Migrate contents (including podcast/video data)
INSERT INTO contents (
    id, type, title, slug, description, content_body,
    media_url, embed_url, thumbnail_url, category, tags,
    published_at, status, views, featured, author,
    duration_seconds, episode_number, season_number,
    transcript, guests, shownotes,
    analytics, metadata, created_at, updated_at
)
SELECT 
    c.id, c.type, c.title, c.slug, c.description, c.content_body,
    COALESCE(c.media_url, p.audio_url, v.video_url) as media_url,
    v.embed_url, c.thumbnail_url, c.category, c.tags,
    c.published_at, c.status, c.views, c.featured, c.author,
    COALESCE(c.duration_seconds, p.duration_seconds, v.duration_seconds),
    p.episode_number, p.season_number,
    COALESCE(p.transcript, v.transcript),
    COALESCE(p.guests, '{}'::jsonb),
    p.shownotes,
    c.analytics, c.metadata, c.created_at, c.updated_at
FROM contents c
LEFT JOIN podcast_episodes p ON c.id = p.content_id
LEFT JOIN video_episodes v ON c.id = v.content_id;

-- 2. Migrate users
INSERT INTO users (id, email, name, role, subscribed_at, created_at, updated_at)
SELECT id, email, name, role, subscribed_at, created_at, updated_at FROM users;

-- 3. Migrate translations
INSERT INTO translations (id, content_id, language, translated_title, translated_body, translated_description, translated_tags, created_at, updated_at)
SELECT id, content_id, language, translated_title, translated_body, translated_description, translated_tags, created_at, updated_at FROM translations;

-- 4. Migrate sectors
INSERT INTO sectors (id, name, description, icon_url, color_code, sort_order, created_at)
SELECT id, name, description, icon_url, color_code, sort_order, created_at FROM sectors;

-- 5. Migrate fiscal_years
INSERT INTO fiscal_years (id, year, start_date, end_date, description, is_current, created_at)
SELECT id, year, start_date, end_date, description, is_current, created_at FROM fiscal_years;

-- 6. Migrate counties
INSERT INTO counties (id, name, code, region, geo_data, population, created_at)
SELECT id, name, code, region, geo_data, population, created_at FROM counties;

-- 7. Migrate budget_allocations
INSERT INTO budget_allocations (id, fiscal_year_id, sector_id, county_id, level, budgeted_amount, actual_spent, approved_amount, notes, source, created_at, updated_at)
SELECT id, fiscal_year_id, sector_id, county_id, level, budgeted_amount, actual_spent, approved_amount, notes, source, created_at, updated_at FROM budget_allocations;

-- 8. Migrate budget_line_items
INSERT INTO budget_line_items (id, allocation_id, description, budgeted_amount, actual_amount, quarter, created_at)
SELECT id, allocation_id, description, budgeted_amount, actual_amount, quarter, created_at FROM budget_line_items;

-- 9. Migrate engagements (consolidated from newsletter + contact)
INSERT INTO engagements (id, user_id, type, email, interests, subject, message, status, details, ip_address, user_agent, created_at)
SELECT 
    n.id + 100000, -- Offset to avoid conflicts
    NULL, -- newsletter doesn't have user_id
    'newsletter_signup'::engagement_type,
    n.email,
    n.interests,
    NULL,
    NULL,
    NULL,
    ('{"source": "' || COALESCE(n.source, 'direct') || '"}')::jsonb,
    NULL,
    NULL,
    n.subscribed_at
FROM newsletter_subscriptions n
WHERE NOT EXISTS (SELECT 1 FROM engagements e WHERE e.email = n.email);

INSERT INTO engagements (id, user_id, type, email, subject, message, status, details, ip_address, user_agent, created_at)
SELECT 
    c.id + 200000, -- Offset to avoid conflicts
    NULL,
    'contact_form'::engagement_type,
    c.email,
    c.subject,
    c.message,
    c.status,
    ('{"original_id": ' || c.id || '}')::jsonb,
    NULL,
    NULL,
    c.created_at
FROM contact_submissions c
WHERE NOT EXISTS (SELECT 1 FROM engagements e WHERE e.details->>'original_id' = c.id::text);

-- 10. Migrate FAQs
INSERT INTO faqs (id, question, answer, category, sort_order, is_active, created_at, updated_at)
SELECT id, question, answer, category, sort_order, is_active, created_at, updated_at FROM faqs;

-- 11. Migrate data_sources
INSERT INTO data_sources (id, name, description, url, source_type, last_fetched, created_at)
SELECT id, name, description, url, source_type, last_fetched, created_at FROM data_sources;

-- 12. Migrate system_config
INSERT INTO system_config (id, config_key, config_value, description, updated_at)
SELECT id, config_key, config_value, description, updated_at FROM system_config;

-- 13. Reset sequences
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
SELECT setval('contents_id_seq', (SELECT MAX(id) FROM contents));
SELECT setval('engagements_id_seq', (SELECT MAX(id) FROM engagements));
SELECT setval('faqs_id_seq', (SELECT MAX(id) FROM faqs));
```

### Step 7: Set Up Backups

```bash
#!/bin/bash
# /etc/cron.daily/pg_backup.sh

BACKUP_DIR="/var/backups/postgres"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="budget_db"
DB_USER="budget_user"

# Create backup directory
mkdir -p $BACKUP_DIR

# Full backup with compression
pg_dump -U $DB_USER -d $DB_NAME | gzip > $BACKUP_DIR/backup_$DATE.sql.gz

# Keep only last 7 days of backups
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +7 -delete

# Upload to offsite storage (optional - Backblaze B2, S3, etc.)
# rclone copy $BACKUP_DIR/backup_$DATE.sql.gz remote:backups/

echo "Backup completed: $BACKUP_DIR/backup_$DATE.sql.gz"
```

```bash
# Make executable
chmod +x /etc/cron.daily/pg_backup.sh

# Add to cron
crontab -e
# Add: 0 2 * * * /etc/cron.daily/pg_backup.sh
```

### Step 8: Set Up Monitoring

```bash
# Install pgBadger for log analysis
apt install -y pgbadger

# Configure PostgreSQL to generate CSV logs
vim /etc/postgresql/16/main/postgresql.conf
# log_destination = 'csvlog'
# logging_collector = on
# log_directory = 'pg_log'
# log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'
# log_rotation_age = 1d
# log_rotation_size = 10MB

# Generate weekly report
pgbadger /var/lib/postgresql/16/main/pg_log/*.log -o /var/www/html/pgbadger/index.html

# Set up health check endpoint in your app
# SELECT 1 as status, pg_postmaster_start_time() as uptime;
```

### Step 9: Set Up pg_cron (Optional)

```bash
# Install pg_cron
apt install -y postgresql-16-cron

# Configure
vim /etc/postgresql/16/main/postgresql.conf
# shared_preload_libraries = 'pg_cron'
# cron.use_background_workers = on

systemctl restart postgresql

# Schedule analytics cleanup (run daily at 3 AM)
psql -U budget_user -d budget_db
SELECT cron.schedule('cleanup_analytics', '0 3 * * *', 'SELECT analytics_retention_cleanup(90);');
```

---

## Post-Migration Verification

### 1. Check Data Integrity

```sql
-- Verify counts match
SELECT 'users' as table_name, COUNT(*) as count FROM users
UNION ALL SELECT 'contents', COUNT(*) FROM contents
UNION ALL SELECT 'budget_allocations', COUNT(*) FROM budget_allocations
UNION ALL SELECT 'engagements', COUNT(*) FROM engagements
UNION ALL SELECT 'faqs', COUNT(*) FROM faqs;

-- Check for orphaned records
SELECT * FROM budget_allocations WHERE fiscal_year_id NOT IN (SELECT id FROM fiscal_years);
SELECT * FROM contents WHERE category IS NULL;
```

### 2. Verify Indexes

```sql
-- Check index sizes
SELECT 
    indexname,
    pg_size_pretty(pg_relation_size(indexname::regclass)) as size
FROM pg_indexes
WHERE tablename = 'contents';

-- Check for missing indexes on foreign keys
SELECT 
    tc.constraint_name,
    tc.table_name,
    k.column_name,
    tc.constraint_type
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
AND NOT EXISTS (
    SELECT 1 FROM pg_index i
    JOIN pg_attribute a ON i.indrelid = a.attrelid
    WHERE a.attname = kcu.column_name
);
```

### 3. Test Performance

```sql
-- Explain analyze a typical query
EXPLAIN ANALYZE
SELECT * FROM contents 
WHERE status = 'published' 
AND type = 'article' 
ORDER BY published_at DESC 
LIMIT 10;

-- Check query performance
SELECT 
    query,
    calls,
    mean_time,
    total_time,
    rows
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
```

---

## Update Application Connection

### Update .env File

```bash
# Old Neon connection
# DATABASE_URL="postgresql://user:password@ep-xxx.region.neon.tech/database?schema=public"

# New VPS connection
DATABASE_URL="postgresql://budget_user:strong_password@your_vps_ip:5432/budget_db?schema=public"
```

### Update Prisma Schema

See [`prisma/schema_vps_optimized.prisma`](prisma/schema_vps_optimized.prisma) for the trimmed Prisma schema.

---

## Rollback Plan

If issues arise:

1. **Keep Neon database active** for 48-72 hours
2. **Test read-only queries** against new VPS database
3. **Point application** to new database gradually:
   ```bash
   # Use feature flag to route percentage of traffic
   # Start with 10%, increase to 100% over 24 hours
   ```
4. **If rollback needed**, update DATABASE_URL back to Neon

---

## Estimated Costs

| Item | Monthly Cost (USD) |
|------|-------------------|
| VPS (Contabo €4.99) | ~$5.50 |
| Backup storage (Backblaze B2 ~1 GB) | ~$0.05 |
| Domain (~$12/year) | ~$1.00 |
| **Total** | **~$6.55/month** |

vs. Neon Launch tier: **~$15-30/month** (compute + storage)

---

## Recommended VPS Providers

| Provider | Specs | Price | Location |
|----------|-------|-------|----------|
| Contabo | 2 vCPU, 4 GB RAM, 50 GB NVMe | €4.99/mo | EU |
| Hostraha | 2 vCPU, 4 GB RAM, 50 GB SSD | KSh 700/mo | Kenya |
| OVH | 1 vCPU, 2 GB RAM, 20 GB SSD | ~$4/mo | EU/US |
| Hetzner | 1 vCPU, 2 GB RAM, 20 GB SSD | €3/mo | EU |

---

## Troubleshooting

### Connection Issues

```bash
# Test connection from local machine
psql -h your_vps_ip -U budget_user -d budget_db

# Check PostgreSQL is listening
sudo -u postgres psql -c "SHOW listen_addresses;"

# Check firewall
sudo ufw status
# Add: sudo ufw allow 5432/tcp
```

### Performance Issues

```sql
-- Check for missing indexes
SELECT 
    relname,
    seq_scan,
    seq_tup_read,
    idx_scan,
    idx_tup_fetch,
    pg_size_pretty(pg_relation_size(relname::regclass)) as size
FROM pg_stat_user_tables
ORDER BY seq_scan DESC;

-- Identify slow queries
SELECT query, mean_time FROM pg_stat_statements ORDER BY mean_time DESC LIMIT 10;
```

---

## Quick Reference Commands

```bash
# Connect to database
psql -U budget_user -d budget_db -h localhost

# Check database size
SELECT pg_size_pretty(pg_database_size('budget_db'));

# Restart PostgreSQL
sudo systemctl restart postgresql

# View logs
tail -f /var/log/postgresql/postgresql-16-main.log

# Check connections
SELECT count(*) FROM pg_stat_activity;

# Kill idle connections
SELECT pg_terminate_backend(pid) FROM pg_stat_activity 
WHERE state = 'idle' AND query_start < NOW() - INTERVAL '30 minutes';
```
