# Excel Files Analysis Report
**Date:** December 7, 2025

---

## Overview

This report analyzes two Excel files used for resource planning:
1. **All SFDC Resource List 2.xlsx** - Current SFDC resource inventory
2. **External Resource Planning_2026_Updated.xlsx** - 2026 External resource planning and budgeting

---

## File 1: All SFDC Resource List 2.xlsx

### File Metadata
- **Total Rows:** 39
- **Total Columns:** 14
- **Location:** `Excel data/All SFDC Resource List 2.xlsx`

### Column Structure
1. Name
2. Technology
3. Company
4. Location
5. BU (Business Unit)
6. Project Tied To
7. Current End Date
8. Start Date
9. New End Date
10. Individualk (Individual ID?)
11. Total
12. Future Assignments
13. SOW Billed Under
14. Comments

### Sample Data (First 5 Rows)

| Row | Name | Technology | Company | BU | Project | Location |
|-----|------|------------|---------|----|---------:|----------|
| 0 | Pragya Porwal | Salesforce | CapGemini | Services | OneSupport Portal | India |
| 1 | Saurabh Nagpal | Salesforce | CapGemini | Services | Services DevOps | India |
| 2 | Akhila Gundu | Salesforce | CapGemini | Marketing | Marketing DevOps | India |
| 3 | Dhatchinamoorthy | Salesforce | CapGemini | Marketing | Marketing DevOps | India |
| 4 | Isha Parekh | Salesforce | Infosys | Marketing | [NULL] | India |

### Unique Values Analysis

#### Resources/People (34 unique individuals)
```
1. Pragya Porwal
2. Saurabh Nagpal
3. Akhila Gundu
4. Dhatchinamoorthy
5. Isha Parekh
6. Manisha Kumari
7. Sameer Pandey
8. Devanshu Mishra
9. Vinod Kumar Yadav
10. Sahana SS
11. Dhiraj Mahendra Mahate
12. Sundar Rajan Anbazhagan
13. Anujith Vinod
14. Architecture - Data
15. Data Resource
16. Gaurav Bisht
17. Asish Kumar Yadav
18. Ankita Roy
19. New Resource - SFDC
20. Mohit Kashyap
21. MohamedAmir Arther
22. Neha Gupta
23. Srabani Padhy
24. Manjunath Sarasetti
25. Karthik Ramachandran
26. Sunny David Boon
27. Karthy R
28. Priya N
29. Preetham Angya
30. Ulises Nathanael Medina Lopez
31. Lokesh SV
32. Veeresh
33. Arbaz N
34. Nitin Shivashankara
```

#### Companies (3 unique)
- CapGemini
- Infosys
- Zebra

#### Technologies (1 unique)
- Salesforce

#### Projects (10 unique)
- Channels DevOps
- Marketing DevOps
- Marketing Overall
- OneSupport Portal
- Sales DevOps
- Sales Overall
- Services DevOps
- Services Overall
- Supplies ZSQ
- Thales

#### Business Units (6 unique)
- Services
- Marketing
- Channels
- DATA
- Sales
- Salesforce

#### Locations (5 unique)
- India
- Canada
- Chicago
- Bangalore
- Mexico

---

## File 2: External Resource Planning_2026_Updated.xlsx

### File Metadata
- **Total Rows:** 21
- **Total Columns:** 43
- **Location:** `Excel data/External Resource Planning_2026_Updated.xlsx`

### Key Column Structure
1. **Name** - Resource name
2. **Project** - Project assignment
3. **Functional team** - Team assignment
4. **Monthly Rate** - Monthly billing rate
5. **Hourly Rate** - Hourly billing rate
6. **Duration** - Contract duration (months)
7. **Cost** - Total contract cost
8. **Role** - Job role/title
9. **Location** - Work location
10. **Vendor** - Vendor company
11. **Resource Name** - Resource identifier
12. **Budget** - Budget allocation
13. **Function** - Function type
14. Monthly columns (Jan-Dec 2026)
15. Quarterly summaries (Q1-Q4)

### Sample Data (First 5 Rows)

