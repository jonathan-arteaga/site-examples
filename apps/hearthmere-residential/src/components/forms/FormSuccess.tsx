import { CheckCircleIcon } from '@/components/icons';
import { Button } from '@hearthmere/ui';

interface FormSuccessProps {
  title: string;
  message: string;
  onReset?: () => void;
}

export function FormSuccess({ title, message, onReset }: FormSuccessProps) {
  return (
    <div className="text-center py-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
        <CheckCircleIcon className="h-8 w-8 text-green-500" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{message}</p>
      {onReset && (
        <Button onClick={onReset} variant="outline">
          Submit Another
        </Button>
      )}
    </div>
  );
}
