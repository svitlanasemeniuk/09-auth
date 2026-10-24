import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.wrapper}>
      <p className={css.text}>⏳ Loading notes...</p>
    </div>
  );
};

export default Loader;
