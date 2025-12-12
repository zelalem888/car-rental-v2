import React from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const printHistory = async (result) => {
  try {
    const r = result[0];

    // -----------------------------
    // FETCH VEHICLE
    // -----------------------------
    const vehicleResponse = await fetch(
      `http://localhost:3000/api/vehicle/${r.V_ID}`
    );
    const vehicleResult = await vehicleResponse.json();
    const vehicle = vehicleResult[0];

    // -----------------------------
    // FETCH CUSTOMER
    // -----------------------------
    const customerResponse = await fetch(
      `http://localhost:3000/api/user/admin/${r.C_ID}`
    );
    const customerResult = await customerResponse.json();
    const customer = customerResult[0];

    // -----------------------------
    // CREATE PDF
    // -----------------------------
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4
    const { width } = page.getSize();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // -----------------------------
    // TITLE ABOVE LOGO: SAMI Car Rental (Gradient)
    // -----------------------------
    const title = "SAMI Car Rental";
    const titleFontSize = 24;

    const segment1 = title.slice(0, 4); // "SAMI"
    const segment2 = title.slice(4, 8); // " Car"
    const segment3 = title.slice(8); // " Rental"

    const titleWidth1 = bold.widthOfTextAtSize(segment1, titleFontSize);
    const titleWidth2 = bold.widthOfTextAtSize(segment2, titleFontSize);
    const titleWidth3 = bold.widthOfTextAtSize(segment3, titleFontSize);
    const totalWidth = titleWidth1 + titleWidth2 + titleWidth3;

    let startX = width / 2 - totalWidth / 2;
    const logoY = 750; 
    const titleY = logoY + 50; 

    page.drawText(segment1, {
      x: startX,
      y: titleY,
      size: titleFontSize,
      font: bold,
      color: rgb(0, 0.5, 0),
    });
    startX += titleWidth1;
    page.drawText(segment2, {
      x: startX,
      y: titleY,
      size: titleFontSize,
      font: bold,
      color: rgb(0.9, 0.8, 0),
    });
    startX += titleWidth2;
    page.drawText(segment3, {
      x: startX,
      y: titleY,
      size: titleFontSize,
      font: bold,
      color: rgb(0.8, 0, 0),
    });

    // -----------------------------
    // LOGO
    // -----------------------------
    const logoUrl = "/11111.png";
    const logoBytes = await fetch(logoUrl).then((r) => r.arrayBuffer());
    const logo = await pdfDoc.embedPng(logoBytes);

    const logoW = 60;
    const logoH = (logo.height / logo.width) * logoW;

    page.drawImage(logo, {
      x: width / 2 - logoW / 2,
      y: logoY,
      width: logoW,
      height: logoH,
    });

    // -----------------------------
    // WATERMARK (Subtle)
    // -----------------------------
    const wmW = 200;
    const wmH = (logo.height / logo.width) * wmW;
    page.drawImage(logo, {
      x: width / 2 - wmW / 2,
      y: 350,
      width: wmW,
      height: wmH,
      opacity: 0.07,
    });

    // -----------------------------
    // VEHICLE IMAGE (Small, aligned, border)
    // -----------------------------
    let imageY = logoY - 10;
    if (vehicle.Images) {
      const imagesArray = JSON.parse(vehicle.Images);
      if (imagesArray.length > 0) {
        const imgUrl = `http://localhost:3000${imagesArray[0]}`;
        const imgBytes = await fetch(imgUrl).then((r) => r.arrayBuffer());
        let vehicleImage;

        if (imagesArray[0].endsWith(".webp")) {
          vehicleImage = await pdfDoc.embedJpg(imgBytes).catch(async () => {
            vehicleImage = await pdfDoc.embedPng(imgBytes);
          });
        } else if (
          imagesArray[0].endsWith(".jpg") ||
          imagesArray[0].endsWith(".jpeg")
        ) {
          vehicleImage = await pdfDoc.embedJpg(imgBytes);
        } else if (imagesArray[0].endsWith(".png")) {
          vehicleImage = await pdfDoc.embedPng(imgBytes);
        }

        if (vehicleImage) {
          const imgW = 120;
          const imgH = (vehicleImage.height / vehicleImage.width) * imgW;
          const tableMargin = 40;
          const tableWidth = width - 2 * tableMargin;
          const imgX = tableMargin + tableWidth / 2 - imgW / 2;

          // Border
          page.drawRectangle({
            x: imgX - 2,
            y: imageY - imgH - 2,
            width: imgW + 4,
            height: imgH + 4,
            borderColor: rgb(0, 0, 0),
            borderWidth: 1,
          });

          page.drawImage(vehicleImage, {
            x: imgX,
            y: imageY - imgH,
            width: imgW,
            height: imgH,
          });

          imageY = imageY - imgH - 15;
        }
      }
    }

    // -----------------------------
    // DRAW TABLE FUNCTION (Full width, professional)
    // -----------------------------
    const drawTable = (startY, rows, fontSize = 11, padding = 4) => {
      const tableMargin = 40;
      const tableWidth = width - 2 * tableMargin;
      const col1 = tableWidth * 0.35;
      const col2 = tableWidth * 0.65;
      const rowH = 20 + padding;
      const tableHeight = rows.length * rowH;

      const startX = tableMargin;

      // Outer border
      page.drawRectangle({
        x: startX,
        y: startY - tableHeight,
        width: tableWidth,
        height: tableHeight,
        borderWidth: 1,
        borderColor: rgb(0, 0, 0),
      });

      // Horizontal lines & row background
      rows.forEach((row, i) => {
        const y = startY - i * rowH;
        page.drawLine({
          start: { x: startX, y },
          end: { x: startX + tableWidth, y },
          thickness: 1,
          color: rgb(0, 0, 0),
        });

        // Alternate row shading
        if (i % 2 === 0) {
          page.drawRectangle({
            x: startX,
            y: y - rowH,
            width: tableWidth,
            height: rowH,
            color: rgb(0.95, 0.95, 0.95), // light grey
          });
        }
      });

      // Vertical divider
      page.drawLine({
        start: { x: startX + col1, y: startY },
        end: { x: startX + col1, y: startY - tableHeight },
        thickness: 1,
        color: rgb(0, 0, 0),
      });

      // Text with color
      let yText = startY - rowH + padding;
      rows.forEach(([key, value], idx) => {
        page.drawText(key, {
          x: startX + 10,
          y: yText,
          size: fontSize,
          font: bold,
          color: rgb(0.0, 0.5, 0),
        });
        page.drawText(String(value), {
          x: startX + col1 + 10,
          y: yText,
          size: fontSize,
          font,
          color: rgb(0.1, 0.1, 0.1),
        });
        yText -= rowH;
      });

      return startY - tableHeight - 20;
    };

    // -----------------------------
    // COMBINED DATA TABLE
    // -----------------------------
    const combinedRows = [
      ["Customer Name", customer.FullName],
      ["Email", customer.Email],
      ["Phone", customer.PhoneNumber],
      ["City", customer.City],
      ["Vehicle Name", vehicle.V_Name],
      ["Plate Number", vehicle.Plate_Number],
      ["Brand", vehicle.Brand_Name],
      ["Model Year", vehicle.Model_Year],
      ["Seats", vehicle.Seating_Capacity],
      ["Fuel Type", vehicle.Fuel_Type],
      ["Pickup Date", new Date(r.Pickup_Date).toLocaleString()],
      ["Return Date", new Date(r.Return_Date).toLocaleString()],
      ["Rent Per Days", r.Daily_Fee + " birr"],
      ["Rent Days", r.Total_Rent_Day],
      ["Total Payment", r.Total_paid + " birr"],
      ["Over Payment", r.over_payment + " birr"],
      ["Refund", r.Refund + " birr"],
      ["Status", "History"],
      ["Confirmation Number", r.Confirmation_Number],
    ];

    let nextY = drawTable(imageY, combinedRows);

    // -----------------------------
    // FOOTER
    // -----------------------------
    page.drawText("Generated by SAMI Rental System", {
      x: 40,
      y: nextY - 20,
      size: 9,
      font,
      color: rgb(0.5, 0.5, 0.5),
    });

    // -----------------------------
    // DOWNLOAD PDF
    // -----------------------------
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "Reservation_History.pdf";
    a.click();
  } catch (err) {
    console.log("Printable ERROR →", err);
  }
};

export default printHistory;
