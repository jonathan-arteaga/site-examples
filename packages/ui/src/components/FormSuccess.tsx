import { CheckCircleIcon } from '../icons';
import { Button } from './Button';

interface FormSuccessProps {
  title: string;
  message: string;
  onReset?: () => void;
}

export function FormSuccess({ title, message, onReset }: FormSuccessProps) {
  return (
    <div className="py-8 text-center">
      <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
      <h3 className="mt-4 text-2xl font-semibold text-gray-900">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-gray-600">{message}</p>
      {onReset && (
        <Button variant="outline" onClick={onReset} className="mt-6">
          Submit Another
        </Button>
      )}
    </div>
  );
}
