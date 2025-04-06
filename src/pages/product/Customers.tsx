import type { ColumnsType } from 'antd/es/table';
import { useEffect } from "react"

import Table from 'antd/es/table';

import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../Redux/Store"
import { getAllUsers } from '../../Redux/Reducers/customers/customerSlice';
import { useNavigate } from 'react-router-dom';
import ToggleSwitch from '../../helpers/ToggleSwitch';
const Customers = () => {
  const dispatch: AppDispatch = useDispatch()
  const { customers } = useSelector((state: RootState) => state.customer)
  const navigate = useNavigate();
  const { message, user, isError, isSuccess } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (user === null) {
      navigate('/')
    }
  }, [message, user, isError, isSuccess])

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  interface DataType {
    key: React.Key;
    CreatedAt: string
    Name: string;
    Email: string;
    Mobile: string;
    Blocked: any;
  }
  const tableData: Array<DataType> = [];
  var count = 0;
  for (let i = 0; i < customers.length; i++) {
    if (customers[i].role !== "admin")
      tableData.push({
        key: ++count,
        Name: customers[i].firstname + " " + customers[i].lastname,
        Email: customers[i].email ? customers[i].email : "no value",
        Mobile: customers[i].mobile ? customers[i].mobile : "no value",
        CreatedAt: new Date(customers[i].createdAt).toLocaleDateString(),
        Blocked: (
          <ToggleSwitch isChecked={customers[i].isBlocked} userId={customers[i]._id} index={i} />
        )
        // customers[i].isBlocked.toString(),

      })
  }
  const columns: ColumnsType<DataType> = [
    {
      title: 'SNO.',
      dataIndex: 'key',
      render: (text: string) => <a>{text}</a>,
      sorter: (a, b) => parseInt(a.key as string) - parseInt(b.key as string)
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      defaultSortOrder: "descend",
      sorter: (a, b) => {
        const nameA = a.Name.toString().toLowerCase();
        const nameB = b.Name.toString().toLowerCase();

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
      title: 'Email',
      dataIndex: 'Email',
      sorter: (a, b) => {
        const maila = a.Email.toString().toLowerCase();
        const mailb = b.Email.toString().toLowerCase();

        if (maila < mailb) {
          return -1;
        }
        if (maila > mailb) {
          return 1;
        }
        return 0;
      }
    },
    {
      title: 'Mobile',
      dataIndex: 'Mobile',
    },
    {
      title: 'CreatedAt',
      dataIndex: 'CreatedAt',
      sorter: (a, b) => {
        const nameA = a.CreatedAt
        const nameB = b.CreatedAt

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
      title: 'Block User',
      dataIndex: 'Blocked',
    },
  ];
  return (
    <div className="my-4">
      <h3 className="font-Rubik font-[550] text-[1.52rem] font  my-4 text-gray-900 dark:text-white">Recent Customers</h3>
      <div>
        <Table
          columns={columns}
          dataSource={tableData}
        />
      </div>
    </div>
  )
}

export default Customers