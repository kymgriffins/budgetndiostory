-- ============================================================================
-- SEED DATA FOR BUDGET NDIO STORY
-- For Development and Testing
-- ============================================================================
-- Version: 1.0
-- Generated: February 2025
-- ============================================================================

-- ============================================================================
-- SECTION 1: KENYA COUNTIES (All 47 Counties)
-- ============================================================================

INSERT INTO counties (name, code, region, geo_data, population) VALUES
('Baringo', '028', 'Rift Valley', '{"lat": 0.4666, "lon": 36.0666}', 666763),
('Bomet', '036', 'Rift Valley', '{"lat": -0.7814, "lon": 35.3436}', 875500),
('Bungoma', '039', 'Western', '{"lat": 0.5635, "lon": 34.5606}', 1529003),
('Busia', '040', 'Western', '{"lat": 0.4177, "lon": 34.2870}', 893066),
('Elgeyo-Marakwet', '028', 'Rift Valley', '{"lat": 0.6524, "lon": 35.5094}', 454480),
('Embu', '014', 'Eastern', '{"lat": -0.5389, "lon": 37.4583}', 608599),
('Garissa', '007', 'North Eastern', '{"lat": -0.4536, "lon": 39.6401}', 841353),
('Homa Bay', '043', 'Nyanza', '{"lat": -0.5273, "lon": 34.4571}', 1154784),
('Isiolo', '009', 'Eastern', '{"lat": 0.3500, "lon": 37.5833}', 268002),
('Kajiado', '020', 'Rift Valley', '{"lat": -1.8524, "lon": 36.7820}', 1129412),
('Kakamega', '037', 'Western', '{"lat": 0.2827, "lon": 34.7519}', 1864776),
('Kericho', '035', 'Rift Valley', '{"lat": -0.3689, "lon": 35.2863}', 901777),
('Kiambu', '022', 'Central', '{"lat": -1.1714, "lon": 36.8356}', 2395052),
('Kilifi', '002', 'Coast', '{"lat": -3.6305, "lon": 39.8499}', 1109735),
('Kirinyaga', '015', 'Central', '{"lat": -0.7193, "lon": 37.3853}', 610984),
('Kisii', '045', 'Nyanza', '{"lat": -0.6817, "lon": 34.7660}', 1285216),
('Kisumu', '003', 'Nyanza', '{"lat": -0.1022, "lon": 34.7617}', 1155845),
('Kitui', '015', 'Eastern', '{"lat": -1.3718, "lon": 38.0106}', 1131186),
('Kwale', '001', 'Coast', '{"lat": -4.1747, "lon": 39.4521}', 866820),
('Laikipia', '019', 'Rift Valley', '{"lat": 0.2928, "lon": 36.7112}', 518560),
('Lamu', '005', 'Coast', '{"lat": -2.2686, "lon": 40.9020}', 143920),
('Machakos', '017', 'Eastern', '{"lat": -1.5177, "lon": 37.2634}', 1448824),
('Makueni', '018', 'Eastern', '{"lat": -2.3148, "lon": 37.8042}', 1451784),
('Mandera', '009', 'North Eastern', '{"lat": 3.9367, "lon": 41.8673}', 867457),
('Marsabit', '010', 'Northern', '{"lat": 2.3394, "lon": 37.9879}', 459785),
('Meru', '012', 'Eastern', '{"lat": 0.0500, "lon": 37.6500}', 1581500),
('Migori', '044', 'Nyanza', '{"lat": -1.0634, "lon": 34.4731}', 1114652),
('Mombasa', '002', 'Coast', '{"lat": -4.0435, "lon": 39.6682}', 1208333),
('Muranga', '021', 'Central', '{"lat": -0.9321, "lon": 36.9615}', 1163167),
('Nairobi', '001', 'Nairobi Metropolitan', '{"lat": -1.2921, "lon": 36.8219}', 4397073),
('Nakuru', '016', 'Rift Valley', '{"lat": -0.3031, "lon": 36.0800}', 2113629),
('Nandi', '029', 'Rift Valley', '{"lat": 0.4295, "lon": 35.1630}', 888435),
('Narok', '032', 'Rift Valley', '{"lat": -1.0789, "lon": 35.8604}', 1158292),
('Nyamira', '046', 'Nyanza', '{"lat": -0.5633, "lon": 34.9565}', 605576),
('Nyandarua', '018', 'Central', '{"lat": -0.5929, "lon": 36.4335}', 638289),
('Nyeri', '020', 'Central', '{"lat": -0.4197, "lon": 36.9553}', 759164),
('Samburu', '023', 'Rift Valley', '{"lat": 1.3000, "lon": 36.7000}', 223947),
('Siaya', '042', 'Nyanza', '{"lat": -0.0618, "lon": 34.2880}', 993185),
('Taita Taveta', '006', 'Coast', '{"lat": -3.3960, "lon": 38.5561}', 340671),
('Tana River', '004', 'Coast', '{"lat": -1.5833, "lon": 40.0000}', 315943),
('Tharaka-Nithi', '013', 'Eastern', '{"lat": -0.2500, "lon": 37.6667}', 393177),
('Trans Nzoia', '026', 'Rift Valley', '{"lat": 1.0167, "lon": 35.0333}', 1152383),
('Turkana', '031', 'Rift Valley', '{"lat": 3.1167, "lon": 35.5833}', 926976),
('Uasin Gishu', '027', 'Rift Valley', '{"lat": 0.5167, "lon": 35.2833}', 1163583),
('Vihiga', '040', 'Western', '{"lat": 0.0500, "lon": 34.7333}', 590013),
('Wajir', '008', 'North Eastern', '{"lat": 1.7501, "lon": 40.0573}', 865240),
('West Pokot', '025', 'Rift Valley', '{"lat": 1.6806, "lon": 35.3611}', 620227);

