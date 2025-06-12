import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Supabase client setup
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  const { email, amount } = await req.json();

  // 🔍 Console log the incoming data
  console.log("=== INCOMING DATA ===");
  console.log("Raw email:", email);
  console.log("Raw amount:", amount);

  // ✅ Convert subcurrency back to original currency
  const originalAmount = amount / 100;

  // ✅ Logic to determine credits based on original currency value
  const creditsToAdd =
    originalAmount === 10 ? 1 : originalAmount === 20 ? 3 : 0;

  // 🔍 Console log the calculated values
  console.log("=== CALCULATED VALUES ===");
  console.log("Original amount:", originalAmount);
  console.log("Credits to add:", creditsToAdd);

  try {
    // ✅ First get current credits
    const { data: currentUser, error: fetchError } = await supabase
      .from("users")
      .select("credits")
      .eq("email", email)
      .single();

    if (fetchError) {
      console.error("Error fetching user:", fetchError);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 🔍 Console log current user data
    console.log("=== CURRENT USER DATA ===");
    console.log("Current user:", currentUser);
    console.log("Current credits:", currentUser.credits);

    const currentCredits = currentUser.credits || 0;
    const newCredits = currentCredits + creditsToAdd;

    // 🔍 Console log what will be stored
    console.log("=== DATA TO BE STORED ===");
    console.log("Current credits:", currentCredits);
    console.log("Credits to add:", creditsToAdd);
    console.log("New total credits:", newCredits);
    console.log("Email:", email);

    // ✅ Update with new credit total
    const { error: updateError } = await supabase
      .from("users")
      .update({ credits: newCredits })
      .eq("email", email);

    if (updateError) {
      console.error("Supabase Update Error:", updateError);
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    // 🔍 Console log success
    console.log("=== UPDATE SUCCESSFUL ===");
    console.log("Credits updated successfully for:", email);
    console.log("Final credits:", newCredits);

    return NextResponse.json({
      message: "Credits added successfully",
      creditsAdded: creditsToAdd,
      totalCredits: newCredits,
    });
  } catch (err) {
    console.error("=== API ERROR ===", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
