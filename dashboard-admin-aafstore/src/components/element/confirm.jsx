const ConfirmPage = (props) => {
  const { setConfirm, title, onClick } = props;
  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 w-full h-full flex justify-center items-center`}
    >
      <div
        className={`p-3 flex flex-col justify-center items-center relative bg-red-500 w-3/4 sm:w-1/3 h-60 rounded-lg`}
      >
        <i
          className={`fa-regular fa-circle-xmark absolute top-2 right-2 text-2xl text-white hover:text-slate-800 cursor-pointer`}
          onClick={() => setConfirm(false)}
        ></i>
        <p className={`font-poppins text-lg sm:text-base text-white`}>
          {title}
        </p>
        <div className="flex w-full justify-around p-3 absolute bottom-0 left-0 right-0">
          <button
            className="bg-yellow-500 p-2 rounded-md font-poppins text-white text-sm"
            onClick={() => setConfirm(false)}
          >
            Batal
          </button>
          <button
            className="bg-blue-500 p-2 rounded-md font-poppins text-white text-sm"
            onClick={() => onClick()}
          >
            Oke
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPage;
