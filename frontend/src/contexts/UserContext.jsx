import React, { createContext, useState, useEffect } from "react";

// Create context
export const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null until fetched
  const [loading, setLoading] = useState(true); // wait until user is loaded

  // Hydrate user from localStorage
  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = JSON.parse(localStorage.getItem("paynomaUser"));
      if (storedUser) setUser(storedUser);
      setLoading(false);
    };
    fetchUser();
  }, []);

  // Login simulation
  const login = (role = "tenant") => {
    const userObj = {
      id: Date.now(),
      name:
        role === "tenant"
          ? "John Tenant"
          : role === "landlord"
          ? "Mary Landlord"
          : role === "admin"
          ? "Admin User"
          : "Support Agent",
      role,
      unitId: role === "tenant" ? 12 : null,
      propertyId: role === "landlord" ? 5 : null,
      landlordId: role === "tenant" ? 2 : null,
    };
    localStorage.setItem("paynomaUser", JSON.stringify(userObj));
    setUser(userObj);
    return userObj; // return user for immediate redirect
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("paynomaUser");
    setUser(null);
  };

  // Switch role (for testing dashboards)
  const switchRole = (role) => {
    return login(role);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, switchRole, loading }}>
      {children}
    </UserContext.Provider>
  );
};
