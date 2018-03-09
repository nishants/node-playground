const
  defaultPageSize = 10,
  Page = (size, index)=> {
    const page = {
      size,
      index,
      count: (count)=> ({...page, maxPage: parseInt((count - 1) / size)})
    };
    return page;
  };

module.exports = {
  forRequest: (request)=> {
    const
      pageSize = parseInt(request.query.size) || defaultPageSize,
      pageIndex = parseInt(request.query.page) || 0;

    return Page(pageSize, pageIndex);
  }
};