| Name | Project | Functional Team | Role | Vendor | Cost | Duration | Location |
|------|---------|-----------------|------|--------|------|----------|----------|
| Devanshu Mishra | NGPC | Channels | SFDC - Developer | Infosys | $29,899.43 | 5.0 | Offshore |
| Vinod Kumar Yadav | NGPC | Channels | SFDC - Developer | Infosys | $32,889.37 | 5.5 | Offshore |
| Sahana SS | NGPC | Channels | SFDC - Developer | Infosys | $32,889.37 | 5.5 | Offshore |
| Dhiraj Mahendra Mahate | NGPC | Channels | SFDC - Developer | Infosys | $35,879.31 | 6.0 | Offshore |
| Sundar Rajan Anbazhagan | NGPC | Channels | SFDC - Developer | Infosys | $35,879.31 | 6.0 | Offshore |

### Unique Values Analysis

#### Resources/People (13 unique individuals)
1. Anujith Vinod
2. Asish Kumar Yadav
3. Devanshu Mishra
4. Dhiraj Mahendra Mahate
5. GCP
6. Gaurav Bisht
7. Isha Parekh
8. Manisha Kumari
9. QA
10. Sahana SS
11. Sameer Replacement
12. Sundar Rajan Anbazhagan
13. Vinod Kumar Yadav

#### Projects (2 unique)
- NGPC
- Services

#### Vendors (3 unique)
- Cap (CapGemini)
- Infosys
- Tiger

#### Roles (4 unique)
- SFDC - Developer
- SFDC - Senior Developer
- GCP Resource
- QA Resource

#### Functional Teams (6 unique)
- Channels
- GCP
- Marketing
- QA
- Sales
- Services

#### Locations (2 unique)
- Offshore
- Onsite

### Cost Analysis

| Metric | Value |
|--------|-------|
| **Total Cost (all resources)** | $469,144.80 |
| **Average Cost per Resource** | $40,804.77 |
| **Minimum Cost** | $0.00 |
| **Maximum Cost** | $154,437.03 |

---

## Data Mapping & Relationships

### Common Resources Across Both Files
The following resources appear in both files:
1. Devanshu Mishra
2. Vinod Kumar Yadav
3. Sahana SS
4. Dhiraj Mahendra Mahate
5. Sundar Rajan Anbazhagan
6. Anujith Vinod
7. Asish Kumar Yadav
8. Gaurav Bisht
9. Isha Parekh
10. Manisha Kumari

### Observations

#### File 1 (SFDC Resource List)
- Focuses on current Salesforce technology resource inventory
- Contains 34 resources across 3 vendor companies
- Resources span 5 geographic locations
- All resources are assigned to Salesforce technology
- Contains 10 active projects
- Has data on current/future end dates and assignments

#### File 2 (2026 External Planning)
- Focuses on planned external resource allocation for 2026
- Contains 21 resources (subset of File 1 + some new entries like "GCP", "QA")
- Monthly budget tracking for all 12 months of 2026
- Includes hourly and monthly rate models
- Covers 2 main projects (NGPC and Services)
- Includes roles beyond SFDC (GCP, QA resources)
- Monthly cost breakdown with quarterly summaries

#### Key Differences
1. **File 1** emphasizes current state and project assignments
2. **File 2** emphasizes 2026 planning with monthly cost allocation
3. **Technology scope**: File 1 is SFDC-only, File 2 includes multi-tech (SFDC, GCP, QA)
4. **Project scope**: File 1 has 10 projects, File 2 consolidates to 2 main projects

---

## Recommendations for Application Integration

1. **Resource ID**: Consider adding a unique resource ID to both files for easier mapping
2. **Vendor Standardization**: Standardize vendor names (e.g., "Cap" vs "CapGemini")
3. **Project Mapping**: Create a mapping between File 1 projects and File 2's NGPC/Services consolidation
4. **Date Alignment**: Align start/end dates between files for consistency
5. **Cost Tracking**: Use File 2's monthly breakdown to track spending against File 1 allocations
6. **Role Standardization**: Standardize role naming (currently inconsistent naming patterns)
