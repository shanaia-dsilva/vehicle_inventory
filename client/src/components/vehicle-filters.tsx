import { Search, Filter, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

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

interface VehicleFiltersProps {
  filters: VehicleFilters;
  onFiltersChange: (filters: VehicleFilters) => void;
}

export default function VehicleFilters({ filters, onFiltersChange }: VehicleFiltersProps) {
  const updateFilter = (key: keyof VehicleFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  return (
    <Card className="w-80 h-fit">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters</h2>
        
        {/* Search */}
        <div className="mb-6">
          <Label className="block text-sm font-medium text-gray-700 mb-2">Search Vehicles</Label>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by registration, model..."
              className="pl-10"
              value={filters.search || ''}
              onChange={(e) => updateFilter('search', e.target.value)}
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Vehicle Type Filter */}
        <div className="mb-6">
          <Label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</Label>
          <Select value={filters.vehicleType || 'all'} onValueChange={(value) => updateFilter('vehicleType', value === 'all' ? undefined : value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Bus">Bus</SelectItem>
              <SelectItem value="Winger">Winger</SelectItem>
              <SelectItem value="TT">TT (Tempo Traveller)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* AC Status Filter */}
        <div className="mb-6">
          <Label className="block text-sm font-medium text-gray-700 mb-2">AC Status</Label>
          <RadioGroup 
            value={filters.acStatus?.toString() || 'all'} 
            onValueChange={(value) => updateFilter('acStatus', value === 'all' ? undefined : parseInt(value))}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="ac-all" />
              <Label htmlFor="ac-all" className="text-sm">All</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="ac-yes" />
              <Label htmlFor="ac-yes" className="text-sm">AC</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="0" id="ac-no" />
              <Label htmlFor="ac-no" className="text-sm">Non-AC</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Seat Capacity Filter */}
        <div className="mb-6">
          <Label className="block text-sm font-medium text-gray-700 mb-2">Seat Capacity</Label>
          <div className="space-y-3">
            <div>
              <Label className="block text-xs text-gray-500 mb-1">Filter Type</Label>
              <Select 
                value={filters.seatCapacityType || 'exact'} 
                onValueChange={(value) => updateFilter('seatCapacityType', value as 'exact' | 'gte' | 'lte')}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="exact">Exact Match</SelectItem>
                  <SelectItem value="gte">Minimum Seats (≥)</SelectItem>
                  <SelectItem value="lte">Maximum Seats (≤)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block text-xs text-gray-500 mb-1">
                {filters.seatCapacityType === 'exact' && 'Exact Seat Count'}
                {filters.seatCapacityType === 'gte' && 'Minimum Seats'}
                {filters.seatCapacityType === 'lte' && 'Maximum Seats'}
                {!filters.seatCapacityType && 'Exact Seat Count'}
              </Label>
              <Input
                type="number"
                placeholder={
                  filters.seatCapacityType === 'exact' ? "e.g., 45" :
                  filters.seatCapacityType === 'gte' ? "e.g., 10" :
                  filters.seatCapacityType === 'lte' ? "e.g., 50" :
                  "e.g., 45"
                }
                min="1"
                max="100"
                value={filters.seatCapacity || ''}
                onChange={(e) => updateFilter('seatCapacity', e.target.value ? parseInt(e.target.value) : undefined)}
              />
            </div>
          </div>
        </div>

        {/* Vehicle Age Filter */}
        <div className="mb-6">
          <Label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Age (Years)</Label>
          <div className="space-y-3">
            <div>
              <Label className="block text-xs text-gray-500 mb-1">Minimum Age</Label>
              <Input
                type="number"
                placeholder="0"
                min="0"
                max="50"
                value={filters.minAge || ''}
                onChange={(e) => updateFilter('minAge', e.target.value ? parseInt(e.target.value) : undefined)}
              />
            </div>
            <div>
              <Label className="block text-xs text-gray-500 mb-1">Maximum Age</Label>
              <Input
                type="number"
                placeholder="50"
                min="0"
                max="50"
                value={filters.maxAge || ''}
                onChange={(e) => updateFilter('maxAge', e.target.value ? parseInt(e.target.value) : undefined)}
              />
            </div>
          </div>
        </div>

        {/* Status Filter */}
        <div className="mb-6">
          <Label className="block text-sm font-medium text-gray-700 mb-2">Status</Label>
          <Select value={filters.status || 'all'} onValueChange={(value) => updateFilter('status', value === 'all' ? undefined : value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex space-x-2">
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
            <Filter className="h-4 w-4 mr-2" />
            Apply Filters
          </Button>
          <Button 
            variant="outline" 
            className="px-3"
            onClick={clearFilters}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
