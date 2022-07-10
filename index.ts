import {
  PluginInput,
  Plugin,
  ProcessedPluginEvent,
  Meta,
} from "@posthog/plugin-scaffold";

interface PatternsPluginInput extends PluginInput {
  config: {
    webhookUrl: string;
  };
}

// Plugin method that runs on plugin load
export async function setupPlugin({ config }: Meta<PatternsPluginInput>) {
  console.log("Setting up the Patterns plugin: ", config);
}

// Plugin method that processes event
export const onEvent: Plugin<PatternsPluginInput>["onEvent"] = (
  event: ProcessedPluginEvent,
  { config }: Meta<PatternsPluginInput>
) => {
  console.log("Sending to Patterns webhook...", config.webhookUrl);
  //   console.log({ event });
  console.log("Success...");
};
