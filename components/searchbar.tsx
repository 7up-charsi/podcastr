import { Input } from '@typeweave/react';
import debounce from 'lodash.debounce';
import { SearchIcon } from 'lucide-react';
import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import React from 'react';

const displayName = 'Searchbar';

export const Searchbar = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const debounced = React.useMemo(
    () =>
      debounce((param: string) => {
        router.push(
          param ? `/discover?search=${param.trim()}` : '/discover',
        );
      }, 500),
    [router],
  );

  return (
    <Input
      label="search podcasts"
      hideLabel
      placeholder="Search podcasts"
      startContent={<SearchIcon />}
      className="w-full"
      defaultValue={searchParams.get('search') ?? ''}
      onChange={(e) => {
        debounced(e.target.value);
      }}
    />
  );
};

Searchbar.displayName = displayName;
