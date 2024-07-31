import { Button } from '@/components/ui/button/button'
import { useLogoutNavigate } from '@/hooks/useLogout'

interface ActionButtonsProps {
  sidebarExpanded: boolean
}

const ActionButtons = (props: ActionButtonsProps) => {
  const logoutNavigate = useLogoutNavigate()
  return (
    <div
      className={`w-full flex justify-center items-center py-4 ${
        props.sidebarExpanded ? 'px-4' : 'px-2'
      }`}
    >
      <Button
        onClick={() => {
          logoutNavigate()
        }}
        intent="primary"
        className="!w-full flex gap-2 !p-2 items-center justify-center text-button-2 text-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
            clipRule="evenodd"
          />
        </svg>

        {props.sidebarExpanded && <div className="">Đăng xuất</div>}
      </Button>
    </div>
  )
}

export default ActionButtons
