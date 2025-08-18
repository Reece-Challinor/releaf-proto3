interface SSOButtonsProps {
  onEmailClick?: () => void;
}

export function SSOButtons({ onEmailClick }: SSOButtonsProps) {
  const providers = [
    { name: "Continue with Facebook", icon: "facebook", color: "#1877F2" },
    { name: "Continue with Google", icon: "google", color: "#EA4335" },
    { name: "Continue with Apple", icon: "apple", color: "#000000" },
    { name: "Continue with Email", icon: "mail", color: "#4E5F34", onClick: onEmailClick },
  ];

  return (
    <div className="space-y-3">
      {providers.map((provider) => (
        <button
          key={provider.name}
          onClick={provider.onClick}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-sage/40 bg-white hover:bg-sand/20 transition-colors"
        >
          <div className="w-5 h-5 flex items-center justify-center">
            {provider.icon === "facebook" && (
              <svg viewBox="0 0 24 24" fill={provider.color}>
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            )}
            {provider.icon === "google" && (
              <svg viewBox="0 0 24 24">
                <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#4285F4" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            {provider.icon === "apple" && (
              <svg viewBox="0 0 24 24" fill={provider.color}>
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.36-1.09-.55-2.08-.56-3.24 0-1.44.68-2.2.53-3.06-.36C2.44 15.05 3.27 8.16 9.04 7.87c1.42.06 2.4.74 3.24.77.63-.15 1.24-.89 2.82-.79 2.3.13 3.37 1.33 3.77 2.87-3.45 2.06-2.95 6.55.52 7.8-.62 1.61-1.42 3.21-2.34 4.76zM12.03 7.72c-.13-2.56 2.02-4.65 4.53-4.89.31 2.96-2.73 5.17-4.53 4.89z"/>
              </svg>
            )}
            {provider.icon === "mail" && (
              <svg viewBox="0 0 24 24" fill="none" stroke={provider.color} strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-10 5L2 7"/>
              </svg>
            )}
          </div>
          <span className="text-sm font-medium text-charcoal">{provider.name}</span>
        </button>
      ))}
    </div>
  );
}