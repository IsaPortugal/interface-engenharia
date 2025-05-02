
import React from 'react';
import PrintButton from './reports/actions/PrintButton';
import DownloadButton from './reports/actions/DownloadButton';

interface ReportActionsProps {
  report: any;
  printRef: React.RefObject<HTMLDivElement>;
}

const ReportActions: React.FC<ReportActionsProps> = ({ report, printRef }) => {
  return (
    <div className="flex flex-col gap-3 w-full mt-8 mb-4">
      <PrintButton reportTitle={report.title} printRef={printRef} />
      <DownloadButton report={report} printRef={printRef} />
    </div>
  );
};

export default ReportActions;
