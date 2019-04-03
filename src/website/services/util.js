const filterNames = names => names.filter(n => n && n.trim() !== '');
const joinNames = names => names.join(' ');


export const classNames = (...args) => {
  return args |> filterNames |> joinNames;

  throw Error('Unimplemented yet');
};

export const keyBy = (array, key) => array.reduce((all, item) => Object.assign(all, { [item[key]]: item }), {});
