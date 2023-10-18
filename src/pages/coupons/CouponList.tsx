import { useEffect, useState } from "react"
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../Redux/Store';
import { useDispatch, useSelector } from 'react-redux';
import { deletecoupon, getAllcoupons, openModal } from '../../Redux/Reducers/coupons/CouponSlice';
import DeleteModal from "../../components/DeleteModal";

import CouponModel from "../../components/CouponModel";


const couponList = () => {
  const [del, setDel] = useState<any>(false)
  const [id, setId] = useState<any>("")

  const dispatch: AppDispatch = useDispatch()
  const { coupons, modal } = useSelector((state: RootState) => state.coupon)
  const navigate = useNavigate();
  const { message, user, isError, isLoading, isSuccess } = useSelector((state: RootState) => state.auth)

  const handleDelete = (id: string) => {
    dispatch(deletecoupon(id))
    setDel(false)
  }
  useEffect(() => {
    if (user === null) {
      navigate('/')
    }
  }, [message, user, isLoading, isError, isSuccess])

  useEffect(() => {
    dispatch(getAllcoupons())
  }, [del, modal])

  interface couponDataType {
    key: React.Key;
    name: string;
    createdAt: string;
    expiry: string;
    Action: any;
    discount: number
  }
  const tableData: couponDataType[] = [];
  for (let i = 0; i < coupons.length; i++) {
    tableData.push({
      key: i,
      name: coupons[i].name,
      expiry: new Date(coupons[i].expiry).toLocaleDateString(),
      createdAt: new Date(coupons[i].createdAt).toLocaleDateString(),
      discount: coupons[i].discount,
      Action: (
        <div className="flex space-x-2">
          <li className="cursor-pointer hover:text-blue-500"
            onClick={() => {
              dispatch(openModal(true))
              setId(coupons[i])
            }}>
            <AiOutlineEdit size={20} />
          </li>
          <li className="cursor-pointer hover:text-blue-500" >
            <AiOutlineDelete size={20} onClick={() => {
              setDel(true)
              setId(coupons[i]._id)
            }} />
          </li>
        </div>
      )
    })
  }

  const columns: ColumnsType<couponDataType> = [
    {
      title: 'SNO.',
      dataIndex: 'key',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length

    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      sorter: (a, b) => {
        const nameA = a.createdAt
        const nameB = b.createdAt

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }
    },
    {
      title: 'Expiry',
      dataIndex: 'expiry',
      sorter: (a, b) => {
        const nameA = a.expiry
        const nameB = b.expiry

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }
    },
    {
      title: 'discount',
      dataIndex: 'discount',
    },
    {
      title: 'Action',
      dataIndex: 'Action',
    },

  ];
  return (
    <div className="my-4">
      <h3 className="font-Rubik font-[550] text-[1.52rem] font  my-4 ">List of coupons</h3>
      <div>
        <Table
          columns={columns}
          dataSource={tableData}
        />
        <DeleteModal openModal={setDel} modal={del} onClick={() => handleDelete(id)} />
        <CouponModel coupon={id} />
      </div>
    </div>
  )
}

export default couponList