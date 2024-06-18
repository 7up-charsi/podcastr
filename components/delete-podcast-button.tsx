import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';
import { CustomLoader } from './custom-loader';
import { usePlayerCtx } from '@/hooks';
import {
  Button,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTrigger,
} from '@typeweave/react';

interface DeletePodcastButtonProps {
  id: Id<'podcasts'>;
}

const displayName = 'DeletePodcastButton';

export const DeletePodcastButton = (
  props: DeletePodcastButtonProps,
) => {
  const { id } = props;

  const router = useRouter();
  const { setAudio } = usePlayerCtx();
  const [isDeleting, setIsDeleting] = React.useState(false);

  const deletePodcast = useMutation(api.podcasts.deletePodcast);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      await deletePodcast({ id });

      setAudio(undefined);
      setIsDeleting(false);
      toast.success('Podcast deleted');
      router.push('/');
    } catch (error) {
      console.error('Error deleting podcast', error);
      toast.error('Error deleting podcast');
    }
  };

  return (
    <DialogRoot
      onClose={(e, reason) => {
        if (reason === 'outside') e.preventDefault();
      }}
    >
      <DialogTrigger>
        <Button
          color="danger"
          disabled={isDeleting}
          startContent={isDeleting ? <CustomLoader /> : <TrashIcon />}
        >
          delete
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          aria-labelledby="title"
          aria-describedby="desc"
          className="p-4"
        >
          <div id="title" className="text-lg font-semibold">
            Deleting Podcast
          </div>

          <div id="desc" className="mt-2 text-sm">
            If you delete this podcast, please note that this action
            cannot be undone, and you will not be able to recover it
            afterwards.
          </div>

          <div className="mt-7 flex justify-end gap-3">
            <DialogClose>
              <Button variant="text" disabled={isDeleting}>
                cancel
              </Button>
            </DialogClose>

            <Button
              color="danger"
              onPress={handleDelete}
              disabled={isDeleting}
              startContent={isDeleting ? <CustomLoader /> : undefined}
            >
              DELETE
            </Button>
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
};

DeletePodcastButton.displayName = displayName;
