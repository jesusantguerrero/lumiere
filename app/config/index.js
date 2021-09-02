const supabaseURL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_SERVICE_ROLE;

exports.defaultConfig = {
    supabaseUrl: supabaseURL || '',
    supabaseAnonKey: supabaseAnonKey || '',
    mailHost: process.env.MAIL_HOST || "",
    mailPort: process.env.MAIL_PORT || "",
    mailUser: process.env.MAIL_USER || false,
    mailPass: process.env.MAIL_PASS || "",
    mailSecure: process.env.MAIL_SECURE || false,
    mailFrom: process.env.MAIL_FROM || "me@example.com",
    maxNotificationsPerRun: process.env.MAX_NOTIFICATIONS_PER_RUN || 5,
    maxSiteChecksPerRun: process.env.MAX_SITE_CHECKS_PER_RUN || 10,
    historyDays: process.env.HISTORY_DAYS || 30,
}