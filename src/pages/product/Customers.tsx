import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';

const Customers = () => {

    interface DataType {
        key: React.Key;
        name: string;
        product: number;
        status: string;
      }
    const tableData: DataType[] = [];
    for (let i = 0; i < 46; i++) {
      tableData.push({
        key: i,
        name: `Edward King ${i}`,
        product: 32,
        status: i % 2 == 0 ? `success` : i%3==0 ? "pending" : 'failure'
      });
    }
    const columns: ColumnsType<DataType> = [
        {
          title: 'SNO.',
          dataIndex: 'key',
          render: (text: string) => <a>{text}</a>,
        },
        {
          title: 'Name',
          dataIndex: 'name',
        },
        {
          title: 'Product',
          dataIndex: 'product',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          render: (text: string) => <div className={`${text === 'success' ? " bg-green-500" :  text ==="pending" ? "bg-[#F29339]"  : "bg-red-500" } cursor-pointer py-1 px-2 rounded-md w-fit text-white `}>{text}</div>
        },
      ];
  return (
   <div className="my-4">
        <h3 className="font-Rubik font-[550] text-[1.52rem] font  my-4 ">Recent Customers</h3>
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