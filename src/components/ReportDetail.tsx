
import React, { useRef } from 'react';
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
  
  if (!isOpen || !report) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold">{report.title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
          
          <div ref={printRef} className="space-y-6">
            <ReportDetailHeader report={report} />
            <ReportContent report={report} />
          </div>
          
          <ReportActions report={report} printRef={printRef} />
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
