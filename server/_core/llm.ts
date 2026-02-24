import { ENV } from "./env";

export type Role = "system" | "user" | "assistant" | "tool" | "function";

export type TextContent = {
  type: "text";
  text: string;
};

export type ImageContent = {
  type: "image_url";
  image_url: {
    url: string;
    detail?: "auto" | "low" | "high";
  };
};

export type FileContent = {
  type: "file_url";
  file_url: {
    url: string;
    mime_type?: "audio/mpeg" | "audio/wav" | "application/pdf" | "audio/mp4" | "video/mp4" ;
  };
};

export type MessageContent = string | TextContent | ImageContent | FileContent;

export type Message = {
  role: Role;
  content: MessageContent | MessageContent[];
  name?: string;
  tool_call_id?: string;
};

export type Tool = {
  type: "function";
  function: {
    name: string;
    description?: string;
    parameters?: Record<string, unknown>;
  };
};

export type ToolChoicePrimitive = "none" | "auto" | "required";
export type ToolChoiceByName = { name: string };
export type ToolChoiceExplicit = {
  type: "function";
  function: {
    name: string;
  };
};

export type ToolChoice =
  | ToolChoicePrimitive
  | ToolChoiceByName
  | ToolChoiceExplicit;

export type InvokeParams = {
  messages: Message[];
  tools?: Tool[];
  toolChoice?: ToolChoice;
  tool_choice?: ToolChoice;
  maxTokens?: number;
  max_tokens?: number;
  outputSchema?: OutputSchema;
  output_schema?: OutputSchema;
  responseFormat?: ResponseFormat;
  response_format?: ResponseFormat;
};

export type ToolCall = {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
};

export type InvokeResult = {
  id: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: Role;
      content: string | Array<TextContent | ImageContent | FileContent>;
      tool_calls?: ToolCall[];
    };
    finish_reason: string | null;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

export type JsonSchema = {
  name: string;
  schema: Record<string, unknown>;
  strict?: boolean;
};

export type OutputSchema = JsonSchema;

export type ResponseFormat =
  | { type: "text" }
  | { type: "json_object" }
  | { type: "json_schema"; json_schema: JsonSchema };
const assertApiKey = () => {
  if (!ENV.forgeApiKey) {
    throw new Error("ANTHROPIC_API_KEY is not configured (set BUILT_IN_FORGE_API_KEY)");
  }
};

// Convert OpenAI-style messages to Anthropic format
function convertToAnthropicMessages(messages: Message[]): {
  system: string;
  anthropicMessages: Array<{ role: string; content: any }>;
} {
  let system = "";
  const anthropicMessages: Array<{ role: string; content: any }> = [];

  for (const msg of messages) {
    if (msg.role === "system") {
      const content = Array.isArray(msg.content)
        ? msg.content
            .map((c) => (typeof c === "string" ? c : "text" in c ? c.text : ""))
            .join("\n")
        : typeof msg.content === "string"
        ? msg.content
        : "";
      system += (system ? "\n\n" : "") + content;
      continue;
    }

    if (msg.role === "user" || msg.role === "assistant") {
      const contentParts = Array.isArray(msg.content)
        ? msg.content
        : [msg.content];

      const anthropicContent: any[] = [];

      for (const part of contentParts) {
        if (typeof part === "string") {
          anthropicContent.push({ type: "text", text: part });
        } else if (part.type === "text") {
          anthropicContent.push({ type: "text", text: part.text });
        } else if (part.type === "image_url") {
          // Convert image_url to Anthropic image format
          const url = part.image_url.url;
          if (url.startsWith("data:")) {
            const match = url.match(/^data:([^;]+);base64,(.+)$/);
            if (match) {
              anthropicContent.push({
                type: "image",
                source: {
                  type: "base64",
                  media_type: match[1],
                  data: match[2],
                },
              });
            }
          } else {
            anthropicContent.push({
              type: "image",
              source: { type: "url", url },
            });
          }
        } else if (part.type === "file_url") {
          // Convert file_url to Anthropic document/base64 format
          const url = part.file_url.url;
          const mimeType = part.file_url.mime_type || "application/octet-stream";

          if (url.startsWith("data:")) {
            const match = url.match(/^data:([^;]+);base64,(.+)$/);
            if (match) {
              const detectedMime = match[1];
              // For PDFs, use document type
              if (detectedMime === "application/pdf") {
                anthropicContent.push({
                  type: "document",
                  source: {
                    type: "base64",
                    media_type: "application/pdf",
                    data: match[2],
                  },
                });
              } else {
                // For audio and other files, include as base64 in text
                // (Anthropic doesn't natively support audio input in Messages API)
                anthropicContent.push({
                  type: "text",
                  text: `[Audio file attached: ${detectedMime}, ${Math.round(match[2].length * 0.75 / 1024)}KB. Please note: audio transcription from raw audio is not supported in this mode. The transcript will need to come from the browser's speech recognition.]`,
                });
              }
            }
          } else {
            anthropicContent.push({
              type: "text",
              text: `[File reference: ${url}]`,
            });
          }
        }
      }

      // If only one text part, simplify
      if (
        anthropicContent.length === 1 &&
        anthropicContent[0].type === "text"
      ) {
        anthropicMessages.push({
          role: msg.role,
          content: anthropicContent[0].text,
        });
      } else if (anthropicContent.length > 0) {
        anthropicMessages.push({
          role: msg.role,
          content: anthropicContent,
        });
      }
    }
  }

  return { system, anthropicMessages };
}

