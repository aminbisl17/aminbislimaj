const COOKIE_NAME = "feedback_voted";

export async function onRequestGet({ env, request }) {
  const approve = Number(
    (await env.FEEDBACK_KV.get("approve")) || 0
  );

  const disapprove = Number(
    (await env.FEEDBACK_KV.get("disapprove")) || 0
  );

  const cookie = request.headers.get("Cookie") || "";
  const hasVoted = cookie.includes(`${COOKIE_NAME}=true`);

  return Response.json({
    approve,
    disapprove,
    hasVoted,
  });
}

export async function onRequestPost({ env, request }) {
  try {
    const cookie = request.headers.get("Cookie") || "";

    if (cookie.includes(`${COOKIE_NAME}=true`)) {
      return Response.json(
        { error: "You have already voted." },
        { status: 409 }
      );
    }

    const body = await request.json();
    const { type } = body;

    if (type !== "approve" && type !== "disapprove") {
      return Response.json(
        { error: "Invalid feedback type." },
        { status: 400 }
      );
    }

    const key = type;

    const current = Number(
      (await env.FEEDBACK_KV.get(key)) || 0
    );

    const newCount = current + 1;

    await env.FEEDBACK_KV.put(
      key,
      String(newCount)
    );

    const approve = Number(
      (await env.FEEDBACK_KV.get("approve")) || 0
    );

    const disapprove = Number(
      (await env.FEEDBACK_KV.get("disapprove")) || 0
    );

    return new Response(
      JSON.stringify({
        approve,
        disapprove,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `${COOKIE_NAME}=true; Path=/; Max-Age=31536000; Secure; HttpOnly; SameSite=Lax`,
        },
      }
    );
  } catch (error) {
    console.error("Feedback error:", error);

    return Response.json(
      { error: "Failed to submit feedback." },
      { status: 500 }
    );
  }
}