import { useEffect, useState } from "react"
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

import { AppDispatch, RootState } from '../../Redux/Store';
import { deleteBrand, editBrand, getAllBrands } from "../../Redux/Reducers/brand/brandSlice";
import DeleteModal from "../../components/DeleteModal";
import EditModal from "../../components/EditModal";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { object, string } from "yup";

let BrandCatSchema = object({
  title: string().required('Title is Required'),

})
const BrandList = () => {
  const [del, setDel] = useState<any>(false)
  const [edit, setEdit] = useState(false)
  const [id, setId] = useState("")

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const { brands } = useSelector((state: RootState) => state.brand)
  const { message, user, isLoading, isError, isSuccess } = useSelector((state: RootState) => state.auth)

  const handleDelete = (id: string) => {
    dispatch(deleteBrand(id))
    setDel(false)
  }
  const formik = useFormik({
    initialValues: {
      title: ''
    },
    validationSchema: BrandCatSchema,
    onSubmit: data => {
      dispatch(editBrand({ id, data }))
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
    dispatch(getAllBrands())
  }, [del, edit])

  interface BrandDataType {
    key: React.Key;
    CreatedAt: string;
    UpdatedAt: string;
    title: string;
    Action: any;

  }
  const tableData: Array<BrandDataType> = [];

  for (let i = 0; i < brands.length; i++) {
    tableData.push({
      key: i,
      title: brands[i].title,
      UpdatedAt: new Date(brands[i].updatedAt).toLocaleDateString(),
      CreatedAt: new Date(brands[i].createdAt).toLocaleDateString(),
      Action: (
        <div className="flex space-x-2">
          <li className="cursor-pointer hover:text-blue-500"
            onClick={() => {
              setEdit(true)
              setId(brands[i]._id)
            }} >
            <AiOutlineEdit size={20} />
          </li>
          <li className="cursor-pointer hover:text-blue-500" >
            <AiOutlineDelete size={20} onClick={() => {
              setDel(true)
              setId(brands[i]._id)
            }} />
          </li>
        </div>
      )
    })
  }

  const columns: ColumnsType<BrandDataType> = [
    {
      title: 'SNO.',
      dataIndex: 'key',
      render: (text: string) => <a>{text}</a>,
      sorter: (a, b) => parseInt(a.key as string) - parseInt(b.key as string)
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
      <h3 className="font-Rubik font-[550] text-[1.52rem] font  my-4 "> List of Brands</h3>
      <div>
        <Table
          columns={columns}
          dataSource={tableData} />
        <EditModal modal={edit} openModal={setEdit} title="brand" name="title"
          value={formik.values.title} onChange={formik.handleChange("title")} onBlur={formik.handleBlur('title')}
          onSubmit={formik.handleSubmit} />
        <DeleteModal openModal={setDel} modal={del} onClick={() => handleDelete(id)} />

      </div>
    </div>
  )
}

export default BrandList