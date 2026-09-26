export const dynamic = 'force-static';
import { ImageResponse } from 'next/og';
import { companyConfig } from '@/config/company';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '80px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #1d4ed8 100%)',
          color: '#ffffff',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
          {companyConfig.name}
        </div>
        <div style={{ fontSize: 28, marginTop: 24, color: 'rgba(255,255,255,0.9)' }}>
          {companyConfig.tagline}
        </div>
        <div style={{ fontSize: 22, marginTop: 40, color: 'rgba(255,255,255,0.8)' }}>
          Fictional Portfolio Demonstration
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