-- ============================================================================
-- SECTION 2: BUDGET SECTORS
-- ============================================================================

INSERT INTO sectors (name, description, color_code, sort_order) VALUES
('Education', 'Ministry of Education, universities, TVET, and primary/secondary schools', '#3B82F6', 1),
('Healthcare', 'Ministry of Health, hospitals, clinics, and public health programs', '#EF4444', 2),
('Infrastructure', 'Roads, bridges, public buildings, water, and sanitation', '#10B981', 3),
('Agriculture', 'Farming, livestock, fisheries, and food security programs', '#F59E0B', 4),
('Public Administration', 'Government operations, salaries, and administration', '#8B5CF6', 5),
('Security', 'Police, military, prisons, and national security', '#EC4899', 6),
('Environment', 'Environmental protection, climate change, and natural resources', '#059669', 7),
('Social Protection', 'Pensions, social safety nets, and welfare programs', '#6366F1', 8),
('Trade & Industry', 'Manufacturing, trade promotion, SME support', '#F97316', 9),
('Sports & Culture', 'Sports development, arts, and cultural preservation', '#84CC16', 10),
('Energy', 'Electricity, renewable energy, and power infrastructure', '#DC2626', 11),
('ICT', 'Technology, telecommunications, and digital economy', '#7C3AED', 12),
('Tourism', 'Wildlife, hospitality, and tourism promotion', '#0891B2', 13),
('Housing', 'Public housing and urban development', '#BE185D', 14),
('Devolution', 'County governments and devolved funds', '#4B5563', 15);

-- ============================================================================
-- SECTION 3: FISCAL YEARS
-- ============================================================================

INSERT INTO fiscal_years (year, start_date, end_date, description, is_current) VALUES
(2018, '2017-07-01', '2018-06-30', 'FY 2017/2018', FALSE),
(2019, '2018-07-01', '2019-06-30', 'FY 2018/2019', FALSE),
(2020, '2019-07-01', '2020-06-30', 'FY 2019/2020', FALSE),
(2021, '2020-07-01', '2021-06-30', 'FY 2020/2021', FALSE),
(2022, '2021-07-01', '2022-06-30', 'FY 2021/2022', FALSE),
(2023, '2022-07-01', '2023-06-30', 'FY 2022/2023', FALSE),
(2024, '2023-07-01', '2024-06-30', 'FY 2023/2024', TRUE),
(2025, '2024-07-01', '2025-06-30', 'FY 2024/2025', FALSE);

-- ============================================================================
-- SECTION 4: SAMPLE BUDGET ALLOCATIONS (National)
-- ============================================================================

-- FY 2024/2025 National Budget
INSERT INTO budget_allocations (fiscal_year_id, sector_id, county_id, level, budgeted_amount, actual_spent, source) VALUES
(7, 1, NULL, 'national', 65000000000.00, NULL, 'National Treasury'),
(7, 2, NULL, 'national', 45000000000.00, NULL, 'National Treasury'),
(7, 3, NULL, 'national', 38000000000.00, NULL, 'National Treasury'),
(7, 4, NULL, 'national', 25000000000.00, NULL, 'National Treasury'),
(7, 5, NULL, 'national', 18000000000.00, NULL, 'National Treasury'),
(7, 6, NULL, 'national', 12000000000.00, NULL, 'National Treasury'),
(7, 7, NULL, 'national', 8000000000.00, NULL, 'National Treasury'),
(7, 8, NULL, 'national', 6500000000.00, NULL, 'National Treasury'),
(7, 9, NULL, 'national', 5000000000.00, NULL, 'National Treasury'),
(7, 10, NULL, 'national', 3500000000.00, NULL, 'National Treasury'),
(7, 11, NULL, 'national', 6000000000.00, NULL, 'National Treasury'),
(7, 12, NULL, 'national', 4000000000.00, NULL, 'National Treasury'),
(7, 13, NULL, 'national', 3000000000.00, NULL, 'National Treasury');

