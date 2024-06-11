import React, { createContext, useContext, useState, useEffect } from "react";
import supabase from "./utils"; // Ensure the path is correct
import {  useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    const fetchUserRole = async (userId) => {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

      if (profileError) {
        console.error("Error fetching user role:", profileError);
      } else {
        setRole(profileData.role);
      }
    };

        const fetchUser = async () => {
            const { data: sessionData, error } = await supabase.auth.getSession();
            if (error) {
              console.error("Error fetching session:", error);
            } else {
              if (!sessionData || !sessionData.session || !sessionData.session.user) {
                // Redirect to login if user session data is not available
                navigate("/login", { replace: true });
                return;
              }
        
              const userId = sessionData.session.user.id;
              fetchUserRole(userId); // Fetch the role using the user ID
            }
          };

    fetchUser();
  }, []);


  return (
    <AuthContext.Provider value={{ role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
