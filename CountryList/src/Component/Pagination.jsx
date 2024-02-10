function Pagination({total,onChange,current}) {
  const prev = (
    <button
      data-testid="prev-page" onClick={()=>onChange(current-1)}
      disabled={current==1}
    >
      Prev
    </button>
  );
  const currentPage = <button data-testid="current-page">{current}</button>;
  const next = (
    <button
      data-testid="next-page" onClick={()=>onChange(current+1)}
      disabled={current==total}
    >
      Next
    </button>
  );
  return (
  <div data-testid="page-container">
      <div>
      {prev}
      {currentPage}
      {next}
      </div>
      <div>
        Total Pages: <b data-testid="total-pages">{total}</b>
      </div>
    </div>
  );
}

export default Pagination;
