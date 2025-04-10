import React from "react";
import { Image } from "antd";

export const AppIcon: React.FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Image
        src="/Logo.png"
        alt="GTEF Logo"
        preview={false}
        style={{
          height: '40px',
          width: 'auto',
          objectFit: 'contain'
        }}
      />
    </div>
  );
};
