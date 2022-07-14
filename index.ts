import {
  PluginInput,
  Plugin,
  ProcessedPluginEvent,
  Meta,
  RetryError,
  PluginEvent,
} from "@posthog/plugin-scaffold";
import fetch, { Response } from "node-fetch";

interface PatternsPluginInput extends PluginInput {
  config: {
    webhookUrl: string;
  };
}

// Plugin method that runs on plugin load
export async function setupPlugin({ config }: Meta<PatternsPluginInput>) {
  console.log("Loading Patterns app...");
}

// Plugin method that runs on each new event
export const onEvent: Plugin<PatternsPluginInput>["onEvent"] = async (
  event: ProcessedPluginEvent,
  { config }: Meta<PatternsPluginInput>
) => {
  console.log("Sending to Patterns webhook...", config.webhookUrl);
  //   console.log({ event });
  let response: Response;
  response = await fetch(config.webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });

  if (response.status != 200) {
    const data = await response.json();
    throw new Error(
      `Failed to send event to Patterns: ${JSON.stringify(data)}`
    );
  }
  console.log("Success...");
};

// Plugin method to export events
export const exportEvents: Plugin<PatternsPluginInput>["exportEvents"] = async (
  events: PluginEvent[],
  { config }: Meta<PatternsPluginInput>
) => {
  console.log("Exporting events to Patterns webhook...", config.webhookUrl);

  let response: Response;
  response = await fetch(config.webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(events),
  });

  if (response.status != 200) {
    const data = await response.json();
    throw new Error(
      `Failed to send event to Patterns: ${JSON.stringify(data)}`
    );
  }
  console.log("Success...");
};
