import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const PrintLog = async (logs, user = {}) => {
  /* ================= PDF SETUP ================= */
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const pageSize = [842, 595]; // A4 LANDSCAPE
  const pageMargin = 25;
  const fontSize = 8;
  const lineHeight = 10;
  const headerHeight = 22;

  let page = pdfDoc.addPage(pageSize);
  let { width, height } = page.getSize();
  let y = height - pageMargin;

  /* ================= HELPERS ================= */
  const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : "—");
  const formatMoney = (v) =>
    v !== null && v !== undefined ? Number(v).toLocaleString() : "—";

  // WORD / CHARACTER WRAP (for all normal cells)
  const wrapText = (text, maxWidth) => {
    if (!text) return ["—"];
    const str = String(text);
    const lines = [];

    let current = "";
    for (let char of str) {
      const test = current + char;
      if (font.widthOfTextAtSize(test, fontSize) > maxWidth) {
        lines.push(current);
        current = char;
      } else {
        current = test;
      }
    }
    if (current) lines.push(current);
    return lines;
  };

  // UUID → FORCE INTO 3 LINES (CONFIRMATION NUMBER)
  const splitUUIDInto3Lines = (uuid) => {
    if (!uuid) return ["—"];

    const str = String(uuid);

    // Defensive: if somehow short
    if (str.length <= 20) return [str];

    return [
      str.slice(0, 13),
      str.slice(13, 25),
      str.slice(25),
    ];
  };

  const checkPageBreak = (neededHeight) => {
    if (y - neededHeight < pageMargin) {
      page = pdfDoc.addPage(pageSize);
      ({ width, height } = page.getSize());
      y = height - pageMargin;
      drawHeader();
    }
  };

  /* ================= HEADER ================= */
  const drawHeader = () => {
    page.drawText("USER RESERVATION LOGS", {
      x: pageMargin,
      y,
      size: 14,
      font: boldFont,
    });

    y -= 22;

    page.drawText(
      `Name: ${user.FullName || "—"} | Email: ${user.Email || "—"}`,
      { x: pageMargin, y, size: 9, font }
    );

    y -= 14;

    page.drawText(`Printed on: ${new Date().toLocaleString()}`, {
      x: pageMargin,
      y,
      size: 8,
      font,
    });

    y -= 18;
    drawTableHeader();
  };

  /* ================= TABLE DEFINITION ================= */
  const columns = [
    { key: "Log_ID", label: "Log", width: 30 },
    { key: "Reservation_ID", label: "Res", width: 35 },
    { key: "Action_Type", label: "Action", width: 45 },
    { key: "Old_Status", label: "Old Status", width: 55 },
    { key: "New_Status", label: "New Status", width: 110 },
    { key: "Pickup_Date", label: "Pickup", width: 55 },
    { key: "Return_Date", label: "Return", width: 55 },
    { key: "Rent_Days", label: "Days", width: 35 },
    { key: "Price_Per_Day", label: "Price", width: 45 },
    { key: "Tax_Amount", label: "Tax", width: 45 },
    { key: "Total_Charge", label: "Total", width: 55 },
    { key: "Overpayment", label: "Over", width: 45 },
    { key: "Refund", label: "Refund", width: 45 },
    { key: "Confirmation_Number", label: "Confirm #", width: 70 },
    { key: "Admin_ID", label: "Admin", width: 35 },
    { key: "D_ID", label: "Driver", width: 35 },
  ];

  /* ================= TABLE HEADER ================= */
  const drawTableHeader = () => {
    let x = pageMargin;

    columns.forEach((c) => {
      page.drawRectangle({
        x,
        y: y - headerHeight,
        width: c.width,
        height: headerHeight,
        borderWidth: 0.8,
        borderColor: rgb(0, 0, 0),
      });

      page.drawText(c.label, {
        x: x + 3,
        y: y - 14,
        size: 8,
        font: boldFont,
      });

      x += c.width;
    });

    y -= headerHeight;
  };

  /* ================= DRAW CELL ================= */
  const drawCell = (x, y, width, height, lines) => {
    page.drawRectangle({
      x,
      y: y - height,
      width,
      height,
      borderWidth: 0.5,
      borderColor: rgb(0, 0, 0),
    });

    lines.forEach((line, i) => {
      page.drawText(line, {
        x: x + 3,
        y: y - 12 - i * lineHeight,
        size: fontSize,
        font,
      });
    });
  };

  /* ================= DRAW ROW ================= */
  const drawRow = (log) => {
    let x = pageMargin;
    let maxLines = 1;

    const cells = columns.map((c) => {
      let value = log[c.key];

      if (c.key.includes("Date")) value = formatDate(value);
      if (c.key.includes("Charge") || c.key.includes("Amount"))
        value = formatMoney(value);

      let lines;
      if (c.key === "Confirmation_Number") {
        lines = splitUUIDInto3Lines(value); // 🔥 FORCE 3 LINES
      } else {
        lines = wrapText(value, c.width - 6);
      }

      maxLines = Math.max(maxLines, lines.length);
      return { width: c.width, lines };
    });

    const rowHeight = maxLines * lineHeight + 6;
    checkPageBreak(rowHeight);

    cells.forEach((cell) => {
      drawCell(x, y, cell.width, rowHeight, cell.lines);
      x += cell.width;
    });

    y -= rowHeight;
  };

  /* ================= RENDER ================= */
  drawHeader();
  logs.forEach(drawRow);

  /* ================= SAVE ================= */
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  window.open(URL.createObjectURL(blob));
};

export default PrintLog;
