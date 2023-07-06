console.log("window object : ", window);
if ("OTPCredential" in window) {
  console.log("OTPCredential function is avalable");
  window.addEventListener("load", (e) => {
    const input = document.querySelector('input[autocomplete="one-time-code"]');
    console.log({ input });
    if (!input) return;
    const ac = new AbortController();

    navigator.credentials
      .get({
        otp: { transport: ["sms"] },
        signal: ac.signal,
        mediation: "required",
      })
      .then((otp) => {
        console.log("inside then", { otp, input });
        input.value = otp.code;
        ac.abort();
      })
      .catch((err) => {
        ac.abort();
        console.error("inside catch : ", err);
      })
      .finally(() => {
        console.log("finally block");
      });
  });
}
