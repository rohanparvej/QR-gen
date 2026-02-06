const input = document.getElementById("qr-input");
const counter = document.getElementById("char-count");
const button = document.querySelector(".generate-btn");

const qrArt = document.getElementById("qr-art");
const qrResult = document.getElementById("qr-result");
const qrOutput = document.getElementById("qr-output");

const maxLength = 800;
let qrCode = null;

button.disabled = true;

/* Input handling */
input.addEventListener("input", () => {
  const length = input.value.length;
  counter.textContent = `${length} / ${maxLength}`;

  button.disabled = length === 0;
});

/* Generate QR */
button.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;

  // Switch UI
  qrArt.classList.add("hidden");
  qrResult.classList.remove("hidden");

  // Clear previous QR
  qrOutput.innerHTML = "";

  // Generate new QR
  qrCode = new QRCode(qrOutput, {
    text: text,
    width: 200,
    height: 200,
    colorDark: "#111827",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
});
const downloadBtn = document.querySelector(".download-btn");

downloadBtn.addEventListener("click", () => {
  const qrOutput = document.querySelector(".qr-output");

  if (!qrOutput) return;

  let dataUrl = null;

  // Case 1: QR rendered as canvas
  const canvas = qrOutput.querySelector("canvas");
  if (canvas) {
    dataUrl = canvas.toDataURL("image/png");
  }

  // Case 2: QR rendered as img
  const img = qrOutput.querySelector("img");
  if (img && img.src) {
    dataUrl = img.src;
  }

  if (!dataUrl) {
    console.error("No QR code found to download");
    return;
  }

  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = "qr-code.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
