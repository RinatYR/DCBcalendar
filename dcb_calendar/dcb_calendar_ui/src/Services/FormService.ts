export const sendContactForm = (data) => {
  return fetch("/rest/forms", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
