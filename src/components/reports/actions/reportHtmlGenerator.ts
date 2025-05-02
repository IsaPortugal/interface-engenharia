
export const generateHtmlContent = (report: any): string => {
  return `
  <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatório - ${report.title}</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #fff;
        margin: 0;
        padding: 0;
      }
      
      .container {
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
        padding: 0;
        box-sizing: border-box;
      }
      
      .company-name {
        color: #1E88E5;
        font-size: 22px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      
      .report-header {
        background: #fff;
        color: #333;
        padding: 30px;
        margin-bottom: 30px;
        border-bottom: 1px solid #eee;
      }
      
      .report-header h1 {
        margin: 0;
        font-size: 24px;
        font-weight: bold;
        color: #1E88E5;
      }
      
      .report-header p {
        margin: 5px 0 0 0;
      }
      
      .report-section {
        margin-bottom: 30px;
        padding: 20px;
        background-color: #fff;
        color: black;
        border: 1px solid #eee;
        border-radius: 4px;
      }
      
      .report-section h2 {
        color: #1E88E5;
        margin-top: 0;
        font-size: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #eaeaea;
      }
      
      .info-label {
        font-weight: bold;
        color: #1E88E5;
        margin-bottom: 5px;
        font-size: 14px;
      }
      
      .info-value {
        margin: 0;
        color: #333;
      }
      
      .image-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
        margin-top: 20px;
      }
      
      .image-container {
        border: 1px solid #eaeaea;
        border-radius: 6px;
        overflow: hidden;
        background-color: white;
      }
      
      .image-container img {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }
      
      .image-caption {
        padding: 8px;
        text-align: center;
        font-size: 14px;
        background-color: #f9f9f9;
      }
      
      .incidents-section {
        background-color: #fff;
      }
      
      .incident-item {
        border: 1px solid #eaeaea;
        border-radius: 6px;
        padding: 15px;
        margin-bottom: 15px;
        background-color: white;
      }
      
      .incident-title {
        font-weight: bold;
        margin: 0;
        color: #1E88E5;
      }
      
      .report-footer {
        text-align: center;
        margin-top: 40px;
        padding-top: 20px;
        border-top: 1px solid #eaeaea;
        color: #666;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="company-name">VPro Engenharia</div>
      
      <div class="report-header">
        <h1>Relatório - ${report.title}</h1>
        <p>Projeto: ${report.project}</p>
        <p>Data: ${new Date(report.date).toLocaleDateString('pt-BR')}</p>
      </div>
      
      <div class="report-section">
        <h2>Informações do Relatório</h2>
        <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
          <div style="margin-bottom: 15px; flex: 0 0 48%;">
            <div class="info-label">Tipo</div>
            <p class="info-value">${report.type}</p>
          </div>
          
          <div style="margin-bottom: 15px; flex: 0 0 48%;">
            <div class="info-label">Autor</div>
            <p class="info-value">Eng. ${report.author === 'EF' ? 'Eduardo Farias' : report.author === 'RS' ? 'Roberto Silva' : report.author === 'TC' ? 'Teresa Costa' : report.author === 'MF' ? 'Maria Fernandes' : 'Desconhecido'}</p>
          </div>
        </div>
        
        <div style="margin-bottom: 15px;">
          <div class="info-label">Descrição</div>
          <p class="info-value">${report.description}</p>
        </div>
      </div>
      
      ${report.activitiesPerformed ? `
      <div class="report-section">
        <h2>Atividades Realizadas</h2>
        <p>${report.activitiesPerformed}</p>
      </div>
      ` : ''}
      
      ${report.weatherConditions ? `
      <div class="report-section">
        <h2>Condições Climáticas</h2>
        <p>${report.weatherConditions}</p>
      </div>
      ` : ''}
      
      ${report.nextSteps ? `
      <div class="report-section">
        <h2>Próximas Etapas</h2>
        <p>${report.nextSteps}</p>
      </div>
      ` : ''}
      
      ${report.imageDetails && report.imageDetails.length > 0 ? `
      <div class="report-section">
        <h2>Registro Fotográfico</h2>
        <div class="image-grid">
          ${report.imageDetails.map((img: any, index: number) => `
            <div class="image-container">
              <img src="${img.fileName.startsWith('/') ? img.fileName : '/placeholder.svg'}" alt="Imagem ${index + 1}" />
              <div class="image-caption">${img.caption || `Imagem ${index + 1}`}</div>
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}
      
      ${report.incidents && report.incidents.length > 0 ? `
      <div class="report-section incidents-section">
        <h2>Incidentes Registrados</h2>
        ${report.incidents.map((incident: any) => `
          <div class="incident-item">
            <h3 class="incident-title">${incident.title}</h3>
            <p style="margin: 5px 0 0; font-size: 14px;">Data: ${incident.date}</p>
            <p style="margin: 5px 0 0; font-size: 14px;">Status: ${incident.status}</p>
            <p style="margin-top: 10px;">${incident.description}</p>
          </div>
        `).join('')}
      </div>
      ` : ''}
      
      <div class="report-footer">
        <p>Relatório gerado em ${new Date().toLocaleDateString('pt-BR')} pela VPro Engenharia</p>
      </div>
    </div>
  </body>
  </html>
  `;
};
