import { AuthBindings } from "@refinedev/core";

import { supabaseClient, checkAdminStatus } from "./utility";

const authProvider: AuthBindings = {
  login: async ({ email, password, providerName }) => {
    // Enhanced debugging
    console.log("Login attempt:", { email, providerName });
    
    // sign in with oauth
    try {
      if (providerName) {
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
          provider: providerName,
        });

        if (error) {
          console.error("OAuth sign in error:", error);
          return {
            success: false,
            error,
          };
        }

        if (data?.url) {
          return {
            success: true,
            redirectTo: "/",
          };
        }
      }

      // sign in with email and password
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error);
        return {
          success: false,
          error,
        };
      }

      if (data?.user) {
        console.log("User authenticated successfully:", { 
          id: data.user.id, 
          email: data.user.email,
          metadata: data.user.user_metadata 
        });
        
        // Check if user is an admin using our helper function
        console.log("Checking admin status for user:", data.user.id);
        const { data: adminData, error: adminError } = await checkAdminStatus(data.user.id);

        console.log("Admin check result:", { adminData, adminError });
          
        if (adminError) {
          console.error("Admin check error:", adminError);
          await supabaseClient.auth.signOut();
          return {
            success: false,
            error: {
              message: "Admin verification failed",
              name: "Please contact the administrator",
            },
          };
        }
        
        if (!adminData?.is_admin) {
          console.error("User not an admin:", data.user.email);
          await supabaseClient.auth.signOut();
          return {
            success: false,
            error: {
              message: "Access denied",
              name: "You do not have permission to access the admin panel",
            },
          };
        }

        console.log("Admin access granted to:", data.user.email);
        return {
          success: true,
          redirectTo: "/",
        };
      }
    } catch (error: any) {
      console.error("Login error:", error);
      return {
        success: false,
        error,
      };
    }

    return {
      success: false,
      error: {
        message: "Login failed",
        name: "Invalid email or password",
      },
    };
  },
  register: async ({ email, password }) => {
    try {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          error,
        };
      }

      if (data) {
        return {
          success: true,
          redirectTo: "/",
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: false,
      error: {
        message: "Register failed",
        name: "Invalid email or password",
      },
    };
  },
  forgotPassword: async ({ email }) => {
    try {
      const { data, error } = await supabaseClient.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/update-password`,
        }
      );

      if (error) {
        return {
          success: false,
          error,
        };
      }

      if (data) {
        return {
          success: true,
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: false,
      error: {
        message: "Forgot password failed",
        name: "Invalid email",
      },
    };
  },
  updatePassword: async ({ password }) => {
    try {
      const { data, error } = await supabaseClient.auth.updateUser({
        password,
      });

      if (error) {
        return {
          success: false,
          error,
        };
      }

      if (data) {
        return {
          success: true,
          redirectTo: "/",
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error,
      };
    }
    return {
      success: false,
      error: {
        message: "Update password failed",
        name: "Invalid password",
      },
    };
  },
  logout: async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    console.error("Auth error:", error);
    return { error };
  },
  check: async () => {
    try {
      const { data } = await supabaseClient.auth.getSession();
      const { session } = data;

      if (!session) {
        console.log("No session found during auth check");
        return {
          authenticated: false,
          error: {
            message: "Check failed",
            name: "Session not found",
          },
          logout: true,
          redirectTo: "/login",
        };
      }

      console.log("Session found during auth check:", { 
        userId: session.user.id,
        userEmail: session.user.email
      });

      // Check if user is in admin_users table using our helper function
      console.log("Checking admin status for user:", session.user.id);
      const { data: adminData, error: adminError } = await checkAdminStatus(session.user.id);

      console.log("Admin check result:", { adminData, adminError, userId: session.user.id });

      if (adminError) {
        console.error("Admin verification error:", adminError);
        return {
          authenticated: false,
          error: {
            message: "Admin verification failed",
            name: "Please contact the administrator",
          },
          logout: true,
          redirectTo: "/login",
        };
      }

      if (!adminData?.is_admin) {
        console.error("User not an admin:", session.user.email);
        return {
          authenticated: false,
          error: {
            message: "Access denied",
            name: "You do not have permission to access the admin panel",
          },
          logout: true,
          redirectTo: "/login",
        };
      }

      console.log("Admin access verified for:", session.user.email);
      return {
        authenticated: true,
      };
    } catch (error: any) {
      console.error("Auth check error:", error);
      return {
        authenticated: false,
        error: error || {
          message: "Check failed",
          name: "Not authenticated",
        },
        logout: true,
        redirectTo: "/login",
      };
    }
  },
  getPermissions: async () => {
    const { data } = await supabaseClient.auth.getUser();
    
    if (!data?.user) {
      return null;
    }
    
    // Get admin status from admin_users table using our helper function
    const { data: adminData } = await checkAdminStatus(data.user.id);
      
    if (adminData?.is_admin) {
      return ["admin"];
    }
    
    return ["guest"];
  },
  getIdentity: async () => {
    const { data } = await supabaseClient.auth.getUser();

    if (data?.user) {
      return {
        ...data.user,
        name: data.user.email,
      };
    }

    return null;
  },
};

export default authProvider;
