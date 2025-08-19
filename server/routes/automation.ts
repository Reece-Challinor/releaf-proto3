/**
 * RELEAF Demo Automation Routes
 * Simulates the hunting license automation process
 * This is a prototype for investor demos - NOT production
 * Returns mock automation steps for UI animation
 */
import { Router } from "express";
import { insertAttempt, updateAttempt } from "../db";

export const automationRouter = Router();

automationRouter.post("/", async (req, res) => {
  const { state = "TX", license = "TX-HUNT-RES", autofill = true, profile = {} } = req.body || {};
  
  try {
    // Insert database record to track this attempt
    const attemptId = await insertAttempt(state, license);
    
    // Simulated automation steps for demo
    const steps = [
      { k: "open", label: "Opening state portal", delayMs: 400 },
      { k: "auth", label: "Authenticating authorized agent", delayMs: 600 },
      { k: "prefill", label: "Prefilling verified profile", delayMs: 500 },
      { k: "rules", label: "Applying state-specific compliance rules", delayMs: 700 },
      { k: "pay", label: "Processing secure payment", delayMs: 600 },
      { k: "receipt", label: "Retrieving license receipt / PDF", delayMs: 600 },
      { k: "wallet", label: "Issuing digital card to Wallet", delayMs: 500 },
    ];
    
    const jobId = `job_${Math.random().toString(36).slice(2,8)}`;
    
    res.json({ 
      ok: true, 
      jobId, 
      attemptId,
      state, 
      license, 
      autofill, 
      steps, 
      profile: !!profile 
    });
  } catch (error) {
    console.error('Error creating automation attempt:', error);
    res.status(500).json({ 
      ok: false, 
      error: 'Failed to create automation attempt' 
    });
  }
});

automationRouter.post("/:id/complete", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        ok: false, 
        error: 'Invalid attempt ID' 
      });
    }
    
    await updateAttempt(id, "completed");
    
    res.json({ 
      ok: true, 
      message: 'Automation attempt marked as completed' 
    });
  } catch (error) {
    console.error('Error updating automation attempt:', error);
    res.status(500).json({ 
      ok: false, 
      error: 'Failed to update automation attempt' 
    });
  }
});