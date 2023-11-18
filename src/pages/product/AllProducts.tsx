import { useCallback, useEffect, useMemo, useState } from "react"
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"

import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../Redux/Store"
import { deleteProduct, getAllProducts, openModal } from '../../Redux/Reducers/product/productSlice';
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../components/DeleteModal";
import ProductModal from "../../components/ProductModal";

const AllProducts = () => {
  const [del, setDel] = useState<any>(false)
  const [id, setId] = useState("")

  const dispatch: AppDispatch = useDispatch()
  const { products, modal } = useSelector((state: RootState) => state.product)
  const navigate = useNavigate();
  const { message, user, isLoading, isError, isSuccess } = useSelector((state: RootState) => state.auth)

  const handleDelete = useCallback((id: string) => {
    dispatch(deleteProduct(id))
    setDel(false)
  }, [dispatch]);

  useEffect(() => {
    if (user === null) {
      navigate('/')
    }
  }, [message, user, isLoading, isError, isSuccess])

  useEffect(() => {
    dispatch(getAllProducts())
  }, [del, modal])

  interface ProdDataType {
    key: React.Key;
    title: string;
    price: number;
    brand: string;
    quantity: number;
    category: string;
    createdAt: string;
    action: any;
    totalRating: number;
  }

  const tableData: Array<ProdDataType> = useMemo(() => {
    const data = [];
    for (let i = 0; i < products.length; i++) {
      data.push({
        key: i,
        title: products[i].title,
        price: products[i].price,
        brand: products[i].brand?.title,
        category: products[i].category?.title,
        totalRating: products[i].totalRating,
        quantity: products[i].quantity,
        createdAt: new Date(products[i].createdAt).toLocaleDateString(),
        action: (
          <div className="flex space-x-2">
            <li className="cursor-pointer hover:text-blue-500" onClick={() => {
              dispatch(openModal(true));
              setId(products[i]);
            }} >
              <AiOutlineEdit size={20} />
            </li>
            <li className="cursor-pointer hover:text-blue-500" >
              <AiOutlineDelete size={20} onClick={() => {
                setDel(true);
                setId(products[i]._id);
              }} />
            </li>
          </div>
        )
      });
    }
    return data;
  }, [products, dispatch]);
  const columns: ColumnsType<ProdDataType> = [
    {
      title: 'SNO.',
      dataIndex: 'key',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      render: (text: string) => <p className="line-clamp-2 text-justify max-w-sm">{text}</p>,
      sorter: (a, b) => a.title.length - b.title.length
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Rating',
      dataIndex: 'totalRating',
      sorter: (a, b) => a.totalRating - b.totalRating
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity
    },
    {
      title: 'Date',
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
      title: 'Action',
      dataIndex: 'action',
    },
  ];
  return (
    <div className="my-4">
      <h3 className="font-Rubik font-[550] text-[1.52rem] font  my-4 ">All Products</h3>
      <div>
        <Table
          columns={columns}
          dataSource={tableData} />
        <DeleteModal openModal={setDel} modal={del} onClick={() => handleDelete(id)} />
        <ProductModal prod={id} />
      </div>
    </div>
  )
}

export default AllProducts