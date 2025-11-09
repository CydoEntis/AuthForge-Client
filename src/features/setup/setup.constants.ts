// ======================
//          Setup
// ======================

export const SETUP_WIZARD_STEPS = {
  WELCOME: "welcome",
  SELECT_DB: "selectDatabase",
  SELECT_EMAIL: "selectEmailProvider",
  CREATE_ADMIN: "createAdmin",
  DONE: "done",
} as const;

// ======================
//        Database
// ======================

export const DATABASES = {
  SQLITE: "Sqlite",
  POSTGRESQL: "PostgreSql",
} as const;

// ======================
//        Email
// ======================

export const EMAIL_PROVIDERS = {
  SMTP: "Smtp",
  RESEND: "Resend",
} as const;

// ======================
//      Admin Account
// ======================
