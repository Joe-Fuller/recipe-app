import React, { createContext, useState, useEffect } from "react";
import { getSettings, setSetting } from "../storage/SettingsStorage";

const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    textSize: 16,
    theme: "light",
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const savedSettings = await getSettings();
    if (savedSettings) {
      setSettings(savedSettings);
    }
  };

  const updateSetting = async (setting, value) => {
    await setSetting(setting, value);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, SettingsProvider };
