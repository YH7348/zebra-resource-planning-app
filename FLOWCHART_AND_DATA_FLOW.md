# Zebra Resource Planner - Complete Data Flow & Booking Process

## Overview
This document outlines how Excel data flows into the web application and how resource booking and management works step-by-step.

---

## PART 1: EXCEL TO APPLICATION DATA FLOW

### Step 1: Excel Data Source Files
**Source Files:**
- `All SFDC Resource List 2.xlsx` - Contains 39 resources with:
  - Resource names, technology skills, companies, locations
  - Business units, project assignments, contract dates
  - SOW (Statement of Work) references
  
- `External Resource Planning_2026_Updated.xlsx` - Contains 21 allocations with:
  - Monthly FTE allocations (Jan-Dec 2026)
  - Hourly rates ($34.5K - $42.5K per year)
  - Workdays per month for each allocation
  - Project assignments and vendor information

---

### Step 2: Data Extraction & Conversion
**Process:**
```
Excel Files
    ↓
Extract to JSON format
    ↓
Parse & Structure Data
    ↓
Create TypeScript Interfaces (Resource, Project, Allocation types)
```

**What happens:**
- Excel rows are converted to structured JavaScript objects
- Type safety is added with TypeScript interfaces
- Data validation ensures all required fields are present

---

### Step 3: Mock Data Service Creation
**File:** `src/services/mockData.ts` (667 lines)

**Purpose:** Central data layer that provides all application data

**Key Functions:**
```typescript
getResources()           // Returns all 34 resources
getProjects()            // Returns 2 active projects (NGPC, Services)
getProjectAllocations()  // Returns 5 allocations with monthly FTE
getVendors()             // Returns vendor list (CapGemini, Infosys, Tiger)
getFinancialData()       // Calculates monthly costs for all allocations
getResourceUtilization() // Calculates monthly FTE and utilization %
getProjectFinancialSummary() // Returns quarterly/monthly cost breakdowns
```

**Data Flow in Service:**
```
Raw Excel Data
    ↓
Processed & Enhanced with Calculations
    ↓
Stored as Constants
    ↓
Exported via Getter Functions
    ↓
Used by All Pages & Components
```

---

### Step 4: Financial Calculation Engine
**Core Formula:**
```
Monthly Cost = (Hourly Rate) × (FTE) × (Workdays) × 8
```

**Example Calculation:**
```
Resource: Devanshu Mishra
- Hourly Rate: $38.5/hour
- December 2026 FTE: 1.0 (100% allocated)
- December Workdays: 23
- Monthly Cost = $38.5 × 1.0 × 23 × 8 = $7,084

Quarterly Cost = Sum of 3 months
Yearly Cost = Sum of 12 months
```

---

### Step 5: Application Pages Load Data
**Dashboard (Automatically Updated)**
```
Mock Data Service
    ↓
Calculates KPIs:
  - Active Resources: 5 (number of allocations)
  - Active Projects: 2
  - Avg Utilization: 72% (calculated from FTE data)
  - Monthly Cost: $42.3K (current month total)
    ↓
Displays on Dashboard Widgets
```

**People Page**
```
getResources() → Returns all 34 resources
    ↓
Display in grid with:
  - Name, role, company, location
  - Skills, contract dates
  - Hourly rates
    ↓
Enable Search & Filtering
  - By company: CapGemini, Infosys, Tiger
  - By status: Active, Planned, Ending, Ended
```

**Projects Page**
```
getProjects() → Returns project list
getProjectAllocations() → Returns resource assignments
getProjectFinancialSummary() → Returns cost data
    ↓
Display Projects with:
  - Team members assigned
  - Total 2026 cost
  - Quarterly cost breakdown
  - Monthly cost visualization
    ↓
Display Vendors with:
  - Resource count per vendor
  - Assigned resources list
```

**Schedule Page**
```
getProjectAllocations() → Monthly FTE per resource
    ↓
Create 12-month timeline grid
    ↓
Color-code by utilization:
  - Gray (0% FTE)
  - Blue (<50% FTE)
  - Yellow (50-99% FTE)
  - Green (100% FTE)
    ↓
Show monthly details with costs
```

**Reports Page**
```
getFinancialData() → Monthly costs
getResourceUtilization() → Monthly FTE trends
    ↓
Generate Reports:
  - Financial: Project costs with quarterly charts
  - Utilization: Monthly FTE per resource
  - Trends: Cost & FTE progression over 12 months
    ↓
Display KPI Cards:
  - Total Cost: $507.6K (yearly)
  - Avg Monthly: $42.3K
  - Total Resources: 5
  - Avg Utilization: 72%
```

