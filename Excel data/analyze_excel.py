import pandas as pd

file1 = 'All SFDC Resource List 2.xlsx'
file2 = 'External Resource Planning_2026_Updated.xlsx'

print('='*100)
print('DETAILED ANALYSIS OF BOTH EXCEL FILES')
print('='*100)

# ===== FILE 1 =====
print('\n' + '='*100)
print('FILE 1: All SFDC Resource List 2.xlsx')
print('='*100)

df1 = pd.read_excel(file1)

print(f'\nShape: {df1.shape[0]} rows x {df1.shape[1]} columns')
print(f'\nColumn Names ({len(df1.columns)} total):')
for i, col in enumerate(df1.columns, 1):
    print(f'  {i}. {col}')

print(f'\n\nData Preview (First 5 rows):')
print('-'*100)
for idx, row in df1.head(5).iterrows():
    print(f'\nRow {idx}:')
    for col in ['Name', 'Technology', 'Company', 'BU', 'Project Tied To', 'Location']:
        if col in df1.columns:
            val = row[col]
            print(f'  {col}: {val}')

print(f'\n\nUnique Values Summary:')
print('-'*100)
name_unique = df1['Name'].dropna().unique()
print(f'Unique Names/Resources ({len(name_unique)}): {list(name_unique)}')

company_unique = df1['Company'].dropna().unique()
print(f'\nUnique Companies ({len(company_unique)}): {list(company_unique)}')

tech_unique = df1['Technology'].dropna().unique()
print(f'\nUnique Technologies ({len(tech_unique)}): {list(tech_unique)}')

proj_unique = df1['Project Tied To'].dropna().unique()
print(f'\nUnique Projects ({len(proj_unique)}):')
for proj in sorted(proj_unique):
    if pd.notna(proj):
        print(f'  - {proj}')

bu_unique = df1['BU'].dropna().unique()
print(f'\nUnique BUs ({len(bu_unique)}): {list(bu_unique)}')

loc_unique = df1['Location'].dropna().unique()
print(f'\nUnique Locations ({len(loc_unique)}): {list(loc_unique)}')

# ===== FILE 2 =====
print('\n\n' + '='*100)
print('FILE 2: External Resource Planning_2026_Updated.xlsx')
print('='*100)

df2 = pd.read_excel(file2)

print(f'\nShape: {df2.shape[0]} rows x {df2.shape[1]} columns')
print(f'\nKey Column Names:')
key_cols_to_show = ['Name', 'Project', 'Functional team', 'Role', 'Vendor', 'Resource Name', 'Cost', 'Duration', 'Location', 'Monthly Rate']
for col in key_cols_to_show:
    if col in df2.columns:
        print(f'  - {col}')

print(f'\n\nData Preview (First 5 rows - Key columns):')
print('-'*100)
for idx, row in df2.head(5).iterrows():
    print(f'\nRow {idx}:')
    for col in key_cols_to_show:
        if col in df2.columns:
            val = row[col]
            if pd.isna(val):
                val = '[NULL]'
            print(f'  {col}: {val}')

print(f'\n\nUnique Values Summary:')
print('-'*100)

resources = df2['Resource Name'].dropna().unique()
print(f'Unique Resource Names ({len(resources)}):')
for name in sorted(resources):
    print(f'  - {name}')

projects = df2['Project'].dropna().unique()
print(f'\nUnique Projects ({len(projects)}):')
for proj in sorted(projects):
    print(f'  - {proj}')

vendors = df2['Vendor'].dropna().unique()
print(f'\nUnique Vendors ({len(vendors)}):')
for vendor in sorted(vendors):
    print(f'  - {vendor}')

roles = df2['Role'].dropna().unique()
print(f'\nUnique Roles ({len(roles)}):')
for role in sorted(roles):
    print(f'  - {role}')

teams = df2['Functional team'].dropna().unique()
print(f'\nUnique Functional Teams ({len(teams)}):')
for team in sorted(teams):
    print(f'  - {team}')

locs = df2['Location'].dropna().unique()
print(f'\nUnique Locations ({len(locs)}):')
for loc in sorted(locs):
    print(f'  - {loc}')

print('\n\nCost Summary for File 2:')
total_cost = df2['Total Cost'].sum()
avg_cost = df2['Cost'].mean()
min_cost = df2['Cost'].min()
max_cost = df2['Cost'].max()
print(f'Total Cost: ${total_cost:,.2f}')
print(f'Average Cost per Resource: ${avg_cost:,.2f}')
print(f'Cost Range: ${min_cost:,.2f} - ${max_cost:,.2f}')
