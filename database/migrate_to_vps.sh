#!/bin/bash
# =============================================================================
# Budget Ndio Story - Neon to VPS Migration Script
# =============================================================================
# Usage: ./migrate_to_vps.sh [--dry-run] [--skip-backup]
# =============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="./backups"
NEON_URL="${NEON_DATABASE_URL}"
VPS_HOST="${VPS_HOST:-localhost}"
VPS_PORT="${VPS_PORT:-5432}"
VPS_DB="${VPS_DB:-budget_db}"
VPS_USER="${VPS_USER:-budget_user}"

# Parse arguments
DRY_RUN=false
SKIP_BACKUP=false

for arg in "$@"; do
    case $arg in
        --dry-run)
            DRY_RUN=true
            ;;
        --skip-backup)
            SKIP_BACKUP=true
            ;;
    esac
done

echo_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

echo_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

echo_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# =============================================================================
# STEP 1: Pre-Migration Checks
# =============================================================================
pre_migration_checks() {
    echo_info "Running pre-migration checks..."

    # Check if Neon URL is set
    if [ -z "$NEON_URL" ]; then
        echo_error "NEON_DATABASE_URL environment variable not set"
        echo "Please set it: export NEON_DATABASE_URL='postgresql://user:pass@host/db'"
        exit 1
    fi

    # Check if psql is available
    if ! command -v psql &> /dev/null; then
        echo_error "psql is not installed. Please install PostgreSQL client."
        exit 1
    fi

    # Check if pg_dump is available
    if ! command -v pg_dump &> /dev/null; then
        echo_error "pg_dump is not installed. Please install PostgreSQL client."
        exit 1
    fi

    echo_info "Pre-migration checks passed!"
}

# =============================================================================
# STEP 2: Backup Neon Database
# =============================================================================
backup_neon() {
    if [ "$SKIP_BACKUP" = true ]; then
        echo_warn "Skipping backup (--skip-backup flag set)"
        return
    fi

    echo_info "Creating backup of Neon database..."

    mkdir -p "$BACKUP_DIR"

    BACKUP_FILE="$BACKUP_DIR/neon_backup_$TIMESTAMP.sql.gz"

    if [ "$DRY_RUN" = true ]; then
        echo_info "[DRY-RUN] Would run: pg_dump $NEON_URL | gzip > $BACKUP_FILE"
        return
    fi

    # Create backup with compression
    pg_dump "$NEON_URL" | gzip > "$BACKUP_FILE"

    # Verify backup
    if [ -f "$BACKUP_FILE" ]; then
        BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
        echo_info "Backup created: $BACKUP_FILE ($BACKUP_SIZE)"
    else
        echo_error "Backup failed!"
        exit 1
    fi
}

# =============================================================================
# STEP 3: Connect to VPS Database
# =============================================================================
connect_vps() {
    echo_info "Testing connection to VPS database..."

    export PGPASSWORD="${VPS_PASSWORD}"

    if [ "$DRY_RUN" = true ]; then
        echo_info "[DRY-RUN] Would test: psql -h $VPS_HOST -p $VPS_PORT -U $VPS_USER -d $VPS_DB"
        return
    fi

    # Test connection
    if psql -h "$VPS_HOST" -p "$VPS_PORT" -U "$VPS_USER" -d "$VPS_DB" -c "SELECT 1;" &> /dev/null; then
        echo_info "Connection to VPS database successful!"
    else
        echo_error "Failed to connect to VPS database"
        echo "Please check your connection settings"
        exit 1
    fi
}

# =============================================================================
# STEP 4: Create Schema on VPS
# =============================================================================
create_schema() {
    echo_info "Creating optimized schema on VPS..."

    if [ "$DRY_RUN" = true ]; then
        echo_info "[DRY-RUN] Would run: psql -f database/schema_vps_optimized.sql"
        return
    fi

    export PGPASSWORD="${VPS_PASSWORD}"

    psql -h "$VPS_HOST" -p "$VPS_PORT" -U "$VPS_USER" -d "$VPS_DB" \
        -f database/schema_vps_optimized.sql

    echo_info "Schema created successfully!"
}

# =============================================================================
# STEP 5: Migrate Data
# =============================================================================
migrate_data() {
    echo_info "Migrating data from Neon to VPS..."

    if [ "$DRY_RUN" = true ]; then
        echo_info "[DRY-RUN] Would run data migration using migrate_data.sql"
        return
    fi

    export PGPASSWORD="${VPS_PASSWORD}"

    # Run migration script
    psql -h "$VPS_HOST" -p "$VPS_PORT" -U "$VPS_USER" -d "$VPS_DB" \
        -f database/migrate_data.sql

    echo_info "Data migration completed!"
}

