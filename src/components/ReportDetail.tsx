
import React, { useRef, useState } from 'react';
import ReportActions from './ReportActions';
import ReportDetailHeader from './reports/ReportDetailHeader';
import ReportContent from './reports/ReportContent';

interface ReportDetailProps {
  report: any;
  isOpen: boolean;
  onClose: () => void;
}

const ReportDetail: React.FC<ReportDetailProps> = ({ report, isOpen, onClose }) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [reportData, setReportData] = useState<any>(report);
  
  if (!isOpen || !report) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleRemoveIncident = (incidentId: number) => {
    setReportData({
      ...reportData,
      incidents: reportData.incidents?.filter((incident: any) => incident.id !== incidentId)
    });
  };
  
  // Add console logging to debug
  console.log("Report in ReportDetail:", report);
  console.log("isOpen:", isOpen);
  
  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-xl font-bold text-blue-600">VPro Engenharia</h1>
              <h2 className="text-2xl font-bold mt-2">{reportData.title}</h2>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
          
          <div ref={printRef} className="space-y-6">
            <ReportDetailHeader report={reportData} />
            <ReportContent report={reportData} onRemoveIncident={handleRemoveIncident} />
          </div>
          
          <ReportActions report={reportData} printRef={printRef} />
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
