import css from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage = ({
  message = 'Opps! Something went wrong. Please try again later.',
}: ErrorMessageProps) => {
  return (
    <div className={css.wrapper}>
      <p className={css.text}> {message}</p>
    </div>
  );
};

export default ErrorMessage;
