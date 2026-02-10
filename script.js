const form = document.querySelector("form");
const input = document.getElementById("link");
const downloadBtn = document.getElementById("downloadBtn");

const qrDiv = document.createElement("div");
qrDiv.id = "qrcode";
document.querySelector(".QRContainer").appendChild(qrDiv);

let qrCode = null;

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const url = input.value.trim();

    if (!url) {
        alert("Enter a valid link");
        return;
    }

    qrDiv.innerHTML = ""; // clear old QR

    qrCode = new QRCode(qrDiv, {
        text: url,
        width: 200,
        height: 200,
    });

    // Show download button after QR is generated
    setTimeout(() => {
        downloadBtn.style.display = "block";
    }, 300);
});

downloadBtn.addEventListener("click", function () {
    const canvas = qrDiv.querySelector("canvas");

    if (!canvas) {
        alert("Generate a QR code first");
        return;
    }

    const imageURL = canvas.toDataURL("image/png");

    const a = document.createElement("a");
    a.href = imageURL;
    a.download = "qr-code.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});
