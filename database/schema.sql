-- Budget Ndio Story Database Schema
-- Compatible with Neon Serverless and Self-Hosted PostgreSQL
-- Version: 1.0
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

-- Engagement Types
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
-- SECTION 2: CORE TABLES
-- ============================================================================

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    role user_role DEFAULT 'citizen' NOT NULL,
    preferences JSONB DEFAULT '{}'::jsonb,
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
-- SECTION 3: BUDGET DATA TABLES
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
-- SECTION 4: CONTENT TABLES
-- ============================================================================

-- Contents Table (Polymorphic Content)
CREATE TABLE contents (
    id SERIAL PRIMARY KEY,
    type content_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    content_body TEXT,
    media_url VARCHAR(512),
    thumbnail_url VARCHAR(512),
    category content_category,
    tags TEXT[] DEFAULT '{}',
    published_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    views INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    author VARCHAR(255),
    duration_seconds INTEGER,
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

-- Content Categories Reference
CREATE TABLE content_categories_ref (
    id SERIAL PRIMARY KEY,
    name content_category UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- ============================================================================
-- SECTION 5: ENGAGEMENT TABLES
-- ============================================================================

-- Engagements Table
CREATE TABLE engagements (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    type engagement_type NOT NULL,
    details JSONB DEFAULT '{}'::jsonb,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Newsletter Subscriptions
CREATE TABLE newsletter_subscriptions (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    interests TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    unsubscribed_at TIMESTAMP WITH TIME ZONE,
    source VARCHAR(100)
);

-- Contact Form Submissions
CREATE TABLE contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'closed')),
    assigned_to INTEGER REFERENCES users(id),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- ============================================================================
-- SECTION 6: FAQ TABLE
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
-- SECTION 7: ANALYTICS TABLES
-- ============================================================================

-- Analytics Logs Table
CREATE TABLE analytics_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    session_id VARCHAR(100),
    content_id INTEGER REFERENCES contents(id) ON DELETE SET NULL,
    event_type analytics_event_type NOT NULL,
    event_data JSONB DEFAULT '{}'::jsonb,
    duration INTERVAL,
    page_url TEXT,
    referrer_url TEXT,
    device_type VARCHAR(20),
    browser VARCHAR(50),
    os VARCHAR(50),
    country VARCHAR(2),
    city VARCHAR(100),
    ip_address INET,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- ============================================================================
-- SECTION 8: MEDIA TABLES
-- ============================================================================

-- Media Library Table
CREATE TABLE media_library (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255),
    mime_type VARCHAR(100) NOT NULL,
    size_bytes BIGINT,
    url VARCHAR(512) NOT NULL,
    local_path VARCHAR(512),
    alt_text VARCHAR(255),
    caption TEXT,
    uploaded_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Podcast Episodes Additional Data
CREATE TABLE podcast_episodes (
    id SERIAL PRIMARY KEY,
    content_id INTEGER NOT NULL REFERENCES contents(id) ON DELETE CASCADE,
    episode_number INTEGER,
    season_number INTEGER DEFAULT 1,
    duration_seconds INTEGER NOT NULL,
    audio_url VARCHAR(512) NOT NULL,
    transcript TEXT,
    guests JSONB DEFAULT '{}'::jsonb,
    shownotes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Video Episodes Additional Data
CREATE TABLE video_episodes (
    id SERIAL PRIMARY KEY,
    content_id INTEGER NOT NULL REFERENCES contents(id) ON DELETE CASCADE,
    video_url VARCHAR(512) NOT NULL,
    embed_url VARCHAR(512),
    duration_seconds INTEGER,
    resolution VARCHAR(20),
    thumbnail_timestamps INTEGER[],
    subtitles JSONB DEFAULT '{}'::jsonb,
    transcript TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- ============================================================================
-- SECTION 9: SEARCH AND DISCOVERY
-- ============================================================================

-- Search History (Optional - for improving search relevance)
CREATE TABLE search_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    session_id VARCHAR(100),
    query TEXT NOT NULL,
    results_count INTEGER,
    clicked_content_id INTEGER REFERENCES contents(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Content Relationships (e.g., related articles, recommended content)
CREATE TABLE content_relationships (
    id SERIAL PRIMARY KEY,
    content_id INTEGER NOT NULL REFERENCES contents(id) ON DELETE CASCADE,
    related_content_id INTEGER NOT NULL REFERENCES contents(id) ON DELETE CASCADE,
    relationship_type VARCHAR(50) DEFAULT 'related',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    UNIQUE (content_id, related_content_id),
    CONSTRAINT no_self_reference CHECK (content_id != related_content_id)
);

-- ============================================================================
-- SECTION 10: UTILITY TABLES
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
-- SECTION 11: INDEXES
-- ============================================================================

-- Users Table Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_created_at ON users(created_at);

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
CREATE INDEX idx_allocations_year_sector_level ON budget_allocations(fiscal_year_id, sector_id, level);
CREATE INDEX idx_allocations_created_at ON budget_allocations(created_at);

-- Budget Line Items Indexes
CREATE INDEX idx_line_items_allocation ON budget_line_items(allocation_id);

-- Contents Table Indexes
CREATE INDEX idx_contents_type ON contents(type);
CREATE INDEX idx_contents_category ON contents(category);
CREATE INDEX idx_contents_status ON contents(status);
CREATE INDEX idx_contents_published_at ON contents(published_at);
CREATE INDEX idx_contents_slug ON contents(slug);
CREATE INDEX idx_contents_featured ON contents(featured) WHERE featured = TRUE;
CREATE INDEX idx_contents_views ON contents(views DESC);
CREATE INDEX idx_contents_search ON contents USING gin(to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, '')));

-- Translations Table Indexes
CREATE INDEX idx_translations_content_lang ON translations(content_id, language);

-- Analytics Logs Indexes (Critical for performance)
CREATE INDEX idx_analytics_timestamp ON analytics_logs(timestamp DESC);
CREATE INDEX idx_analytics_event_type ON analytics_logs(event_type);
CREATE INDEX idx_analytics_content_id ON analytics_logs(content_id);
CREATE INDEX idx_analytics_user_id ON analytics_logs(user_id);
CREATE INDEX idx_analytics_session ON analytics_logs(session_id);
CREATE INDEX idx_analytics_daily ON analytics_logs((timestamp::date));

-- Engagement Table Indexes
CREATE INDEX idx_engagements_type ON engagements(type);
CREATE INDEX idx_engagements_user ON engagements(user_id);
CREATE INDEX idx_engagements_created ON engagements(created_at);

-- FAQ Indexes
CREATE INDEX idx_faq_category ON faqs(category);
CREATE INDEX idx_faq_active ON faqs(is_active) WHERE is_active = TRUE;

-- Search History Indexes
CREATE INDEX idx_search_query ON search_history(query);
CREATE INDEX idx_search_created ON search_history(created_at);

-- Content Relationships Indexes
CREATE INDEX idx_content_rel_primary ON content_relationships(content_id);
CREATE INDEX idx_content_rel_related ON content_relationships(related_content_id);

-- Newsletter Subscriptions Indexes
CREATE INDEX idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX idx_newsletter_active ON newsletter_subscriptions(is_active) WHERE is_active = TRUE;

-- ============================================================================
-- SECTION 12: TRIGGERS AND FUNCTIONS
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

CREATE TRIGGER update_contact_updated_at BEFORE UPDATE ON contact_submissions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_podcast_updated_at BEFORE UPDATE ON podcast_episodes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_video_updated_at BEFORE UPDATE ON video_episodes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment content views
CREATE OR REPLACE FUNCTION increment_content_views()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE contents SET views = views + 1 WHERE id = NEW.content_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER increment_views_on_view_event AFTER INSERT ON analytics_logs
    FOR EACH ROW EXECUTE FUNCTION increment_content_views()
    WHERE NEW.event_type = 'view';

-- ============================================================================
-- SECTION 13: VIEWS
-- ============================================================================

-- View: National Budget Summary by Sector
CREATE OR REPLACE VIEW v_national_budget_by_sector AS
SELECT 
    fy.year,
    s.name AS sector,
    s.color_code,
    SUM(ba.budgeted_amount) AS total_budgeted,
    SUM(ba.actual_spent) AS total_spent,
    COUNT(ba.id) AS allocation_count
FROM budget_allocations ba
JOIN fiscal_years fy ON ba.fiscal_year_id = fy.id
JOIN sectors s ON ba.sector_id = s.id
WHERE ba.level = 'national'
GROUP BY fy.year, s.name, s.color_code
ORDER BY fy.year DESC, s.name;

-- View: County Budget Comparison
CREATE OR REPLACE VIEW v_county_budget_comparison AS
SELECT 
    fy.year,
    c.name AS county,
    c.code,
    c.region,
    SUM(ba.budgeted_amount) AS total_budgeted,
    SUM(ba.actual_spent) AS total_spent,
    AVG(ba.actual_spent / NULLIF(ba.budgeted_amount, 0) * 100) AS utilization_rate
FROM budget_allocations ba
JOIN fiscal_years fy ON ba.fiscal_year_id = fy.id
JOIN counties c ON ba.county_id = c.id
WHERE ba.level = 'county'
GROUP BY fy.year, c.name, c.code, c.region
ORDER BY fy.year DESC, total_budgeted DESC;

-- View: Content Performance Summary
CREATE OR REPLACE VIEW v_content_performance AS
SELECT 
    c.id,
    c.title,
    c.type,
    c.category,
    c.published_at,
    c.views,
    c.featured,
    COALESCE(t.listen_count, 0) AS total_listens,
    COALESCE(v.watch_count, 0) AS total_watches,
    (c.views + COALESCE(t.listen_count, 0) + COALESCE(v.watch_count, 0)) AS total_engagement
FROM contents c
LEFT JOIN (
    SELECT content_id, SUM((analytics->>'listens')::int) AS listen_count
    FROM podcast_episodes
    GROUP BY content_id
) t ON c.id = t.content_id
LEFT JOIN (
    SELECT content_id, SUM((analytics->>'watches')::int) AS watch_count
    FROM video_episodes
    GROUP BY content_id
) v ON c.id = v.content_id
WHERE c.status = 'published';

-- View: Recent Analytics Summary
CREATE OR REPLACE VIEW v_analytics_summary AS
SELECT 
    DATE(timestamp) AS date,
    event_type,
    COUNT(*) AS event_count,
    COUNT(DISTINCT user_id) AS unique_users,
    COUNT(DISTINCT session_id) AS sessions
FROM analytics_logs
GROUP BY DATE(timestamp), event_type
ORDER BY date DESC;

-- ============================================================================
-- SECTION 14: SAMPLE DATA (For Testing)
-- ============================================================================

-- Insert Sample Sectors
INSERT INTO sectors (name, description, color_code, sort_order) VALUES
('Education', 'Ministry of Education, schools, universities, and TVET institutions', '#3B82F6', 1),
('Healthcare', 'Ministry of Health, hospitals, clinics, and public health programs', '#EF4444', 2),
('Infrastructure', 'Roads, bridges, public buildings, and utilities', '#10B981', 3),
('Agriculture', 'Ministry of Agriculture, farming subsidies, and food security', '#F59E0B', 4),
('Public Administration', 'Government operations, salaries, and administration', '#8B5CF6', 5),
('Security', 'Police, military, and national security', '#EC4899', 6),
('Environment', 'Environmental protection, climate change, and natural resources', '#059669', 7),
('Social Protection', 'Social safety nets, pensions, and welfare programs', '#6366F1', 8),
('Trade & Industry', 'Manufacturing, trade promotion, and SME support', '#F97316', 9),
('Sports & Culture', 'Sports development, arts, and cultural preservation', '#84CC16', 10);

-- Insert Sample Counties
INSERT INTO counties (name, code, region, geo_data, population) VALUES
('Nairobi', '001', 'Nairobi Metropolitan', '{"lat": -1.2921, "lon": 36.8219}', 4397073),
('Mombasa', '002', 'Coast', '{"lat": -4.0435, "lon": 39.6682}', 1208333),
('Kisumu', '003', 'Western', '{"lat": -0.1022, "lon": 34.7617}', 1155845),
('Nakuru', '016', 'Rift Valley', '{"lat": -0.3031, "lon": 36.0800}', 2113629),
('Kiambu', '022', 'Central', '{"lat": -1.1714, "lon": 36.8356}', 2395052);

-- Insert Fiscal Years
INSERT INTO fiscal_years (year, start_date, end_date, description, is_current) VALUES
(2020, '2019-07-01', '2020-06-30', 'FY 2019/2020', FALSE),
(2021, '2020-07-01', '2021-06-30', 'FY 2020/2021', FALSE),
(2022, '2021-07-01', '2022-06-30', 'FY 2021/2022', FALSE),
(2023, '2022-07-01', '2023-06-30', 'FY 2022/2023', FALSE),
(2024, '2023-07-01', '2024-06-30', 'FY 2023/2024', TRUE),
(2025, '2024-07-01', '2025-06-30', 'FY 2024/2025', FALSE);

-- Insert Sample FAQ
INSERT INTO faqs (question, answer, category, sort_order) VALUES
('How accurate is this budget data?', 'We source our data from official government budget documents, procurement records, and public spending reports. We then verify this information through field visits and community interviews.', 'general', 1),
('How often is the tracker updated?', 'We update the tracker within 2 weeks of new budget releases from the National Treasury or County governments.', 'tracker', 2),
('Can I download the data?', 'Yes! All our data is available for download in CSV format for research and civic engagement purposes.', 'tracker', 3),
('How can I use this data?', 'You can use our budget data for research, journalism, advocacy, and educational purposes. Please cite the source when using our data.', 'general', 4),
('Is this data free to use?', 'Yes, all our educational content and budget data is freely available for non-commercial use.', 'general', 5);

-- Insert Sample Users
INSERT INTO users (email, name, role, preferences) VALUES
('admin@budgetndio.co.ke', 'Admin User', 'admin', '{"interests": ["education", "health"]}'),
('researcher@budgetndio.co.ke', 'Jane Researcher', 'researcher', '{"interests": ["infrastructure", "agriculture"]}');

-- Insert Sample Contents
INSERT INTO contents (type, title, slug, description, category, status, published_at, author) VALUES
('explainer', 'Understanding the National Budget', 'understanding-national-budget', 'A beginner guide to understanding how Kenya national budget works.', 'national_budget', 'published', CURRENT_TIMESTAMP, 'Budget Team'),
('article', 'Where Does Your Tax Money Go?', 'where-tax-money-goes', 'An in-depth look at how tax revenues are allocated across different sectors.', 'tax_education', 'published', CURRENT_TIMESTAMP, 'Jane Researcher'),
('podcast', 'Episode 1: Budget Basics', 'budget-basics-episode-1', 'Introduction to Kenya budget process for beginners.', 'national_budget', 'published', CURRENT_TIMESTAMP, 'Podcast Team'),
('video', '5-Minute Budget Overview', '5-minute-budget-overview', 'Quick visual explainer on how budgets work.', 'national_budget', 'published', CURRENT_TIMESTAMP, 'Video Team');

-- Insert Sample Podcast Episodes
INSERT INTO podcast_episodes (content_id, episode_number, duration_seconds, audio_url, transcript) VALUES
(3, 1, 1200, 'https://cdn.budgetndio.co.ke/podcasts/ep1.mp3', 'Full transcript here...');

-- Insert Sample Video Episodes
INSERT INTO video_episodes (content_id, duration_seconds, video_url, embed_url) VALUES
(4, 300, 'https://cdn.budgetndio.co.ke/videos/budget-overview.mp4', 'https://youtube.com/embed/xxx');

-- Insert Sample Budget Allocations
INSERT INTO budget_allocations (fiscal_year_id, sector_id, county_id, level, budgeted_amount, actual_spent, source) VALUES
(5, 1, NULL, 'national', 65000000000, 62000000000, 'National Treasury'),
(5, 2, NULL, 'national', 45000000000, 43000000000, 'National Treasury'),
(5, 3, NULL, 'national', 38000000000, 35000000000, 'National Treasury'),
(5, 1, 1, 'county', 15000000000, 14500000000, 'Nairobi County Treasury'),
(5, 2, 1, 'county', 8000000000, 7800000000, 'Nairobi County Treasury');

-- Insert Sample Analytics
INSERT INTO analytics_logs (user_id, content_id, event_type, timestamp, device_type) VALUES
(1, 1, 'view', CURRENT_TIMESTAMP - INTERVAL '1 hour', 'desktop'),
(1, 3, 'listen', CURRENT_TIMESTAMP - INTERVAL '2 hours', 'mobile'),
(NULL, 2, 'view', CURRENT_TIMESTAMP - INTERVAL '3 hours', 'mobile');

-- Insert Sample Newsletter Subscriptions
INSERT INTO newsletter_subscriptions (email, name, interests, source) VALUES
('citizen@example.com', 'John Citizen', ARRAY['education', 'health'], 'website'),
('youth@example.com', 'Young Kenyan', ARRAY['civic_engagement'], 'social_media');

-- Insert Data Sources
INSERT INTO data_sources (name, description, source_type, url) VALUES
('National Treasury', 'Official Kenya National Treasury website', 'government', 'https://www.treasury.go.ke'),
('Open Government Partnership Kenya', 'Open data initiatives', 'organization', 'https://www.ogp.go.ke'),
('World Bank Kenya Data', 'Kenya economic data', 'international', 'https://data.worldbank.org/country/kenya');

-- Insert System Config
INSERT INTO system_config (config_key, config_value, description) VALUES
('site_name', 'Budget Ndio Story', 'Website name'),
('default_language', 'en', 'Default language'),
('items_per_page', '10', 'Items per page for pagination'),
('analytics_retention_days', '90', 'Days to retain analytics data');

-- ============================================================================
-- SECTION 15: NEON SERVERLESS SPECIFIC NOTES
-- ============================================================================

/*
Neon Serverless Compatibility Notes:
====================================

1. Connection Pooling:
   - Neon handles connection pooling automatically
   - Use Serverless Driver or pooled connections for serverless functions
   - Connection limit: ~100 connections per branch (Free tier)

2. Partitioning:
   - Table partitioning is supported in Neon
   - Use LIST partitioning by county_id or RANGE by fiscal_year
   - Example:
     CREATE TABLE budget_allocations_partitioned (...) PARTITION BY LIST (level);

3. Extensions:
   - pg_trgm (for full-text search) is available
   - uuid-ossp is available
   - Enable with: CREATE EXTENSION IF NOT EXISTS pg_trgm;

4. Backups:
   - Neon provides automatic backups
   - Point-in-time recovery available on Pro plans

5. Read Replicas:
   - Available on Pro plans for scaling reads
   - Useful for analytics queries

6. Row Level Security:
   - Supported for multi-tenant scenarios
   - Useful for future user-specific content

7. Performance Tips for Neon:
   - Use parameterized queries to reduce query plan caching
   - Batch inserts for bulk data
   - Use connection pooling middleware for serverless
*/

-- ============================================================================
-- SECTION 16: MIGRATION HELPERS
-- ============================================================================

-- Function to get current schema version
CREATE OR REPLACE FUNCTION get_schema_version()
RETURNS TEXT AS $$
BEGIN
    RETURN '1.0.0';
END;
$$ LANGUAGE plpgsql;

-- Function to check if table exists
CREATE OR REPLACE FUNCTION table_exists(p_table_name TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = p_table_name
    );
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
