import {PDFParse} from "pdf-parse";

export const extractTextFromPDF = async (buffer) => {
  const parser = new PDFParse({
    data: buffer,
  });

  try {
    const result = await parser.getText();

    return result.text;
  } finally {
    await parser.destroy();
  }
};