import { SideBarItemType, SideBarSubItemType } from '@/models/ui/sidebar'

export const home: SideBarItemType = {
  link: '/dashboard',
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  ),
  iconFilled: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
      <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
    </svg>
  ),
  text: 'Trang chủ',
  onlyFor: ['SA', 'AU', 'LT'],
}
export const university: SideBarItemType = {
  link: '/university',
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
  iconFilled: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
        clipRule="evenodd"
      />
    </svg>
  ),
  text: 'Trường học',
  onlyFor: ['SA'],
}
export const business: SideBarItemType = {
  link: '/business',
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
  iconFilled: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
        clipRule="evenodd"
      />
    </svg>
  ),
  text: 'Doanh nghiệp',
  onlyFor: ['SA'],
}
export const major: SideBarItemType = {
  link: '/marjor',
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  iconFilled: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
        clipRule="evenodd"
      />
    </svg>
  ),
  text: 'Khoa - Viện - Ngành',
  onlyFor: ['AU'],
}

const University: SideBarSubItemType = {
  link: '/account-university',
  text: 'Trường học',
  onlyFor: ['SA'],
}
const Humanresource: SideBarSubItemType = {
  link: '/account-humanresource',
  text: 'Doanh nghiệp',
  onlyFor: ['SA'],
}
const Lecturer: SideBarSubItemType = {
  link: '/account-lecturer',
  text: 'Giảng viên',
  onlyFor: ['AU'],
}
const Student: SideBarSubItemType = {
  link: '/account-student',
  text: 'Sinh viên',
  onlyFor: ['AU'],
}
const Group: SideBarSubItemType = {
  link: '/group',
  text: 'Nhóm',
  onlyFor: ['AU'],
}

