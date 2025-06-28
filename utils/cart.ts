export function getOrCreateGuestCartToken() {
  let token = localStorage.getItem("cartToken");

  if (!token) {
    token = `guest-${crypto.randomUUID()}`;
    localStorage.setItem("cartToken", token);

    fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
  }

  return token;
}
