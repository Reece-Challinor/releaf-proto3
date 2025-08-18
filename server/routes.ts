import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

/**
 * Register all API routes for the RELEAF application
 * All routes are prefixed with /api for consistency
 */
export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint for monitoring
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "RELEAF API", timestamp: new Date().toISOString() });
  });

  // State regulations endpoint - returns regulatory info for selected state
  app.get("/api/regulations/:state", (req, res) => {
    const { state } = req.params;
    const validStates = ["TX", "CO", "AR"];
    
    if (!validStates.includes(state)) {
      return res.status(400).json({ error: "Invalid state code" });
    }

    // Mock regulatory data for demonstration
    res.json({
      state,
      permits: ["Environmental Impact", "Water Usage", "Wildlife Protection"],
      processingTime: "15-30 days",
      requirements: ["Site Assessment", "Documentation", "Compliance Review"]
    });
  });

  // Permits endpoint - returns available permit types
  app.get("/api/permits", (req, res) => {
    res.json({
      permits: [
        { id: "timber", name: "Timber Harvesting", requiredDocs: 5 },
        { id: "mining", name: "Mining & Extraction", requiredDocs: 8 },
        { id: "aquatic", name: "Aquatic Resources", requiredDocs: 6 },
        { id: "recreation", name: "Recreation & Tourism", requiredDocs: 4 }
      ]
    });
  });

  // Automation status endpoint
  app.get("/api/automation/status", (req, res) => {
    res.json({
      status: "ready",
      lastRun: null,
      availableAutomations: ["permit-analysis", "compliance-check", "document-generation"]
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
