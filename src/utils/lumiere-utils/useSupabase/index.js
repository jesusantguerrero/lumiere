import { createClient } from "@supabase/supabase-js";

export function useSupabase(AuthState, config) {
  const supabase = createClient(config.supabaseURL, config.supabaseAnonKey);

  const logout = async (callback) => {
    const { data, error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error);
    }

    AuthState.user = {};
    setTimeout(() => {
      callback && callback();
    })
    return data;
  };

  const register = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signIn({ email, password });
    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  const isAuthenticated = () => {
    return supabaseState.user.id ? true : false;
  };


  // Profile Management
  const getProfile = () => {}


  // Notifications
  const update = async (notificationId, notification) => {
      const { data, error } = await supabase.from('notifications').update(notification, { returning: 'minimal' }).eq('id', notificationId);
      if (error) throw error;
      return data;
  }

  const getNotifications = async (limit = 100) => {
    const {data, error} = await supabase.from('notifications').select('*').eq('user_uid', AuthState.user.id).limit(limit);
    if (error) throw error;
    return data;
  }

  const getServerTime = () => {
    return new Date();
  }

  const Notifications = {
    getAll: getNotifications,
    update: update,
    getServerTime,
  }


  return {
    supabase,
    getProfile,
    logout,
    login,
    register,
    isAuthenticated,
    onAuthStateChanged: (callback) => supabase.auth.onAuthStateChange(callback),
    getUser: () => supabase.auth.user(),

    // notifications
    Notifications,

    // utils
    getServerTime
  };
}
