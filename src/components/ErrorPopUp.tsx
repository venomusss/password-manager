type Props = {
  text: string;
  setIsIncorrect: (value: boolean) => void;
  res?: boolean;
};

const ErrorPopUp = ({ text, setIsIncorrect, res = false }: Props) => {
  return (
    <div
      className="absolute"
      onClick={() => {
        setIsIncorrect(false);
      }}
    >
      <div className="edit-wrapper">
        {!res ? (
          <>{text} (click anywhere to close this window)</>
        ) : (
          <img
            className="loader"
            src="https://i.pinimg.com/originals/07/24/88/0724884440e8ddd0896ff557b75a222a.gif"
            alt="loader"
          />
        )}
      </div>
    </div>
  );
};

export default ErrorPopUp;
