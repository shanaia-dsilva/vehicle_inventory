import { Eye, Edit, Trash2, Bus, Snowflake } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Vehicle } from "@shared/schema";

interface VehicleTableProps {
  vehicles: Vehicle[];
  isLoading: boolean;
}

export default function VehicleTable({ vehicles, isLoading }: VehicleTableProps) {
  const getVehicleAge = (mfgYear: number) => {
    return new Date().getFullYear() - mfgYear;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getVehicleIcon = (vehicleType: string) => {
    switch (vehicleType) {
      case 'Bus':
        return <Bus className="h-4 w-4 text-white" />;
      case 'Winger':
        return <Bus className="h-4 w-4 text-white" />;
      case 'TT':
        return <Bus className="h-4 w-4 text-white" />;
      default:
        return <Bus className="h-4 w-4 text-white" />;
    }
  };

  const getVehicleIconColor = (vehicleType: string) => {
    switch (vehicleType) {
      case 'Bus':
        return 'bg-blue-600';
      case 'Winger':
        return 'bg-yellow-600';
      case 'TT':
        return 'bg-purple-600';
      default:
        return 'bg-gray-600';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (vehicles.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <Bus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No vehicles found</h3>
            <p className="text-gray-500">Try adjusting your filters or add a new vehicle.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {/* Results Summary */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-700">1</span>-
              <span className="font-medium text-gray-700">{vehicles.length}</span> of{' '}
              <span className="font-medium text-gray-700">{vehicles.length}</span> vehicles
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Vehicle Details
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Specifications
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Registration
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Status
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.map((vehicle) => (
                <TableRow key={vehicle.slNo} className="hover:bg-gray-50">
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className={`h-10 w-10 rounded-full ${getVehicleIconColor(vehicle.vehicleType)} flex items-center justify-center`}>
                          {getVehicleIcon(vehicle.vehicleType)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{vehicle.regNo}</div>
                        <div className="text-sm text-gray-500">{vehicle.make} {vehicle.model}</div>
                        <div className="text-xs text-gray-500">Engine: {vehicle.engineNo}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center mb-1">
                        <span className="font-medium">{vehicle.vehicleType}</span>
                        <Badge 
                          variant={vehicle.acStatus === 1 ? "default" : "secondary"}
                          className={`ml-2 ${vehicle.acStatus === 1 ? 'bg-green-600' : 'bg-gray-500'}`}
                        >
                          {vehicle.acStatus === 1 && <Snowflake className="h-3 w-3 mr-1" />}
                          {vehicle.acStatus === 1 ? 'AC' : 'Non-AC'}
                        </Badge>
                      </div>
                      <div className="text-gray-500">
                        {vehicle.seatCapacity} seats • {vehicle.mfgYear} model
                      </div>
                      <div className="text-xs text-gray-500">Chassis: {vehicle.chassisNo}</div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      <div>{formatDate(vehicle.regDate)}</div>
                      <div className="text-gray-500">Age: {getVehicleAge(vehicle.mfgYear)} years</div>
                      <div className="text-xs text-gray-500">{vehicle.entityName}</div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge 
                      variant={vehicle.status === 'Active' ? "default" : "secondary"}
                      className={vehicle.status === 'Active' ? 'bg-green-600' : 'bg-gray-400'}
                    >
                      <span className="w-1.5 h-1.5 mr-1.5 bg-white rounded-full"></span>
                      {vehicle.status}
                    </Badge>
                    {vehicle.runningSite && (
                      <div className="text-xs text-gray-500 mt-1">{vehicle.runningSite}</div>
                    )}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </>
  );
}
