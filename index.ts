import { PluginEvent, PluginMeta, PluginInput } from "@posthog/plugin-scaffold";

// Plugin method that runs on plugin load
export async function setupPlugin({ config }: PluginMeta<PluginInput>) {
  console.log("Setting up the Patterns plugin", config);
}

// Plugin method that processes event
export async function onEvent(
  event: PluginEvent,
  meta: PluginMeta<PluginInput>
) {
  console.log("Sending to Patterns webhook...");
  console.log({ event });
  console.log("Success...");
}