-- FY 2023/2024 National Budget (Complete)
INSERT INTO budget_allocations (fiscal_year_id, sector_id, county_id, level, budgeted_amount, actual_spent, source) VALUES
(6, 1, NULL, 'national', 62000000000.00, 59500000000.00, 'National Treasury'),
(6, 2, NULL, 'national', 43000000000.00, 41500000000.00, 'National Treasury'),
(6, 3, NULL, 'national', 35000000000.00, 32000000000.00, 'National Treasury'),
(6, 4, NULL, 'national', 24000000000.00, 23500000000.00, 'National Treasury'),
(6, 5, NULL, 'national', 17000000000.00, 16800000000.00, 'National Treasury'),
(6, 6, NULL, 'national', 11000000000.00, 10800000000.00, 'National Treasury'),
(6, 7, NULL, 'national', 7500000000.00, 7200000000.00, 'National Treasury'),
(6, 8, NULL, 'national', 6000000000.00, 5800000000.00, 'National Treasury'),
(6, 9, NULL, 'national', 4500000000.00, 4300000000.00, 'National Treasury'),
(6, 10, NULL, 'national', 3200000000.00, 3000000000.00, 'National Treasury');

-- FY 2022/2023 National Budget
INSERT INTO budget_allocations (fiscal_year_id, sector_id, county_id, level, budgeted_amount, actual_spent, source) VALUES
(5, 1, NULL, 'national', 58000000000.00, 56000000000.00, 'National Treasury'),
(5, 2, NULL, 'national', 40000000000.00, 39000000000.00, 'National Treasury'),
(5, 3, NULL, 'national', 32000000000.00, 29000000000.00, 'National Treasury'),
(5, 4, NULL, 'national', 22000000000.00, 21500000000.00, 'National Treasury'),
(5, 5, NULL, 'national', 15000000000.00, 14800000000.00, 'National Treasury');

-- ============================================================================
-- SECTION 5: SAMPLE COUNTY BUDGET ALLOCATIONS
-- ============================================================================

-- Nairobi County FY 2024/2025
INSERT INTO budget_allocations (fiscal_year_id, sector_id, county_id, level, budgeted_amount, actual_spent, source) VALUES
(7, 1, 1, 'county', 15000000000.00, NULL, 'Nairobi County Treasury'),
(7, 2, 1, 'county', 8000000000.00, NULL, 'Nairobi County Treasury'),
(7, 3, 1, 'county', 12000000000.00, NULL, 'Nairobi County Treasury'),
(7, 4, 1, 'county', 2000000000.00, NULL, 'Nairobi County Treasury'),
(7, 10, 1, 'county', 1500000000.00, NULL, 'Nairobi County Treasury');

-- Mombasa County FY 2024/2025
INSERT INTO budget_allocations (fiscal_year_id, sector_id, county_id, level, budgeted_amount, actual_spent, source) VALUES
(7, 1, 2, 'county', 4000000000.00, NULL, 'Mombasa County Treasury'),
(7, 2, 2, 'county', 2500000000.00, NULL, 'Mombasa County Treasury'),
(7, 3, 2, 'county', 3500000000.00, NULL, 'Mombasa County Treasury'),
(7, 13, 2, 'county', 2000000000.00, NULL, 'Mombasa County Treasury');

-- Kisumu County FY 2024/2025
INSERT INTO budget_allocations (fiscal_year_id, sector_id, county_id, level, budgeted_amount, actual_spent, source) VALUES
(7, 1, 3, 'county', 3500000000.00, NULL, 'Kisumu County Treasury'),
(7, 2, 3, 'county', 2000000000.00, NULL, 'Kisumu County Treasury'),
(7, 3, 3, 'county', 2800000000.00, NULL, 'Kisumu County Treasury'),
(7, 4, 3, 'county', 1800000000.00, NULL, 'Kisumu County Treasury');

-- Nakuru County FY 2024/2025
INSERT INTO budget_allocations (fiscal_year_id, sector_id, county_id, level, budgeted_amount, actual_spent, source) VALUES
(7, 1, 4, 'county', 5000000000.00, NULL, 'Nakuru County Treasury'),
(7, 2, 4, 'county', 3000000000.00, NULL, 'Nakuru County Treasury'),
(7, 3, 4, 'county', 4000000000.00, NULL, 'Nakuru County Treasury');

-- Kiambu County FY 2024/2025
INSERT INTO budget_allocations (fiscal_year_id, sector_id, county_id, level, budgeted_amount, actual_spent, source) VALUES
(7, 1, 5, 'county', 6000000000.00, NULL, 'Kiambu County Treasury'),
(7, 2, 5, 'county', 3500000000.00, NULL, 'Kiambu County Treasury'),
(7, 3, 5, 'county', 4500000000.00, NULL, 'Kiambu County Treasury');

-- ============================================================================
-- SECTION 6: SAMPLE USERS
-- ============================================================================

