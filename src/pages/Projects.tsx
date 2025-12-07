import { useState } from "react";
import { Search, DollarSign, Users, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import mockData from "@/services/mockData";

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");

  const projects = mockData.getProjects();
  const vendors = mockData.getVendors();
  const financialSummary = mockData.getProjectFinancialSummary();
  const allocations = mockData.getProjectAllocations();

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group allocations by project
  const projectTeamMap = allocations.reduce(
    (acc: Record<string, (typeof allocations)[0][]>, allocation) => {
      if (!acc[allocation.projectId]) {
        acc[allocation.projectId] = [];
      }
      acc[allocation.projectId].push(allocation);
      return acc;
    },
    {}
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-2xl font-semibold text-black">Projects & Clients</h1>
        <p className="text-muted-foreground mt-1">Manage projects and financial tracking</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="clients">Vendors & Clients</TabsTrigger>
        </TabsList>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-4 mt-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search projects by name or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredProjects.map((project, index) => {
              const summary = financialSummary[project.id];
              const teamMembers = projectTeamMap[project.id] || [];
              const uniqueResources = new Set(teamMembers.map((a) => a.resourceName));

              return (
                <Card
                  key={project.id}
                  className="p-6 hover:shadow-md transition-all duration-200 animate-slide-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="space-y-4">
                    {/* Project Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-black text-lg">
                          {project.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {project.code}
                        </p>
                      </div>
                      <Badge className="bg-status-success/10 text-status-success border-status-success/20 border">
                        {project.status}
                      </Badge>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* Team Size */}
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Users className="w-4 h-4 text-gray-700" />
                          <span className="text-xs font-semibold text-gray-600 uppercase">
                            Team
                          </span>
                        </div>
                        <div className="text-xl font-bold text-black">
                          {uniqueResources.size}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          resources
                        </div>
                      </div>

                      {/* Total Cost */}
                      {summary && (
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <DollarSign className="w-4 h-4 text-green-700" />
                            <span className="text-xs font-semibold text-green-600 uppercase">
                              Cost
                            </span>
                          </div>
                          <div className="text-xl font-bold text-black">
                            ${(summary.totalCost / 1000).toFixed(1)}K
                          </div>
                          <div className="text-xs text-muted-foreground">
                            2026 total
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Project Details */}
                    <div className="space-y-2 text-sm pt-2 border-t border-gray-200">
                      {project.description && (
                        <p className="text-muted-foreground">{project.description}</p>
                      )}

                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-700" />
                        <span className="text-black font-medium">2026</span>
                      </div>

                      {project.sowReference && (
                        <div>
                          <span className="text-gray-600">SOW: </span>
                          <span className="font-medium text-black">
                            {project.sowReference}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Team Members Preview */}
                    {teamMembers.length > 0 && (
                      <div className="pt-2 border-t border-gray-200">
                        <p className="text-xs font-semibold text-gray-700 uppercase mb-2">
                          Team Members
                        </p>
                        <div className="space-y-1">
                          {teamMembers.slice(0, 3).map((member) => (
                            <div
                              key={member.id}
                              className="flex items-center justify-between text-xs"
                            >
                              <span className="text-black">{member.resourceName}</span>
                              <span className="text-gray-600">
                                {member.role}
                              </span>
                            </div>
                          ))}
                          {teamMembers.length > 3 && (
                            <p className="text-xs text-muted-foreground italic">
                              +{teamMembers.length - 3} more
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Quarterly Breakdown */}
                    {summary && (
                      <div className="pt-2 border-t border-gray-200">
                        <p className="text-xs font-semibold text-gray-700 uppercase mb-2">
                          Quarterly Costs
                        </p>
                        <div className="grid grid-cols-4 gap-2">
                          {[1, 2, 3, 4].map((quarter) => (
                            <div
                              key={quarter}
                              className="p-2 bg-gray-50 rounded text-center"
                            >
                              <div className="text-xs font-bold text-black">
                                Q{quarter}
                              </div>
                              <div className="text-xs text-green-700 font-semibold">
                                ${(
                                  summary.quarterlyBreakdown[quarter] / 1000
                                ).toFixed(0)}K
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="zebra-card p-12 text-center">
              <p className="text-muted-foreground">No projects match your search</p>
            </div>
          )}
        </TabsContent>

        {/* Clients Tab */}
        <TabsContent value="clients" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vendors.map((vendor, index) => (
              <Card
                key={vendor.id}
                className="p-6 hover:shadow-md transition-all duration-200 animate-slide-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-black text-lg">
                      {vendor.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Vendor / Service Provider
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Resources</span>
                      <span className="text-lg font-bold text-black">
                        {vendor.resourceCount}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Location</span>
                      <span className="text-sm font-medium text-black">
                        {vendor.location}
                      </span>
                    </div>
                  </div>

                  {/* Resource List */}
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs font-semibold text-gray-700 uppercase mb-2">
                      Resources
                    </p>
                    <div className="space-y-1">
                      {allocations
                        .filter((a) => a.vendor === vendor.name)
                        .slice(0, 3)
                        .map((allocation) => (
                          <div
                            key={allocation.id}
                            className="flex items-center justify-between text-xs"
                          >
                            <span className="text-black">
                              {allocation.resourceName}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {allocation.role}
                            </Badge>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
