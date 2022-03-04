import { useFetcher, useNavigate } from 'remix';
import { PostMenu } from './post-menu';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';

export const PostCard = ({
  postWithUser: post,
  currentUserId,
  displayUser = true,
  displayTrack = true,
}) => {
  const deleteFetcher = useFetcher();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const isPostOwner = post.author_id === currentUserId;

  const handleToFeed = () => navigate(`/track/${post.track_id}`);
  const handleDelete = e => {
    setIsOpen(false);
    deleteFetcher.submit(
      { postId: e.target.value },
      { action: '/user/posts', method: 'post' },
    );
  };

  return (
    <li className="max-w-lg space-y-4 self-stretch rounded-md bg-white p-4 shadow-md ring-1 ring-slate-300">
      <div className="flex w-full items-center gap-2 ">
        {displayUser ? (
          <>
            <img
              src={post.avatar}
              alt={post.username}
              className="aspect-square h-8 rounded-full bg-gray-200"
            />
            <div className="flex w-full flex-col items-start ">
              <p>{isPostOwner ? 'You' : post.username}</p>
              <span className="text-xs text-gray-400">
                {new Date(post.created_at).toDateString()}
              </span>
            </div>
          </>
        ) : null}
        {isPostOwner ? (
          <div className="ml-auto ">
            <PostMenu postId={post.id} openDialog={() => setIsOpen(true)} />
          </div>
        ) : null}
      </div>
      {displayTrack ? (
        <div
          onClick={handleToFeed}
          className="mb-4 flex  items-center gap-4 rounded-sm shadow-md ring-1 ring-slate-200 transition-all hover:cursor-pointer hover:ring-2 hover:ring-gray-300"
        >
          <img src={post.thumbnail} alt={post.title} className="h-16" />
          <div className="pr-4">
            <p className="text-sm font-semibold">{post.title}</p>
            <p className="text-xs">{post.artist}</p>
          </div>
        </div>
      ) : null}
      <section className="space-y-4 ">
        {post.lyrics === '' ? null : (
          <div>
            <h4 className="font-semibold">Featured lyrics</h4>
            <p className="text-justify indent-8  text-gray-700">
              {post.lyrics}
            </p>
          </div>
        )}
        <div>
          <h4 className=" font-semibold">Thought</h4>
          <p className="text-justify indent-8 text-gray-700">{post.thought}</p>
        </div>
      </section>
      {isOpen ? (
        <Dialog
          className="fixed inset-0 z-20 "
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <div className="h-screen w-screen">
            <Dialog.Overlay className="fixed inset-0 bg-gray-400/25" />
            <div className="fixed top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 bg-white">
              <Dialog.Title>Delete post</Dialog.Title>

              <button
                className="bg-red-500 px-3 py-1 text-white"
                value={post.id}
                onClick={handleDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </Dialog>
      ) : null}
    </li>
  );
};

export const PostCardSkeleton = ({
  displayUser = true,
  displayTrack = true,
}) => {
  return (
    <div className="max-w-lg animate-pulse space-y-4 self-stretch rounded-md bg-white p-4 shadow-md ring-1 ring-slate-300">
      <div className="flex w-full items-center gap-2 ">
        {displayUser ? (
          <>
            <div className="aspect-square h-8 rounded-full bg-gray-300" />
            <div className="flex w-full flex-col items-start gap-1">
              <div className="h-4 w-5/12 bg-gray-300 " />
              <div className="h-2 w-3/12 bg-gray-300 " />
            </div>
          </>
        ) : null}
      </div>
      {displayTrack ? (
        <div className="mb-4 flex w-full items-center  gap-4 rounded-sm shadow-md ">
          <div className="aspect-square h-16 bg-gray-300" />
          <div className="w-full space-y-1 pr-4">
            <div className="h-4 w-7/12 bg-gray-300 " />
            <div className="h-2 w-5/12 bg-gray-300 " />
          </div>
        </div>
      ) : null}
      <section className="space-y-4 ">
        <div className="space-y-1 overflow-hidden">
          <div className="h-4  w-2/12 bg-gray-300" />
          <div className="ml-4 h-2 w-full bg-gray-300" />
          <div className="h-2 w-full bg-gray-300" />
          <div className="h-2  w-full bg-gray-300" />
        </div>
        <div className="space-y-1 overflow-hidden">
          <div className="h-4  w-2/12 bg-gray-300" />
          <div className="ml-4 h-2 w-full bg-gray-300" />
          <div className="h-2  w-full bg-gray-300" />
          <div className="h-2  w-full bg-gray-300" />
        </div>
      </section>
    </div>
  );
};
