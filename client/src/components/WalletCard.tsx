import { QRCodeCanvas } from "qrcode.react";

interface WalletCardProps {
  stateCode: string;
  licenseId: string;
  id: string;
  timestamp?: number;
}

export function WalletCard({ stateCode, licenseId, id, timestamp }: WalletCardProps) {
  const issueDate = timestamp ? new Date(timestamp) : new Date();
  const expiryDate = new Date(issueDate);
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);
  
  return (
    <div className="re-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3
          className="text-lg font-semibold text-charcoal"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Digital License
        </h3>
        <span className="rounded-full bg-forest px-3 py-1 text-xs font-medium text-white">
          ACTIVE
        </span>
      </div>
      
      <div className="flex gap-4">
        {/* QR Code Section */}
        <div className="flex-shrink-0">
          <QRCodeCanvas 
            value={`releaf://license/${id}`} 
            size={96}
            style={{ borderRadius: 8 }}
          />
        </div>
        
        {/* License Details */}
        <div className="flex-1 space-y-2">
          <div>
            <p className="text-xs text-gray-600">License ID</p>
            <p className="font-mono text-sm font-medium text-charcoal">{id}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-600">State</p>
              <p className="text-sm font-medium text-charcoal">{stateCode}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Type</p>
              <p className="text-sm font-medium text-charcoal">{licenseId}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-600">Issued</p>
              <p className="text-sm font-medium text-charcoal">
                {issueDate.toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Expires</p>
              <p className="text-sm font-medium text-charcoal">
                {expiryDate.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 rounded-lg bg-sage/10 p-3 text-center">
        <p className="text-xs text-gray-600">
          Scan QR code to verify license authenticity
        </p>
      </div>
    </div>
  );
}