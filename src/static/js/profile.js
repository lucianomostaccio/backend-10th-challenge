const formLogout = document.querySelector("#form-logout");

formLogout?.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("Logout form submitted"); // Log form submission

  try {
    const response = await fetch("/api/sessions/current", {
      method: "DELETE",
    });
    console.log("Logout response status:", response.status); // Log the response status

    if (response.status === 204) {
      console.log("Session closed successfully, redirecting to login");
      window.location.href = "/login";
    } else {
      const error = await response.json();
      console.error("Error during logout:", error); // Log any errors during logout
      alert(error.message);
    }
  } catch (error) {
    console.error("Error closing the session:", error); // Log errors caught in the catch block
  }
});