// Convert Anthropic tools format
function convertToolsToAnthropic(tools: Tool[]): any[] {
  return tools.map((tool) => ({
    name: tool.function.name,
    description: tool.function.description || "",
    input_schema: tool.function.parameters || { type: "object", properties: {} },
  }));
}

// Convert Anthropic response to OpenAI-compatible InvokeResult
function convertAnthropicResponse(response: any): InvokeResult {
  let textContent = "";
  const toolCalls: ToolCall[] = [];

  for (const block of response.content || []) {
    if (block.type === "text") {
      textContent += block.text;
    } else if (block.type === "tool_use") {
      toolCalls.push({
        id: block.id,
        type: "function",
        function: {
          name: block.name,
          arguments: JSON.stringify(block.input),
        },
      });
    }
  }

  return {
    id: response.id || "msg_" + Date.now(),
    created: Math.floor(Date.now() / 1000),
    model: response.model || "claude-sonnet-4-5-20250929",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: textContent,
          ...(toolCalls.length > 0 ? { tool_calls: toolCalls } : {}),
        },
        finish_reason:
          response.stop_reason === "end_turn"
            ? "stop"
            : response.stop_reason === "tool_use"
            ? "tool_calls"
            : response.stop_reason || "stop",
      },
    ],
    usage: response.usage
      ? {
          prompt_tokens: response.usage.input_tokens || 0,
          completion_tokens: response.usage.output_tokens || 0,
          total_tokens:
            (response.usage.input_tokens || 0) +
            (response.usage.output_tokens || 0),
        }
      : undefined,
  };
}

export async function invokeLLM(params: InvokeParams): Promise<InvokeResult> {
  assertApiKey();

  const {
    messages,
    tools,
    responseFormat,
    response_format,
  } = params;

  const { system, anthropicMessages } = convertToAnthropicMessages(messages);

  // If response format requests JSON, add instruction to system prompt
  const effectiveFormat = responseFormat || response_format;
  let systemPrompt = system;
  if (effectiveFormat) {
    if (effectiveFormat.type === "json_object" || effectiveFormat.type === "json_schema") {
      systemPrompt += "\n\nIMPORTANT: You MUST respond with valid JSON only. No other text, no markdown code fences, just the raw JSON.";
    }
  }

  const apiUrl = ENV.forgeApiUrl && ENV.forgeApiUrl.trim().length > 0
    ? `${ENV.forgeApiUrl.replace(/\/$/, "")}/v1/messages`
    : "https://api.anthropic.com/v1/messages";

  const payload: Record<string, unknown> = {
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 8192,
    messages: anthropicMessages,
  };

  if (systemPrompt) {
    payload.system = systemPrompt;
  }

  if (tools && tools.length > 0) {
    payload.tools = convertToolsToAnthropic(tools);
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": ENV.forgeApiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Anthropic API invoke failed: ${response.status} ${response.statusText} – ${errorText}`
    );
  }

  const anthropicResult = await response.json();
  return convertAnthropicResponse(anthropicResult);
}
