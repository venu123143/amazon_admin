import { useEffect, useState } from "react"
import type { ColumnsType } from 'antd/es/table';
import { Table } from 'antd';
import { useTheme } from "../../context/themecontent"

import { AppDispatch, RootState } from "../../Redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getAllBlogs, openModal } from "../../Redux/Reducers/blogs/blogSlice";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import DeleteModal from "../../components/DeleteModal";
import { useNavigate } from "react-router-dom";
import BlogModal from "../../components/BlogModal";

const Blogs = () => {
  const dispatch: AppDispatch = useDispatch()
  const { blogs, modal } = useSelector((state: RootState) => state.blogs)
  const navigate = useNavigate()
  const { message, user, isError, isSuccess } = useSelector((state: RootState) => state.auth)
  const { isDarkMode } = useTheme()

  const [del, setDel] = useState<any>(false)
  const [id, setId] = useState<any>("")

  const handleDelete = (id: string) => {
    dispatch(deleteBlog(id)).then(() => {
      setDel(false)
      dispatch(getAllBlogs())

    })
  }

  useEffect(() => {
    if (user === null) {
      navigate('/')
    }
  }, [message, user, isError, isSuccess])

  useEffect(() => {
    dispatch(getAllBlogs())
  }, [modal])
  // const tableTheme: ThemeConfig = {
  //   token: {
  //     colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
  //     colorText: isDarkMode ? '#ffffff' : '#333333',
  //     colorBorderSecondary: isDarkMode ? '#444444' : '#f0f0f0',
  //     colorFillAlter: isDarkMode ? '#2a2a2a' : '#fafafa',
  //   },
  //   components: {
  //     Table: {
  //       headerBg: isDarkMode ? '#1a1a1a' : '#fafafa',
  //       headerColor: isDarkMode ? '#ffffff' : '#333333',
  //       headerSortActiveBg: isDarkMode ? '#333333' : '#e6f7ff',
  //       headerSortHoverBg: isDarkMode ? '#2a2a2a' : '#f5f5f5',
  //       rowHoverBg: isDarkMode ? '#333333' : '#fafafa',
  //       borderColor: isDarkMode ? '#444444' : '#f0f0f0',
  //     }
  //   }
  // };
  interface BlogsDataType {
    key: number;
    title: string;
    category: string;
    auther: string;
    createdAt: string;
    views: number;
    action: any;
  }
  const tableData: Array<BlogsDataType> = [];

  for (let i = 0; i < blogs.length; i++) {
    tableData.push({
      key: i,
      title: blogs[i].title,
      category: blogs[i].category?.title,
      views: blogs[i].numViews,
      auther: blogs[i].auther?.firstname ? blogs[i].auther?.firstname + " " + blogs[i].auther?.lastname : 'user',
      createdAt: new Date(blogs[i].createdAt).toLocaleDateString(),
      action: (
        <div className="flex space-x-2">
          <li className="cursor-pointer hover:text-blue-500" >
            <AiOutlineEdit size={20} onClick={() => {
              dispatch(openModal(true))
              setId(blogs[i])
            }} />
          </li>
          <li className="cursor-pointer hover:text-blue-500">
            <AiOutlineDelete size={20} onClick={() => {
              setDel(true)
              setId(blogs[i]._id)
            }} />
          </li>
        </div >
      )
    })
  }
  const columns: ColumnsType<BlogsDataType> = [
    {
      title: 'SNO.',
      dataIndex: 'key',
      render: (text: string) => <a>{text}</a>,
      sorter: (a, b) => a.key - b.key

    },
    {
      title: 'title',
      dataIndex: 'title',
      sorter: (a, b) => a.title.length - b.title.length

    },
    {
      title: 'category',
      dataIndex: 'category',
      sorter: (a, b) => a.category.length - b.category.length

    },
    {
      title: 'auther',
      dataIndex: 'auther',
    },
    {
      title: 'views',
      dataIndex: 'views',
      sorter: (a, b) => a.views - b.views
    },
    {
      title: 'created At',
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
      <h3 className="font-Rubik font-[550] text-[1.52rem] font  my-4 text-gray-900 dark:text-white">Blog List</h3>
      <div>

        <Table
          columns={columns}
          dataSource={tableData}
          pagination={{ pageSize: 10 }}
          rowClassName={() => isDarkMode ? 'dark-row' : 'light-row'}
        />
        <DeleteModal openModal={setDel} modal={del} onClick={() => handleDelete(id)} />
        <BlogModal prod={id} />
      </div>
    </div>
  )
}

export default Blogs