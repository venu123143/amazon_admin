import { useEffect, useState } from "react"
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import {  useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../Redux/Store';
import { useDispatch, useSelector } from 'react-redux';
import { deleteColor, editColor, getColors } from '../../Redux/Reducers/color/colorSlice';
import DeleteModal from "../../components/DeleteModal";
import EditModal from "../../components/EditModal";
import { useFormik } from "formik";
import { object, string } from "yup";

let ColorSchema = object({
  title: string().required('Title is Required'),

})
const ColorList = () => {
  const [del, setDel] = useState<any>(false)
  const [id, setId] = useState("")
  const [edit, setEdit] = useState(false)

  const dispatch: AppDispatch = useDispatch()
  const { colors } = useSelector((state: RootState) => state.color)
  const navigate = useNavigate();
  const { message, user, isError, isLoading, isSuccess } = useSelector((state: RootState) => state.auth)

  const handleDelete = (id: string) => {
    dispatch(deleteColor(id))
    setDel(false)
  }
  const formik = useFormik({
    initialValues: {
      title: ''
    },
    validationSchema: ColorSchema,
    onSubmit: data => {
      dispatch(editColor({ id, data }))
      formik.resetForm()
      setEdit(false)
    }
  })

  useEffect(() => {
    if (user === null) {
      navigate('/')
    }
  }, [message, user, isLoading, isError, isSuccess])

  useEffect(() => {
    dispatch(getColors())
  }, [del, edit])

  interface ColorDataType {
    key: React.Key;
    title: string;
    UpdatedAt: string;
    CreatedAt: string;
    Action: any;
  }
  const tableData: ColorDataType[] = [];
  for (let i = 0; i < colors.length; i++) {
    tableData.push({
      key: i,
      title: colors[i].title,
      UpdatedAt: new Date(colors[i].updatedAt).toLocaleDateString(),
      CreatedAt: new Date(colors[i].createdAt).toLocaleDateString(),
      Action: (
        <div className="flex space-x-2">
          <li className="cursor-pointer hover:text-blue-500"
            onClick={() => {
              setEdit(true)
              setId(colors[i]._id)
            }}>
            <AiOutlineEdit size={20} />
          </li>
          <li className="cursor-pointer hover:text-blue-500" >
            <AiOutlineDelete size={20} onClick={() => {
              setDel(true)
              setId(colors[i]._id)
            }} />
          </li>
        </div>
      )
    })
  }

  const columns: ColumnsType<ColorDataType> = [
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
      <h3 className="font-Rubik font-[550] text-[1.52rem] font  my-4 text-gray-900 dark:text-white">List of Colors</h3>
      <div>
        <Table
          columns={columns}
          dataSource={tableData}
        />
        <DeleteModal openModal={setDel} modal={del} onClick={() => handleDelete(id)} />
        <EditModal openModal={setEdit} modal={edit} title="Color"
          value={formik.values.title} onChange={formik.handleChange("title")} onBlur={formik.handleBlur('title')}
          onSubmit={formik.handleSubmit} />

      </div>
    </div>
  )
}

export default ColorList