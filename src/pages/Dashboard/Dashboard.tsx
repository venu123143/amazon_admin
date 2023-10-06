import SalesCard from "../../components/SalesCard"
import { cards } from "../../static/Static"
import Chart from 'react-apexcharts'

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
const Dashboard = () => {
  interface DataType {
    key: React.Key;
    name: string;
    product: number;
    status: string;
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
      render: (text: string) => <div className={`${text === 'success' ? " bg-green-500" : text === "pending" ? "bg-[#F29339]" : "bg-red-500"} cursor-pointer py-1 px-2 rounded-md w-fit text-white `}>{text}</div>
    },
  ];

  const tableData: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    tableData.push({
      key: i,
      name: `Edward King ${i}`,
      product: 32,
      status: i % 2 == 0 ? `success` : i % 3 == 0 ? "pending" : 'failure'
    });
  }

  const options = {
    chart: {
      id: "month wise sales",
    },
    xaxis: {
      categories: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
    },
    plotOptions: {
      bar: {
        columnWidth: '60%',
      }
    }

  }
  const series = [
    {
      name: "series of data",
      data: [30, 40, 45, 50, 49, 60, 70, 91, 73, 121, 110, 71],
    }
  ]

  return (
    <div className="bg-transparent">
      <h3 className="font-Rubik font-[550] text-[1.52rem] font  my-4 ">Dashboard</h3>

      <div className="block 1100px:flex justify-between items-center gap-3 space-y-1 w-full">
        {cards.map((each, index) => (
          <div className="lg:w-full w-auto" key={index}>
            <SalesCard title={each.title} value={each.value} />
          </div>
        ))}

      </div>
      <div className="my-4">
        <h3 className="font-Rubik font-[550] text-[1.52rem] font  my-4 ">Income Statistics</h3>
        <Chart options={options} series={series} type="bar" width="100%" />
      </div>
      <div className="my-4">
        <h3 className="font-Rubik font-[550] text-[1.52rem] font  my-4 ">Recent Orders</h3>
        <div>
          <Table
            columns={columns}
            dataSource={tableData}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard