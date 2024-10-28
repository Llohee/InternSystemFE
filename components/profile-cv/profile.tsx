import { UserGetDetail } from '@/models/api'
import Avatar from '../ui/avatar/avatar'
import dayjs from 'dayjs'

const ProfileUser = (props: { detailStudent: UserGetDetail }) => {
  return (
    <div className="fixed">
      <div className="p-6 bg-grey-1 rounded-lg flex flex-col gap-6">
        <div className="flex justify-between items-center mt-3">
          <div className="text-title-2">Thông tin</div>
        </div>

        <div className="flex flex-col gap-8">
          <div className={`flex gap-2 text-sm break-all pt-5 items-center`}>
            <Avatar name={props.detailStudent.fullname} size="medium" />
            <div className="flex flex-col text-heading-7">
              <div>{props.detailStudent.fullname}</div>
              <div>{props.detailStudent.email}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 py-5 text-button-3">
            <div className="flex gap-2">
              <p className="text-title-3 text-typography-title">Khoa:</p>
              <p>{props.detailStudent.faculty}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-title-3 text-typography-title">Viện:</p>
              <p>{props.detailStudent.institute}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-title-3 text-typography-title">Ngành:</p>
              <p>{props.detailStudent.major}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-title-3 text-typography-title">Lớp:</p>
              <p>{props.detailStudent.class}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-title-3 text-typography-title">MSSV:</p>
              <p>{props.detailStudent.id_number}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-title-3 text-typography-title">CTĐT:</p>
              <p>{props.detailStudent.program_training}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-title-3 text-typography-title">Niên Khóa:</p>
              <p>
                {dayjs(props.detailStudent.academic_year.start).format('YYYY')}{' '}
                - {dayjs(props.detailStudent.academic_year.end).format('YYYY')}
              </p>
            </div>
            <div className="flex gap-2">
              <p className="text-title-3 text-typography-title">SĐT:</p>
              {props.detailStudent.phone}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileUser
