interface TableSimpleProps {
  headers: string[]
  rows: string[][]
  caption?: string
  zebra?: boolean
}

export default function TableSimple({ headers, rows, caption, zebra = true }: TableSimpleProps) {
  return (
    <div className="overflow-x-auto my-8">
      <table className="w-full border-collapse border border-border-light">
        {caption && (
          <caption className="text-small text-muted-text text-left pb-2">
            {caption}
          </caption>
        )}
        <thead>
          <tr className="bg-surface-gray-100">
            {headers.map((header, idx) => (
              <th
                key={idx}
                className="text-small font-semibold text-charcoal p-3 border border-border-light text-left"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className={
                zebra && rowIdx % 2 === 0
                  ? 'bg-surface-gray-50 hover:bg-surface-gray-100'
                  : 'hover:bg-surface-gray-100'
              }
            >
              {row.map((cell, cellIdx) => (
                <td
                  key={cellIdx}
                  className="text-small text-body-text p-3 border border-border-light"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

