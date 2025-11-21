export enum SmtpPresetKey {
  GMAIL = "GMAIL",
  OUTLOOK = "OUTLOOK",
  OFFICE365 = "OFFICE365",
  YAHOO = "YAHOO",
  SENDGRID = "SENDGRID",
  MAILGUN = "MAILGUN",
  MAILTRAP = "MAILTRAP",
  AWS_SES = "AWS_SES",
  CUSTOM = "CUSTOM",
}

export type SmtpPreset = {
  name: string;
  host: string;
  port: string;
  useSsl: boolean;
  note: string;
};

export const SMTP_PRESETS: Record<SmtpPresetKey, SmtpPreset> = {
  [SmtpPresetKey.GMAIL]: {
    name: "Gmail",
    host: "smtp.gmail.com",
    port: "587",
    useSsl: true,
    note: "Requires App Password from Google Account Settings → Security → 2-Step Verification → App Passwords",
  },
  [SmtpPresetKey.OUTLOOK]: {
    name: "Outlook / Hotmail",
    host: "smtp-mail.outlook.com",
    port: "587",
    useSsl: true,
    note: "Use your regular Microsoft account password",
  },
  [SmtpPresetKey.OFFICE365]: {
    name: "Microsoft 365",
    host: "smtp.office365.com",
    port: "587",
    useSsl: true,
    note: "Use your Microsoft 365 account credentials",
  },
  [SmtpPresetKey.YAHOO]: {
    name: "Yahoo Mail",
    host: "smtp.mail.yahoo.com",
    port: "587",
    useSsl: true,
    note: "Requires App Password from Yahoo Account Settings",
  },
  [SmtpPresetKey.SENDGRID]: {
    name: "SendGrid",
    host: "smtp.sendgrid.net",
    port: "587",
    useSsl: true,
    note: "Username is 'apikey', Password is your SendGrid API Key",
  },
  [SmtpPresetKey.MAILGUN]: {
    name: "Mailgun",
    host: "smtp.mailgun.org",
    port: "587",
    useSsl: true,
    note: "Use SMTP credentials from Mailgun dashboard",
  },
  [SmtpPresetKey.MAILTRAP]: {
    name: "Mailtrap (Testing)",
    host: "sandbox.smtp.mailtrap.io",
    port: "2525",
    useSsl: true,
    note: "Perfect for development - get credentials from mailtrap.io",
  },
  [SmtpPresetKey.AWS_SES]: {
    name: "AWS SES",
    host: "email-smtp.us-east-1.amazonaws.com",
    port: "587",
    useSsl: true,
    note: "Use SMTP credentials from AWS SES console (region-specific)",
  },
  [SmtpPresetKey.CUSTOM]: {
    name: "Custom SMTP Server",
    host: "",
    port: "587",
    useSsl: true,
    note: "Enter your own SMTP server details",
  },
};

export const SMTP_PRESET_OPTIONS = Object.values(SmtpPresetKey).map((key) => ({
  value: key,
  label: SMTP_PRESETS[key].name,
}));
