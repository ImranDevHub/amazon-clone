function Error({ error }) {
  return (
    <>
      <div className="border border-2 border-danger rounded rounded-4 shadow auth__error mb-5 unselected">
        <div className="d-flex px-5 py-3">
          <span className="icon-other caution me-4 col-1"></span>
          <div className="col-11">
            <span className="text-danger fs-3 ">There was a problem</span>
            <div>{error}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Error;
