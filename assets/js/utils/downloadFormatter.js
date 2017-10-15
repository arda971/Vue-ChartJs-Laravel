export function removeDuplicate (a, b) {
  if (a.indexOf(b) < 0) {
    a.push(b)
  }
  return a
}

export const groupData = (data, transformer) => {
  return data.reduce((date, current) => {
    if (date.indexOf(transformer(current.published_at)) < 0) {
      date.push(transformer(current.published_at))
    }
    return date
  }, [])
    .map((date) => {
      return {
        date: date,
        sales: data.filter(el => transformer(el.published_at) === date)
          .reduce(function (total, item) { var tmp = item.sale.split('$'); return total + Number.parseInt(tmp.join('')) }, 0)

      }
    })
    .map(function (element) { return element.sales })
}
