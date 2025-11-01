export type SmtpPreset = {
  name: string;
  host: string;
  port: string;
  useSsl: boolean;
  note: string;
};

export const SMTP_PRESETS: Record<string, SmtpPreset> = {
  GMAIL: {
    name: "Gmail",
    host: "smtp.gmail.com",
    port: "587",
    useSsl: true,
    note: "Requires App Password from Google Account Settings → Security → 2-Step Verification → App Passwords",
  },
  OUTLOOK: {
    name: "Outlook / Hotmail",
    host: "smtp-mail.outlook.com",
    port: "587",
    useSsl: true,
    note: "Use your regular Microsoft account password",
  },
  OFFICE365: {
    name: "Microsoft 365",
    host: "smtp.office365.com",
    port: "587",
    useSsl: true,
    note: "Use your Microsoft 365 account credentials",
  },
  YAHOO: {
    name: "Yahoo Mail",
    host: "smtp.mail.yahoo.com",
    port: "587",
    useSsl: true,
    note: "Requires App Password from Yahoo Account Settings",
  },
  SENDGRID: {
    name: "SendGrid",
    host: "smtp.sendgrid.net",
    port: "587",
    useSsl: true,
    note: "Username is 'apikey', Password is your SendGrid API Key",
  },
  MAILGUN: {
    name: "Mailgun",
    host: "smtp.mailgun.org",
    port: "587",
    useSsl: true,
    note: "Use SMTP credentials from Mailgun dashboard",
  },
  MAILTRAP: {
    name: "Mailtrap (Testing)",
    host: "sandbox.smtp.mailtrap.io",
    port: "2525",
    useSsl: true,
    note: "Perfect for development - get credentials from mailtrap.io",
  },
  AWS_SES: {
    name: "AWS SES",
    host: "email-smtp.us-east-1.amazonaws.com",
    port: "587",
    useSsl: true,
    note: "Use SMTP credentials from AWS SES console (region-specific)",
  },
  CUSTOM: {
    name: "Custom SMTP Server",
    host: "",
    port: "587",
    useSsl: true,
    note: "Enter your own SMTP server details",
  },
};

export const SMTP_PRESET_OPTIONS = Object.entries(SMTP_PRESETS).map(([key, preset]) => ({
  value: key,
  label: preset.name,
}));
