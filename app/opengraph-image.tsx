import { ImageResponse } from 'next/og'
import { PROFILE } from '@/lib/data'

export const alt = `${PROFILE.name} — Portfolio`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#00314f',
          color: '#ffefd2',
          padding: '72px 80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            width: 56,
            height: 8,
            background: '#e4571b',
            borderRadius: 4,
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            {PROFILE.name}
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 28,
              color: '#e97949',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            CS + Statistics · UW–Madison
          </div>
        </div>
        <div
          style={{
            fontSize: 22,
            opacity: 0.78,
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          Accessible, data-driven, human-centered tools.
        </div>
      </div>
    ),
    { ...size },
  )
}
