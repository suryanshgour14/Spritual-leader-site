export default function PageLoader({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: dark ? '#1A0505' : '#FFF8E8' }}
    >
      <div className="flex flex-col items-center gap-5">
        <span
          className="text-5xl select-none"
          style={{ animation: 'pageloader-pulse 1.4s ease-in-out infinite' }}
        >
          🪷
        </span>
        <div className="flex items-center gap-2">
          {[0, 0.18, 0.36].map((delay, i) => (
            <span
              key={i}
              className="block w-1.5 h-1.5 rounded-full"
              style={{
                background: dark ? '#F2C94C' : '#D97706',
                opacity: 0.5,
                animation: `pageloader-dot 1.1s ease-in-out ${delay}s infinite`,
              }}
            />
          ))}
        </div>
        <style>{`
          @keyframes pageloader-pulse {
            0%, 100% { opacity: 0.5; transform: scale(0.92); }
            50%       { opacity: 1;   transform: scale(1);    }
          }
          @keyframes pageloader-dot {
            0%, 80%, 100% { transform: scale(0.7); opacity: 0.35; }
            40%            { transform: scale(1);   opacity: 1;    }
          }
        `}</style>
      </div>
    </div>
  )
}
