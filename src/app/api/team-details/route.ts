import { NextResponse } from "next/server";
import { BigQuery } from "@google-cloud/bigquery";
import path from "path";

// Define the TeamDetails type based on table schema
export interface TeamDetails {
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

export async function GET() {
  try {
    // Initialize BigQuery client with credentials
    const credentialsPath = path.join(
      process.cwd(),
      process.env.GOOGLE_APPLICATION_CREDENTIALS || "gcp_cred.json"
    );

    const bigquery = new BigQuery({
      keyFilename: credentialsPath,
    });

    // Query to get all data from TEAM_DETAILS table
    const query = `
      SELECT 
        NAME,
        TECHNOLOGY,
        COMPANY,
        LOCATION,
        BU,
        PROJECT_TIED_TO,
        CURRENT_END_DATE,
        START_DATE,
        NEW_END_DATE,
        INDIVIDUALK,
        TOTAL,
        FUTURE_ASSIGNMENTS,
        SOW_BILLED_UNDER,
        COMMENTS
      FROM \`RESOURCE_PLANNING.TEAM_DETAILS\`
    `;

    const [rows] = await bigquery.query({ query });

    return NextResponse.json({
      success: true,
      data: rows as TeamDetails[],
      count: rows.length,
    });
  } catch (error) {
    console.error("BigQuery Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch team details",
      },
      { status: 500 }
    );
  }
}
