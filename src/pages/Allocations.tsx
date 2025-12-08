import { useState } from "react";
import { Plus, Trash2, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import mockData from "@/services/mockData";

interface NewAllocation {
  resourceId: string;
  resourceName: string;
  projectId: string;
  projectName: string;
  role: string;
  vendor: string;
  hourlyRate: number;
  startDate: string;
  endDate: string;
  monthlyAllocations: { [key: string]: number };
  monthlyWorkdays: { [key: string]: number };
}

export default function Allocations() {
  const resources = mockData.getResources();
  const projects = mockData.getProjects();
  const allocations = mockData.getProjectAllocations();
  const [newAllocations, setNewAllocations] = useState<NewAllocation[]>([]);

  const [formData, setFormData] = useState({
    resourceId: "",
    projectId: "",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    januaryFte: "0.5",
    februaryFte: "0.5",
    marchFte: "0.5",
    aprilFte: "0.5",
    mayFte: "0.5",
    juneFte: "0.5",
    julyFte: "0.5",
    augustFte: "0.5",
    septemberFte: "0.5",
    octoberFte: "0.5",
    novemberFte: "0.5",
    decemberFte: "0.5",
  });

  const selectedResource = resources.find((r) => r.id === formData.resourceId);
  const selectedProject = projects.find((p) => p.id === formData.projectId);

  const months = [
    { key: "january", label: "Jan", month: "2026-01" },
    { key: "february", label: "Feb", month: "2026-02" },
    { key: "march", label: "Mar", month: "2026-03" },
    { key: "april", label: "Apr", month: "2026-04" },
    { key: "may", label: "May", month: "2026-05" },
    { key: "june", label: "Jun", month: "2026-06" },
    { key: "july", label: "Jul", month: "2026-07" },
    { key: "august", label: "Aug", month: "2026-08" },
    { key: "september", label: "Sep", month: "2026-09" },
    { key: "october", label: "Oct", month: "2026-10" },
    { key: "november", label: "Nov", month: "2026-11" },
    { key: "december", label: "Dec", month: "2026-12" },
  ];

  const workdays: { [key: string]: number } = {
    "2026-01": 21,
    "2026-02": 19,
    "2026-03": 21,
    "2026-04": 21,
    "2026-05": 21,
    "2026-06": 21,
    "2026-07": 23,
    "2026-08": 21,
    "2026-09": 21,
    "2026-10": 23,
    "2026-11": 21,
    "2026-12": 23,
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFteChange = (monthKey: string, value: string) => {
    setFormData({
      ...formData,
      [`${monthKey}Fte`]: value,
    });
  };

  const handleCreateAllocation = () => {
    if (!formData.resourceId || !formData.projectId) {
      alert("Please select both resource and project");
      return;
    }

    if (!selectedResource || !selectedProject) return;

    const monthlyAllocations: { [key: string]: number } = {};
    const monthlyWorkdays: { [key: string]: number } = {};

    months.forEach(({ key, month }) => {
      const fteKey = `${key}Fte` as keyof typeof formData;
      monthlyAllocations[month] = parseFloat(formData[fteKey] as string) || 0;
      monthlyWorkdays[month] = workdays[month];
    });

    const newAllocation: NewAllocation = {
      resourceId: selectedResource.id,
      resourceName: selectedResource.name,
      projectId: selectedProject.id,
      projectName: selectedProject.name,
      role: selectedResource.role || "Resource",
      vendor: selectedResource.vendor || "TBD",
      hourlyRate: selectedResource.hourlyRate || 35,
      startDate: formData.startDate,
      endDate: formData.endDate,
      monthlyAllocations,
      monthlyWorkdays,
    };

    setNewAllocations([...newAllocations, newAllocation]);

    // Reset form
    setFormData({
      resourceId: "",
      projectId: "",
      startDate: "2026-01-01",
      endDate: "2026-12-31",
      januaryFte: "0.5",
      februaryFte: "0.5",
      marchFte: "0.5",
      aprilFte: "0.5",
      mayFte: "0.5",
      juneFte: "0.5",
      julyFte: "0.5",
      augustFte: "0.5",
      septemberFte: "0.5",
      octoberFte: "0.5",
      novemberFte: "0.5",
      decemberFte: "0.5",
    });

    alert(`✓ Allocation created for ${selectedResource.name} on ${selectedProject.name}`);
  };

  const calculateTotalCost = (allocation: NewAllocation) => {
    let total = 0;
    months.forEach(({ month }) => {
      const fte = allocation.monthlyAllocations[month] || 0;
      const days = allocation.monthlyWorkdays[month] || 21;
      const monthlyCost = allocation.hourlyRate * fte * days * 8;
      total += monthlyCost;
    });
    return total;
  };

  const calculateMonthCost = (allocation: NewAllocation, month: string) => {
    const fte = allocation.monthlyAllocations[month] || 0;
    const days = allocation.monthlyWorkdays[month] || 21;
    return allocation.hourlyRate * fte * days * 8;
  };

  const deleteAllocation = (index: number) => {
    setNewAllocations(newAllocations.filter((_, i) => i !== index));
  };

  const totalNewAllocationsCost = newAllocations.reduce(
    (sum, allocation) => sum + calculateTotalCost(allocation),
    0
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-black">Manage Allocations</h1>
        <p className="text-muted-foreground mt-1">
          Create and manage resource allocations for projects
        </p>
      </div>

      <Tabs defaultValue="create">
        <TabsList className="mb-6">
          <TabsTrigger value="create">Create New Allocation</TabsTrigger>
          <TabsTrigger value="active" className="relative">
            Active Allocations ({allocations.length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="relative">
            Pending Allocations ({newAllocations.length})
            {newAllocations.length > 0 && (
              <span className="ml-2 w-5 h-5 rounded-full bg-status-warning text-background text-xs flex items-center justify-center">
                {newAllocations.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Create New Allocation Tab */}
        <TabsContent value="create" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-6 text-black">
              Create New Allocation
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Resource Selection */}
              <div className="space-y-2">
                <Label htmlFor="resource">Select Resource</Label>
                <Select
                  value={formData.resourceId}
                  onValueChange={(value) =>
                    handleSelectChange("resourceId", value)
                  }
                >
                  <SelectTrigger id="resource">
                    <SelectValue placeholder="Choose a resource" />
                  </SelectTrigger>
                  <SelectContent>
                    {resources.map((resource) => (
                      <SelectItem key={resource.id} value={resource.id}>
                        {resource.name} ({resource.company})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Project Selection */}
              <div className="space-y-2">
                <Label htmlFor="project">Select Project</Label>
                <Select
                  value={formData.projectId}
                  onValueChange={(value) =>
                    handleSelectChange("projectId", value)
                  }
                >
                  <SelectTrigger id="project">
                    <SelectValue placeholder="Choose a project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name} ({project.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Start Date */}
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
              </div>

              {/* End Date */}
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Resource & Project Summary */}
            {selectedResource && selectedProject && (
              <div className="mb-6 p-4 bg-muted rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Resource</p>
                    <p className="font-semibold text-black">
                      {selectedResource.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Company</p>
                    <p className="font-semibold text-black">
                      {selectedResource.company}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Project</p>
                    <p className="font-semibold text-black">
                      {selectedProject.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Hourly Rate</p>
                    <p className="font-semibold text-black">
                      ${selectedResource.hourlyRate}/hr
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Monthly FTE Grid */}
            <div className="space-y-4">
              <h3 className="font-semibold text-black">
                Monthly FTE Allocation (0.0 - 1.0)
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-3">
                {months.map(({ key, label }) => (
                  <div key={key} className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">
                      {label}
                    </label>
                    <Input
                      type="number"
                      min="0"
                      max="1"
                      step="0.1"
                      value={formData[`${key}Fte` as keyof typeof formData]}
                      onChange={(e) => handleFteChange(key, e.target.value)}
                      className="h-9 text-center"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Create Button */}
            <div className="mt-8 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setFormData({
                    resourceId: "",
                    projectId: "",
                    startDate: "2026-01-01",
                    endDate: "2026-12-31",
                    januaryFte: "0.5",
                    februaryFte: "0.5",
                    marchFte: "0.5",
                    aprilFte: "0.5",
                    mayFte: "0.5",
                    juneFte: "0.5",
                    julyFte: "0.5",
                    augustFte: "0.5",
                    septemberFte: "0.5",
                    octoberFte: "0.5",
                    novemberFte: "0.5",
                    decemberFte: "0.5",
                  });
                }}
              >
                Clear Form
              </Button>
              <Button
                onClick={handleCreateAllocation}
                className="gap-2 bg-[hsl(var(--zebra-lime))] text-black hover:brightness-95 font-medium"
              >
                <Plus className="w-4 h-4" />
                Create Allocation
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Active Allocations Tab */}
        <TabsContent value="active" className="space-y-4">
          {allocations.length > 0 ? (
            allocations.map((allocation, index) => {
              const totalCost = months.reduce((sum, { month }) => {
                const fte = allocation.monthlyAllocations[month] || 0;
                const days = allocation.monthlyWorkdays[month] || 21;
                return sum + allocation.hourlyRate * fte * days * 8;
              }, 0);

              return (
                <Card
                  key={index}
                  className="p-6"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-black">
                        {allocation.resourceName}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {allocation.projectName} • {allocation.role}
                      </p>
                    </div>
                    <Badge
                      className="bg-status-success text-background"
                      variant="default"
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-muted rounded-lg">
                    <div>
                      <p className="text-xs text-muted-foreground">Vendor</p>
                      <p className="font-semibold text-black">{allocation.vendor}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Hourly Rate
                      </p>
                      <p className="font-semibold text-black">
                        ${allocation.hourlyRate.toFixed(2)}/hr
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Period
                      </p>
                      <p className="font-semibold text-black">
                        {allocation.startDate} to {allocation.endDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Total Cost
                      </p>
                      <p className="font-semibold text-black">
                        ${totalCost.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Monthly breakdown */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-black">
                      Monthly Breakdown
                    </h4>
                    <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-2">
                      {months.map(({ label, month }) => {
                        const fte = allocation.monthlyAllocations[month] || 0;
                        const cost = (
                          allocation.hourlyRate *
                          fte *
                          (allocation.monthlyWorkdays[month] || 21) *
                          8
                        ).toFixed(0);
                        return (
                          <div
                            key={month}
                            className="text-center p-2 bg-gray-50 rounded border border-border"
                          >
                            <p className="text-xs font-medium text-muted-foreground">
                              {label}
                            </p>
                            <p className="text-sm font-semibold text-black">
                              {fte.toFixed(1)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              ${parseInt(cost) > 0 ? (parseInt(cost) / 1000).toFixed(1) : 0}K
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Card>
              );
            })
          ) : (
            <Card className="p-6 text-center text-muted-foreground">
              <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p>No active allocations yet</p>
            </Card>
          )}
        </TabsContent>

        {/* Pending Allocations Tab */}
        <TabsContent value="pending" className="space-y-4">
          {newAllocations.length > 0 ? (
            <>
              <div className="p-4 bg-status-warning/10 border border-status-warning/20 rounded-lg">
                <p className="text-sm font-medium text-black">
                  Total Pending Allocations Cost: $
                  {totalNewAllocationsCost.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>

              {newAllocations.map((allocation, index) => {
                const totalCost = calculateTotalCost(allocation);

                return (
                  <Card
                    key={index}
                    className="p-6"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-black">
                          {allocation.resourceName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {allocation.projectName} • {allocation.role}
                        </p>
                      </div>
                      <Badge
                        className="bg-status-warning text-background"
                        variant="default"
                      >
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-muted rounded-lg">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Vendor
                        </p>
                        <p className="font-semibold text-black">
                          {allocation.vendor}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Hourly Rate
                        </p>
                        <p className="font-semibold text-black">
                          ${allocation.hourlyRate.toFixed(2)}/hr
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Period
                        </p>
                        <p className="font-semibold text-black">
                          {allocation.startDate} to {allocation.endDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Total Cost
                        </p>
                        <p className="font-semibold text-black">
                          ${totalCost.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Monthly breakdown */}
                    <div className="space-y-2 mb-6">
                      <h4 className="text-sm font-medium text-black">
                        Monthly Breakdown
                      </h4>
                      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-2">
                        {months.map(({ label, month }) => {
                          const fte = allocation.monthlyAllocations[month] || 0;
                          const cost = calculateMonthCost(allocation, month);
                          return (
                            <div
                              key={month}
                              className="text-center p-2 bg-gray-50 rounded border border-border"
                            >
                              <p className="text-xs font-medium text-muted-foreground">
                                {label}
                              </p>
                              <p className="text-sm font-semibold text-black">
                                {fte.toFixed(1)}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                ${(cost / 1000).toFixed(1)}K
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button
                        className="flex-1 bg-[hsl(var(--zebra-lime))] text-black hover:brightness-95 font-medium"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve Allocation
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => deleteAllocation(index)}
                        className="text-status-error hover:bg-status-error/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </>
          ) : (
            <Card className="p-6 text-center text-muted-foreground">
              <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p>No pending allocations</p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