**Timesheets Page**
```
getProjectAllocations() → Resource-project assignments
getResources() → Resource names
    ↓
Generate timesheet entries:
  - Calculate daily hours from FTE: (FTE × 40 hours/week) ÷ 5 days
  - Example: 0.5 FTE = 4 hours/day
    ↓
Display 5-day week with:
  - Daily hour inputs
  - Project assignments
  - Total hours per week
    ↓
Track pending approvals:
  - Timesheet reviews needed
  - Unallocated resources
  - Tentative bookings
```

---

## PART 2: BOOKING & RESOURCE ALLOCATION FLOW

### Step 1: Resource Request Initiation
**Starting Point:**
```
Manager needs resource for project
    ↓
Checks available resources in "People" page
    ↓
Filters by:
  - Required skills/technology
  - Company/vendor preference
  - Availability (current utilization)
  - Location requirements
```

**Example:**
```
Need: Salesforce developer for NGPC project
Filter in People page:
  - Technology: Salesforce ✓
  - Company: CapGemini ✓
  - Available from: Jan 2026

Found: Pragya Porwal (CapGemini, Salesforce)
```

---

### Step 2: Check Availability & Utilization
**Location:** Schedule page or Reports page

```
1. View resource monthly allocation (Schedule page)
   - See current FTE for each month
   - Identify open capacity

2. Check utilization % (Reports page)
   - Green (100% FTE) = Fully booked
   - Yellow (50-99%) = Partially available
   - Blue (<50%) = Available capacity

3. Review monthly costs (Reports page)
   - Understand budget impact
   - Check project allocation cost
```

**Example:**
```
Pragya Porwal - December 2026:
- Current FTE: 0.5 (50%)
- Available FTE: 0.5 (50% capacity)
- Hourly Rate: $38.5
- Potential monthly cost for 0.5 FTE: $3,542
```

---

### Step 3: Create Booking / Allocation
**System Updates:**

1. **Add to ProjectAllocations:**
   ```
   {
     resourceId: "pragya_porwal",
     resourceName: "Pragya Porwal",
     projectId: "ngpc",
     projectName: "NextGen Platform",
     role: "Salesforce Developer",
     vendor: "CapGemini",
     hourlyRate: 38.5,
     monthlyAllocations: {
       "2026-01": 0.5,  // 50% allocated
       "2026-02": 0.75, // 75% allocated
       ...
     },
     monthlyWorkdays: {
       "2026-01": 21,   // 21 working days
       "2026-02": 19,   // 19 working days
       ...
     }
   }
   ```

2. **Financial Engine Calculates:**
   ```
   January 2026:
   Cost = $38.5 × 0.5 FTE × 21 workdays × 8 hours
   Cost = $3,234

   February 2026:
   Cost = $38.5 × 0.75 FTE × 19 workdays × 8 hours
   Cost = $4,398
   ```

---

### Step 4: System Updates & Cascading Changes
**Dashboard Updates (Real-time):**
```
When booking is added:
  ↓
Recalculate Active Resources count
  ↓
Recalculate Average Utilization %
  ↓
Recalculate Monthly Cost
  ↓
Update all widgets
```

**Schedule Page Updates:**
```
When booking is added:
  ↓
Add resource to timeline
  ↓
Update monthly FTE cells
  ↓
Update color coding based on new utilization
  ↓
Show updated monthly costs
```

**Reports Updates:**
```
When booking is added:
  ↓
Recalculate project financial summary
  ↓
Update quarterly cost charts
  ↓
Recalculate resource utilization trends
  ↓
Update KPI cards (cost increased)
```

**Projects Page Updates:**
```
When booking is added:
  ↓
Add resource to project team
  ↓
Recalculate project total cost
  ↓
Update quarterly cost breakdown
  ↓
Update vendor resource counts
```

---

### Step 5: Approval & Activation
**Workflow:**
```
Booking Created
    ↓
Appears in "Pending Actions" on Dashboard
  - Shows as "Tentative Booking" needing confirmation
    ↓
Manager Reviews in Settings/Admin
  - Checks financial impact
  - Verifies resource availability
  - Confirms skills match project needs
    ↓
Approve Booking
    ↓
Status changes to "Confirmed"
    ↓
Appears in Timesheets for resource to log hours
```

---

