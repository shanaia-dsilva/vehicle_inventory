import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage, type VehicleFilters } from "./storage";
import { insertVehicleSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all vehicles with optional filters
  app.get("/api/vehicles", async (req, res) => {
    try {
      const filters: VehicleFilters = {};
      
      if (req.query.vehicleType) filters.vehicleType = req.query.vehicleType as string;
      if (req.query.acStatus) filters.acStatus = parseInt(req.query.acStatus as string);
      if (req.query.seatCapacity) filters.seatCapacity = parseInt(req.query.seatCapacity as string);
      if (req.query.seatCapacityType) filters.seatCapacityType = req.query.seatCapacityType as 'exact' | 'gte' | 'lte';
      if (req.query.minAge) filters.minAge = parseInt(req.query.minAge as string);
      if (req.query.maxAge) filters.maxAge = parseInt(req.query.maxAge as string);
      if (req.query.status) filters.status = req.query.status as string;
      if (req.query.search) filters.search = req.query.search as string;
      
      const vehicles = await storage.getVehicles(filters);
      res.json(vehicles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vehicles" });
    }
  });

  // Get single vehicle
  app.get("/api/vehicles/:slNo", async (req, res) => {
    try {
      const slNo = parseInt(req.params.slNo);
      const vehicle = await storage.getVehicle(slNo);
      
      if (!vehicle) {
        return res.status(404).json({ message: "Vehicle not found" });
      }
      
      res.json(vehicle);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vehicle" });
    }
  });

  // Create new vehicle
  app.post("/api/vehicles", async (req, res) => {
    try {
      const validatedData = insertVehicleSchema.parse(req.body);
      const vehicle = await storage.createVehicle(validatedData);
      res.status(201).json(vehicle);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create vehicle" });
    }
  });

  // Update vehicle
  app.put("/api/vehicles/:slNo", async (req, res) => {
    try {
      const slNo = parseInt(req.params.slNo);
      const validatedData = insertVehicleSchema.partial().parse(req.body);
      const vehicle = await storage.updateVehicle(slNo, validatedData);
      
      if (!vehicle) {
        return res.status(404).json({ message: "Vehicle not found" });
      }
      
      res.json(vehicle);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to update vehicle" });
    }
  });

  // Delete vehicle
  app.delete("/api/vehicles/:slNo", async (req, res) => {
    try {
      const slNo = parseInt(req.params.slNo);
      const success = await storage.deleteVehicle(slNo);
      
      if (!success) {
        return res.status(404).json({ message: "Vehicle not found" });
      }
      
      res.json({ message: "Vehicle deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete vehicle" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
