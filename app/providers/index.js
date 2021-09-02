const { useSupabase } = require("../framework/lumiere/useSupabase")
const { defaultConfig } = require("../config");
const { useNotification } = require("./useNotifications")

const supabase = useSupabase(defaultConfig);

module.exports.Provider = () => {
    return {
        notification: useNotification(supabase.notifications),
        email: {},
    }
}