import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const formData = await request.formData();
    
    // Parse form entries
    const submission: Record<string, string> = {
      id: new Date().getTime().toString(),
      formId: id,
      timestamp: new Date().toISOString(),
    };

    formData.forEach((value, key) => {
      submission[key] = value.toString();
    });

    // Write to a local data file: data/submissions.json
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const filePath = path.join(dataDir, "submissions.json");
    let currentSubmissions = [];
    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        currentSubmissions = JSON.parse(fileContent);
      } catch (err) {
        currentSubmissions = [];
      }
    }

    currentSubmissions.push(submission);
    fs.writeFileSync(filePath, JSON.stringify(currentSubmissions, null, 2), "utf-8");

    console.log("Contact form submission received and saved:", submission);

    // Return success response in Contact Form 7 format
    return NextResponse.json({
      contact_form_id: parseInt(id) || 123,
      status: "mail_sent",
      message: "Thank you for your message. It has been sent.",
      posted_data_hash: "",
      into: "#",
      invalid_fields: [],
    });
  } catch (error) {
    console.error("Error saving form submission:", error);
    return NextResponse.json(
      {
        status: "validation_failed",
        message: "An error occurred while submitting your message. Please try again.",
        invalid_fields: [],
      },
      { status: 500 }
    );
  }
}
