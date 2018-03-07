
export const _ASC = (...params) => {
  const compare = (x, y) => {
    if (x === y) return 0;
    if (x < y) return -1;
    if (x > y) return 1;
  };
	return (x, y) => {
		let res;
		if (params.length > 0) {
			params.forEach((param, i) => {
				const curParam = params[i];
				const prevParam = params[i - 1];
				if ((prevParam && x[prevParam] === y[prevParam]) || !prevParam) {
					res = compare(x[curParam], y[curParam]);
				}
			});
		} else {
      res = compare(x, y);
    }
		return res;
	};
};

export const _DSC = (...params) => {
  const compare = (x, y) => {
    if (x === y) return 0;
    if (x < y) return 1;
    if (x > y) return -1;
	};
  return (x, y) => {
    let res;
    if (params.length > 0) {
      params.forEach((param, i) => {
        const curParam = params[i];
        const prevParam = params[i - 1];
        if ((prevParam && x[prevParam] === y[prevParam]) || !prevParam) {
          res = compare(x[curParam], y[curParam]);
        }
      });
    } else {
      res = compare(x, y);
    }
    return res;
  };
};
