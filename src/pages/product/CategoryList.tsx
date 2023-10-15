import { useEffect, useState } from "react"

import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/Store';
import { deleteCategory, getCategories } from "../../Redux/Reducers/pcategory/pcategorySlice";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import DeleteModal from "../../components/DeleteModal";
import EditModal from "../../components/EditModal";

const CategoryList = () => {
  const [del, setDel] = useState<any>(false)
  const [id, setId] = useState("")
  const [modal, setOpenModal] = useState(false)

  const dispatch: AppDispatch = useDispatch()
  const { categories } = useSelector((state: RootState) => state.pcategory)
  const navigate = useNavigate();
  const { message, user, isError, isLoading, isSuccess } = useSelector((state: RootState) => state.auth)

  const handleDelete = (id: string) => {
    dispatch(deleteCategory(id))
    setDel(false)
  }

  useEffect(() => {
    if (user === null) {
      navigate('/')
    }
  }, [message, user, isLoading, isError, isSuccess])

  useEffect(() => {
    dispatch(getCategories())
  }, [del])
  interface ProductDataType {
    key: React.Key;
    CreatedAt: string;
    UpdatedAt: string;
    title: string;
    Action: any;
  }
  const tableData: ProductDataType[] = [];

  for (let i = 0; i < categories.length; i++) {
    tableData.push({
      key: i,
      title: categories[i].title,
      UpdatedAt: new Date(categories[i].updatedAt).toLocaleDateString(),
      CreatedAt: new Date(categories[i].createdAt).toLocaleDateString(),
      Action: (
        <div className="flex space-x-2">
          <li className="cursor-pointer hover:text-blue-500" onClick={() => setOpenModal(true)} >
            <AiOutlineEdit size={20} />
          </li>
          <li className="cursor-pointer hover:text-blue-500" >
            <AiOutlineDelete size={20} onClick={() => {
              setDel(true)
              setId(categories[i]._id)
            }} />
          </li>
        </div>

      )
    })
  }

  const columns: ColumnsType<ProductDataType> = [
    {
      title: 'SNO.',
      dataIndex: 'key',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      sorter: (a, b) => a.title.length - b.title.length
    },
    {
      title: 'Created At',
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
      title: 'Updated At',
      dataIndex: 'UpdatedAt',
      sorter: (a, b) => {
        const nameA = a.UpdatedAt
        const nameB = b.UpdatedAt

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
      title: 'Action',
      dataIndex: 'Action',
    },

  ];

  return (
    <div className="my-4">
      <h3 className="font-Rubik font-[550] text-[1.52rem] font  my-4 ">Product Category List</h3>
      <div>
        <Table
          columns={columns}
          dataSource={tableData} />
        <DeleteModal openModal={setDel} modal={del} onClick={() => handleDelete(id)} />
        <EditModal openModal={setOpenModal} modal={modal} title="product category " />
      </div>
    </div>
  )
}

export default CategoryList