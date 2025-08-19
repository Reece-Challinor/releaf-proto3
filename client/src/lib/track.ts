export function track(event: string, payload: any = {}) {
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({ event, ...payload, ts: Date.now() });
}