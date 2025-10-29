const requests = new Map();

export function rateLimit(identifier, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const entry = requests.get(identifier) || { count: 0, expiresAt: now + windowMs };

  if (entry.expiresAt < now) {
    entry.count = 0;
    entry.expiresAt = now + windowMs;
  }

  entry.count += 1;
  requests.set(identifier, entry);

  return {
    success: entry.count <= limit,
    remaining: Math.max(limit - entry.count, 0),
    reset: entry.expiresAt,
  };
}
