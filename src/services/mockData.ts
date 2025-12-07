/**
 * Mock Data Service
 * Integrates data from Excel files:
 * - All SFDC Resource List 2.xlsx
 * - External Resource Planning_2026_Updated.xlsx
 */

// ============ TYPE DEFINITIONS ============
export interface Resource {
  id: string;
  name: string;
  technology: string[];
  company: string;
  location: string;
  businessUnit: string;
  currentProject: string;
  endDate: string;
  startDate: string;
  sowBilledUnder: string;
  skills: string[];
  role?: string;
  vendor?: string;
  hourlyRate?: number;
  status: "active" | "ending" | "ended" | "planned";
}

export interface ProjectAllocation {
  id: string;
  resourceId: string;
  resourceName: string;
  projectId: string;
  projectName: string;
  role: string;
  vendor: string;
  hourlyRate: number;
  functionalTeam: string;
  location: string;
  monthlyAllocations: {
    [key: string]: number; // "2026-01": 0.5, "2026-02": 1.0, etc.
  };
  monthlyWorkdays: {
    [key: string]: number; // "2026-01": 21, etc.
  };
  startDate: string;
  endDate: string;
}

export interface Project {
  id: string;
  name: string;
  code: string;
  budget: string;
  sowReference: string;
  description?: string;
  status: "active" | "planned" | "completed";
}

export interface Vendor {
  id: string;
  name: string;
  location: string;
  resourceCount: number;
}

export interface FinancialData {
  resourceId: string;
  projectId: string;
  month: string;
  fte: number;
  workdays: number;
  hourlyRate: number;
  monthlyCost: number;
  quarterly?: number;
  yearly?: number;
}

// ============ RAW DATA FROM EXCEL ============

// All SFDC Resource List 2.xlsx
const resourceListData = [
  {
    name: "Pragya Porwal",
    technology: "Salesforce",
    company: "CapGemini",
    location: "India",
    bu: "Services",
    projectTiedTo: "OneSupport Portal",
    endDate: "2025-07-31",
    sowBilledUnder: "ZSP (eContract)",
  },
  {
    name: "Saurabh Nagpal",
    technology: "Salesforce",
    company: "CapGemini",
    location: "India",
    bu: "Services",
    projectTiedTo: "Services DevOps",
    endDate: "Business Extended",
    sowBilledUnder: "Business Funded",
  },
  {
    name: "Akhila Gundu",
    technology: "Salesforce",
    company: "CapGemini",
    location: "India",
    bu: "Marketing",
    projectTiedTo: "Marketing DevOps",
    endDate: "ENDED",
  },
  {
    name: "Dhatchinamoorthy",
    technology: "Salesforce",
    company: "CapGemini",
    location: "India",
    bu: "Marketing",
    projectTiedTo: "Marketing DevOps",
    endDate: "2025-12-31",
  },
  {
    name: "Isha Parekh",
    technology: "Salesforce",
    company: "Infosys",
    location: "India",
    bu: "Marketing",
    projectTiedTo: null,
    endDate: "2026-01-31",
  },
  {
    name: "Lavanya Bhambri",
    technology: "Salesforce",
    company: "Infosys",
    location: "India",
    bu: "Sales",
    projectTiedTo: "Zendesk",
    endDate: "2025-07-31",
  },
  {
    name: "Mishra",
    technology: "Salesforce",
    company: "Infosys",
    location: "India",
    bu: "Channels",
    projectTiedTo: "NG",
    endDate: "2026-06-30",
  },
  {
    name: "Yadav",
    technology: "Salesforce",
    company: "Infosys",
    location: "India",
    bu: "Channels",
    projectTiedTo: "NG",
    endDate: "2026-06-30",
  },
];

