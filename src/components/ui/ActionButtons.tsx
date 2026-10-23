import { Eye, Edit, Trash2, Check, X as XIcon } from 'lucide-react';

interface ActionButtonsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  showApproveReject?: boolean;
}

export default function ActionButtons({
  onView,
  onEdit,
  onDelete,
  onApprove,
  onReject,
  showApproveReject,
}: ActionButtonsProps) {
  if (showApproveReject) {
    return (
      <div className="flex gap-1">
        {onApprove && (
          <button
            onClick={onApprove}
            className="flex items-center gap-1 px-2 py-1 text-xs font-medium bg-emerald-500 text-white rounded hover:bg-emerald-600 transition"
          >
            <Check size={12} />
            Approve
          </button>
        )}
        {onReject && (
          <button
            onClick={onReject}
            className="flex items-center gap-1 px-2 py-1 text-xs font-medium bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            <XIcon size={12} />
            Reject
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex gap-1">
      {onView && (
        <button
          onClick={onView}
          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition"
          title="Lihat Detail"
        >
          <Eye size={14} />
        </button>
      )}
      {onEdit && (
        <button
          onClick={onEdit}
          className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded transition"
          title="Edit"
        >
          <Edit size={14} />
        </button>
      )}
      {onDelete && (
        <button
          onClick={onDelete}
          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition"
          title="Hapus"
        >
          <Trash2 size={14} />
        </button>
      )}
    </div>
  );
}
