# Budget Ndio Story Database Documentation

## Table of Contents
1. [Overview](#overview)
2. [Database Schema](#database-schema)
3. [Neon Serverless Setup](#neon-serverless-setup)
4. [Self-Hosted PostgreSQL Setup](#self-hosted-postgresql-setup)
5. [Connection Configuration](#connection-configuration)
6. [Performance Optimization](#performance-optimization)
7. [Backup & Recovery](#backup--recovery)
8. [Migration Guide](#migration-guide)

---

## Overview

This document describes the database architecture for the Budget Ndio Story platform, designed to work seamlessly with both **Neon Serverless** (for development/testing) and **self-hosted PostgreSQL** (for production).

### Key Features
- **Schema Version**: 1.0.0
- **Database**: PostgreSQL 15+
- **Tables**: 18 core tables
- **Views**: 4 performance-optimized views
- **Enums**: 7 custom types
- **Functions**: 4 utility functions
- **Triggers**: 8 auto-maintenance triggers

---

## Database Schema

### Core Tables

#### 1. [`users`](database/schema.sql:62)
Stores user data for engagement, newsletters, and future personalization.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| email | VARCHAR(255) | Unique, NOT NULL |
| name | VARCHAR(255) | User's full name |
| role | user_role | Enum: citizen, researcher, journalist, admin |
| preferences | JSONB | User preferences (interests, alerts) |
| subscribed_at | TIMESTAMP | Newsletter subscription date |

#### 2. [`sectors`](database/schema.sql:74)
Reference table for budget sectors (Education, Health, Infrastructure, etc.).

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| name | VARCHAR(100) | Unique sector name |
| description | TEXT | Sector description |
| color_code | VARCHAR(7) | Hex color for visualizations |
| sort_order | INTEGER | Display order |

#### 3. [`fiscal_years`](database/schema.sql:88)
Manages Kenya's fiscal years (July 1 - June 30).

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| year | INTEGER | Unique fiscal year |
| start_date | DATE | FY start |
| end_date | DATE | FY end |
| is_current | BOOLEAN | Current FY flag |

#### 4. [`counties`](database/schema.sql:102)
Kenya's 47 counties for county-level budget tracking.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| name | VARCHAR(100) | Unique county name |
| code | VARCHAR(10) | Official county code |
| region | VARCHAR(50) | Geographic region |
| geo_data | JSONB | Lat/lon for maps |
| population | INTEGER | County population |

#### 5. [`budget_allocations`](database/schema.sql:116)
**Core table** for budget data (national/county, budgeted vs actual).

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| fiscal_year_id | INTEGER | FK to fiscal_years |
| sector_id | INTEGER | FK to sectors |
| county_id | INTEGER | FK to counties (NULL for national) |
| level | budget_level | Enum: national, county |
| budgeted_amount | DECIMAL(18,2) | Budgeted amount |
| actual_spent | DECIMAL(18,2) | Actual expenditure |
| source | VARCHAR(255) | Data source citation |

#### 6. [`contents`](database/schema.sql:141)
Polymorphic content table for articles, podcasts, videos, explainers.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| type | content_type | Enum: article, podcast, video, explainer, case_study |
| title | VARCHAR(255) | Content title |
| slug | VARCHAR(255) | SEO-friendly URL |
| description | TEXT | Short description |
| content_body | TEXT | Full content |
| media_url | VARCHAR(512) | Media file URL |
| category | content_category | Content category |
| published_at | TIMESTAMP | Publication date |
| views | INTEGER | View count |
| featured | BOOLEAN | Featured content flag |

#### 7. [`analytics_logs`](database/schema.sql:193)
Tracks all user interactions and events.

| Column | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL | Primary key |
| user_id | INTEGER | FK to users |
| session_id | VARCHAR(100) | Session identifier |
| content_id | INTEGER | FK to contents |
| event_type | analytics_event_type | view, download, listen, watch, export, search |
| timestamp | TIMESTAMP | Event timestamp |
| device_type | VARCHAR(20) | mobile, desktop, tablet |
| country | VARCHAR(2) | ISO country code |

### Additional Tables

| Table | Purpose |
|-------|---------|
| `translations` | Multi-language support (English, Swahili) |
| `engagements` | User interactions (contact forms, shares) |
| `newsletter_subscriptions` | Newsletter management |
| `faqs` | Frequently asked questions |
| `podcast_episodes` | Podcast-specific metadata |
| `video_episodes` | Video-specific metadata |
| `content_relationships` | Related content linking |
| `data_sources` | Budget data source tracking |
| `system_config` | Configuration key-value store |

### Views

#### [`v_national_budget_by_sector`](database/schema.sql:314)
Aggregates national budget data by sector for visualizations.

```sql
SELECT year, sector, total_budgeted, total_spent, allocation_count
FROM v_national_budget_by_sector
ORDER BY year DESC;
```

#### [`v_county_budget_comparison`](database/schema.sql:332)
Compares county budgets with utilization rates.

```sql
SELECT county, total_budgeted, total_spent, utilization_rate
FROM v_county_budget_comparison
ORDER BY total_budgeted DESC;
```

#### [`v_content_performance`](database/schema.sql:348)
Shows content engagement metrics.

```sql
SELECT title, views, total_listens, total_watches, total_engagement
FROM v_content_performance
ORDER BY total_engagement DESC;
```

#### [`v_analytics_summary`](database/schema.sql:368)
Daily analytics summary for dashboards.

```sql
SELECT date, event_type, event_count, unique_users, sessions
FROM v_analytics_summary
ORDER BY date DESC;
```

---

## Neon Serverless Setup

### Prerequisites
1. Create account at [Neon.dev](https://neon.dev)
2. Create a new project
3. Note your connection string

### Connection String Format
```
Host: ep-xxx.region.neon.tech
Database: neon_database
User: xxx
Password: xxx
SSL: Required
```

### Environment Variables

```env
# .env (Neon)
DATABASE_URL="postgresql://user:password@ep-xxx.region.neon.tech/neon_database?sslmode=require"
```

### Neon-Specific Optimizations

#### 1. Use Serverless Driver
```typescript
// For Next.js API routes
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);
```

#### 2. Connection Pooling
```typescript
// Use pooled endpoint for serverless functions
const pooledUrl = process.env.DATABASE_URL + '&pool=true';
```

#### 3. Configure Pool Size
```sql
-- Neon automatically manages, but you can set limits
SET max_connections = 50;
```

### Neon Limitations & Solutions

| Limitation | Solution |
|------------|----------|
| Connection limit (100) | Use connection pooling, batch queries |
| No superuser access | Use available extensions only |
| Limited storage (Free: 3GB) | Archive old analytics data |
| No pg_partman | Manual partitioning or skip for now |

### Neon Extensions Available
- `pg_trgm` - Full-text search
- `uuid-ossp` - UUID generation
- `pgcrypto` - Encryption functions
- `hstore` - Key-value pairs

---

## Self-Hosted PostgreSQL Setup

### Prerequisites
1. PostgreSQL 15+ installed
2. Create database and user

### Setup Commands

```bash
# Connect to PostgreSQL
sudo -u postgres psql

# Create database
CREATE DATABASE budgetndio;

# Create user
CREATE USER budget_user WITH ENCRYPTED PASSWORD 'your_password';

# Grant permissions
GRANT ALL PRIVILEGES ON DATABASE budgetndio TO budget_user;
GRANT ALL ON SCHEMA public TO budget_user;
```

### Environment Variables

```env
# .env (Self-Hosted)
DATABASE_URL="postgresql://budget_user:password@localhost:5432/budgetndio"
```

### Self-Hosted Optimizations

#### 1. Enable Extensions
```sql
-- Full-text search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

#### 2. Configure postgresql.conf
```conf
# Memory settings
shared_buffers = 256MB
effective_cache_size = 1GB
work_mem = 16MB
maintenance_work_mem = 128MB

# Write ahead logging
wal_level = replica
max_wal_senders = 3

# Query optimization
random_page_cost = 1.1
effective_io_concurrency = 200
```

#### 3. Configure pg_hba.conf
```conf
# Allow local connections
local   all             all                                     md5
host    all             all             127.0.0.1/32            md5
host    all             all             ::1/128                 md5
```

### Docker Setup (Optional)

```yaml
# docker-compose.yml
version: '3.8'
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: budgetndio
      POSTGRES_USER: budget_user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/schema.sql:/docker-entrypoint-initdb.d/schema.sql
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U budget_user -d budgetndio"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

---

## Connection Configuration

### TypeScript/Next.js Setup

```typescript
// lib/db.ts
import { Pool } from 'pg';
import { PrismaClient } from '@prisma/client';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

export { pool };
```

### Environment-Specific URLs

```typescript
// lib/db-connection.ts
interface DbConfig {
  url: string;
  poolSize: number;
  ssl: boolean;
}

export const getDbConfig = (): DbConfig => {
  if (process.env.USE_NEON === 'true') {
    return {
      url: process.env.NEON_DATABASE_URL || process.env.DATABASE_URL,
      poolSize: 10,
      ssl: true,
    };
  }
  
  return {
    url: process.env.DATABASE_URL || `postgresql://localhost:5432/budgetndio`,
    poolSize: 20,
    ssl: false,
  };
};
```

---

## Performance Optimization

### Query Optimization

#### 1. Use EXPLAIN ANALYZE
```sql
EXPLAIN ANALYZE
SELECT * FROM budget_allocations
WHERE fiscal_year_id = 5 AND level = 'national';
```

#### 2. Index Usage
```sql
-- Check index usage
SELECT indexrelname, idx_scan, idx_tup_read, idx_tup_fetch
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY idx_scan DESC;
```

#### 3. Query Patterns to Avoid
```sql
-- BAD: Using LIKE with leading wildcard
SELECT * FROM contents WHERE title LIKE '%budget%';

-- GOOD: Use full-text search
SELECT * FROM contents 
WHERE to_tsvector('english', title) @@ to_tsquery('english', 'budget');
```

### Partitioning Strategy

#### Budget Allocations by Year
```sql
-- Create partitioned table
CREATE TABLE budget_allocations_partitioned (
    LIKE budget_allocations INCLUDING ALL
) PARTITION BY RANGE (fiscal_year_id);

-- Create partitions
CREATE TABLE budget_allocations_2020 PARTITION OF budget_allocations_partitioned
    FOR VALUES FROM (2019) TO (2021);

CREATE TABLE budget_allocations_2021 PARTITION OF budget_allocations_partitioned
    FOR VALUES FROM (2021) TO (2023);

CREATE TABLE budget_allocations_2022 PARTITION OF budget_allocations_partitioned
    FOR VALUES FROM (2023) TO (2025);

CREATE TABLE budget_allocations_current PARTITION OF budget_allocations_partitioned
    FOR VALUES FROM (2025) TO (MAXVALUE);
```

#### Analytics Partitioning
```sql
-- Create monthly partitions
CREATE TABLE analytics_logs_partitioned (
    LIKE analytics_logs INCLUDING ALL
) PARTITION BY RANGE (timestamp);

-- Create monthly partitions for 2025
CREATE TABLE analytics_logs_2025_01 PARTITION OF analytics_logs_partitioned
    FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

-- Add partition management function
CREATE OR REPLACE FUNCTION create_analytics_partition()
RETURNS void AS $$
DECLARE
    partition_date DATE;
BEGIN
    partition_date := DATE_TRUNC('month', CURRENT_DATE + INTERVAL '1 month');
    EXECUTE format(
        'CREATE TABLE analytics_logs_%I PARTITION OF analytics_logs_partitioned
         FOR VALUES FROM (%L) TO (%L)',
        to_char(partition_date, 'YYYY_MM'),
        partition_date,
        partition_date + INTERVAL '1 month'
    );
END;
$$ LANGUAGE plpgsql;
```

### Caching Strategy

#### Redis Cache Keys
```typescript
// Cache key patterns
const CACHE_KEYS = {
  BUDGET_SUMMARY: 'budget:summary',
  BUDGET_BY_SECTOR: (year: number) => `budget:sector:${year}`,
  BUDGET_BY_COUNTY: (year: number) => `budget:county:${year}`,
  CONTENT_LIST: (page: number) => `content:list:${page}`,
  CONTENT_DETAIL: (slug: string) => `content:${slug}`,
  ANALYTICS_DAILY: (date: string) => `analytics:daily:${date}`,
};

// Cache TTL values (in seconds)
const CACHE_TTL = {
  BUDGET_DATA: 3600,      // 1 hour
  CONTENT_LIST: 1800,    // 30 minutes
  CONTENT_DETAIL: 3600,  // 1 hour
  ANALYTICS: 300,        // 5 minutes
};
```

---

## Backup & Recovery

### Neon Backups (Automatic)
- Daily automated backups
- Point-in-time recovery (Pro plans)
- 7-day retention (Free tier)
- 30-day retention (Pro tier)

### Self-Hosted Backups

#### 1. pg_dump
```bash
# Full backup
pg_dump -h localhost -U budget_user -Fc budgetndio > backup_$(date +%Y%m%d).dump

# Backup with compression
pg_dump -h localhost -U budget_user -Fc -Z 9 budgetndio > backup_$(date +%Y%m%d_%H%M%S).dump.gz

# Schema only
pg_dump -h localhost -U budget_user --schema-only budgetndio > schema_backup.sql
```

#### 2. Continuous Archiving
```bash
# Configure WAL archiving in postgresql.conf
wal_level = archive
archive_mode = on
archive_command = 'cp %p /var/lib/postgresql/wal_archive/%f'
```

#### 3. Backup Script
```bash
#!/bin/bash
# backup.sh

BACKUP_DIR="/backups/postgres"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup
pg_dump -h localhost -U budget_user -Fc budgetndio | gzip > $BACKUP_DIR/backup_$DATE.dump.gz

# Keep only last 30 backups
ls -t $BACKUP_DIR/*.dump.gz | tail -n +31 | xargs rm -f

# Log backup
echo "Backup completed: $DATE" >> $BACKUP_DIR/backup.log
```

#### 4. Restore
```bash
# Restore from backup
pg_restore -h localhost -U budget_user -d budgetndio -c backup_20250212.dump.gz

# Restore to new database
pg_restore -h localhost -U budget_user -d budgetndio_new backup_20250212.dump.gz
```

### Backup Schedule

| Data Type | Frequency | Retention |
|-----------|-----------|-----------|
| Full Backup | Daily at 2 AM | 30 days |
| WAL Archives | Continuous | 7 days |
| Analytics | Monthly archive | 1 year |
| Config | On change | Permanent |

---

## Migration Guide

### 1. Create Migration Files

```typescript
// database/migrations/001_initial_schema.ts
import { Kysely, PostgresDialect } from 'kysely';

export async function up(db: Kysely<any>) {
  // Run schema changes
  await db.schema.createType('user_role').asEnum(['citizen', 'researcher', 'journalist', 'admin']).execute();
  // ... more changes
}

export async function down(db: Kysely<any>) {
  // Rollback changes
}
```

### 2. Migration Scripts

```sql
-- database/migrations/001_create_tables.sql
-- This file is executed after schema.sql for any schema changes

-- Example: Add new column
ALTER TABLE contents ADD COLUMN IF NOT EXISTS read_time_minutes INTEGER DEFAULT 5;

-- Example: Add new index
CREATE INDEX IF NOT EXISTS idx_contents_read_time ON contents(read_time_minutes);
```

### 3. Data Migration

```sql
-- database/migrations/data_migration_001.sql
-- Migrate old data to new schema

-- Insert sample sectors if not exists
INSERT INTO sectors (name, description, color_code, sort_order)
SELECT 
    sector_name,
    sector_description,
    color_code,
    row_number() OVER (ORDER BY sector_name)
FROM old_sectors
ON CONFLICT (name) DO NOTHING;
```

### 4. Version Tracking

```sql
-- Create migrations table
CREATE TABLE IF NOT EXISTS schema_migrations (
    id SERIAL PRIMARY KEY,
    version VARCHAR(20) NOT NULL UNIQUE,
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    description TEXT
);

-- Record migration
INSERT INTO schema_migrations (version, description)
VALUES ('1.0.0', 'Initial schema');
```

---

## Troubleshooting

### Common Issues

#### 1. Connection Timeouts
```
Error: connect ETIMEDOUT
```
**Solution**: Increase connection timeout, use connection pooling

#### 2. SSL Certificate Error
```
Error: self-signed certificate
```
**Solution**: Set `sslmode=require` or `sslmode=prefer`

#### 3. Too Many Connections
```
Error: remaining connection slots are reserved
```
**Solution**: Use connection pool, reduce pool size, close idle connections

### Performance Tuning Commands

```sql
-- Check active connections
SELECT count(*) FROM pg_stat_activity WHERE state = 'active';

-- Check slow queries
SELECT query, mean_time, calls 
FROM pg_stat_statements 
ORDER BY mean_time DESC 
LIMIT 10;

-- Check table sizes
SELECT relname, pg_size_pretty(pg_relation_size(relid))
FROM pg_stat_user_tables
ORDER BY pg_relation_size(relid) DESC;

-- Check index sizes
SELECT relname, idx_scan, pg_size_pretty(pg_relation_size(relid))
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;
```

---

## API Examples

### Get Budget Summary
```typescript
// app/api/budget/summary/route.ts
import { sql } from '@neondatabase/serverless';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get('year') || '2024';

  const result = await sql`
    SELECT 
      s.name as sector,
      s.color_code,
      SUM(ba.budgeted_amount) as total_budgeted,
      SUM(ba.actual_spent) as total_spent
    FROM budget_allocations ba
    JOIN sectors s ON ba.sector_id = s.id
    JOIN fiscal_years fy ON ba.fiscal_year_id = fy.id
    WHERE fy.year = ${year} AND ba.level = 'national'
    GROUP BY s.name, s.color_code
    ORDER BY total_budgeted DESC
  `;

  return Response.json(result.rows);
}
```

### Get Content List
```typescript
// app/api/content/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 10;

  const contents = await prisma.contents.findMany({
    where: type ? { type: type as any } : {},
    orderBy: { published_at: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
  });

  const total = await prisma.contents.count();

  return Response.json({
    data: contents,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
}
```

---

## Support

For issues or questions:
1. Check the [PostgreSQL Documentation](https://www.postgresql.org/docs/)
2. Review [Neon Documentation](https://neon.dev/docs/)
3. Contact the development team

---

**Document Version**: 1.0  
**Last Updated**: February 2025  
**Next Review**: May 2025
