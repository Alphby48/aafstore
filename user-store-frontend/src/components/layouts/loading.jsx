const Loading = () => {
  return (
    <div className="d-flex justify-content-center w-100 min-vh-100 align-items-center flex-column">
      <div className="spinner-border " role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