// External Resource Planning_2026_Updated.xlsx - Key allocations
const planningData = [
  {
    name: "Devanshu Mishra",
    project: "NGPC",
    functionalTeam: "Channels",
    hourlyRate: 34.5,
    role: "SFDC - Developer",
    location: "Offshore",
    vendor: "Infosys",
    allocations: {
      "2026-01": 0,
      "2026-02": 1,
      "2026-03": 1,
      "2026-04": 1,
      "2026-05": 1,
      "2026-06": 1,
      "2026-07": 0,
      "2026-08": 0,
      "2026-09": 0,
      "2026-10": 0,
      "2026-11": 0,
      "2026-12": 0,
    },
    workdays: {
      "2026-01": 21,
      "2026-02": 19,
      "2026-03": 22,
      "2026-04": 21,
      "2026-05": 20,
      "2026-06": 20,
      "2026-07": 23,
      "2026-08": 20,
      "2026-09": 22,
      "2026-10": 22,
      "2026-11": 21,
      "2026-12": 21,
    },
  },
  {
    name: "Vinod Kumar Yadav",
    project: "NGPC",
    functionalTeam: "Channels",
    hourlyRate: 34.5,
    role: "SFDC - Developer",
    location: "Offshore",
    vendor: "Infosys",
    allocations: {
      "2026-01": 0.5,
      "2026-02": 1,
      "2026-03": 1,
      "2026-04": 1,
      "2026-05": 1,
      "2026-06": 1,
      "2026-07": 0,
      "2026-08": 0,
      "2026-09": 0,
      "2026-10": 0,
      "2026-11": 0,
      "2026-12": 0,
    },
    workdays: {
      "2026-01": 21,
      "2026-02": 19,
      "2026-03": 22,
      "2026-04": 21,
      "2026-05": 20,
      "2026-06": 20,
      "2026-07": 23,
      "2026-08": 20,
      "2026-09": 22,
      "2026-10": 22,
      "2026-11": 21,
      "2026-12": 21,
    },
  },
  {
    name: "Sahana SS",
    project: "NGPC",
    functionalTeam: "Channels",
    hourlyRate: 34.5,
    role: "SFDC - Developer",
    location: "Offshore",
    vendor: "Infosys",
    allocations: {
      "2026-01": 0.5,
      "2026-02": 1,
      "2026-03": 1,
      "2026-04": 1,
      "2026-05": 1,
      "2026-06": 1,
      "2026-07": 1,
      "2026-08": 0.5,
      "2026-09": 0,
      "2026-10": 0,
      "2026-11": 0,
      "2026-12": 0,
    },
    workdays: {
      "2026-01": 21,
      "2026-02": 19,
      "2026-03": 22,
      "2026-04": 21,
      "2026-05": 20,
      "2026-06": 20,
      "2026-07": 23,
      "2026-08": 20,
      "2026-09": 22,
      "2026-10": 22,
      "2026-11": 21,
      "2026-12": 21,
    },
  },
  {
    name: "Pragya Porwal",
    project: "Services",
    functionalTeam: "Services",
    hourlyRate: 42.5,
    role: "SFDC - Senior Developer",
    location: "Offshore",
    vendor: "CapGemini",
    allocations: {
      "2026-01": 1,
      "2026-02": 1,
      "2026-03": 1,
      "2026-04": 0.75,
      "2026-05": 0.75,
      "2026-06": 0.75,
      "2026-07": 0.5,
      "2026-08": 0.5,
      "2026-09": 0.25,
      "2026-10": 0,
      "2026-11": 0,
      "2026-12": 0,
    },
    workdays: {
      "2026-01": 21,
      "2026-02": 19,
      "2026-03": 22,
      "2026-04": 21,
      "2026-05": 20,
      "2026-06": 20,
      "2026-07": 23,
      "2026-08": 20,
      "2026-09": 22,
      "2026-10": 22,
      "2026-11": 21,
      "2026-12": 21,
    },
  },
  {
    name: "Saurabh Nagpal",
    project: "Services",
    functionalTeam: "Services",
    hourlyRate: 42.5,
    role: "SFDC - Senior Developer",
    location: "Offshore",
    vendor: "CapGemini",
    allocations: {
      "2026-01": 1,
      "2026-02": 1,
      "2026-03": 1,
      "2026-04": 1,
      "2026-05": 1,
      "2026-06": 1,
      "2026-07": 1,
      "2026-08": 1,
      "2026-09": 0.5,
      "2026-10": 0.25,
      "2026-11": 0,
      "2026-12": 0,
    },
    workdays: {
      "2026-01": 21,
      "2026-02": 19,
      "2026-03": 22,
      "2026-04": 21,
      "2026-05": 20,
      "2026-06": 20,
      "2026-07": 23,
      "2026-08": 20,
      "2026-09": 22,
      "2026-10": 22,
      "2026-11": 21,
      "2026-12": 21,
    },
  },
];

// ============ CALCULATION ENGINE ============

/**
 * Calculate monthly cost using the formula:
 * Monthly Cost = (Hourly Rate) × (FTE) × (Workdays) × 8
 */
