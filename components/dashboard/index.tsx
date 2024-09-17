import Image from 'next/image'
import waitingDev from '@/public/images/wating-dev.png'
import {
  NotStudentWrapper,
  NotSystemAdminWrapper,
  StudentWrapper,
  SystemAdminWrapper,
} from '../auth/auth-wrapper'
import StudentHomePage from './student'
import CodingPage from '../page-error/coding'

const DashboardWrapper = () => {
  return (
    <>
      <SystemAdminWrapper>
        <CodingPage />
      </SystemAdminWrapper>
      
      <NotSystemAdminWrapper>
        <NotStudentWrapper>
          <CodingPage />
        </NotStudentWrapper>
        <StudentWrapper>
          <StudentHomePage />
        </StudentWrapper>
      </NotSystemAdminWrapper>
    </>
  )
}
export default DashboardWrapper