INSERT INTO users (email, name, role, preferences, subscribed_at) VALUES
('admin@budgetndio.co.ke', 'Admin User', 'admin', '{"interests": ["education", "health", "infrastructure"], "notifications": true}', CURRENT_TIMESTAMP),
('researcher@budgetndio.co.ke', 'Dr. Jane Wanjiku', 'researcher', '{"interests": ["agriculture", "environment"], "notifications": false}', CURRENT_TIMESTAMP - INTERVAL '10 days'),
('journalist@nation.co.ke', 'John Ochieng', 'journalist', '{"interests": ["public_administration", "security"], "notifications": true}', CURRENT_TIMESTAMP - INTERVAL '20 days'),
('citizen@example.com', 'Samuel Mwangi', 'citizen', '{"interests": ["education", "health"], "notifications": true}', CURRENT_TIMESTAMP - INTERVAL '5 days'),
('youth@example.com', 'Grace Akinyi', 'citizen', '{"interests": ["sports_culture", "trade"], "notifications": false}', CURRENT_TIMESTAMP - INTERVAL '3 days'),
('student@strathmore.edu', 'Michael Odhiambo', 'citizen', '{"interests": ["all"], "notifications": true}', CURRENT_TIMESTAMP - INTERVAL '7 days');

-- ============================================================================
-- SECTION 7: SAMPLE CONTENTS
-- ============================================================================

