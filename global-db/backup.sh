TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_DIR="/vm-root/global-db/backup/dumps"
mkdir -p "$BACKUP_DIR"

# List of DBs to back up
DATABASES=(
  dev_db_project_mern
  staging_db_project_mern
  prod_db_project_mern
  dev_db_project_next
  staging_db_project_next
  prod_db_project_next
)

for DB in "${DATABASES[@]}"
do
  docker exec -t global-postgres pg_dump -U root "$DB" > "$BACKUP_DIR/${DB}_$TIMESTAMP.sql"
  echo "✅ Backed up $DB"
done


## 🧪 CRON Job Example (optional)

# Add this to crontab via `crontab -e`
# Backup every night at 2am
0 2 * * * /bin/bash /vm-root/global-db/backup/backup.sh >> /vm-root/global-db/backup/cron.log 2>&1