### Step 6: Timesheet Submission
**Resource's Perspective:**
```
Go to Timesheets page
    ↓
See booking for "NextGen Platform - Salesforce Developer"
    ↓
Enter hours for week:
  - Mon: 4h (50% FTE / 5 days)
  - Tue: 4h
  - Wed: 4h
  - Thu: 4h
  - Fri: 4h
  - Total: 20h
    ↓
Submit timesheet
    ↓
Appears in "Pending Review" for approval
```

**Manager's Perspective:**
```
Dashboard shows "Timesheet Approvals: 3"
    ↓
Go to Settings/Notifications
    ↓
Review submitted timesheets
    ↓
Verify hours match allocation:
  - Expected: 20h (4h × 5 days for 0.5 FTE)
  - Submitted: 20h ✓
    ↓
Approve or Request Changes
    ↓
Once approved:
  - Updates resource utilization record
  - Triggers billing/invoicing
  - Archives for audit trail
```

---

### Step 7: Billing & Financial Close
**Monthly Cycle:**
```
All timesheets for month approved
    ↓
System calculates actual billed hours
    ↓
Financial Summary Generated:
  - Resource: Pragya Porwal
  - Project: NGPC
  - Hours: 100h (100% FTE for month)
  - Rate: $38.5/hour
  - Amount: $3,850
    ↓
Invoice Created
    ↓
Sent to vendor/client
    ↓
Payment processed
```

---

## PART 2.5: BOOKING & RESOURCE ALLOCATION FLOW DIAGRAM

```
┌──────────────────────────────────────────────────────────────────────┐
│                    MANAGER INITIATES REQUEST                         │
│         "I need resource for project XYZ from Jan-Mar 2026"          │
└──────────────────────────┬───────────────────────────────────────────┘
                           │
                           ↓
        ┌──────────────────────────────────────┐
        │    STEP 1: CHECK PEOPLE PAGE         │
        │  - Search by name/skill              │
        │  - Filter by company/status          │
        │  - Review hourly rates               │
        │  - View contract dates               │
        └──────────────────┬───────────────────┘
                           │
                           ↓
        ┌──────────────────────────────────────┐
        │  STEP 2: VERIFY AVAILABILITY         │
        │  (Schedule Page)                     │
        │  - Check current FTE allocation      │
        │  - Identify available capacity       │
        │  - View monthly utilization %        │
        │  - Review color-coded availability   │
        └──────────────────┬───────────────────┘
                           │
                           ↓
        ┌──────────────────────────────────────┐
        │  STEP 3: CALCULATE COST IMPACT       │
        │  (Reports Page)                      │
        │  - Review hourly rate                │
        │  - Calculate: Rate × FTE × Days × 8  │
        │  - Check project budget              │
        │  - Verify financial feasibility      │
        └──────────────────┬───────────────────┘
                           │
                           ↓
        ┌──────────────────────────────────────┐
        │  STEP 4: CREATE ALLOCATION           │
        │  - Add to ProjectAllocations         │
        │  - Set monthly FTE values            │
        │  - Assign resource to project        │
        │  - Financial engine calculates costs │
        └──────────────────┬───────────────────┘
                           │
                           ↓
    ┌──────────────────────┴──────────────────────┐
    │                                              │
    ↓                                              ↓
┌────────────────────────┐        ┌────────────────────────┐
│ SYSTEM UPDATES:        │        │ SYSTEM UPDATES:        │
│ Dashboard              │        │ Other Pages            │
│ - Recalc Resources     │        │ Projects Page:         │
│ - Recalc Utilization % │        │ - Add team member      │
│ - Recalc Monthly Cost  │        │ - Update project cost  │
│ - Update KPI Cards     │        │ Schedule Page:         │
│                        │        │ - Add to timeline      │
│ Pending Actions:       │        │ - Update FTE grid      │
│ - Show "Tentative      │        │ - Update color coding  │
│   Bookings: 1"         │        │ - Show monthly cost    │
└────────────────────────┘        └────────────────────────┘
    │                                      │
    └──────────────────┬───────────────────┘
                       │
                       ↓
        ┌──────────────────────────────────────┐
        │ STEP 5: SUBMIT FOR APPROVAL          │
        │ - Booking appears in Dashboard       │
        │ - "Pending Actions: Tentative        │
        │   Bookings: 1"                       │
        │ - Manager reviews allocation        │
        │ - Checks financial impact           │
        └──────────────────┬───────────────────┘
                           │
                    ┌──────┴──────┐
                    │             │
                    ↓             ↓
            ┌────────────┐   ┌─────────────┐
            │  APPROVE   │   │   REJECT    │
            │  BOOKING   │   │  BOOKING    │
            └─────┬──────┘   └──────┬──────┘
                  │                 │
                  ↓                 ↓
         ┌────────────────┐   ┌──────────────┐
         │ Status:        │   │ Return to    │
         │ CONFIRMED      │   │ Step 3:      │
         │                │   │ Adjust dates/│
         │ Move to next   │   │ FTE values   │
         │ step           │   │ Retry        │
         └────────┬───────┘   └──────────────┘
                  │
                  ↓
        ┌──────────────────────────────────────┐
        │ STEP 6: RESOURCE SUBMITS TIMESHEET   │
        │ - Go to Timesheets page              │
        │ - See booking assignments           │
        │ - Enter daily hours:                 │
        │   • Mon-Fri: (FTE × 8 hours)         │
        │   • Example: 0.5 FTE = 4h/day        │
        │ - Calculate weekly total             │
        │ - Submit for approval                │
        └──────────────────┬───────────────────┘
                           │
                           ↓
        ┌──────────────────────────────────────┐
        │ STEP 7: MANAGER APPROVES TIMESHEET   │
        │ - Dashboard: "Timesheet Approvals: X"│
        │ - Review submitted hours             │
        │ - Verify hours match allocation      │
        │ - Expected vs. Submitted comparison  │
        │ - Minor variances acceptable         │
        └──────────────────┬───────────────────┘
                           │
                    ┌──────┴──────┐
                    │             │
                    ↓             ↓
            ┌────────────┐   ┌─────────────┐
            │  APPROVE   │   │  REQUEST    │
            │ TIMESHEET  │   │  CHANGES    │
            └─────┬──────┘   └──────┬──────┘
                  │                 │
                  ↓                 ↓
         ┌────────────────┐   ┌──────────────┐
         │ Status:        │   │ Return to    │
         │ APPROVED       │   │ resource for │
         │                │   │ correction   │
         │ Ready for      │   │              │
         │ billing        │   │              │
         └────────┬───────┘   └──────┬───────┘
                  │                  │
                  │                  │
                  └──────────┬───────┘
                             │
                             ↓
        ┌──────────────────────────────────────┐
        │ STEP 8: MONTHLY FINANCIAL CLOSE      │
        │ - All approved timesheets processed  │
        │ - Calculate actual billed hours      │
        │ - Generate invoice:                  │
        │   • Resource name                    │
        │   • Project name                     │
        │   • Total hours                      │
        │   • Hourly rate                      │
        │   • Total amount = Hours × Rate      │
        │ - Send to vendor/client              │
        │ - Record in financial system         │
        └──────────────────┬───────────────────┘
                           │
                           ↓
        ┌──────────────────────────────────────┐
        │ ARCHIVE & HISTORICAL TRACKING        │
        │ - Store all allocation history       │
        │ - Maintain audit trail               │
        │ - Enable resource analytics          │
        │ - Support capacity forecasting       │
        │ - Ready for next booking cycle       │
        └──────────────────────────────────────┘
```