-- Articles
INSERT INTO contents (type, title, slug, description, category, status, published_at, author, views, featured, tags, content_body) VALUES
('article', 'Understanding Kenya''s National Budget Process', 'understanding-national-budget-process', 'A comprehensive guide to how Kenya''s national budget is created, approved, and implemented.', 'national_budget', 'published', CURRENT_TIMESTAMP - INTERVAL '5 days', 'Dr. Jane Wanjiku', 1250, TRUE, ARRAY['budget', 'national', 'education'], 
'## Introduction

The national budget is one of the most important tools the government uses to deliver services to citizens. Understanding how it works is crucial for civic engagement.

## Budget Cycle

Kenya''s budget cycle follows these key stages:

1. **Budget Preparation**: July - February
2. **Parliament Approval**: March - June
3. **Implementation**: July - June
4. **Audit and Review**: Ongoing

## Conclusion

Understanding the budget process empowers citizens to hold their leaders accountable.'),

('article', 'Where Does Your Tax Money Go?', 'where-tax-money-goes', 'An in-depth look at how tax revenues are allocated across different government sectors.', 'tax_education', 'published', CURRENT_TIMESTAMP - INTERVAL '10 days', 'John Ochieng', 890, TRUE, ARRAY['tax', 'revenue', 'sectors'],
'## Where Your Money Goes

Every Kenyan who pays taxes contributes to national development. But where does this money actually go?

## Sector Allocations

In the current fiscal year, the largest allocations are:

- **Education**: KSh 65 billion
- **Healthcare**: KSh 45 billion
- **Infrastructure**: KSh 38 billion

## Conclusion

Understanding these allocations helps citizens engage with budget processes.'),

('article', 'County Budgets Explained: What You Need to Know', 'county-budgets-explained', 'A guide to understanding how county governments spend your money.', 'county_budget', 'published', CURRENT_TIMESTAMP - INTERVAL '3 days', 'Budget Team', 567, FALSE, ARRAY['county', 'devolution', 'local_government'],
'## Introduction

Since devolution in 2013, county governments have gained significant budget responsibilities. This guide explains how county budgets work.'),

('article', 'The Role of Youth in Budget Participation', 'youth-budget-participation', 'How young Kenyans can participate in budget processes and influence government spending.', 'civic_engagement', 'published', CURRENT_TIMESTAMP - INTERVAL '7 days', 'Grace Akinyi', 423, TRUE, ARRAY['youth', 'participation', 'civic'],
'## Why Youth Participation Matters

Youth make up over 60% of Kenya''s population, yet they are often underrepresented in budget discussions.'),

-- Podcasts
INSERT INTO contents (type, title, slug, description, category, status, published_at, author, views, featured, duration_seconds, tags) VALUES
('podcast', 'Budget Basics Episode 1: Introduction to Public Finance', 'budget-basics-ep1', 'An introductory episode explaining the fundamentals of public finance in Kenya.', 'national_budget', 'published', CURRENT_TIMESTAMP - INTERVAL '2 days', 'Podcast Team', 234, TRUE, 1200, ARRAY['podcast', 'basics', 'public_finance']),
('podcast', 'Episode 2: Understanding Sector Allocations', 'budget-basics-ep2', 'Deep dive into how different sectors receive budget allocations.', 'national_budget', 'published', CURRENT_TIMESTAMP - INTERVAL '9 days', 'Podcast Team', 189, FALSE, 1450, ARRAY['podcast', 'sectors', 'allocations']),
('podcast', 'Episode 3: County Budgets Unpacked', 'county-budgets-podcast', 'Understanding how county governments manage their budgets.', 'county_budget', 'published', CURRENT_TIMESTAMP - INTERVAL '16 days', 'Podcast Team', 156, FALSE, 1300, ARRAY['podcast', 'county', 'devolution']);

-- Videos
INSERT INTO contents (type, title, slug, description, category, status, published_at, author, views, featured, duration_seconds, tags) VALUES
('video', '5-Minute Budget Overview', '5-minute-budget-overview', 'Quick visual explainer on how Kenya''s national budget works.', 'national_budget', 'published', CURRENT_TIMESTAMP - INTERVAL '1 day', 'Video Team', 3450, TRUE, 300, ARRAY['video', 'animation', 'overview']),
('video', 'Understanding Taxes in 3 Minutes', 'understanding-taxes-video', 'Short animated video explaining the Kenyan tax system.', 'tax_education', 'published', CURRENT_TIMESTAMP - INTERVAL '8 days', 'Video Team', 2120, TRUE, 180, ARRAY['video', 'tax', 'animation']),
('video', 'County Budget Journey', 'county-budget-journey', 'Follow the journey of county budget from planning to implementation.', 'county_budget', 'published', CURRENT_TIMESTAMP - INTERVAL '15 days', 'Video Team', 890, FALSE, 420, ARRAY['video', 'county', 'documentary']);

-- Explainers
INSERT INTO contents (type, title, slug, description, category, status, published_at, author, views, featured, tags) VALUES
('explainer', 'What is the Budget?', 'what-is-budget-explainer', 'Simple explanation of what a budget is and why it matters.', 'national_budget', 'published', CURRENT_TIMESTAMP - INTERVAL '30 days', 'Budget Team', 5670, TRUE, ARRAY['explainer', 'basics', 'beginner']),
('explainer', 'Understanding Budget Terms', 'budget-terms-glossary', 'A glossary of common budget and finance terms used in Kenya.', 'national_budget', 'published', CURRENT_TIMESTAMP - INTERVAL '25 days', 'Budget Team', 2340, FALSE, ARRAY['explainer', 'glossary', 'terms']),
('explainer', 'How Bills Become Budget', 'how-bills-become-budget', 'The process through which proposals become part of the national budget.', 'policy_impact', 'published', CURRENT_TIMESTAMP - INTERVAL '20 days', 'Budget Team', 1230, FALSE, ARRAY['explainer', 'process', 'legislation']);

-- ============================================================================
-- SECTION 8: PODCAST EPISODES DETAILS
-- ============================================================================

INSERT INTO podcast_episodes (content_id, episode_number, season_number, duration_seconds, audio_url, transcript, guests, shownotes) VALUES
(7, 1, 1, 1200, 'https://cdn.budgetndio.co.ke/podcasts/ep1_budget_basics.mp3', 
'Welcome to Budget Basics! Today we will discuss the fundamentals of public finance in Kenya...

This episode covers:
- What is public finance?
- Sources of government revenue
- Types of government spending
- The role of citizens in budget processes', 
'[]',
'## Show Notes
- Visit treasury.go.ke for official budget documents
- Join our next public participation session'),
(8, 2, 1, 1450, 'https://cdn.budgetndio.co.ke/podcasts/ep2_sector_allocations.mp3',
'In this episode, we explore how different sectors receive their budget allocations...

We speak with officials from the Ministry of Education and Ministry of Health.',
'[{"name": "Sarah Njoroge", "role": "Budget Analyst", "organization": "Ministry of Finance"}]',
'## Show Notes
- Education sector received KSh 65 billion this year'),
(9, 3, 1, 1300, 'https://cdn.budgetndio.co.ke/podcasts/ep3_county_budgets.mp3',
'County governments have become increasingly important since devolution. Let''s explore how they manage their budgets...',
'[]',
'## Show Notes
- Learn more about your county''s budget at county website');

-- ============================================================================
-- SECTION 9: VIDEO EPISODES DETAILS
-- ============================================================================

INSERT INTO video_episodes (content_id, duration_seconds, video_url, embed_url, resolution, subtitles, transcript) VALUES
(10, 300, 'https://cdn.budgetndio.co.ke/videos/5min_budget_overview.mp4', 'https://youtube.com/embed/xxx_overview', '1080p', 
'{"en": "https://cdn.budgetndio.co.ke/videos/subtitles/5min_overview_en.vtt", "sw": "https://cdn.budgetndio.co.ke/videos/subtitles/5min_overview_sw.vtt"}',
'Full video transcript here...'),
(11, 180, 'https://cdn.budgetndio.co.ke/videos/understanding_taxes.mp4', 'https://youtube.com/embed/xxx_taxes', '1080p',
'{"en": "https://cdn.budgetndio.co.ke/videos/subtitles/taxes_en.vtt"}',
'Full video transcript here...'),
(12, 420, 'https://cdn.budgetndio.co.ke/videos/county_budget_journey.mp4', 'https://youtube.com/embed/xxx_county', '1080p',
'{"en": "https://cdn.budgetndio.co.ke/videos/subtitles/county_journey_en.vtt", "sw": "https://cdn.budgetndio.co.ke/videos/subtitles/county_journey_sw.vtt"}',
'Full video transcript here...');

-- ============================================================================
-- SECTION 10: SAMPLE FAQS
-- ============================================================================

INSERT INTO faqs (question, answer, category, sort_order) VALUES
('How accurate is this budget data?', 'We source our data from official government budget documents, procurement records, and public spending reports. We then verify this information through field visits and community interviews. While we strive for accuracy, we recommend cross-referencing with official sources for critical decisions.', 'general', 1),
('How often is the tracker updated?', 'We update the tracker within 2 weeks of new budget releases from the National Treasury or County governments. Major updates typically occur during the budget reading (June) and mid-year review (January).', 'tracker', 2),
('Can I download the data?', 'Yes! All our data is available for download in CSV format for research and civic engagement purposes. Click the "Export Data" button on any tracker page to download.', 'tracker', 3),
('Is this data free to use?', 'Yes, all our educational content and budget data is freely available for non-commercial use. Please cite "Budget Ndio Story" as your source when using our data.', 'general', 4),
('How can I use this data?', 'You can use our budget data for research, journalism, advocacy, and educational purposes. Many journalists, researchers, and civil society organizations use our data for stories and reports. Contact us if you need assistance.', 'general', 5),
('How does the budget process work?', 'Kenya''s budget process involves several stages: preparation by the National Treasury, approval by Parliament, implementation by government agencies, and audit by the Office of the Auditor General. Citizens can participate during the public participation phase.', 'process', 6),
('What is devolution?', 'Devolution is the transfer of government powers and resources from the national government to county governments. This was implemented in 2013 following the new constitution. Each of Kenya''s 47 counties now has its own budget and government.', 'county', 7),
('How can I participate in budget discussions?', 'You can participate through: 1) Attending public participation forums organized by Parliament and county governments, 2) Submitting written memoranda on budget proposals, 3) Engaging with your elected representatives, 4) Using our platform to learn and share information.', 'participation', 8),
('What is the difference between national and county budgets?', 'The national budget covers government-wide expenses like defense, foreign affairs, and national infrastructure. County budgets cover local services like county roads, health centers, and waste management. Both are part of Kenya''s decentralized system.', 'county', 9),
('How is the budget audited?', 'The Office of the Auditor General audits the national budget annually. This audit examines whether funds were used as intended and provides reports to Parliament and the public. County budgets are also audited by the same office.', 'process', 10);

-- ============================================================================
-- SECTION 11: NEWSLETTER SUBSCRIPTIONS
-- ============================================================================

INSERT INTO newsletter_subscriptions (email, name, interests, is_active, source) VALUES
('citizen@example.com', 'John Citizen', ARRAY['education', 'health'], TRUE, 'website'),
('youth@example.com', 'Youth Leader', ARRAY['civic_engagement', 'participation'], TRUE, 'tiktok'),
('teacher@school.co.ke', 'Teacher Mary', ARRAY['education', 'tax_education'], TRUE, 'school'),
('research@university.ac.ke', 'Prof. Smith', ARRAY['all'], TRUE, 'academic'),
('activist@ong.ke', 'Activist Jane', ARRAY['policy_impact', 'county_budget'], TRUE, 'facebook'),
('journalist@media.co.ke', 'News Reporter', ARRAY['all'], FALSE, 'twitter'),
('business@company.co.ke', 'Business Owner', ARRAY['trade', 'tax_education'], TRUE, 'website'),
('student@university.ac.ke', 'Student Kevin', ARRAY['civic_engagement'], TRUE, 'instagram');

-- ============================================================================
-- SECTION 12: ENGAGEMENTS
-- ============================================================================

INSERT INTO engagements (user_id, type, details, ip_address, user_agent, created_at) VALUES
(4, 'contact_form', '{"subject": "Budget Question", "message": "How can I access county budget data?"}', '197.232.1.1', 'Mozilla/5.0', CURRENT_TIMESTAMP - INTERVAL '2 days'),
(4, 'newsletter_signup', '{"source": "tiktok"}', '197.232.1.2', 'Mozilla/5.0', CURRENT_TIMESTAMP - INTERVAL '10 days'),
(5, 'faq_view', '{"question_id": 7}', '197.232.1.3', 'Mozilla/5.0', CURRENT_TIMESTAMP - INTERVAL '1 day'),
(4, 'social_share', '{"platform": "twitter", "content_id": 10}', '197.232.1.4', 'Mozilla/5.0', CURRENT_TIMESTAMP - INTERVAL '3 days'),
(NULL, 'newsletter_signup', '{"source": "website"}', '197.232.1.5', 'Mozilla/5.0', CURRENT_TIMESTAMP - INTERVAL '5 days'),
(NULL, 'content_download', '{"content_id": 1, "format": "pdf"}', '197.232.1.6', 'Mozilla/5.0', CURRENT_TIMESTAMP - INTERVAL '6 days');

-- ============================================================================
-- SECTION 13: ANALYTICS SAMPLE DATA
-- ============================================================================

-- Generate sample analytics data for the past 30 days
INSERT INTO analytics_logs (user_id, session_id, content_id, event_type, event_data, duration, page_url, device_type, browser, os, country, timestamp)
SELECT 
    CASE WHEN random() > 0.7 THEN (SELECT id FROM users ORDER BY random() LIMIT 1) ELSE NULL END,
    md5(random()::text) || md5(random()::text) || md5(random()::text),
    (SELECT id FROM contents ORDER BY random() LIMIT 1),
    (ARRAY['view', 'view', 'view', 'download', 'listen', 'watch', 'search'])[floor(random() * 7 + 1)::int],
    '{}'::jsonb,
    (random() * 600)::int * '1 second'::interval,
    '/budget/simplified',
    (ARRAY['desktop', 'mobile', 'tablet'])[floor(random() * 3 + 1)::int],
    (ARRAY['Chrome', 'Firefox', 'Safari', 'Edge'])[floor(random() * 4 + 1)::int],
    (ARRAY['Windows', 'macOS', 'Android', 'iOS'])[floor(random() * 4 + 1)::int],
    'KE',
    CURRENT_TIMESTAMP - (random() * 30)::int * '1 day'::interval
FROM generate_series(1, 500);

-- ============================================================================
-- SECTION 14: DATA SOURCES
-- ============================================================================

INSERT INTO data_sources (name, description, source_type, url, last_fetched) VALUES
('National Treasury', 'Official Kenya National Treasury - source of national budget data', 'government', 'https://www.treasury.go.ke', CURRENT_TIMESTAMP - INTERVAL '1 day'),
('Kenya Revenue Authority', 'Tax revenue and customs data', 'government', 'https://www.kra.go.ke', CURRENT_TIMESTAMP - INTERVAL '2 days'),
('World Bank Kenya Data', 'International economic and budget indicators', 'international', 'https://data.worldbank.org/country/kenya', CURRENT_TIMESTAMP - INTERVAL '7 days'),
('Open Government Partnership', 'Open budget initiatives and transparency data', 'organization', 'https://www.ogp.go.ke', CURRENT_TIMESTAMP - INTERVAL '3 days'),
('IMF Kenya', 'International Monetary Fund Kenya reports', 'international', 'https://www.imf.org/en/Countries/KEN', CURRENT_TIMESTAMP - INTERVAL '14 days'),
('County Treasuries', 'Aggregated data from 47 county treasuries', 'government', 'https://counties.go.ke', CURRENT_TIMESTAMP - INTERVAL '5 days');

-- ============================================================================
-- SECTION 15: SYSTEM CONFIGURATION
-- ============================================================================

INSERT INTO system_config (config_key, config_value, description) VALUES
('site_name', 'Budget Ndio Story', 'Website name displayed in headers'),
('tagline', 'Making Kenya''s Budget Understandable', 'Site tagline'),
('default_language', 'en', 'Default language for content'),
('items_per_page', '12', 'Items per page for pagination'),
('analytics_retention_days', '90', 'Days to retain detailed analytics'),
('cache_budget_minutes', '60', 'Cache budget data for 60 minutes'),
('enable_newsletter', 'true', 'Enable newsletter subscription'),
('enable_comments', 'true', 'Enable content comments'),
('posts_per_page_home', '6', 'Number of posts on homepage'),
('featured_content_limit', '5', 'Number of featured content items'),
('max_export_rows', '10000', 'Maximum rows for data export'),
('enable_search', 'true', 'Enable site search'),
('search_min_length', '3', 'Minimum characters for search'),
('social_facebook', 'https://facebook.com/budgetndio', 'Facebook page URL'),
('social_twitter', 'https://twitter.com/budgetndio', 'Twitter handle'),
('social_instagram', 'https://instagram.com/budgetndio', 'Instagram handle'),
('contact_email', 'hello@budgetndio.co.ke', 'Contact email address'),
('about_text', 'Budget Ndio Story is a civic engagement platform...', 'About page text');

-- ============================================================================
-- SECTION 16: CONTENT RELATIONSHIPS
-- ============================================================================

INSERT INTO content_relationships (content_id, related_content_id, relationship_type) VALUES
(1, 2, 'related'),
(1, 7, 'related'),
(2, 1, 'related'),
(7, 1, 'related'),
(7, 8, 'series'),
(8, 7, 'series'),
(8, 9, 'series'),
(10, 1, 'related'),
(11, 2, 'related'),
(12, 3, 'related'),
(13, 1, 'related'),
(13, 7, 'related'),
(14, 3, 'related');

-- ============================================================================
-- SECTION 17: SAMPLE TRANSLATIONS
-- ============================================================================

INSERT INTO translations (content_id, language, translated_title, translated_body, translated_description, translated_tags) VALUES
(1, 'sw', 'Kuelewa Mchakato wa Bajeti ya Taifa', '## Utangulizi

Bajeti ya taifa ni moja ya zana muhimu zaidi serikali inazotumia kutoa huduma kwa raia. Kuelewa jinsi inavyofanya kazi ni muhimu kushiriki kwa raia.

## Mzunguko wa Bajeti

Mchakato wa bajeti ya Kenya unafuata hatua muhimu:

1. **Uandaaji wa Bajeti**: Julai - Februari
2. **Kuidhinishwa na Bunge**: Machi - Juni
3. **Utekelezaji**: Julai - Juni
4. **Ukaguzi na Mapitio**: Endelevu

## Hitimisho

Kuelewa mchakato wa bajetiinawezesha raia kuwa na ulinzi wa viongozi wao.', 'Mwongozo wa kina juu ya jinsi bajeti ya taifa ya Kenya inavyoundwa, kuidhinishwa, na kutekelezwa.', ARRAY['bajeti', 'taifa', 'elimu']),
(2, 'sw', 'Pesa Zako Za Kodi Zinaenda Wapi?', '## Pesa Zako Zinaenda Wapi

Kila Mkenya anayelipa kodiachangia maendeleo ya taifa. Lakini pesa hizi zinaenda wapi?', 'Mwongozo wa kina juu ya jinsi mapato ya kodi yanavyogawanywa katika sekta mbalimbali za serikali.', ARRAY['kodi', 'mapato', 'sektta']);

-- ============================================================================
-- SECTION 18: SEARCH HISTORY
-- ============================================================================

INSERT INTO search_history (user_id, session_id, query, results_count, clicked_content_id, created_at) VALUES
(4, md5(random()::text), 'education budget', 12, 1, CURRENT_TIMESTAMP - INTERVAL '1 hour'),
(4, md5(random()::text), 'county spending', 8, 3, CURRENT_TIMESTAMP - INTERVAL '2 hours'),
(5, md5(random()::text), 'tax explained', 5, 2, CURRENT_TIMESTAMP - INTERVAL '3 hours'),
(NULL, md5(random()::text), 'how budget works', 15, 13, CURRENT_TIMESTAMP - INTERVAL '4 hours'),
(NULL, md5(random()::text), 'nairobi county budget', 7, NULL, CURRENT_TIMESTAMP - INTERVAL '5 hours');

-- ============================================================================
-- SECTION 19: MEDIA LIBRARY SAMPLE
-- ============================================================================

INSERT INTO media_library (filename, original_filename, mime_type, size_bytes, url, alt_text, caption) VALUES
('budget_infographic_2024.png', 'Budget Infographic 2024', 'image/png', 245000, 'https://cdn.budgetndio.co.ke/media/budget_infographic_2024.png', 'Kenya Budget 2024 Infographic', 'Annual budget breakdown infographic'),
('sector_allocation_chart.svg', 'Sector Allocation Chart', 'image/svg+xml', 45000, 'https://cdn.budgetndio.co.ke/media/sector_allocation_chart.svg', 'Budget allocation by sector', 'Interactive chart showing budget allocations'),
('podcast_cover_ep1.jpg', 'Podcast Episode 1 Cover', 'image/jpeg', 125000, 'https://cdn.budgetndio.co.ke/media/podcast_cover_ep1.jpg', 'Budget Basics Podcast Cover', 'First episode cover art'),
('video_thumbnail_5min.jpg', '5 Minute Budget Overview Thumbnail', 'image/jpeg', 89000, 'https://cdn.budgetndio.co.ke/media/video_thumbnail_5min.jpg', '5 Minute Budget Overview', 'Video thumbnail for budget overview'),
('county_map_kenya.png', 'Kenya County Map', 'image/png', 567000, 'https://cdn.budgetndio.co.ke/media/county_map_kenya.png', 'Kenya County Map', 'Interactive map showing all 47 counties');

-- ============================================================================
-- SECTION 20: CONTACT FORM SUBMISSIONS
-- ============================================================================

INSERT INTO contact_submissions (name, email, subject, message, status, assigned_to) VALUES
('Mary Wanjiku', 'mary@example.com', 'Question about education budget', 'I would like to know more about the education budget for FY 2024/2025. Specifically, how much is allocated to public universities?', 'new', NULL),
('Robert Otieno', 'robert@example.com', 'Partnership inquiry', 'We are an NGO working on civic education and would like to partner with Budget Ndio Story for upcoming workshops.', 'in_progress', 1),
('Sarah Kamau', 'sarah@example.com', 'Data request', 'I am a researcher requesting access to historical budget data for my dissertation on Kenyan public finance.', 'resolved', NULL),
('James Mwangi', 'james@example.com', 'Correction request', 'I noticed what appears to be an error in the county allocation data for Nakuru County.', 'in_progress', 2);

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check record counts
SELECT 'users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'sectors', COUNT(*) FROM sectors
UNION ALL
SELECT 'counties', COUNT(*) FROM counties
UNION ALL
SELECT 'fiscal_years', COUNT(*) FROM fiscal_years
UNION ALL
SELECT 'budget_allocations', COUNT(*) FROM budget_allocations
UNION ALL
SELECT 'contents', COUNT(*) FROM contents
UNION ALL
SELECT 'faqs', COUNT(*) FROM faqs
UNION ALL
SELECT 'analytics_logs', COUNT(*) FROM analytics_logs;

-- Show sample budget data
SELECT 
    fy.year,
    s.name as sector,
    ba.level,
    ba.budgeted_amount,
    ba.actual_spent
FROM budget_allocations ba
JOIN fiscal_years fy ON ba.fiscal_year_id = fy.id
JOIN sectors s ON ba.sector_id = s.id
WHERE fy.year = 2024
ORDER BY ba.level, s.sort_order;

-- ============================================================================
-- END OF SEED DATA
-- ============================================================================
