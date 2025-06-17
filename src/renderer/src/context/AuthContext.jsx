import { createContext, useContext, useEffect, useState } from "react";

const StateContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {}
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(null);

  useEffect(() => {
    // Load session on mount
    window.session.getSession().then((session) => {
      if (session) {
        setUser(session.user || null);
        setTokenState(session.token || null);
      }
    });
  }, []);

  const setToken = async (newToken) => {
    setTokenState(newToken);
    const updatedSession = { user, token: newToken };
    await window.session.setSession(updatedSession);
  };

  const setUserWrapper = async (newUser) => {
    setUser(newUser);
    const updatedSession = { user: newUser, token };
    await window.session.setSession(updatedSession);
  };

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        setUser: setUserWrapper,
        setToken
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