export function calculateMonthlyCost(
  hourlyRate: number,
  fte: number,
  workdays: number
): number {
  return hourlyRate * fte * workdays * 8;
}

/**
 * Calculate quarterly cost
 */
export function calculateQuarterlyCost(
  monthlyData: FinancialData[],
  quarter: number
): number {
  const quarters: Record<number, string[]> = {
    1: ["2026-01", "2026-02", "2026-03"],
    2: ["2026-04", "2026-05", "2026-06"],
    3: ["2026-07", "2026-08", "2026-09"],
    4: ["2026-10", "2026-11", "2026-12"],
  };

  return monthlyData
    .filter((d) => quarters[quarter].includes(d.month))
    .reduce((sum, d) => sum + d.monthlyCost, 0);
}

/**
 * Calculate yearly cost
 */
export function calculateYearlyCost(monthlyData: FinancialData[]): number {
  return monthlyData.reduce((sum, d) => sum + d.monthlyCost, 0);
}

/**
 * Calculate FTE utilization percentage
 */
export function calculateUtilization(
  allocations: Record<string, number>,
  _period: "month" | "quarter" | "year"
): number {
  const values = Object.values(allocations).filter((v) => v > 0);

  if (values.length === 0) return 0;

  const total = values.reduce((sum, v) => sum + v, 0);
  const average = total / values.length;

  return Math.round(average * 100);
}

// ============ MOCK DATA GENERATORS ============

/**
 * Generate resources from raw data
 */
export function getResources(): Resource[] {
  const resources: Resource[] = resourceListData.map((item, index) => ({
    id: `resource-${index + 1}`,
    name: item.name,
    technology: item.technology ? [item.technology] : [],
    company: item.company,
    location: item.location,
    businessUnit: item.bu,
    currentProject: item.projectTiedTo || "Unassigned",
    endDate: item.endDate,
    startDate: "2025-01-01",
    sowBilledUnder: item.sowBilledUnder || "N/A",
    skills: item.technology ? [item.technology] : [],
    status: item.endDate === "ENDED" ? "ended" : "active",
  }));

  // Add planning data with enhanced info
  planningData.forEach((planning) => {
    const existingResource = resources.find((r) =>
      r.name.toLowerCase().includes(planning.name.split(" ")[0].toLowerCase())
    );

    if (existingResource) {
      existingResource.hourlyRate = planning.hourlyRate;
      existingResource.vendor = planning.vendor;
      existingResource.role = planning.role;
    } else {
      resources.push({
        id: `resource-${resources.length + 1}`,
        name: planning.name,
        technology: ["Salesforce"],
        company: planning.vendor === "Infosys" ? "Infosys" : "CapGemini",
        location: planning.location,
        businessUnit: planning.functionalTeam,
        currentProject: planning.project,
        endDate: "2026-12-31",
        startDate: "2026-01-01",
        sowBilledUnder: planning.project,
        skills: ["Salesforce", planning.role],
        role: planning.role,
        vendor: planning.vendor,
        hourlyRate: planning.hourlyRate,
        status: "active",
      });
    }
  });

  return resources;
}

/**
 * Generate project allocations
 */
export function getProjectAllocations(): ProjectAllocation[] {
  return planningData.map((planning, index) => ({
    id: `allocation-${index + 1}`,
    resourceId: `resource-${index + 1}`,
    resourceName: planning.name,
    projectId: `project-${planning.project}`,
    projectName: planning.project,
    role: planning.role,
    vendor: planning.vendor,
    hourlyRate: planning.hourlyRate,
    functionalTeam: planning.functionalTeam,
    location: planning.location,
    monthlyAllocations: planning.allocations,
    monthlyWorkdays: planning.workdays,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
  }));
}

/**
 * Generate projects
 */
export function getProjects(): Project[] {
  return [
    {
      id: "project-NGPC",
      name: "NG (Next Generation)",
      code: "NGPC",
      budget: "NGPC",
      sowReference: "ZSP (eContract)",
      description: "Next Generation Salesforce Implementation",
      status: "active",
    },
    {
      id: "project-Services",
      name: "Services",
      code: "Services",
      budget: "Services",
      sowReference: "Business Funded",
      description: "Services and Support Projects",
      status: "active",
    },
  ];
}

/**
 * Generate vendors
 */
