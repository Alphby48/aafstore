const PopUp = (props) => {
  const { setPopUp, title } = props;
  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 w-full h-full flex justify-center items-center`}
    >
      <div
        className={`p-3 flex justify-center items-center relative bg-lime-600 w-3/4 sm:w-1/4 h-60 rounded-lg`}
      >
        <i
          className={`fa-regular fa-circle-xmark absolute top-2 right-2 text-2xl text-white hover:text-red-500 cursor-pointer`}
          onClick={() => setPopUp(false)}
        ></i>
        <p className={`font-poppins text-lg sm:text-xl text-white`}>{title}</p>
      </div>
    </div>
  );
};

export default PopUp;