---

## PART 3: DATA FLOW DIAGRAM

```
┌─────────────────────────────────────────────────────────────────┐
│                      EXCEL FILES                                 │
│  (All SFDC Resource List + Planning Data)                        │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ↓
        ┌────────────────────────┐
        │  Extract & Parse       │
        │  Convert to JSON       │
        └────────────┬───────────┘
                     │
                     ↓
        ┌────────────────────────────────────┐
        │  Mock Data Service                 │
        │  (mockData.ts - 667 lines)         │
        │  - Type Definitions                │
        │  - Data Storage                    │
        │  - Calculation Engine              │
        │  - Getter Functions                │
        └────────┬──────────────────┬────────┘
                 │                  │
    ┌────────────┼──────────┬───────┼──────────┬──────────┐
    │            │          │       │          │          │
    ↓            ↓          ↓       ↓          ↓          ↓
 Dashboard    People     Projects  Schedule  Reports  Timesheets
    │            │          │       │          │          │
    ├────────────┼──────────┼───────┼──────────┼──────────┤
    │            │          │       │          │          │
    ↓            ↓          ↓       ↓          ↓          ↓
Display KPIs  Search &  Team Cost  Timeline  Charts  Hour Entry
Update Stats  Filter    Assignment Tracking  Trends  Approval
              Cards
```

---

## PART 4: COMPLETE BOOKING WORKFLOW EXAMPLE

### Scenario: Add Saurabh Nagpal to Services DevOps for Feb-Mar 2026

**Step 1: Request Initiation**
- Manager: "Need Salesforce DevOps engineer for Services DevOps project"
- Period: February - March 2026
- Allocation: 75% FTE

