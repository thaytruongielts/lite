
import React from 'react';

interface ScriptDisplayProps {
  script: string;
  isVisible: boolean;
}

const ScriptDisplay: React.FC<ScriptDisplayProps> = ({ script, isVisible }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-inner">
      <h3 className="text-xl font-bold text-gray-700 mb-4">Audio Script</h3>
      <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed text-sm">
        {script}
      </pre>
    </div>
  );
};

export default ScriptDisplay;
