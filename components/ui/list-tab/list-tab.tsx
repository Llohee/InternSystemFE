import { useGetUserDetail } from '@/hooks/query/auth'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { useEffect, useState } from 'react'

export const ListTab = (props: {
  titles: Array<{ title: string; node: React.ReactNode }>
  defaultIndex?: number
  tabPadding?: string
  selectedIndex?: number
  onChange?: (index: number) => void
}) => {
  const { data: userDetail } = useGetUserDetail()
  
  // Filter titles based on some condition involving tenant
  const [listTitles, setListTitles] = useState(() => 
    props.titles.filter((item) => item)
  );
  
  useEffect(() => {
    // When props.titles changes, update the filtered titles
    setListTitles(props.titles.filter((item) => item));
  }, [props.titles]);

  // If there's only one title after filtering, return its node directly
  if (listTitles.length === 1) return <>{listTitles[0].node}</>

  return (
    <TabGroup
      as="div"
      defaultIndex={props.defaultIndex}
      selectedIndex={props.selectedIndex}
      onChange={props.onChange}
    >
      <TabList
        className={`nav nav-tabs sticky top-0 bg-white z-10 flex flex-auto list-none border-b border-border-2 mb-0.5 w-full overflow-auto px-0.5 ${props.tabPadding}`}
      >
        {listTitles.map((val, index) => (
          <Tab
            key={index}
            className={() =>
              `group nav-item inline-block text-label-4 text-typography-subtitle focus:text-primary-pressed whitespace-nowrap nav-link cursor-pointer select-none leading-tight
              focus:outline-none outline-none px-3 first:pl-0 relative`
            }
          >
            {({ selected }) => (
              <>
                <div
                  className={`py-4 border-x-0 border-t-0 group-hover:text-primary-hover border-transparent group-aria-selected:border-primary-base group-aria-selected:text-primary-base`}
                >
                  {val?.title}
                </div>
                {selected && (
                  <div className="absolute bottom-0 inset-x-0 h-[2px] bg-primary-base" />
                )}
              </>
            )}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {listTitles.map((val, index) => (
          <TabPanel
            className="rounded-lg ring-primary-hover focus:outline-none focus-visible:ring-2"
            key={index}
          >
            {val?.node}
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  )
}
