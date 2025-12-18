"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, MapPin, Building2, Briefcase, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

// Define the TeamDetails type based on BigQuery table schema
interface TeamDetails {
  NAME: string | null;
  TECHNOLOGY: string | null;
  COMPANY: string | null;
  LOCATION: string | null;
  BU: string | null;
  PROJECT_TIED_TO: string | null;
  CURRENT_END_DATE: string | null;
  START_DATE: string | null;
  NEW_END_DATE: string | null;
  INDIVIDUALK: number | null;
  TOTAL: number | null;
  FUTURE_ASSIGNMENTS: string | null;
  SOW_BILLED_UNDER: string | null;
  COMMENTS: string | null;
}

export default function PeoplePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCompany, setFilterCompany] = useState<string | null>(null);
  const [teamDetails, setTeamDetails] = useState<TeamDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from BigQuery on component mount
  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/team-details");
        const result = await response.json();

        if (result.success) {
          setTeamDetails(result.data);
        } else {
          setError(result.error || "Failed to fetch team details");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch team details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamDetails();
  }, []);

  // Get unique companies for filter
  const companies = useMemo(() => {
    const companyList = teamDetails.map((t) => t.COMPANY).filter((c): c is string => c !== null && c !== undefined);
    return Array.from(new Set(companyList));
  }, [teamDetails]);

  const filteredResources = useMemo(() => {
    return teamDetails.filter((person) => {
      const matchesSearch =
        (person.NAME?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (person.TECHNOLOGY?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (person.BU?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (person.PROJECT_TIED_TO?.toLowerCase() || "").includes(searchTerm.toLowerCase());

      const matchesCompany = !filterCompany || person.COMPANY === filterCompany;

      return matchesSearch && matchesCompany;
    });
  }, [searchTerm, filterCompany, teamDetails]);

  // Format date for display
  const formatDate = (dateValue: string | null) => {
    if (!dateValue) return "N/A";
    try {
      const date = new Date(dateValue);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateValue;
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-[hsl(var(--zebra-lime))]" />
          <p className="text-muted-foreground">Loading team details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p className="font-semibold">Error loading team details</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

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
          <div className="flex gap-2 flex-wrap">
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
            {companies.map((company) => (
              <button
                key={company}
                onClick={() => setFilterCompany(company)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filterCompany === company
                    ? "bg-[hsl(var(--zebra-lime))] text-black"
                    : "bg-gray-100 text-black hover:bg-gray-200"
                }`}
              >
                {company}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((person, index) => (
          <Card
            key={`${person.NAME}-${index}`}
            className="p-4 hover:shadow-md transition-all duration-200 animate-slide-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="space-y-3">
              {/* Header with Name */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-black text-lg">
                    {person.NAME || "Unknown"}
                  </h3>
                  {person.TECHNOLOGY && (
                    <Badge
                      variant="secondary"
                      className="bg-green-50 text-green-700 border-green-200 mt-1"
                    >
                      {person.TECHNOLOGY}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Company and Location */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-700" />
                  <span className="text-black font-medium">{person.COMPANY || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-700" />
                  <span className="text-muted-foreground">{person.LOCATION || "N/A"}</span>
                </div>
              </div>

              {/* Business Unit and Project */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-gray-700" />
                  <span className="text-muted-foreground">
                    {person.BU || "N/A"}
                  </span>
                </div>
                {person.PROJECT_TIED_TO && (
                  <div className="px-2 py-1 bg-color-blue-50 rounded text-color-blue-700 text-xs font-medium">
                    {person.PROJECT_TIED_TO}
                  </div>
                )}
              </div>

              {/* Future Assignments */}
              {person.FUTURE_ASSIGNMENTS && (
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-700 uppercase">
                    Future Assignments
                  </p>
                  <p className="text-sm text-muted-foreground">{person.FUTURE_ASSIGNMENTS}</p>
                </div>
              )}

              {/* Contract Dates */}
              <div className="pt-2 border-t border-gray-200 text-xs text-muted-foreground space-y-1">
                <div>Start: {formatDate(person.START_DATE)}</div>
                <div>Current End: {person.CURRENT_END_DATE || "N/A"}</div>
                {person.NEW_END_DATE && (
                  <div className="text-green-600 font-medium">New End: {formatDate(person.NEW_END_DATE)}</div>
                )}
                {person.INDIVIDUALK !== null && (
                  <div className="font-semibold text-black">
                    Individual K: ${person.INDIVIDUALK?.toLocaleString()}
                  </div>
                )}
                {person.TOTAL !== null && (
                  <div className="font-semibold text-black">
                    Total: ${person.TOTAL?.toLocaleString()}
                  </div>
                )}
              </div>

              {/* SOW Reference */}
              {person.SOW_BILLED_UNDER && (
                <div className="pt-2 border-t border-gray-200 text-xs">
                  <span className="text-gray-600">SOW: </span>
                  <span className="font-medium text-black">
                    {person.SOW_BILLED_UNDER}
                  </span>
                </div>
              )}

              {/* Comments */}
              {person.COMMENTS && (
                <div className="pt-2 border-t border-gray-200 text-xs">
                  <span className="text-gray-600">Comments: </span>
                  <span className="text-muted-foreground">
                    {person.COMMENTS}
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
