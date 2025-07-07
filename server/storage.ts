import { vehicles, type Vehicle, type InsertVehicle } from "@shared/schema";

export interface IStorage {
  // Vehicle operations
  getVehicles(filters?: VehicleFilters): Promise<Vehicle[]>;
  getVehicle(slNo: number): Promise<Vehicle | undefined>;
  createVehicle(vehicle: InsertVehicle): Promise<Vehicle>;
  updateVehicle(slNo: number, vehicle: Partial<InsertVehicle>): Promise<Vehicle | undefined>;
  deleteVehicle(slNo: number): Promise<boolean>;
}

export interface VehicleFilters {
  vehicleType?: string;
  acStatus?: number;
  seatCapacity?: number;
  seatCapacityType?: 'exact' | 'gte' | 'lte';
  minAge?: number;
  maxAge?: number;
  status?: string;
  search?: string;
}

export class MemStorage implements IStorage {
  private vehicles: Map<number, Vehicle>;
  private currentId: number;

  constructor() {
    this.vehicles = new Map();
    this.currentId = 1;
    this.initializeSampleData();
  }

  private async initializeSampleData() {
    // Add some sample vehicles
    const sampleVehicles = [
      {
        regNo: "MP-09-AB-1234",
        make: "Tata",
        model: "Ultra 1518",
        mfgYear: 2019,
        regDate: "2019-03-15",
        entityName: "City Transport",
        runningSite: "Route 42A",
        engineNo: "ENG001234",
        chassisNo: "CHS001234",
        seatCapacity: 45,
        vehicleType: "Bus",
        acStatus: 1,
        status: "Active",
      },
      {
        regNo: "DL-01-XY-5678",
        make: "Ashok Leyland",
        model: "STILE",
        mfgYear: 2020,
        regDate: "2020-06-20",
        entityName: "Metro Transport",
        runningSite: "Route 15B",
        engineNo: "ENG005678",
        chassisNo: "CHS005678",
        seatCapacity: 12,
        vehicleType: "Winger",
        acStatus: 1,
        status: "Active",
      },
      {
        regNo: "HR-26-CD-9012",
        make: "Force Motors",
        model: "Traveller",
        mfgYear: 2018,
        regDate: "2018-11-10",
        entityName: "Express Tours",
        runningSite: "Highway Route",
        engineNo: "ENG009012",
        chassisNo: "CHS009012",
        seatCapacity: 17,
        vehicleType: "TT",
        acStatus: 0,
        status: "Active",
      },
      {
        regNo: "UP-14-EF-3456",
        make: "Tata",
        model: "LP 909",
        mfgYear: 2017,
        regDate: "2017-08-05",
        entityName: "Local Transit",
        runningSite: "City Loop",
        engineNo: "ENG003456",
        chassisNo: "CHS003456",
        seatCapacity: 32,
        vehicleType: "Bus",
        acStatus: 0,
        status: "Inactive",
      },
      {
        regNo: "GJ-05-GH-7890",
        make: "Mahindra",
        model: "Bolero Maxi Truck",
        mfgYear: 2021,
        regDate: "2021-01-15",
        entityName: "Regional Connect",
        runningSite: "Inter-city Route",
        engineNo: "ENG007890",
        chassisNo: "CHS007890",
        seatCapacity: 9,
        vehicleType: "Winger",
        acStatus: 1,
        status: "Active",
      }
    ];

    for (const vehicleData of sampleVehicles) {
      await this.createVehicle(vehicleData);
    }
  }

  async getVehicles(filters?: VehicleFilters): Promise<Vehicle[]> {
    let vehicleList = Array.from(this.vehicles.values());
    
    if (filters) {
      const currentYear = new Date().getFullYear();
      
      vehicleList = vehicleList.filter(vehicle => {
        // Vehicle type filter
        if (filters.vehicleType && vehicle.vehicleType !== filters.vehicleType) {
          return false;
        }
        
        // AC status filter
        if (filters.acStatus !== undefined && vehicle.acStatus !== filters.acStatus) {
          return false;
        }
        
        // Seat capacity filter
        if (filters.seatCapacity !== undefined) {
          switch (filters.seatCapacityType) {
            case 'exact':
              if (vehicle.seatCapacity !== filters.seatCapacity) return false;
              break;
            case 'gte':
              if (vehicle.seatCapacity < filters.seatCapacity) return false;
              break;
            case 'lte':
              if (vehicle.seatCapacity > filters.seatCapacity) return false;
              break;
          }
        }
        
        // Age filter
        const vehicleAge = currentYear - vehicle.mfgYear;
        if (filters.minAge !== undefined && vehicleAge < filters.minAge) {
          return false;
        }
        if (filters.maxAge !== undefined && vehicleAge > filters.maxAge) {
          return false;
        }
        
        // Status filter
        if (filters.status && vehicle.status !== filters.status) {
          return false;
        }
        
        // Search filter
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          return (
            vehicle.regNo.toLowerCase().includes(searchLower) ||
            vehicle.make.toLowerCase().includes(searchLower) ||
            vehicle.model.toLowerCase().includes(searchLower) ||
            vehicle.entityName.toLowerCase().includes(searchLower)
          );
        }
        
        return true;
      });
    }
    
    return vehicleList.sort((a, b) => b.slNo - a.slNo);
  }

  async getVehicle(slNo: number): Promise<Vehicle | undefined> {
    return this.vehicles.get(slNo);
  }

  async createVehicle(insertVehicle: InsertVehicle): Promise<Vehicle> {
    const slNo = this.currentId++;
    const vehicle: Vehicle = { 
      ...insertVehicle, 
      slNo,
      status: insertVehicle.status || "Active",
      acStatus: insertVehicle.acStatus || 0,
      runningSite: insertVehicle.runningSite || null
    };
    this.vehicles.set(slNo, vehicle);
    return vehicle;
  }

  async updateVehicle(slNo: number, updates: Partial<InsertVehicle>): Promise<Vehicle | undefined> {
    const vehicle = this.vehicles.get(slNo);
    if (!vehicle) return undefined;
    
    const updatedVehicle = { ...vehicle, ...updates };
    this.vehicles.set(slNo, updatedVehicle);
    return updatedVehicle;
  }

  async deleteVehicle(slNo: number): Promise<boolean> {
    return this.vehicles.delete(slNo);
  }
}

export const storage = new MemStorage();
