type StatusMessageProps = {
  message: string;
  tone?: 'error' | 'info';
};

export const StatusMessage = ({ message, tone = 'error' }: StatusMessageProps) => {
  const toneClassName =
    tone === 'error'
      ? 'border-red-500/40 bg-red-500/10 text-red-200'
      : 'border-blue-500/40 bg-blue-500/10 text-blue-100';

  return (
    <div className={`rounded-lg border px-4 py-3 text-sm ${toneClassName}`} role="alert">
      {message}
    </div>
  );
};
