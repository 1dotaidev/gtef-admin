import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { ConfigProvider, theme } from "antd";

type ColorModeContextType = {
  mode: string;
  setMode: (mode: string) => void;
};

export const ColorModeContext = createContext<ColorModeContextType>(
  {} as ColorModeContextType
);

export const ColorModeContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [mode, setMode] = useState("light");

  const { defaultAlgorithm, darkAlgorithm } = theme;

  const gtefTheme = {
    colorPrimary: "#1677ff",
    colorSuccess: "#52c41a",
    colorWarning: "#faad14",
    colorError: "#ff4d4f",
    colorInfo: "#1677ff",
    colorTextBase: "rgba(0, 0, 0, 0.85)",
    colorBgBase: "#ffffff",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    borderRadius: 6,
  };

  return (
    <ColorModeContext.Provider
      value={{
        mode,
        setMode,
      }}
    >
      <ConfigProvider
        theme={{
          algorithm: mode === "light" ? defaultAlgorithm : darkAlgorithm,
          token: gtefTheme,
        }}
      >
        {children}
      </ConfigProvider>
    </ColorModeContext.Provider>
  );
};
