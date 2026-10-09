import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.LEXORA_BACKEND_URL ?? "http://127.0.0.1:8000";

export async function POST(request: NextRequest) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { detail: "Invalid JSON request." },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${BACKEND_URL}/api/v1/humanize`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(45000),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          detail:
            response.status === 422
              ? "Invalid text or humanizer settings."
              : "Humanization service is unavailable.",
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    const isTimeout =
      error instanceof Error &&
      (error.name === "TimeoutError" ||
        error.name === "AbortError");

    return NextResponse.json(
      {
        detail: isTimeout
          ? "The request timed out. Please try again."
          : "Could not connect to the backend.",
      },
      { status: isTimeout ? 504 : 502 }
    );
  }
}