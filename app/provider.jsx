"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/services/superbaseClient";

// Create the context
export const UserDetailsContext = createContext();

function Provider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    CreateNewUser();
  }, []);

  const CreateNewUser = async () => {
    try {
      // Step 1: Check if session exists
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();
      if (sessionError) {
        console.error("Session error:", sessionError);
        return;
      }
      if (!sessionData?.session) {
        console.warn("No session found. User not logged in.");
        return;
      }

      // Step 2: Get the authenticated user
      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError) {
        console.error("Error getting authenticated user:", authError);
        return;
      }
      if (!authUser) {
        console.warn("Authenticated user is null.");
        return;
      }
      console.log("Authenticated User:", authUser);

      // Step 3: Check if user exists in the database
      const { data: existingUsers, error: fetchError } = await supabase
        .from("users")
        .select("*")
        .eq("email", authUser.email);
      if (fetchError) {
        console.error("Error fetching user:", fetchError);
        return;
      }

      // Step 4: Insert if not exists
      if (!existingUsers || existingUsers.length === 0) {
        const { data: newUser, error: insertError } = await supabase
          .from("users")
          .insert([
            {
              name: authUser.user_metadata?.name || authUser.email,
              email: authUser.email,
              picture: authUser.user_metadata?.picture,
            },
          ])
          .select()
          .single();
        if (insertError) {
          console.error("Error inserting new user:", insertError);
          return;
        }
        console.log("New user inserted:", newUser);
        setUser(newUser);
      } else {
        console.log("User already exists:", existingUsers[0]);
        setUser(existingUsers[0]);
      }
    } catch (error) {
      console.error("Unexpected error in CreateNewUser:", error);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error logging out:", error);
        return;
      }
      setUser(null);
      // Optionally redirect to login page
      window.location.href = "/auth"; // or use router.push('/login')
    } catch (error) {
      console.error("Unexpected error during logout:", error);
    }
  };

  return (
    <UserDetailsContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserDetailsContext.Provider>
  );
}

export default Provider;

// Hook
export const useUser = () => {
  const context = useContext(UserDetailsContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserDetailsProvider");
  }
  return context;
};
