function filterNames(names) {
  return names.filter((n) => n && n.trim() !== '');
}

function joinNames(names) {
  return names.join(' ');
}

export function classNames(...args) {
// return args |> filterNames |> joinNames;
  return joinNames(filterNames(args));
}

export function keyBy(array, key) {
  return array.reduce((all, item) => Object.assign(all, { [item[key]]: item }), {});
}
