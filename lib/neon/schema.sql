-- ============================================================================
-- Budget Ndio Story - Complete Database Schema
-- ============================================================================
-- Run this SQL in your Neon SQL Editor to set up the complete database
-- 
-- TABLES:
-- 1. users (extended from Auth.js) - with roles
-- 2. accounts - OAuth providers
-- 3. sessions - Auth sessions
-- 4. verification_tokens - Email verification
-- 5. user_profiles - Extended user information
-- 6. user_roles - Role management
-- 7. blog_posts - Blog content
-- 8. blog_categories - Categories
-- 9. blog_comments - Comments
-- 10. blog_reactions - Likes/reactions
-- 11. notifications - User notifications
-- 12. newsletter_subscriptions - Newsletter
-- ============================================================================

-- ============================================================================
-- AUTH.JS TABLES (Required for NextAuth)
-- ============================================================================

CREATE TABLE IF NOT EXISTS users (
    id TEXT NOT NULL PRIMARY KEY,
    name TEXT,
    email TEXT NOT NULL UNIQUE,
    email_verified TIMESTAMP WITH TIME ZONE,
    image TEXT,
    role TEXT DEFAULT 'viewer' CHECK (role IN ('admin', 'editor', 'author', 'viewer')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS accounts (
    id TEXT NOT NULL PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    provider TEXT NOT NULL,
    provider_account_id TEXT NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    expires_at BIGINT,
    token_type TEXT,
    scope TEXT,
    id_token TEXT,
    session_state TEXT,
    UNIQUE(provider, provider_account_id)
);

CREATE INDEX idx_accounts_user_id ON accounts(user_id);

CREATE TABLE IF NOT EXISTS sessions (
    id TEXT NOT NULL PRIMARY KEY,
    session_token TEXT NOT NULL UNIQUE,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_token ON sessions(session_token);

CREATE TABLE IF NOT EXISTS verification_tokens (
    identifier TEXT NOT NULL,
    token TEXT NOT NULL UNIQUE,
    expires TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY (identifier, token)
);

-- ============================================================================
-- USER PROFILES (Extended User Information)
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_profiles (
    id TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    user_id TEXT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    bio TEXT,
    avatar_url TEXT,
    twitter_handle TEXT,
    linkedin_url TEXT,
    website_url TEXT,
    organization TEXT,
    location TEXT,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);

-- ============================================================================
-- USER ROLES (Fine-grained permissions)
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_roles (
    id TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('admin', 'editor', 'author', 'viewer', 'moderator')),
    permissions TEXT[] DEFAULT '{}',
    granted_by TEXT REFERENCES users(id),
    granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, role)
);

CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX idx_user_roles_role ON user_roles(role);

-- Default roles function
CREATE OR REPLACE FUNCTION set_default_role()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.role IS NULL OR NEW.role = '' THEN
        NEW.role := 'viewer';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to set default role
DROP TRIGGER IF EXISTS set_default_role_trigger ON users;
CREATE TRIGGER set_default_role_trigger
    BEFORE INSERT ON users
    FOR EACH ROW
    EXECUTE FUNCTION set_default_role();

-- ============================================================================
-- BLOG POSTS
-- ============================================================================

CREATE TABLE IF NOT EXISTS blog_posts (
    id TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    category_id TEXT REFERENCES blog_categories(id) ON DELETE SET NULL,
    author_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    thumbnail_url TEXT,
    tags TEXT[] DEFAULT '{}',
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived', 'scheduled')),
    featured BOOLEAN DEFAULT false,
    view_count INTEGER DEFAULT 0,
    read_time_minutes INTEGER DEFAULT 5,
    seo_title TEXT,
    seo_description TEXT,
    seo_keywords TEXT[],
    og_image_url TEXT,
    discussion_enabled BOOLEAN DEFAULT true,
    published_at TIMESTAMP WITH TIME ZONE,
    scheduled_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_author ON blog_posts(author_id);
CREATE INDEX idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX idx_blog_posts_published ON blog_posts(published_at) WHERE status = 'published';
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured) WHERE featured = true;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_blog_posts_timestamp ON blog_posts;
CREATE TRIGGER update_blog_posts_timestamp
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- BLOG CATEGORIES
-- ============================================================================

CREATE TABLE IF NOT EXISTS blog_categories (
    id TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    color TEXT DEFAULT '#3B82F6',
    emoji TEXT DEFAULT '📝',
    post_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Default categories
INSERT INTO blog_categories (name, slug, description, color, emoji, sort_order) VALUES
    ('Infrastructure', 'infrastructure', 'Roads, bridges, transportation projects', '#F97316', '🛣️', 1),
    ('Health', 'health', 'Healthcare and medical services', '#22C55E', '🏥', 2),
    ('Education', 'education', 'Schools, universities, training', '#F59E0B', '📚', 3),
    ('Youth', 'youth', 'Youth programs and opportunities', '#A855F7', '👥', 4),
    ('Water', 'water', 'Water supply and sanitation', '#06B6D4', '💧', 5),
    ('Agriculture', 'agriculture', 'Farming and food security', '#84CC16', '🌾', 6),
    ('Governance', 'governance', 'Government and transparency', '#6B7280', '🏛️', 7),
    ('Analysis', 'analysis', 'In-depth budget analysis', '#3B82F6', '📊', 8),
    ('Opinion', 'opinion', 'Opinion pieces and perspectives', '#EC4899', '💭', 9)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- BLOG COMMENTS
-- ============================================================================

CREATE TABLE IF NOT EXISTS blog_comments (
    id TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    post_id TEXT NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
    parent_id TEXT REFERENCES blog_comments(id) ON DELETE CASCADE,
    author_id TEXT REFERENCES users(id) ON DELETE SET NULL,
    author_name TEXT NOT NULL,
    author_email TEXT,
    author_avatar TEXT,
    content TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('approved', 'pending', 'flagged', 'spam')),
    upvotes INTEGER DEFAULT 0,
    downvotes INTEGER DEFAULT 0,
    is_edited BOOLEAN DEFAULT false,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_blog_comments_post ON blog_comments(post_id);
CREATE INDEX idx_blog_comments_parent ON blog_comments(parent_id);
CREATE INDEX idx_blog_comments_author ON blog_comments(author_id);
CREATE INDEX idx_blog_comments_status ON blog_comments(status);

-- Trigger for comment timestamps
DROP TRIGGER IF EXISTS update_comments_timestamp ON blog_comments;
CREATE TRIGGER update_comments_timestamp
    BEFORE UPDATE ON blog_comments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- BLOG REACTIONS (Likes, etc.)
-- ============================================================================

CREATE TABLE IF NOT EXISTS blog_reactions (
    id TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    post_id TEXT REFERENCES blog_posts(id) ON DELETE CASCADE,
    comment_id TEXT REFERENCES blog_comments(id) ON DELETE CASCADE,
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    reaction TEXT NOT NULL CHECK (reaction IN ('like', 'love', 'insightful', 'informative', 'concern')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, post_id, reaction),
    UNIQUE(user_id, comment_id, reaction)
);

CREATE INDEX idx_blog_reactions_post ON blog_reactions(post_id);
CREATE INDEX idx_blog_reactions_comment ON blog_reactions(comment_id);
CREATE INDEX idx_blog_reactions_user ON blog_reactions(user_id);

-- ============================================================================
-- NOTIFICATIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS notifications (
    id TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('reply', 'mention', 'upvote', 'follow', 'new_comment', 'role_change', 'system')),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    link TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read) WHERE is_read = false;

-- ============================================================================
-- NEWSLETTER SUBSCRIPTIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
    id TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    is_active BOOLEAN DEFAULT true,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    unsubscribed_at TIMESTAMP WITH TIME ZONE,
    source TEXT DEFAULT 'website',
    preferences JSONB DEFAULT '{}'
);