# =============================================================================
# STEP 6: Verify Migration
# =============================================================================
verify_migration() {
    echo_info "Verifying migration..."

    if [ "$DRY_RUN" = true ]; then
        echo_info "[DRY-RUN] Would run verification queries"
        return
    fi

    export PGPASSWORD="${VPS_PASSWORD}"

    # Check record counts
    echo "Checking record counts..."
    psql -h "$VPS_HOST" -p "$VPS_PORT" -U "$VPS_USER" -d "$VPS_DB" <<EOF
SELECT 'users' as table_name, COUNT(*) as count FROM users
UNION ALL SELECT 'contents', COUNT(*) FROM contents
UNION ALL SELECT 'sectors', COUNT(*) FROM sectors
UNION ALL SELECT 'fiscal_years', COUNT(*) FROM fiscal_years
UNION ALL SELECT 'counties', COUNT(*) FROM counties
UNION ALL SELECT 'budget_allocations', COUNT(*) FROM budget_allocations
UNION ALL SELECT 'engagements', COUNT(*) FROM engagements
UNION ALL SELECT 'faqs', COUNT(*) FROM faqs;
EOF

    # Check for orphaned records
    echo "Checking for orphaned records..."
    ORPHANED=$(psql -h "$VPS_HOST" -p "$VPS_PORT" -U "$VPS_USER" -d "$VPS_DB" -t -c "
        SELECT COUNT(*) FROM budget_allocations 
        WHERE fiscal_year_id NOT IN (SELECT id FROM fiscal_years);
    ")

    if [ "$ORPHANED" -gt 0 ]; then
        echo_warn "Found $ORPHANED orphaned budget_allocations records"
    else
        echo_info "No orphaned records found"
    fi

    echo_info "Verification complete!"
}

# =============================================================================
# STEP 7: Generate Migration Report
# =============================================================================
generate_report() {
    REPORT_FILE="$BACKUP_DIR/migration_report_$TIMESTAMP.md"

    echo_info "Generating migration report..."

    cat > "$REPORT_FILE" <<EOF
# Migration Report

## Date
$TIMESTAMP

## Source
- Neon Database: $NEON_URL

## Target
- VPS Host: $VPS_HOST:$VPS_PORT
- Database: $VPS_DB
- User: $VPS_USER

## Backup
- File: $BACKUP_DIR/neon_backup_$TIMESTAMP.sql.gz
- Size: $(du -h "$BACKUP_DIR/neon_backup_$TIMESTAMP.sql.gz" 2>/dev/null || echo "N/A")

## Migration Steps Completed
1. Pre-migration checks: PASSED
2. Database backup: COMPLETED
3. VPS connection: VERIFIED
4. Schema creation: COMPLETED
5. Data migration: COMPLETED
6. Verification: COMPLETED

## Record Counts
$(psql -h "$VPS_HOST" -p "$VPS_PORT" -U "$VPS_USER" -d "$VPS_DB" -t <<'SQL'
SELECT 'users' as table_name, COUNT(*) as count FROM users
UNION ALL SELECT 'contents', COUNT(*) FROM contents
UNION ALL SELECT 'sectors', COUNT(*) FROM sectors
UNION ALL SELECT 'fiscal_years', COUNT(*) FROM fiscal_years
UNION ALL SELECT 'counties', COUNT(*) FROM counties
UNION ALL SELECT 'budget_allocations', COUNT(*) FROM budget_allocations
UNION ALL SELECT 'engagements', COUNT(*) FROM engagements
UNION ALL SELECT 'faqs', COUNT(*) FROM faqs;
SQL
)

## Next Steps
1. Update application DATABASE_URL environment variable
2. Run application tests against new database
3. Monitor for any issues
4. Keep backup for 7 days

## Rollback Instructions
To rollback:
1. Restore from backup: gunzip -c $BACKUP_DIR/neon_backup_$TIMESTAMP.sql.gz | psql $NEON_URL
2. Update DATABASE_URL back to Neon
3. Restart application
EOF

    echo_info "Report saved: $REPORT_FILE"
}

# =============================================================================
# MAIN EXECUTION
# =============================================================================
main() {
    echo ""
    echo "=============================================="
    echo "  Budget Ndio Story - Neon to VPS Migration"
    echo "=============================================="
    echo ""

    if [ "$DRY_RUN" = true ]; then
        echo_warn "DRY RUN MODE - No changes will be made"
        echo ""
    fi

    pre_migration_checks
    backup_neon
    connect_vps
    create_schema
    migrate_data
    verify_migration
    generate_report

    echo ""
    echo "=============================================="
    echo -e "${GREEN}Migration completed successfully!${NC}"
    echo "=============================================="
    echo ""
    echo "Next steps:"
    echo "1. Update .env DATABASE_URL to point to VPS"
    echo "2. Test your application"
    echo "3. Monitor for any issues"
    echo ""
}

# Run main function
main "$@"
