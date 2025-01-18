import Link from 'next/link'
import { Badge } from "@/app/components/ui/badge"

export default function AnimalCard({ name, id }: { name: string, id: number}) {
  return (
    <Link href={`/animal/${encodeURIComponent(name)}`}>
      <div key={id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">{name}</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className='dark:bg-gray-900'>View Details</Badge>
          </div>
        </div>
      </div>
    </Link>
  )
}