**Step 2: Check Availability (People Page)**
- Search: "Saurabh Nagpal"
- Company: CapGemini ✓
- Technology: Salesforce ✓
- Status: Active ✓
- Hourly Rate: $40.5/hour ✓

**Step 3: Review Capacity (Schedule Page)**
- February 2026:
  - Current FTE: 0.5 (50%)
  - Available: 0.5 (50%)
  - Can allocate: 0.5 FTE ✓ (requesting 0.75 would exceed)
  - Decision: Allocate 0.5 FTE for February

- March 2026:
  - Current FTE: 0.75 (75%)
  - Available: 0.25 (25%)
  - Can allocate: 0.25 FTE (not sufficient for 0.75 request)
  - Decision: Allocate 0.25 FTE for March (or negotiate)

**Step 4: Verify Budget Impact (Reports Page)**
- February cost: $40.5 × 0.5 × 20 × 8 = $3,240
- March cost: $40.5 × 0.25 × 21 × 8 = $1,701
- Quarterly impact: +$4,941
- Project budget check: ✓ Within allocation

**Step 5: Create Booking**
```
New ProjectAllocation:
{
  resourceId: "saurabh_nagpal",
  resourceName: "Saurabh Nagpal",
  projectId: "services_devops",
  projectName: "Services DevOps",
  role: "Salesforce DevOps Engineer",
  vendor: "CapGemini",
  hourlyRate: 40.5,
  monthlyAllocations: {
    "2026-02": 0.5,
    "2026-03": 0.25
  },
  monthlyWorkdays: {
    "2026-02": 20,
    "2026-03": 21
  }
}
```

**Step 6: System Updates**
- Dashboard: Active Resources = 6, Avg Utilization = 73%
- Schedule: Updated grid showing new allocations
- Reports: Project cost increased by $4,941
- Projects Page: Saurabh added to Services DevOps team

**Step 7: Submit for Approval**
- Booking shows in Dashboard "Pending Actions: Tentative Bookings: 1"
- Manager approves allocation ✓

**Step 8: Timesheet Submission**
- Saurabh logs hours for Feb-Mar:
  - February: 4 hours/day × 5 days = 20 hours (matches 0.5 FTE)
  - March: 2 hours/day × 5 days = 10 hours (matches 0.25 FTE)
- Submits both timesheets

**Step 9: Timesheet Approval**
- Manager reviews:
  - Feb: 20h ✓ (expected: 20h)
  - Mar: 10h ✓ (expected: 10.5h) - Minor variance accepted
- Approves both ✓

**Step 10: Billing & Finalization**
- February invoice: $3,240
- March invoice: $1,701
- Total: $4,941 (matches budget estimate)
- Allocation complete and archived

---

## PART 5: KEY BENEFITS OF THIS SYSTEM

### For Managers:
1. **Real-time Visibility** - See all resources and allocations in one place
2. **Data-Driven Decisions** - Know exact costs before allocating resources
3. **Capacity Planning** - Identify available capacity per resource/month
4. **Budget Control** - Track spending against project budgets
5. **Trend Analysis** - Understand resource needs over time

### For Finance:
1. **Automated Calculations** - No manual cost calculations needed
2. **Accurate Billing** - Hourly rate × FTE × workdays formula ensures precision
3. **Audit Trail** - Complete history of all allocations and approvals
4. **Monthly Close** - Quick financial closing with approved timesheets
5. **Reporting** - Quarterly and yearly cost summaries ready to use

### For Resources:
1. **Clear Schedule** - See all project assignments and time allocations
2. **Hour Tracking** - Simple timesheet entry based on daily hours
3. **Workload Visibility** - Understand utilization percentage
4. **Fairness** - Transparent allocation and cost tracking

### For Executives:
1. **Portfolio Overview** - All projects, costs, and resources in Dashboard
2. **KPI Tracking** - Utilization %, active resources, monthly costs
3. **Trend Reporting** - Historical data for forecasting and planning
4. **Resource Efficiency** - Identify high-utilization vs. under-utilized resources

---

## SUMMARY

**Excel → Mock Data Service → 6 Application Pages**

The system transforms static Excel data into a dynamic, real-time resource planning application:
- Data flows from Excel through TypeScript interfaces
- Financial calculations happen automatically
- All pages stay synchronized through the central mock data service
- Booking requests trigger system-wide updates
- Timesheets validate allocations
- Reports provide management visibility

This eliminates manual spreadsheet work and provides instant visibility into resource capacity, costs, and utilization across the entire portfolio.

