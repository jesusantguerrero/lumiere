const { createClient } = require("@supabase/supabase-js");
const { notifications } = require("./notifications");

exports.useSupabase = (defaultConfig) => {
    const supabaseUrl = defaultConfig.supabaseUrl
    const supabaseAnonKey = defaultConfig.supabaseAnonKey;

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    return {
        notifications: notifications(supabase),
    }
}