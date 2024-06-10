import { podcastData } from '@/dummy-data/sample-data';
import Image from 'next/image';

export default function HomePage() {
  return (
    <section className="px-16 pt-10">
      <h1 className="mb-5 text-xl font-semibold capitalize">
        trending podcasts
      </h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {podcastData.map(({ description, id, imgURL, title }) => (
          <article key={id} className="">
            <div className="overflow-hidden rounded">
              <Image
                src={imgURL}
                width={174}
                height={174}
                alt={title}
                className="aspect-square h-fit w-full rounded-xl 2xl:size-[200px]"
              />
            </div>

            <h1 className="mt-3 truncate text-lg font-semibold">
              {title}
            </h1>
            <p className="mt-1 truncate text-sm">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
