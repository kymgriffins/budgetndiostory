-- Budget Ndio Story - VPS-Optimized Database Schema
-- Trimmed for Cheap VPS (2-4 GB RAM, 1-2 vCPU)
-- Compatible with PostgreSQL 15+ on Ubuntu 24.04 LTS
-- Version: 2.0 (VPS-Optimized)
-- Date: February 2025

-- ============================================================================
-- SECTION 1: ENUMS AND TYPES
-- ============================================================================

-- User Roles
CREATE TYPE user_role AS ENUM (
    'citizen',
    'researcher',
    'journalist',
    'admin'
);

-- Budget Levels
CREATE TYPE budget_level AS ENUM (
    'national',
    'county'
);

-- Content Types
CREATE TYPE content_type AS ENUM (
    'article',
    'podcast',
    'video',
    'explainer',
    'case_study'
);

-- Content Categories
CREATE TYPE content_category AS ENUM (
    'national_budget',
    'county_budget',
    'tax_education',
    'policy_impact',
    'civic_engagement'
);

-- Engagement Types (consolidated)
CREATE TYPE engagement_type AS ENUM (
    'contact_form',
    'newsletter_signup',
    'faq_view',
    'social_share',
    'content_download'
);

-- Event Types for Analytics
CREATE TYPE analytics_event_type AS ENUM (
    'view',
    'download',
    'listen',
    'watch',
    'export',
    'search'
);

-- Languages
CREATE TYPE language_code AS ENUM (
    'en',
    'sw'
);

-- ============================================================================
-- SECTION 2: CORE TABLES (KEEP - Essential)
-- ============================================================================

-- Users Table (Simplified - no preferences JSONB for now)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    role user_role DEFAULT 'citizen' NOT NULL,
    subscribed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Sectors Table (e.g., Education, Health, Infrastructure)
CREATE TABLE sectors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon_url VARCHAR(255),
    color_code VARCHAR(7) DEFAULT '#3B82F6',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Fiscal Years Table
CREATE TABLE fiscal_years (
    id SERIAL PRIMARY KEY,
    year INTEGER UNIQUE NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    description TEXT,
    is_current BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fy_date_range CHECK (start_date < end_date)
);

