// components/CTA.tsx
export default function CTA({
  title,
  body,
  buttonText,
  href,
}: {
  title: string
  body: string
  buttonText: string
  href: string
}) {
  return (
    <section className="my-10 rounded-xl border bg-white p-5 shadow-sm">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 text-gray-700">{body}</p>
      <a
        className="mt-4 inline-block rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
        href={href}
      >
        {buttonText}
      </a>
    </section>
  )
}
