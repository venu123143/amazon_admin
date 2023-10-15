import { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';
import { AppDispatch, RootState } from '../../Redux/Store';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, getAllOrders } from '../../Redux/Reducers/orders/orderSlice';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import DeleteModal from '../../components/DeleteModal';

const Orders = () => {
  const [del, setDel] = useState<any>(false)
  const [id, setId] = useState("")
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch()
  const { orders } = useSelector((state: RootState) => state.ord)
  const { message, user, isError, isSuccess } = useSelector((state: RootState) => state.auth)

  const handleDelete = (id: string) => {
    dispatch(deleteOrder(id))
    setDel(false)
  }

  useEffect(() => {
    if (user === null) {
      navigate('/')
    }
  }, [message, user, isError, isSuccess])
  
  useEffect(() => {
    dispatch(getAllOrders())
  }, [del])

  interface OrdersDataType {
    key: React.Key;
    order_id: string;
    order_by: string;
    payment_method: string;
    order_amount: number;
    order_status: string;
    createdAt: string;
    action: JSX.Element;
  }
  const tableData: OrdersDataType[] = [];
  for (let i = 0; i < orders.length; i++) {
    tableData.push({
      key: i,
      order_id: orders[i]?.paymentIntent?.order_id,
      order_by: orders[i]?.orderBy?.firstname,
      payment_method: orders[i]?.paymentMethod,
      order_amount: orders[i]?.paymentIntent.amount,
      order_status: orders[i]?.orderStatus,
      createdAt: new Date(orders[i].createdAt).toLocaleDateString(),
      action: (
        <div className="flex space-x-2">
          <li className="cursor-pointer hover:text-blue-500" >
            <AiOutlineEdit size={20} />
          </li>
          <li className="cursor-pointer hover:text-blue-500" >
            <AiOutlineDelete size={20} onClick={() => {
              setDel(true)
              setId(orders[i]._id)
            }} />
          </li>
        </div>
      )
    })
  }
  const PaymentColorCodes: any = {
    Cash_on_Delivery: "bg-[#A52A2A] text-white",
    UPI: "bg-[#18F430]",
    GiftCard: "bg-[#F73812] text-white",
    Debit_Card: "bg-[#0B8018] text-white",
    Credit_Card_EMI: "bg-[#1C2DF6] text-white",
    CreditCard_NO_Cost_Emi: "bg-[#EDF418]"
  }
  const orderStatusCodes: any = {
    Not_Processed: "bg-[#A52A2A] text-white shadow-[#A52A2A]",
    Processing: "bg-[#18F430] shadow-[#0B7C1A]",
    Dispatched: "bg-[#F3F71E] border-black text-black shadow-blue-600",
    Cancelled: "bg-red-600 text-white shadow-red-600",
    Delivered: "bg-[#0B7C1A] text-white shadow-[#0B7C1A]",
    Returned: "bg-black text-white shadow-black",
  }
  const columns: ColumnsType<OrdersDataType> = [
    {
      title: 'SNO.',
      dataIndex: 'key',
      render: (text: string) => <a>{text}</a>,
      sorter: (a, b) => parseInt(a.key as string) - parseInt(b.key as string)
    },
    {
      title: 'order_id',
      dataIndex: 'order_id',

    },
    {
      title: 'order_by',
      dataIndex: 'order_by',
      sorter: (a, b) => a.order_by.length - b.order_by.length
    },
    {
      title: 'Amount',
      dataIndex: 'order_amount',
      sorter: (a, b) => a.order_amount - b.order_amount

    },
    {
      title: 'payment_method',
      dataIndex: 'payment_method',
      sorter: (a, b) => a.payment_method.length - b.payment_method.length,
      render: (text: string) => {
        const cleanedText = text.replaceAll(/\s/g, '');
        let value = null
        for (const key in PaymentColorCodes) {
          if (key.replaceAll('_', '') == cleanedText) {
            value = PaymentColorCodes[key]
            break;
          }
        }

        return (
          <span className={`${value} px-3 py-1 border  select-none  cursor-no-drop rounded-md shadow-md text-center flex flex-nowrap justify-center font-Rubik font-[450]`}>{text}</span>
        )
      }
    },
    {
      title: 'order_status',
      dataIndex: 'order_status',
      sorter: (a, b) => a.order_status.length - b.order_status.length,
      render: (text: string) => {
        const cleanedText = text.replaceAll(/\s/g, '');
        let value = null
        for (const key in orderStatusCodes) {
          if (key.replaceAll('_', '') == cleanedText) {
            value = orderStatusCodes[key]
            break;
          }
        }

        return (
          <span className={`${value} px-2 py-1 select-none flex flex-nowrap cursor-pointer justify-center border rounded-md shadow-md font-Rubik font-[450]`}>{text}</span>
        )
      }
    },
    {
      title: 'created_at',
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
      title: 'action',
      dataIndex: 'action',
    },
  ];


  return (
    <div className="my-4">
      <h3 className="font-Rubik font-[550] text-[1.52rem] font  my-4 ">Recent Orders</h3>
      <div className=''>
        <Table
          columns={columns}
          dataSource={tableData}
        />
        <DeleteModal openModal={setDel} modal={del} onClick={() => handleDelete(id)} />
      </div>
    </div>
  )
}

export default Orders