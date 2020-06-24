function filterNames(names: string[]) {
  return names.filter((n) => n && n.trim() !== '');
}

function joinNames(names: string[]):string {
  return names.join(' ');
}

export function classNames(...args: string[]) : string {
// return args |> filterNames |> joinNames;
  return joinNames(filterNames(args));
}

export function keyBy(array: [], key: string): Record<string, unknown> {
  return array.reduce((all, item) => Object.assign(all, { [item[key]]: item }), {});
}
