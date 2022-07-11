import {
  PluginInput,
  Plugin,
  ProcessedPluginEvent,
  Meta,
  RetryError,
} from "@posthog/plugin-scaffold";
import fetch, { Response } from "node-fetch";

interface PatternsPluginInput extends PluginInput {
  config: {
    webhookUrl: string;
  };
}

// Plugin method that runs on plugin load
export async function setupPlugin({ config }: Meta<PatternsPluginInput>) {}

// Plugin method that processes event
export const onEvent: Plugin<PatternsPluginInput>["onEvent"] = async (
  event: ProcessedPluginEvent,
  { config }: Meta<PatternsPluginInput>
) => {
  console.log("Sending to Patterns webhook...", config.webhookUrl);
  //   console.log({ event });
  let response: Response;
  try {
    response = await fetch(config.webhookUrl, {
      method: "POST",
      body: JSON.stringify(event),
    });
  } catch (e) {
    throw new RetryError("Failed to send event to Patterns webhook.");
  }
  if (response.status != 200) {
    const data = await response.json();
    throw new Error(
      `Failed to send event to Patterns: ${JSON.stringify(data)}`
    );
  }
  console.log("Success...");
};