CREATE INDEX idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX idx_newsletter_active ON newsletter_subscriptions(is_active);

-- ============================================================================
-- VIEW: User with Profile and Role
-- ============================================================================

CREATE OR REPLACE VIEW v_user_details AS
SELECT 
    u.id,
    u.name,
    u.email,
    u.image,
    u.role,
    u.email_verified,
    u.created_at,
    p.bio,
    p.avatar_url,
    p.twitter_handle,
    p.linkedin_url,
    p.website_url,
    p.organization,
    p.location,
    p.is_verified,
    array_agg(DISTINCT r.role) FILTER (WHERE r.role IS NOT NULL) as roles
FROM users u
LEFT JOIN user_profiles p ON p.user_id = u.id
LEFT JOIN user_roles r ON r.user_id = u.id
GROUP BY u.id, u.name, u.email, u.image, u.role, u.email_verified, u.created_at,
         p.bio, p.avatar_url, p.twitter_handle, p.linkedin_url, p.website_url,
         p.organization, p.location, p.is_verified;

-- ============================================================================
-- VIEW: Blog Posts with Author and Category
-- ============================================================================

CREATE OR REPLACE VIEW v_blog_posts AS
SELECT 
    bp.*,
    u.name as author_name,
    u.image as author_avatar,
    bc.name as category_name,
    bc.slug as category_slug,
    bc.emoji as category_emoji,
    COUNT(DISTINCT bc2.id) as comment_count,
    COALESCE(
        (SELECT jsonb_agg(jsonb_build_object('reaction', reaction, 'count', count))
         FROM blog_reactions br2
         WHERE br2.post_id = bp.id
         GROUP BY br2.reaction),
        '[]'::jsonb
    ) as reactions
FROM blog_posts bp
LEFT JOIN users u ON u.id = bp.author_id
LEFT JOIN blog_categories bc ON bc.id = bp.category_id
LEFT JOIN blog_comments bc2 ON bc2.post_id = bp.id AND bc2.status = 'approved'
GROUP BY bp.id, u.name, u.image, bc.name, bc.slug, bc.emoji;

-- ============================================================================
-- SECURITY: Row Level Security (Optional - for multi-tenant)
-- ============================================================================

-- Enable RLS (uncomment if needed)
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- SEED DATA: Create default admin user (RUN MANUALLY AFTER SETUP)
-- ============================================================================
-- IMPORTANT: Change the password and run this manually to create your admin:
-- 
-- INSERT INTO users (id, name, email, role)
-- VALUES (
--     gen_random_uuid()::TEXT,
--     'Admin User',
--     'admin@budgetndiostory.org',
--     'admin'
-- );
-- 
-- INSERT INTO user_profiles (user_id, bio, is_verified)
-- VALUES (
--     (SELECT id FROM users WHERE email = 'admin@budgetndiostory.org'),
--     'Administrator',
--     true
-- );
