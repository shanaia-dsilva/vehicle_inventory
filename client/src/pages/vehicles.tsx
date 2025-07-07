import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Truck, Plus, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import VehicleFilters from "@/components/vehicle-filters";
import VehicleTable from "@/components/vehicle-table";
import AddVehicleModal from "@/components/add-vehicle-modal";
import type { Vehicle } from "@shared/schema";

interface VehicleFilters {
  vehicleType?: string;
  acStatus?: number;
  seatCapacity?: number;
  seatCapacityType?: 'exact' | 'gte' | 'lte';
  minAge?: number;
  maxAge?: number;
  status?: string;
  search?: string;
}

export default function VehiclesPage() {
  const [filters, setFilters] = useState<VehicleFilters>({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data: vehicles = [], isLoading } = useQuery<Vehicle[]>({
    queryKey: ['/api/vehicles', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params.append(key, value.toString());
        }
      });
      
      const response = await fetch(`/api/vehicles?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch vehicles');
      }
      return response.json();
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Truck className="text-blue-600 text-2xl mr-3" />
              <h1 className="text-xl font-semibold text-gray-800">Vehicle Inventory Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Vehicle
              </Button>
              <div className="flex items-center text-sm text-gray-500">
                <UserCircle className="text-lg mr-2" />
                <span>Admin User</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <VehicleFilters 
            filters={filters} 
            onFiltersChange={setFilters}
          />

          {/* Main Content */}
          <main className="flex-1">
            <VehicleTable 
              vehicles={vehicles} 
              isLoading={isLoading}
            />
          </main>
        </div>
      </div>

      {/* Add Vehicle Modal */}
      <AddVehicleModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
