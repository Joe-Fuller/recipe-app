import React, { createContext, useState, useEffect } from "react";
import { getSettings, setSetting } from "../storage/SettingsStorage";

const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
  const [version, setVersion] = useState(0);
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
    const updatedSettings = { ...settings, [setting]: value };
    await setSetting(setting, value);
    setSettings(updatedSettings);
    setVersion(version + 1);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, version }}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, SettingsProvider };
