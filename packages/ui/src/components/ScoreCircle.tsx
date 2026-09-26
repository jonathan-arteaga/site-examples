import { cn } from '../lib/utils';

interface ScoreCircleProps {
  score: number;
  label: string;
  className?: string;
}

export function ScoreCircle({ score, label, className }: ScoreCircleProps) {
  return (
    <div className={cn('text-center', className)}>
      <div className="w-20 h-20 rounded-full border-4 border-[var(--color-primary-300)] flex items-center justify-center mx-auto">
        <span className="text-2xl font-bold text-gray-900">{score}</span>
      </div>
      <p className="mt-2 text-sm font-medium text-gray-600">{label}</p>
    </div>
  );
}
