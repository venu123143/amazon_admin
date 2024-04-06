import { useEffect, useState } from "react"
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';
import { AppDispatch, RootState } from '../../Redux/Store';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlogCategory, editBlogCategory, getBlogCategories } from '../../Redux/Reducers/blogCategory/blogCatSlice';
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import DeleteModal from "../../components/DeleteModal";
import EditModal from "../../components/EditModal";
import { useFormik } from "formik";
import { object, string } from "yup";

let BlogCatSchema = object({
  title: string().required('Title is Required'),

})

const BlogCatList = () => {
  const [del, setDel] = useState<any>(false)
  const [id, setId] = useState("")
  const [edit, setEdit] = useState(false)

  const dispatch: AppDispatch = useDispatch()
  const { blogCategory } = useSelector((state: RootState) => state.blogCat)
  const navigate = useNavigate()
  const { message, user, isLoading, isError, isSuccess } = useSelector((state: RootState) => state.auth)

  const handleDelete = (id: string) => {
    dispatch(deleteBlogCategory(id)).then(() => {
      setDel(false)
      dispatch(getBlogCategories())
    })
  }

  const formik = useFormik({
    initialValues: {
      title: ''
    },
    validationSchema: BlogCatSchema,
    onSubmit: data => {
      dispatch(editBlogCategory({ id, data }))
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
    dispatch(getBlogCategories())
  }, [edit])

  interface BrandDataType {
    key: React.Key;
    CreatedAt: string;
    UpdatedAt: string;
    title: string;
    Action: any;

  }
  const tableData: Array<BrandDataType> = [];

  for (let i = 0; i < blogCategory.length; i++) {
    tableData.push({
      key: i,
      title: blogCategory[i].title,
      UpdatedAt: new Date(blogCategory[i].updatedAt).toLocaleDateString(),
      CreatedAt: new Date(blogCategory[i].createdAt).toLocaleDateString(),
      Action: (
        <div className="flex space-x-2">
          <li className="cursor-pointer hover:text-blue-500"
            onClick={() => {
              setEdit(true)
              setId(blogCategory[i]._id)
            }}
          >
            <AiOutlineEdit size={20} />
          </li>
          <li className="cursor-pointer hover:text-blue-500">
            <AiOutlineDelete size={20} onClick={() => {
              setDel(true)
              setId(blogCategory[i]._id)
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
      <h3 className="font-Rubik font-[550] text-[1.52rem] font  my-4 ">Blog Category List</h3>
      <div>
        <Table
          columns={columns}
          dataSource={tableData}
        />
        <DeleteModal openModal={setDel} modal={del} onClick={() => handleDelete(id)} />
        <EditModal openModal={setEdit} modal={edit} title="Blog Category" name="title"
          value={formik.values.title} onChange={formik.handleChange("title")} onBlur={formik.handleBlur('title')}
          onSubmit={formik.handleSubmit} />

      </div>
    </div>
  )
}

export default BlogCatList