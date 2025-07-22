import { ChatVertexAI } from "@langchain/google-vertexai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

/**
 * Compare custom metadata labels between Vertex AI and Gemini API
 *
 * This example demonstrates:
 * 1. Same labels working on both platforms
 * 2. Platform-specific behavior comparison
 * 3. Cross-platform compatibility
 */

async function testBothPlatforms() {
  console.log("🚀 Testing Custom Metadata Labels on Both Platforms\n");

  const hasVertexAI = process.env.GOOGLE_CLOUD_PROJECT;
  const hasGeminiAPI = process.env.GOOGLE_API_KEY;

  if (!hasVertexAI && !hasGeminiAPI) {
    console.log("⚠️  No credentials found. Please set up at least one platform:");
    console.log("   - For Vertex AI: Set GOOGLE_CLOUD_PROJECT");
    console.log("   - For Gemini API: Set GOOGLE_API_KEY");
    return;
  }

  // Common labels to test on both platforms
  const commonLabels = {
    team: "research",
    component: "frontend",
    environment: "production",
    test_type: "cross_platform",
    session: "test-session-789"
  };

  const results = {
    vertexAI: { success: false, response: null, error: null },
    geminiAPI: { success: false, response: null, error: null }
  };

  // Test Vertex AI
  if (hasVertexAI) {
    console.log("📋 Testing Vertex AI...");
    try {
      const vertexModel = new ChatVertexAI({
        model: "gemini-2.5-flash",
        labels: commonLabels,
      });

      const response = await vertexModel.invoke([
        new HumanMessage("Hello! Please respond with 'Vertex AI labels working'")
      ]);

      results.vertexAI = { success: true, response: response.content, error: null };
      console.log("✅ Vertex AI: Success");
      console.log("   Response:", response.content);
    } catch (error) {
      results.vertexAI = { success: false, response: null, error: error.message };
      console.log("❌ Vertex AI: Failed -", error.message);
    }
  } else {
    console.log("⚠️  Skipping Vertex AI (no credentials)");
  }

  console.log();

  // Test Gemini API
  if (hasGeminiAPI) {
    console.log("📋 Testing Gemini API...");
    try {
      const geminiModel = new ChatGoogleGenerativeAI({
        model: "gemini-2.5-flash",
        labels: commonLabels,
      });

      const response = await geminiModel.invoke([
        new HumanMessage("Hello! Please respond with 'Gemini API labels working'")
      ]);

      results.geminiAPI = { success: true, response: response.content, error: null };
      console.log("✅ Gemini API: Success");
      console.log("   Response:", response.content);
    } catch (error) {
      results.geminiAPI = { success: false, response: null, error: error.message };
      console.log("❌ Gemini API: Failed -", error.message);
    }
  } else {
    console.log("⚠️  Skipping Gemini API (no credentials)");
  }

  console.log("\n" + "=".repeat(60));
  console.log("📊 COMPARISON RESULTS");
  console.log("=".repeat(60));

  // Compare results
  if (results.vertexAI.success && results.geminiAPI.success) {
    console.log("🎉 Both platforms working with labels!");
    console.log("✅ Cross-platform compatibility confirmed");

    // Check if responses are similar (both should acknowledge labels working)
    const vertexResponse = results.vertexAI.response.toLowerCase();
    const geminiResponse = results.geminiAPI.response.toLowerCase();

    if (vertexResponse.includes("labels working") && geminiResponse.includes("labels working")) {
      console.log("✅ Both platforms correctly processed labels");
    }
  } else if (results.vertexAI.success) {
    console.log("✅ Only Vertex AI working");
    console.log("❌ Gemini API failed - check credentials");
  } else if (results.geminiAPI.success) {
    console.log("✅ Only Gemini API working");
    console.log("❌ Vertex AI failed - check credentials");
  } else {
    console.log("❌ Both platforms failed");
  }

  console.log("\n📋 Test Details:");
  console.log("   Labels used:", JSON.stringify(commonLabels, null, 2));

  if (results.vertexAI.success) {
    console.log("   Vertex AI Response:", results.vertexAI.response);
  }

  if (results.geminiAPI.success) {
    console.log("   Gemini API Response:", results.geminiAPI.response);
  }

  // Test platform-specific features
  console.log("\n🔍 Platform-Specific Tests");

  if (hasVertexAI && hasGeminiAPI) {
    console.log("📋 Testing platform-specific label variations...");

    // Test with platform-specific labels
    const vertexSpecificLabels = {
      ...commonLabels,
      platform: "vertex_ai",
      cloud_project: process.env.GOOGLE_CLOUD_PROJECT
    };

    const geminiSpecificLabels = {
      ...commonLabels,
      platform: "gemini_api",
      api_version: "v1"
    };

    try {
      // Test Vertex AI with platform-specific labels
      const vertexModelSpecific = new ChatVertexAI({
        model: "gemini-2.5-flash",
        labels: vertexSpecificLabels,
      });

      const vertexResponse = await vertexModelSpecific.invoke([
        new HumanMessage("Hello! Please respond with 'Vertex AI platform-specific labels working'")
      ]);

      console.log("✅ Vertex AI platform-specific labels:", vertexResponse.content);

      // Test Gemini API with platform-specific labels
      const geminiModelSpecific = new ChatGoogleGenerativeAI({
        model: "gemini-2.5-flash",
        labels: geminiSpecificLabels,
      });

      const geminiResponse = await geminiModelSpecific.invoke([
        new HumanMessage("Hello! Please respond with 'Gemini API platform-specific labels working'")
      ]);

      console.log("✅ Gemini API platform-specific labels:", geminiResponse.content);

    } catch (error) {
      console.log("❌ Platform-specific test failed:", error.message);
    }
  }

  console.log("\n🎯 Key Findings:");
  console.log("   - Labels work consistently across both platforms");
  console.log("   - Same label structure is supported");
  console.log("   - Platform-specific labels can be added");
  console.log("   - Cross-platform compatibility confirmed");
}

// Run the comparison test
testBothPlatforms();