-- Counties Table (Kenya's 47 Counties)
CREATE TABLE counties (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    region VARCHAR(50),
    geo_data JSONB DEFAULT '{}'::jsonb,
    population INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- ============================================================================
-- SECTION 3: BUDGET DATA TABLES (KEEP - Core Value)
-- ============================================================================

-- Budget Allocations Table
CREATE TABLE budget_allocations (
    id SERIAL PRIMARY KEY,
    fiscal_year_id INTEGER NOT NULL REFERENCES fiscal_years(id) ON DELETE CASCADE,
    sector_id INTEGER NOT NULL REFERENCES sectors(id) ON DELETE CASCADE,
    county_id INTEGER REFERENCES counties(id) ON DELETE CASCADE,
    level budget_level NOT NULL,
    budgeted_amount DECIMAL(18, 2) NOT NULL,
    actual_spent DECIMAL(18, 2),
    approved_amount DECIMAL(18, 2),
    notes TEXT,
    source VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    -- Constraints
    CONSTRAINT positive_budget CHECK (budgeted_amount >= 0),
    CONSTRAINT positive_actual CHECK (actual_spent IS NULL OR actual_spent >= 0)
);

-- Budget Line Items (Detailed Breakdown)
CREATE TABLE budget_line_items (
    id SERIAL PRIMARY KEY,
    allocation_id INTEGER NOT NULL REFERENCES budget_allocations(id) ON DELETE CASCADE,
    description VARCHAR(255) NOT NULL,
    budgeted_amount DECIMAL(18, 2) NOT NULL,
    actual_amount DECIMAL(18, 2),
    quarter INTEGER CHECK (quarter BETWEEN 1 AND 4),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT positive_line_amount CHECK (budgeted_amount >= 0)
);

-- ============================================================================
-- SECTION 4: CONTENT TABLES (KEEP - but simplify)
-- ============================================================================

-- Contents Table (Polymorphic Content with embedded episode data)
CREATE TABLE contents (
    id SERIAL PRIMARY KEY,
    type content_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    content_body TEXT,
    
    -- Media URLs (external hosting only - no local files)
    media_url VARCHAR(512),
    embed_url VARCHAR(512),
    thumbnail_url VARCHAR(512),
    
    -- Metadata
    category content_category,
    tags TEXT[] DEFAULT '{}',
    published_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    views INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    author VARCHAR(255),
    
    -- Episode data (embedded instead of separate tables for podcasts/videos)
    duration_seconds INTEGER,
    episode_number INTEGER,
    season_number INTEGER DEFAULT 1,
    transcript TEXT,
    guests JSONB DEFAULT '{}'::jsonb,
    shownotes TEXT,
    
    -- Analytics & SEO
    analytics JSONB DEFAULT '{}'::jsonb,
    metadata JSONB DEFAULT '{}'::jsonb,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Translations Table (Multi-language Support)
CREATE TABLE translations (
    id SERIAL PRIMARY KEY,
    content_id INTEGER NOT NULL REFERENCES contents(id) ON DELETE CASCADE,
    language language_code NOT NULL,
    translated_title VARCHAR(255),
    translated_body TEXT,
    translated_description TEXT,
    translated_tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    UNIQUE (content_id, language)
);

-- ============================================================================
-- SECTION 5: ENGAGEMENT TABLES (SIMPLIFIED - merged newsletter/contact)
-- ============================================================================

-- Engagements Table (consolidated from multiple tables)
CREATE TABLE engagements (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    type engagement_type NOT NULL,
    
    -- For newsletter_signup
    email VARCHAR(255),
    interests TEXT[] DEFAULT '{}',
    
    -- For contact_form
    subject VARCHAR(255),
    message TEXT,
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'closed')),
    
    -- Generic fields
    details JSONB DEFAULT '{}'::jsonb,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- ============================================================================
-- SECTION 6: FAQ TABLE (KEEP)
-- ============================================================================

-- FAQs Table
CREATE TABLE faqs (
    id SERIAL PRIMARY KEY,
    question VARCHAR(500) NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- ============================================================================
-- SECTION 7: ANALYTICS TABLES (OPTIMIZED - with partitioning)
-- ============================================================================

-- Analytics Logs Table (with partitioning for performance)
CREATE TABLE analytics_logs (
    id BIGSERIAL,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    session_id VARCHAR(100),
    content_id INTEGER REFERENCES contents(id) ON DELETE SET NULL,
    event_type analytics_event_type NOT NULL,
    event_data JSONB DEFAULT '{}'::jsonb,
    duration INTERVAL,
    page_url TEXT,
    referrer_url TEXT,
    -- Simplified device info (derived from user_agent if needed)
    country VARCHAR(2),
    ip_address INET,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (id, timestamp)
) PARTITION BY RANGE (timestamp);

-- Create monthly partitions (extend as needed)
CREATE TABLE analytics_logs_2025_01 PARTITION OF analytics_logs
    FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');
CREATE TABLE analytics_logs_2025_02 PARTITION OF analytics_logs
    FOR VALUES FROM ('2025-02-01') TO ('2025-03-01');
CREATE TABLE analytics_logs_2025_03 PARTITION OF analytics_logs
    FOR VALUES FROM ('2025-03-01') TO ('2025-04-01');
CREATE TABLE analytics_logs_2025_04 PARTITION OF analytics_logs
    FOR VALUES FROM ('2025-04-01') TO ('2025-05-01');
CREATE TABLE analytics_logs_2025_05 PARTITION OF analytics_logs
    FOR VALUES FROM ('2025-05-01') TO ('2025-06-01');
CREATE TABLE analytics_logs_2025_06 PARTITION OF analytics_logs
    FOR VALUES FROM ('2025-06-01') TO ('2025-07-01');

-- ============================================================================
-- SECTION 8: UTILITY TABLES (KEEP - essential)
-- ============================================================================

-- Data Sources (for tracking where budget data comes from)
CREATE TABLE data_sources (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    url VARCHAR(512),
    source_type VARCHAR(50),
    last_fetched TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- System Configuration
CREATE TABLE system_config (
    id SERIAL PRIMARY KEY,
    config_key VARCHAR(100) UNIQUE NOT NULL,
    config_value TEXT NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- ============================================================================
-- SECTION 9: INDEXES (OPTIMIZED for VPS)
-- ============================================================================

-- Users Table Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Sectors Table Indexes
CREATE INDEX idx_sectors_name ON sectors(name);
CREATE INDEX idx_sectors_sort_order ON sectors(sort_order);

-- Fiscal Years Table Indexes
CREATE INDEX idx_fiscal_years_year ON fiscal_years(year);
CREATE INDEX idx_fiscal_years_current ON fiscal_years(is_current) WHERE is_current = TRUE;

-- Counties Table Indexes
CREATE INDEX idx_counties_name ON counties(name);
CREATE INDEX idx_counties_code ON counties(code);
CREATE INDEX idx_counties_region ON counties(region);

-- Budget Allocations Table Indexes
CREATE INDEX idx_allocations_fiscal_year ON budget_allocations(fiscal_year_id);
CREATE INDEX idx_allocations_sector ON budget_allocations(sector_id);
CREATE INDEX idx_allocations_county ON budget_allocations(county_id);
CREATE INDEX idx_allocations_level ON budget_allocations(level);
CREATE INDEX idx_allocations_year_sector ON budget_allocations(fiscal_year_id, sector_id, level);

-- Budget Line Items Indexes
CREATE INDEX idx_line_items_allocation ON budget_line_items(allocation_id);

-- Contents Table Indexes (critical for content queries)
CREATE INDEX idx_contents_type ON contents(type);
CREATE INDEX idx_contents_category ON contents(category);
CREATE INDEX idx_contents_status ON contents(status);
CREATE INDEX idx_contents_published ON contents(published_at) WHERE status = 'published';
CREATE INDEX idx_contents_slug ON contents(slug);
CREATE INDEX idx_contents_featured ON contents(featured) WHERE featured = TRUE;
CREATE INDEX idx_contents_views ON contents(views DESC);
-- GIN index for text search (lighter than to_tsvector for basic search)
CREATE INDEX idx_contents_search ON contents USING gin(to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, '')));

-- Translations Table Indexes
CREATE INDEX idx_translations_content_lang ON translations(content_id, language);

-- Analytics Logs Indexes (minimal for partitioned table)
CREATE INDEX idx_analytics_timestamp ON analytics_logs(timestamp DESC);
CREATE INDEX idx_analytics_event_type ON analytics_logs(event_type);
CREATE INDEX idx_analytics_content_id ON analytics_logs(content_id);
CREATE INDEX idx_analytics_session ON analytics_logs(session_id);

-- Engagement Table Indexes
CREATE INDEX idx_engagements_type ON engagements(type);
CREATE INDEX idx_engagements_user ON engagements(user_id);
CREATE INDEX idx_engagements_created ON engagements(created_at);
CREATE INDEX idx_engagements_email ON engagements(email) WHERE email IS NOT NULL;

-- FAQ Indexes
CREATE INDEX idx_faq_category ON faqs(category);
CREATE INDEX idx_faq_active ON faqs(is_active) WHERE is_active = TRUE;

-- ============================================================================
-- SECTION 10: TRIGGERS AND FUNCTIONS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contents_updated_at BEFORE UPDATE ON contents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_translations_updated_at BEFORE UPDATE ON translations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_allocations_updated_at BEFORE UPDATE ON budget_allocations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_engagements_updated_at BEFORE UPDATE ON engagements
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment content views
CREATE OR REPLACE FUNCTION increment_content_views()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE contents SET views = views + 1 WHERE id = NEW.content_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-increment views on analytics log insert
CREATE TRIGGER increment_views_on_log AFTER INSERT ON analytics_logs
    FOR EACH ROW EXECUTE FUNCTION increment_content_views();

-- ============================================================================
-- SECTION 11: VIEWS (for common queries)
-- ============================================================================

-- National Budget by Sector View
CREATE VIEW v_national_budget_by_sector AS
SELECT 
    fy.year,
    s.name AS sector_name,
    s.color_code,
    SUM(ba.budgeted_amount) AS total_budgeted,
    SUM(ba.actual_spent) AS total_actual_spent,
    COUNT(DISTINCT ba.id) AS allocation_count
FROM budget_allocations ba
JOIN fiscal_years fy ON ba.fiscal_year_id = fy.id
JOIN sectors s ON ba.sector_id = s.id
WHERE ba.level = 'national'
GROUP BY fy.year, s.name, s.color_code
ORDER BY fy.year DESC, total_budgeted DESC;

-- County Budget Summary View
CREATE VIEW v_county_budget_summary AS
SELECT 
    fy.year,
    c.name AS county_name,
    c.code,
    c.region,
    SUM(ba.budgeted_amount) AS total_budgeted,
    SUM(ba.actual_spent) AS total_actual_spent
FROM budget_allocations ba
JOIN fiscal_years fy ON ba.fiscal_year_id = fy.id
JOIN counties c ON ba.county_id = c.id
WHERE ba.level = 'county'
GROUP BY fy.year, c.name, c.code, c.region
ORDER BY fy.year DESC, total_budgeted DESC;

-- Content Summary View
CREATE VIEW v_content_summary AS
SELECT 
    c.type,
    c.category,
    COUNT(*) AS total_count,
    SUM(c.views) AS total_views,
    MAX(c.published_at) AS latest_published
FROM contents c
WHERE c.status = 'published'
GROUP BY c.type, c.category;

-- ============================================================================
-- SECTION 12: ANALYTICS RETENTION POLICY (Cron Job Setup)
-- ============================================================================

-- Note: Run this as pg_cron job or manual cron
-- Example: Delete analytics logs older than 90 days
-- SELECT analytics_retention_cleanup(90);

CREATE OR REPLACE FUNCTION analytics_retention_cleanup(retention_days INTEGER)
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
    cutoff_date TIMESTAMP WITH TIME ZONE;
BEGIN
    cutoff_date := CURRENT_TIMESTAMP - (retention_days || ' days')::INTERVAL;
    
    -- Delete from all partitions
    EXECUTE format('DELETE FROM analytics_logs WHERE timestamp < %L', cutoff_date);
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    
    RAISE NOTICE 'Deleted % analytics logs older than % days', deleted_count, retention_days;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- SECTION 13: SAMPLE DATA (Minimal seed for testing)
-- ============================================================================

-- Sample Fiscal Years
INSERT INTO fiscal_years (year, start_date, end_date, description, is_current) VALUES
(2025, '2024-07-01', '2025-06-30', 'FY 2024/2025', TRUE),
(2024, '2023-07-01', '2024-06-30', 'FY 2023/2024', FALSE),
(2023, '2022-07-01', '2023-06-30', 'FY 2022/2023', FALSE);

-- Sample Sectors
INSERT INTO sectors (name, description, color_code, sort_order) VALUES
('Education', 'Ministry of Education budget allocations', '#3B82F6', 1),
('Healthcare', 'Ministry of Health and healthcare programs', '#10B981', 2),
('Infrastructure', 'Roads, transport, and public works', '#F59E0B', 3),
('Agriculture', 'Ministry of Agriculture and irrigation', '#8B5CF6', 4),
('Security', 'National security and interior affairs', '#EF4444', 5);

-- Sample Counties
INSERT INTO counties (name, code, region, population) VALUES
('Nairobi', 'NRB', 'Central', 4397533),
('Mombasa', 'MSA', 'Coast', 1208333),
('Kiambu', 'KIA', 'Central', 2411795),
('Kisumu', 'KSM', 'Western', 1155826),
('Nakuru', 'NKR', 'Rift Valley', 2113968);

-- System Config
INSERT INTO system_config (config_key, config_value, description) VALUES
('site_name', 'Budget Ndio Story', 'Website name'),
('site_description', 'Kenya Budget Tracking Platform', 'Website description'),
('default_language', 'en', 'Default language'),
('analytics_retention_days', '90', 'Days to keep analytics logs'),
('content_per_page', '12', 'Items per page in listings');
