"use client";

import { useState, useMemo } from "react";
import { Search, MapPin, Building2, Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import mockData from "@/services/mockData";

export default function PeoplePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCompany, setFilterCompany] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const resources = mockData.getResources();
  const vendors = mockData.getVendors();

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesSearch =
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        resource.businessUnit.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCompany = !filterCompany || resource.company === filterCompany;
      const matchesStatus = !filterStatus || resource.status === filterStatus;

      return matchesSearch && matchesCompany && matchesStatus;
    });
  }, [searchTerm, filterCompany, filterStatus, resources]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-status-success/10 text-status-success border-status-success/20";
      case "planned":
        return "bg-status-info/10 text-status-info border-status-info/20";
      case "ending":
        return "bg-color-message-yellow-background text-color-message-yellow border-color-message-yellow/20";
      case "ended":
        return "bg-color-message-red-background text-color-message-red border-color-message-red/20";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-2xl font-semibold text-black">People & Resources</h1>
        <p className="text-muted-foreground mt-1">
          Manage your team and resources - {filteredResources.length} resources
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 animate-slide-in">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, skill, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {/* Company Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterCompany(null)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filterCompany === null
                  ? "bg-[hsl(var(--zebra-lime))] text-black"
                  : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
            >
              All Companies
            </button>
            {vendors.map((vendor) => (
              <button
                key={vendor.id}
                onClick={() => setFilterCompany(vendor.name)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filterCompany === vendor.name
                    ? "bg-[hsl(var(--zebra-lime))] text-black"
                    : "bg-gray-100 text-black hover:bg-gray-200"
                }`}
              >
                {vendor.name}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex gap-2 ml-auto">
            <button
              onClick={() => setFilterStatus(null)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === null
                  ? "bg-[hsl(var(--zebra-lime))] text-black"
                  : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
            >
              All Status
            </button>
            {["active", "planned", "ending", "ended"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${
                  filterStatus === status
                    ? "bg-[hsl(var(--zebra-lime))] text-black"
                    : "bg-gray-100 text-black hover:bg-gray-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((resource, index) => (
          <Card
            key={resource.id}
            className="p-4 hover:shadow-md transition-all duration-200 animate-slide-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="space-y-3">
              {/* Header with Name and Status */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-black text-lg">
                    {resource.name}
                  </h3>
                  {resource.role && (
                    <p className="text-sm text-muted-foreground">
                      {resource.role}
                    </p>
                  )}
                </div>
                <Badge
                  className={`${getStatusColor(resource.status)} border`}
                  variant="outline"
                >
                  {resource.status}
                </Badge>
              </div>

              {/* Company and Location */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-700" />
                  <span className="text-black font-medium">{resource.company}</span>
                  {resource.vendor && (
                    <span className="text-muted-foreground">
                      ({resource.vendor})
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-700" />
                  <span className="text-muted-foreground">{resource.location}</span>
                </div>
              </div>

              {/* Department and Project */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-gray-700" />
                  <span className="text-muted-foreground">
                    {resource.businessUnit}
                  </span>
                </div>
                {resource.currentProject && resource.currentProject !== "Unassigned" && (
                  <div className="px-2 py-1 bg-color-blue-50 rounded text-color-blue-700 text-xs font-medium">
                    {resource.currentProject}
                  </div>
                )}
              </div>

              {/* Skills */}
              {resource.skills && resource.skills.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-700 uppercase">
                    Skills
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {resource.skills.map((skill, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Contract Dates */}
              <div className="pt-2 border-t border-gray-200 text-xs text-muted-foreground space-y-1">
                <div>Start: {resource.startDate}</div>
                <div>End: {resource.endDate}</div>
                {resource.hourlyRate && (
                  <div className="font-semibold text-black">
                    Rate: ${resource.hourlyRate}/hr
                  </div>
                )}
              </div>

              {/* SOW Reference */}
              {resource.sowBilledUnder && (
                <div className="pt-2 border-t border-gray-200 text-xs">
                  <span className="text-gray-600">SOW: </span>
                  <span className="font-medium text-black">
                    {resource.sowBilledUnder}
                  </span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="zebra-card p-12 text-center">
          <p className="text-muted-foreground">
            No resources match your search criteria
          </p>
        </div>
      )}
    </div>
  );
}
