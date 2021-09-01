import { createClient } from "@supabase/supabase-js";
import { nextTick } from "vue";
import config from "../../config";

export function useSupabase(AuthState) {
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

  const getProfile = async () => {
    const { data, error, status } = await supabase
      .from("profiles")
      .select(`username, website, avatar_url`)
      .eq("id", supabaseState.user.id)
      .single();

    if (error && status !== 406) throw error;
    if (data) {
      return data;
    }
  };

  const isAuthenticated = () => {
    return supabaseState.user.id ? true : false;
  };

  return {
    supabase,
    getProfile,
    logout,
    login,
    register,
    isAuthenticated,
    onAuthStateChanged: (callback) => supabase.auth.onAuthStateChange(callback),
    getUser: () => supabase.auth.user(),
  };
}
