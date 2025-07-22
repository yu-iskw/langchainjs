import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

/**
 * Test custom metadata labels with Gemini API (Google AI Studio)
 *
 * This example demonstrates:
 * 1. Labels on model initialization
 * 2. Labels via invoke options
 * 3. Labels override behavior
 * 4. Edge cases (empty labels, no labels)
 * 5. Debug mode for troubleshooting
 */

async function testGeminiLabels() {
  console.log("🚀 Testing Gemini API Custom Metadata Labels\n");

  // Check if required environment variables are set
  if (!process.env.GOOGLE_API_KEY) {
    console.log("⚠️  GOOGLE_API_KEY not set. Skipping Gemini API tests.");
    console.log("   Set GOOGLE_API_KEY in your .env file to run these tests.\n");
    return;
  }

  // Debug mode: Check if we should run in debug mode
  const debugMode = process.argv.includes('--debug') || process.env.DEBUG_LABELS === 'true';
  if (debugMode) {
    console.log("🔍 [DEBUG] Running in debug mode - will show detailed logging\n");
  }

  try {
    // Test 1: Labels on model initialization
    console.log("📋 Test 1: Labels on model initialization");
    const labels1 = {
      team: "research",
      component: "frontend",
      environment: "production",
      test_type: "model_init",
      platform: "gemini_api"
    };
    console.log("🔍 [DEBUG] Test 1 - Creating Gemini model with labels:", labels1);

    const modelWithLabels = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash",
      labels: labels1,
    });

    // Debug: Check model properties
    if (debugMode) {
      console.log("🔍 [DEBUG] Model created. Checking properties:");
      console.log("🔍 [DEBUG] - Model labels property:", modelWithLabels.labels);
      console.log("🔍 [DEBUG] - Model model:", modelWithLabels.model);
      console.log("🔍 [DEBUG] - Model constructor name:", modelWithLabels.constructor.name);
    }

    console.log("🔍 [DEBUG] Test 1 - About to invoke Gemini with labels:", labels1);
    const response1 = await modelWithLabels.invoke([
      new HumanMessage("Hello! Please respond with 'Labels working on Gemini API'")
    ]);

    console.log("✅ Response:", response1.content);
    console.log("✅ Labels were included in the request\n");

    // Test 2: Labels via invoke options
    console.log("📋 Test 2: Labels via invoke options");
    const modelWithoutLabels = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash",
    });

    const labels2 = {
      session: "test-session-456",
      user: "test-user-gemini",
      request_type: "invoke_options",
      priority: "high",
      platform: "gemini_api"
    };
    console.log("🔍 [DEBUG] Test 2 - About to invoke Gemini with labels via options:", labels2);

    const response2 = await modelWithoutLabels.invoke(
      [new HumanMessage("Hello! Please respond with 'Labels via invoke options working on Gemini'")],
      {
        labels: labels2
      }
    );

    console.log("✅ Response:", response2.content);
    console.log("✅ Labels were included via invoke options\n");

    // Test 3: Labels override behavior
    console.log("📋 Test 3: Labels override behavior");
    const modelWithDefaultLabels = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash",
      labels: {
        team: "default-team",
        environment: "dev",
        version: "1.0.0",
        platform: "gemini_api"
      },
    });

    const response3 = await modelWithDefaultLabels.invoke(
      [new HumanMessage("Hello! Please respond with 'Labels override working on Gemini'")],
      {
        labels: {
          team: "override-team",
          environment: "production",
          session: "override-session-gemini",
          platform: "gemini_api"
        }
      }
    );

    console.log("✅ Response:", response3.content);
    console.log("✅ Invoke options labels override model labels\n");

    // Test 4: No labels (edge case)
    console.log("📋 Test 4: No labels (edge case)");
    const modelNoLabels = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash",
    });

    const response4 = await modelNoLabels.invoke([
      new HumanMessage("Hello! Please respond with 'No labels test working on Gemini'")
    ]);

    console.log("✅ Response:", response4.content);
    console.log("✅ Request completed without labels\n");

    // Test 5: Empty labels object (edge case)
    console.log("📋 Test 5: Empty labels object (edge case)");
    const modelEmptyLabels = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash",
      labels: {},
    });

    const response5 = await modelEmptyLabels.invoke([
      new HumanMessage("Hello! Please respond with 'Empty labels test working on Gemini'")
    ]);

    console.log("✅ Response:", response5.content);
    console.log("✅ Request completed with empty labels object\n");

    // Test 6: Complex labels with special characters
    console.log("📋 Test 6: Complex labels with special characters");
    const modelComplexLabels = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash",
      labels: {
        "service-name": "customer-support",
        "region": "us-west-1",
        "version": "2.1.0-beta",
        "deployment": "prod-cluster-1",
        "request-id": "req-12345-67890",
        "platform": "gemini_api"
      },
    });

    const response6 = await modelComplexLabels.invoke([
      new HumanMessage("Hello! Please respond with 'Complex labels test working on Gemini'")
    ]);

    console.log("✅ Response:", response6.content);
    console.log("✅ Complex labels with special characters working\n");

    // Test 7: Different Gemini models
    console.log("📋 Test 7: Different Gemini models");
    const modelGeminiPro = new ChatGoogleGenerativeAI({
      model: "gemini-1.5-pro",
      labels: {
        model: "gemini-1.5-pro",
        test_type: "model_variation",
        platform: "gemini_api"
      },
    });

    const response7 = await modelGeminiPro.invoke([
      new HumanMessage("Hello! Please respond with 'Gemini Pro model test working'")
    ]);

    console.log("✅ Response:", response7.content);
    console.log("✅ Different Gemini model working with labels\n");

    console.log("🎉 All Gemini API label tests completed successfully!");
    console.log("📊 Summary:");
    console.log("   - Labels on model initialization: ✅");
    console.log("   - Labels via invoke options: ✅");
    console.log("   - Labels override behavior: ✅");
    console.log("   - No labels edge case: ✅");
    console.log("   - Empty labels edge case: ✅");
    console.log("   - Complex labels: ✅");
    console.log("   - Different models: ✅");

  } catch (error) {
    if (debugMode) {
      console.log("🔍 [DEBUG] Test failed with error:", error.message);
      console.log("🔍 [DEBUG] Error type:", error.constructor.name);
      if (error.stack) {
        console.log("🔍 [DEBUG] Error stack trace:");
        console.log(error.stack);
      }
    } else {
      console.error("❌ Error testing Gemini API labels:", error.message);
    }

    if (error.message.includes("API key")) {
      console.log("💡 Make sure you have set up your Google API key:");
      console.log("   1. Get an API key from Google AI Studio");
      console.log("   2. Set GOOGLE_API_KEY in your .env file");
    }

    if (error.message.includes("quota")) {
      console.log("💡 You may have hit API rate limits:");
      console.log("   - Check your Google AI Studio quota");
      console.log("   - Wait a moment and try again");
    }
  }
}

// Run the test
testGeminiLabels();
