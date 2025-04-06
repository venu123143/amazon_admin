import React, { useEffect } from 'react'
import { AppDispatch, RootState } from '../../Redux/Store'
import { useDispatch, useSelector } from 'react-redux'
import { getEnquries } from '../../Redux/Reducers/enq/enqSlice'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'

const Enquries = () => {
  const dispatch: AppDispatch = useDispatch()
  const { enq } = useSelector((state: RootState) => state.enq)
  const navigate = useNavigate()
  const { message, user, isLoading, isError, isSuccess } = useSelector((state: RootState) => state.auth)


  useEffect(() => {
    if (user === null) {
      navigate('/')
    }
  }, [message, user, isLoading, isError, isSuccess])
  useEffect(() => {
    dispatch(getEnquries())
  }, [])

  interface EnqDataType {
    key: React.Key;
    name: string;
    email: string;
    comment: string;
    mobile: number;
    createdAt: string;
    action: any;
  }
  const tableData: Array<EnqDataType> = [];

  for (let i = 0; i < enq.length; i++) {
    tableData.push({
      key: i,
      name: enq[i]?.name,
      email: enq[i]?.email,
      comment: enq[i].brand,
      mobile: enq[i]?.mobile,
      createdAt: new Date(enq[i].createdAt).toLocaleDateString(),
      action: (
        <div className="space-x-2">
          <Link className="" to="/">
            <AiOutlineEdit size={20} />
          </Link>
          <Link className="" to="/">
            <AiOutlineDelete size={20} />
          </Link>
        </div>
      )
    })
  }

  const columns: ColumnsType<EnqDataType> = [
    {
      title: 'SNO.',
      dataIndex: 'key',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'email',
      dataIndex: 'email',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ]
  return (
    <div className="my-4">
      <h3 className="font-Rubik font-[550] text-[1.52rem] font  my-4 text-gray-900 dark:text-white">All Products</h3>
      <div>
        <Table
          columns={columns}
          dataSource={tableData}
        />
      </div>
    </div>
  )
}

export default Enquries