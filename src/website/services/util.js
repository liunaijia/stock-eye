const filterNames = names => names.filter(n => n && n.trim() !== '');
const joinNames = names => names.join(' ');

// return args |> filterNames |> joinNames;
export const classNames = (...args) => joinNames(filterNames(args));

export const keyBy = (array, key) => array.reduce((all, item) => Object.assign(all, { [item[key]]: item }), {});
