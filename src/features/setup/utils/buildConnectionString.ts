import type { AllowedDatabases, DatabaseConfig } from "../setup.types";
import { DATABASES } from "../setup.constants";

export function buildConnectionString(databaseType: AllowedDatabases, config: DatabaseConfig): string {
  switch (databaseType) {
    case DATABASES.SQLITE:
      // SQLite uses a file path
      return "Data Source=app.db";

    case DATABASES.POSTGRESQL:
      return `Host=${config.host};Port=${config.port};Database=${config.database};Username=${config.user};Password=${config.password}`;

    case DATABASES.MYSQL:
      return `Server=${config.host};Port=${config.port};Database=${config.database};Uid=${config.user};Pwd=${config.password}`;

    case DATABASES.MSSQL:
      return `Server=${config.host},${config.port};Database=${config.database};User Id=${config.user};Password=${config.password}`;

    default:
      throw new Error(`Unsupported database type: ${databaseType}`);
  }
}