export const Account: SideBarItemType = {
  link: '',
  icon: (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
    >
      <path
        d="M20.8197 16.2469C19.8236 15.6703 18.6095 15.825 17.7916 16.5469L16.5494 15.8273V12.2719C16.5494 11.9039 16.3525 11.5617 16.0337 11.3789L12.8462 9.54375V7.97109C13.8822 7.61953 14.6275 6.63984 14.6275 5.48438C14.6275 4.03359 13.4533 2.85938 12.0025 2.85938C10.5517 2.85938 9.37749 4.03359 9.37749 5.48438C9.37749 6.63984 10.1228 7.61953 11.1587 7.97109V9.54375L7.97124 11.3789C7.65249 11.5617 7.45562 11.9039 7.45562 12.2719V15.825L6.21343 16.5445C5.39546 15.8227 4.17905 15.668 3.1853 16.2445C1.9314 16.9711 1.50483 18.5742 2.22437 19.8281C2.94624 21.082 4.54233 21.5133 5.79155 20.7891C6.78765 20.2125 7.26108 19.0781 7.0478 18.0047L8.18921 17.3414L11.4845 19.2398C11.6439 19.3313 11.822 19.3781 12.0001 19.3781C12.1783 19.3781 12.3564 19.3313 12.5158 19.2398L15.8087 17.3438L16.9501 18.007C16.7369 19.0781 17.2126 20.2148 18.2064 20.7914C19.4556 21.5156 21.0541 21.0867 21.7736 19.8305C22.4955 18.5742 22.0689 16.9711 20.8197 16.2469ZM5.04624 19.4906C4.91894 19.5644 4.77831 19.6122 4.63245 19.6313C4.48659 19.6505 4.33838 19.6406 4.19636 19.6023C4.05433 19.564 3.92128 19.4979 3.80488 19.408C3.68848 19.318 3.59102 19.2059 3.51812 19.0781C3.20874 18.5414 3.39155 17.8523 3.92827 17.543C4.05557 17.4692 4.1962 17.4214 4.34206 17.4022C4.48792 17.3831 4.63613 17.3929 4.77816 17.4313C4.92019 17.4696 5.05323 17.5357 5.16963 17.6256C5.28603 17.7156 5.38349 17.8277 5.4564 17.9555C5.76577 18.4922 5.58296 19.1812 5.04624 19.4906ZM10.8751 5.48438C10.8812 5.18998 11.0023 4.90968 11.2126 4.7036C11.423 4.49753 11.7057 4.38211 12.0001 4.38211C12.2946 4.38211 12.5773 4.49753 12.7876 4.7036C12.998 4.90968 13.1191 5.18998 13.1251 5.48438C13.1191 5.77877 12.998 6.05907 12.7876 6.26515C12.5773 6.47122 12.2946 6.58664 12.0001 6.58664C11.7057 6.58664 11.423 6.47122 11.2126 6.26515C11.0023 6.05907 10.8812 5.77877 10.8751 5.48438ZM14.8595 15.9422L12.0001 17.5898L9.14077 15.9422V12.6516L12.0001 11.0039L14.8595 12.6516V15.9422ZM20.4822 19.0805C20.1728 19.6172 19.4884 19.8023 18.9541 19.493C18.4197 19.1836 18.2345 18.4945 18.5439 17.9578C18.8533 17.4211 19.5376 17.2359 20.072 17.5453C20.6087 17.8547 20.7916 18.5414 20.4822 19.0805Z"
        fill="currentColor"
      />
    </svg>
  ),
  iconFilled: (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.8197 16.2469C19.8236 15.6703 18.6095 15.825 17.7916 16.5469L16.5494 15.8273V12.2719C16.5494 11.9039 16.3525 11.5617 16.0337 11.3789L12.8462 9.54375V7.97109C13.8822 7.61953 14.6275 6.63984 14.6275 5.48438C14.6275 4.03359 13.4533 2.85938 12.0025 2.85938C10.5517 2.85938 9.37749 4.03359 9.37749 5.48438C9.37749 6.63984 10.1228 7.61953 11.1587 7.97109V9.54375L7.97124 11.3789C7.65249 11.5617 7.45562 11.9039 7.45562 12.2719V15.825L6.21343 16.5445C5.39546 15.8227 4.17905 15.668 3.1853 16.2445C1.9314 16.9711 1.50483 18.5742 2.22437 19.8281C2.94624 21.082 4.54233 21.5133 5.79155 20.7891C6.78765 20.2125 7.26108 19.0781 7.0478 18.0047L8.18921 17.3414L11.4845 19.2398C11.6439 19.3313 11.822 19.3781 12.0001 19.3781C12.1783 19.3781 12.3564 19.3313 12.5158 19.2398L15.8087 17.3438L16.9501 18.007C16.7369 19.0781 17.2126 20.2148 18.2064 20.7914C19.4556 21.5156 21.0541 21.0867 21.7736 19.8305C22.4955 18.5742 22.0689 16.9711 20.8197 16.2469ZM5.04624 19.4906C4.91894 19.5644 4.77831 19.6122 4.63245 19.6313C4.48659 19.6505 4.33838 19.6406 4.19636 19.6023C4.05433 19.564 3.92128 19.4979 3.80488 19.408C3.68848 19.318 3.59102 19.2059 3.51812 19.0781C3.20874 18.5414 3.39155 17.8523 3.92827 17.543C4.05557 17.4692 4.1962 17.4214 4.34206 17.4022C4.48792 17.3831 4.63613 17.3929 4.77816 17.4313C4.92019 17.4696 5.05323 17.5357 5.16963 17.6256C5.28603 17.7156 5.38349 17.8277 5.4564 17.9555C5.76577 18.4922 5.58296 19.1812 5.04624 19.4906ZM10.8751 5.48438C10.8812 5.18998 11.0023 4.90968 11.2126 4.7036C11.423 4.49753 11.7057 4.38211 12.0001 4.38211C12.2946 4.38211 12.5773 4.49753 12.7876 4.7036C12.998 4.90968 13.1191 5.18998 13.1251 5.48438C13.1191 5.77877 12.998 6.05907 12.7876 6.26515C12.5773 6.47122 12.2946 6.58664 12.0001 6.58664C11.7057 6.58664 11.423 6.47122 11.2126 6.26515C11.0023 6.05907 10.8812 5.77877 10.8751 5.48438ZM14.8595 15.9422L12.0001 17.5898L9.14077 15.9422V12.6516L12.0001 11.0039L14.8595 12.6516V15.9422ZM20.4822 19.0805C20.1728 19.6172 19.4884 19.8023 18.9541 19.493C18.4197 19.1836 18.2345 18.4945 18.5439 17.9578C18.8533 17.4211 19.5376 17.2359 20.072 17.5453C20.6087 17.8547 20.7916 18.5414 20.4822 19.0805Z"
        fill="currentColor"
      />
    </svg>
  ),
  text: 'Quản lý người dùng',
  subSideBarItem: [University, Humanresource, Lecturer, Student, Group],
  onlyFor: ['SA', 'AU'],
}
export const Report: SideBarItemType = {
  link: '/report/lecturer',
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
      />
    </svg>
  ),

  iconFilled: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z"
        clipRule="evenodd"
      />
    </svg>
  ),
  text: 'Quản lý và chấm điểm',
  onlyFor: ['LT', 'HR'],
}
export const Schedule: SideBarItemType = {
  link: '/schedule',
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  iconFilled: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
        clipRule="evenodd"
      />
    </svg>
  ),
  text: 'Cấu hình mốc thời gian',
  onlyFor: ['LT'],
}
export const Post: SideBarItemType = {
  link: '/post',
  icon: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2 2.90909C2 2.40701 2.40701 2 2.90909 2H9.27273C9.7748 2 10.1818 2.40701 10.1818 2.90909V9.27273C10.1818 9.7748 9.7748 10.1818 9.27273 10.1818H2.90909C2.40701 10.1818 2 9.7748 2 9.27273V2.90909ZM3.81818 3.81818V8.36364H8.36364V3.81818H3.81818Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2 14.7273C2 14.2252 2.40701 13.8182 2.90909 13.8182H9.27273C9.7748 13.8182 10.1818 14.2252 10.1818 14.7273V21.0909C10.1818 21.593 9.7748 22 9.27273 22H2.90909C2.40701 22 2 21.593 2 21.0909V14.7273ZM3.81818 15.6364V20.1818H8.36364V15.6364H3.81818Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.9091 3.81818C12.9091 3.3161 13.3161 2.90909 13.8182 2.90909H21.0909C21.593 2.90909 22 3.3161 22 3.81818C22 4.32026 21.593 4.72727 21.0909 4.72727H13.8182C13.3161 4.72727 12.9091 4.32026 12.9091 3.81818Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.9091 8.36364C12.9091 7.86156 13.3161 7.45455 13.8182 7.45455H21.0909C21.593 7.45455 22 7.86156 22 8.36364C22 8.86571 21.593 9.27273 21.0909 9.27273H13.8182C13.3161 9.27273 12.9091 8.86571 12.9091 8.36364Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.9091 15.6364C12.9091 15.1343 13.3161 14.7273 13.8182 14.7273H21.0909C21.593 14.7273 22 15.1343 22 15.6364C22 16.1384 21.593 16.5455 21.0909 16.5455H13.8182C13.3161 16.5455 12.9091 16.1384 12.9091 15.6364Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.9091 20.1818C12.9091 19.6797 13.3161 19.2727 13.8182 19.2727H21.0909C21.593 19.2727 22 19.6797 22 20.1818C22 20.6839 21.593 21.0909 21.0909 21.0909H13.8182C13.3161 21.0909 12.9091 20.6839 12.9091 20.1818Z"
        fill="currentColor"
      />
    </svg>
  ),
  iconFilled: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.27273 10.1818H2.90909C2.66798 10.1818 2.43675 10.086 2.26627 9.91555C2.09578 9.74506 2 9.51383 2 9.27273V2.90909C2 2.66798 2.09578 2.43675 2.26627 2.26627C2.43675 2.09578 2.66798 2 2.90909 2H9.27273C9.51383 2 9.74506 2.09578 9.91555 2.26627C10.086 2.43675 10.1818 2.66798 10.1818 2.90909V9.27273C10.1818 9.51383 10.086 9.74506 9.91555 9.91555C9.74506 10.086 9.51383 10.1818 9.27273 10.1818Z"
        fill="currentColor"
      />
      <path
        d="M9.27273 22H2.90909C2.66798 22 2.43675 21.9042 2.26627 21.7337C2.09578 21.5632 2 21.332 2 21.0909V14.7273C2 14.4862 2.09578 14.2549 2.26627 14.0844C2.43675 13.914 2.66798 13.8182 2.90909 13.8182H9.27273C9.51383 13.8182 9.74506 13.914 9.91555 14.0844C10.086 14.2549 10.1818 14.4862 10.1818 14.7273V21.0909C10.1818 21.332 10.086 21.5632 9.91555 21.7337C9.74506 21.9042 9.51383 22 9.27273 22Z"
        fill="currentColor"
      />
      <path d="M22 2.90909H12.9091V4.72727H22V2.90909Z" fill="currentColor" />
      <path d="M22 7.45455H12.9091V9.27273H22V7.45455Z" fill="currentColor" />
      <path d="M22 14.7273H12.9091V16.5455H22V14.7273Z" fill="currentColor" />
      <path d="M22 19.2727H12.9091V21.0909H22V19.2727Z" fill="currentColor" />
    </svg>
  ),
  text: 'Quản lý bài đăng',
  onlyFor: ['HR'],
}