export function getVendors(): Vendor[] {
  const uniqueVendors = new Map<string, Vendor>();

  planningData.forEach((item) => {
    if (!uniqueVendors.has(item.vendor)) {
      uniqueVendors.set(item.vendor, {
        id: `vendor-${item.vendor}`,
        name: item.vendor,
        location: item.location,
        resourceCount: 0,
      });
    }
    const vendor = uniqueVendors.get(item.vendor)!;
    vendor.resourceCount += 1;
  });

  return Array.from(uniqueVendors.values());
}

/**
 * Generate financial data for all allocations
 */
export function getFinancialData(): FinancialData[] {
  const financialData: FinancialData[] = [];
  const allocations = getProjectAllocations();

  allocations.forEach((allocation) => {
    Object.entries(allocation.monthlyAllocations).forEach(([month, fte]) => {
      if (fte > 0) {
        const workdays = allocation.monthlyWorkdays[month] || 20;
        const monthlyCost = calculateMonthlyCost(
          allocation.hourlyRate,
          fte,
          workdays
        );

        financialData.push({
          resourceId: allocation.resourceId,
          projectId: allocation.projectId,
          month,
          fte,
          workdays,
          hourlyRate: allocation.hourlyRate,
          monthlyCost,
        });
      }
    });
  });

  return financialData;
}

/**
 * Get financial summary by project
 */
interface ProjectFinancialSummary {
  projectName: string;
  totalCost: number;
  quarterlyBreakdown: Record<number, number>;
  monthlyBreakdown: Record<string, number>;
  resourceCount: number;
}

export function getProjectFinancialSummary(): Record<string, ProjectFinancialSummary> {
  const financialData = getFinancialData();
  const allocations = getProjectAllocations();
  const summary: Record<string, ProjectFinancialSummary> = {};

  allocations.forEach((allocation) => {
    if (!summary[allocation.projectId]) {
      summary[allocation.projectId] = {
        projectName: allocation.projectName,
        totalCost: 0,
        quarterlyBreakdown: { 1: 0, 2: 0, 3: 0, 4: 0 },
        monthlyBreakdown: {},
        resourceCount: 0,
      };
    }
    summary[allocation.projectId].resourceCount += 1;
  });

  financialData.forEach((data) => {
    const projectId = data.projectId;
    if (summary[projectId]) {
      summary[projectId].totalCost += data.monthlyCost;
      summary[projectId].monthlyBreakdown[data.month] =
        (summary[projectId].monthlyBreakdown[data.month] || 0) +
        data.monthlyCost;

      // Determine quarter
      const monthNum = parseInt(data.month.split("-")[1]);
      const quarter = Math.ceil(monthNum / 3);
      summary[projectId].quarterlyBreakdown[quarter] += data.monthlyCost;
    }
  });

  return summary;
}

/**
 * Get resource utilization across all projects
 */
interface ResourceUtilizationData {
  resourceName: string;
  totalAllocation: number;
  avgUtilization: number;
  monthlyBreakdown: Record<string, number>;
}

export function getResourceUtilization(): Record<string, ResourceUtilizationData> {
  const allocations = getProjectAllocations();
  const utilization: Record<string, ResourceUtilizationData> = {};

  allocations.forEach((allocation) => {
    if (!utilization[allocation.resourceId]) {
      utilization[allocation.resourceId] = {
        resourceName: allocation.resourceName,
        totalAllocation: 0,
        avgUtilization: 0,
        monthlyBreakdown: {},
      };
    }

    const util = utilization[allocation.resourceId];
    Object.entries(allocation.monthlyAllocations).forEach(([month, fte]) => {
      util.totalAllocation += fte;
      util.monthlyBreakdown[month] =
        (util.monthlyBreakdown[month] || 0) + fte;
    });
  });

  // Calculate average utilization
  Object.values(utilization).forEach((util) => {
    const months = Object.values(util.monthlyBreakdown) as number[];
    if (months.length > 0) {
      util.avgUtilization = Math.round(
        (months.reduce((sum, v) => sum + v, 0) / months.length) * 100
      );
    }
  });

  return utilization;
}

export default {
  getResources,
  getProjectAllocations,
  getProjects,
  getVendors,
  getFinancialData,
  getProjectFinancialSummary,
  getResourceUtilization,
  calculateMonthlyCost,
  calculateQuarterlyCost,
  calculateYearlyCost,
  calculateUtilization,
};
