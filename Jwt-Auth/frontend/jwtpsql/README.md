This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

🔎 Why JWTs are useful even if they "disappear" on reload

1. They let the server verify trust without storing session state

Traditional sessions: server keeps a session record in memory/DB keyed by a cookie.

JWTs: server signs the token with its secret key → the server can trust the token’s claims (sub, roles, expiry, etc.) without needing to look anything up.

This makes your backend stateless: it doesn’t need to remember every user session.

2. They encode identity & claims

The sub (subject) claim usually holds the user ID.

Other claims can hold roles, permissions, or tenant/shop info.

That way, when your backend sees the token, it immediately knows:

who the user is

what they’re allowed to do

when the token expires
…without another DB query (unless you need fresh data).

3. They’re short-lived on purpose

Access tokens (JWTs) are meant to be temporary — often just 5–15 minutes.

They’re disposable because you always have a refresh token in a secure, HttpOnly cookie to get a new one.

This reduces the blast radius if a token ever leaks (an attacker only gets a few minutes of access).

4. Even though your React state clears on reload, the refresh cookie makes JWTs work long-term

The fact you "discard" the access token in memory is actually a security feature.

Instead of persisting a sensitive JWT in localStorage (which XSS could steal), you regenerate it on every reload using the refresh token (which is HttpOnly and inaccessible to JS).

The refresh cookie is what persists your login across reloads, not the access token.

5. They’re portable

If you had multiple backend services (API Gateway, microservices, etc.), you wouldn’t want each one to look up a user session in a central DB.

Instead, you issue one signed JWT → every service can independently verify and trust it.

✅ So the benefit is:

Security → short-lived tokens limit risk.

Statelessness → server doesn’t need to track sessions.

Portability → multiple services can trust the same token.

Efficiency → backend can trust the token immediately without extra DB lookups.

Your current flow (discard on reload, refresh for a new one) is the industry best practice:

Keep access tokens short-lived and in memory only.

Use refresh tokens in HttpOnly cookies for persistence.

That way, you get the benefits of JWTs without the security downsides of storing them in localStorage