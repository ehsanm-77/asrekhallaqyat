import { Tab } from '@headlessui/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Example({ product }: ProductSecProps) {
  const extractPTag = (htmlString: string) => {
    const pTags = htmlString
      ?.split(/<p[^>]*>/)
      .slice(1)
      .map((pTag) => pTag.replace(/<\/p>/, ' '));
    return pTags;
  };

  const categories = {
    'درباره کتاب': [
      {
        id: 1,
        title: extractPTag(product?.description),
        date: '5h ago',
        commentCount: 5,
        shareCount: 2,
      },
    ],
    'اطلاعات محصول': [
      {
        id: 2,
        title: 'اطلاعاتی وجود ندارد',
        date: '',
        commentCount: 5,
        shareCount: 2,
      },
    ],
    'دیدگاه کاربران': [
      {
        id: 3,
        title: 'نظری ثبت نشده است',
        date: '',
        commentCount: 5,
        shareCount: 2,
      },
    ],
  };

  return (
    <div className="w-4/5 px-2 py-8 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 shadow-md ">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-900',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-800 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-white p-5',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 shadow-md text-slate-600'
              )}
            >
              <ul>
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="relative rounded-md hover:bg-gray-100 p-5"
                  >
                    <h3 className="text-sm font-medium leading-5">
                      {post.title}
                    </h3>
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
