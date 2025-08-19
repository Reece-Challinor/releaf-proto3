/**
 * PWA utilities for RELEAF app
 * Handles offline caching of wallet cards and basic service worker registration
 */

export interface WalletCardData {
  id: string;
  stateCode: string;
  licenseId: string;
  timestamp: number;
}

export function cacheWalletCard(cardData: WalletCardData) {
  try {
    localStorage.setItem('releaf_wallet_cache', JSON.stringify(cardData));
    localStorage.setItem('releaf_wallet_cache_timestamp', Date.now().toString());
  } catch (error) {
    console.warn('Failed to cache wallet card:', error);
  }
}

export function getCachedWalletCard(): WalletCardData | null {
  try {
    const cached = localStorage.getItem('releaf_wallet_cache');
    if (!cached) return null;
    
    const timestamp = localStorage.getItem('releaf_wallet_cache_timestamp');
    const age = Date.now() - (timestamp ? parseInt(timestamp) : 0);
    
    // Cache expires after 7 days
    if (age > 7 * 24 * 60 * 60 * 1000) {
      localStorage.removeItem('releaf_wallet_cache');
      localStorage.removeItem('releaf_wallet_cache_timestamp');
      return null;
    }
    
    return JSON.parse(cached);
  } catch (error) {
    console.warn('Failed to retrieve cached wallet card:', error);
    return null;
  }
}

export function registerServiceWorker() {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service worker registered:', registration);
      })
      .catch((error) => {
        console.warn('Service worker registration failed:', error);
      });
  }
}