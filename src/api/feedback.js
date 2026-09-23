function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}

function getVisitorId(request) {
  const cookie = request.headers.get("Cookie") || "";

  const match = cookie.match(/portfolio_visitor=([^;]+)/);

  if (match) {
    return match[1];
  }

  return crypto.randomUUID();
}

async function getCounts(env) {
  return {
    approve: Number(await env.FEEDBACK_KV.get("approve")) || 0,
    disapprove: Number(await env.FEEDBACK_KV.get("disapprove")) || 0,
  };
}

export default async function onRequest(context) {
  const { request, env } = context;

  // =========================
  // GET
  // =========================

  if (request.method === "GET") {
    const visitorId = getVisitorId(request);

    const counts = await getCounts(env);

    const voted = await env.FEEDBACK_KV.get(
      `visitor:${visitorId}`
    );

    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const hasCookie =
      request.headers
        .get("Cookie")
        ?.includes("portfolio_visitor=");

    if (!hasCookie) {
      headers.append(
        "Set-Cookie",
        `portfolio_visitor=${visitorId}; Max-Age=31536000; Path=/; Secure; HttpOnly; SameSite=Lax`
      );
    }

    return new Response(
      JSON.stringify({
        ...counts,
        hasVoted: !!voted,
      }),
      {
        status: 200,
        headers,
      }
    );
  }

  // =========================
  // POST
  // =========================

  if (request.method === "POST") {
    let body;

    try {
      body = await request.json();
    } catch {
      return json(
        { error: "Invalid request body" },
        400
      );
    }

    const type = body.type;

    if (
      type !== "approve" &&
      type !== "disapprove"
    ) {
      return json(
        { error: "Invalid vote" },
        400
      );
    }

    const visitorId = getVisitorId(request);

    const existingVote =
      await env.FEEDBACK_KV.get(
        `visitor:${visitorId}`
      );

    if (existingVote) {
      const counts = await getCounts(env);

      return json({
        ...counts,
        hasVoted: true,
      });
    }

    const current =
      Number(await env.FEEDBACK_KV.get(type)) || 0;

    await env.FEEDBACK_KV.put(
      type,
      String(current + 1)
    );

    await env.FEEDBACK_KV.put(
      `visitor:${visitorId}`,
      type,
      {
        expirationTtl: 31536000,
      }
    );

    const counts = await getCounts(env);

    const headers = new Headers({
      "Content-Type": "application/json",
    });

    headers.append(
      "Set-Cookie",
      `portfolio_visitor=${visitorId}; Max-Age=31536000; Path=/; Secure; HttpOnly; SameSite=Lax`
    );

    return new Response(
      JSON.stringify({
        ...counts,
        hasVoted: true,
      }),
      {
        status: 200,
        headers,
      }
    );
  }

  // =========================
  // OTHER METHODS
  // =========================

  return json(
    { error: "Method not allowed" },
    405,
    {
      Allow: "GET, POST",
    }
  );
}