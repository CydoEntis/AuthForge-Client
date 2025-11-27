export const SETUP_WIZARD_STEPS = {
  WELCOME: "welcome",
  DOMAIN: "domain",
  SELECT_DB: "selectDatabase",
  SELECT_EMAIL: "selectEmailProvider",
  CREATE_ADMIN: "createAdmin",
  DONE: "done",
} as const;

export const DATABASES = {
  SQLITE: "Sqlite",
  POSTGRESQL: "PostgreSql",
  MYSQL: "MySql",
  MSSQL: "MSSql",
} as const;

import type { AllowedDatabases } from "./setup.types";

type DatabaseDefaults = {
  port: string;
  defaultUser?: string;
  defaultDatabase?: string;
};

export const DATABASE_DEFAULTS: Record<AllowedDatabases, DatabaseDefaults> = {
  Sqlite: {
    port: "",
  },
  PostgreSql: {
    port: "5432",
    defaultUser: "postgres",
    defaultDatabase: "authforge",
  },
  MySql: {
    port: "3306",
    defaultUser: "root",
    defaultDatabase: "authforge",
  },
  MSSql: {
    port: "1433",
    defaultUser: "sa",
    defaultDatabase: "authforge",
  },
} as const;

export const DATABASE_META: Record<
  AllowedDatabases,
  {
    icon: string;
    displayName: string;
    description?: string;
  }
> = {
  Sqlite: {
    icon: "devicon-sqlite-plain",
    displayName: "SQLite",
    description: "Lightweight, no configuration required",
  },
  PostgreSql: {
    icon: "devicon-postgresql-plain",
    displayName: "PostgreSQL",
    description: "Powerful, open-source database",
  },
  MySql: {
    icon: "devicon-mysql-original",
    displayName: "MySQL",
    description: "Popular relational database",
  },
  MSSql: {
    icon: "devicon-microsoftsqlserver-plain",
    displayName: "MS SQL Server",
    description: "Microsoft SQL Server",
  },
} as const;
