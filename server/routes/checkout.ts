import { Router } from "express";
import Stripe from "stripe";

export const checkoutRouter = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { 
  apiVersion: "2024-06-20" as Stripe.LatestApiVersion 
});

checkoutRouter.post("/", async (req, res) => {
  try {
    const { state = "TX", license = "TX-HUNT-RES" } = req.body || {};
    
    // Get the origin from headers or default to local dev
    const origin = (req.headers["x-forwarded-origin"] as string) || 
                   (req.headers["referer"] as string)?.replace(/\/$/, '') || 
                   `http://localhost:5173`;
    
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: { 
            name: `Demo: ${state} • ${license}`,
            description: "RELEAF hunting license (test mode)"
          },
          unit_amount: 2500, // $25.00
        },
        quantity: 1,
      }],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
    });
    
    res.json({ ok: true, id: session.id, url: session.url });
  } catch (e: any) {
    console.error("Stripe checkout error:", e);
    res.status(500).json({ ok: false, error: e.message });
  }
});