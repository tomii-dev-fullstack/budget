// src/index.ts
import express, { Request, Response } from 'express';
import ejs from 'ejs';
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { Proposal } from './types/types.js';
// Necesario para __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors())


app.post('/generate-html', async (req: Request, res: Response) => {
  const proposal: Proposal = req.body;

  try {
    const templatePath = path.join(__dirname, 'views', 'proposal-template.ejs');
    const html = await ejs.renderFile(templatePath, { proposal });

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    console.error('Error generando HTML:', error);
    res.status(500).send('Error al generar el HTML');
  }
});

app.post('/generate-pdf', async (req: Request, res: Response) => {
  const proposal: Proposal = req.body;
  try {
    // Generar HTML con EJS
    const templatePath = path.join(__dirname, 'views', 'proposal-template.ejs');
    const html = await ejs.renderFile(templatePath, { proposal });

    // Lanzar Puppeteer para generar PDF
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4' });

    await browser.close();

    // Enviar PDF al cliente
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="propuesta.pdf"',
    });
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generando el PDF:', error);
    res.status(500).send('Error al generar el PDF');
  }
})

app.listen(3001, () => {
  console.log('🚀 PDF server en http://localhost:3001');
});
