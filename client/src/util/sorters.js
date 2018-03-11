export const sortByParams = (order, ...params) => {
	const compare = (x, y) => {
		let res;
		if (x === y) res = 0;
		if (x < y) res = -1;
		if (x > y) res = 1;
		return res * order;
	};
	return (x, y) => {
		let res;
		if (params.length > 0) {
			params.forEach((param, i) => {
				const curParam = params[i];
				const prevParam = params[i - 1];
				if (!prevParam || x[prevParam] === y[prevParam]) {
					res = compare(x[curParam], y[curParam]);
				}
			});
		} else {
			res = compare(x, y);
		}
		return res;
	};
};
