import { useEffect } from "react"
import { useSelector } from "react-redux";
import Chart from 'react-apexcharts'
import { useNavigate } from "react-router-dom"

import SalesCard from "../../components/SalesCard"
import { RootState } from "../../Redux/Store";
import Orders from "../product/Orders"

const Dashboard = () => {
  const navigate = useNavigate()
  const { orders } = useSelector((state: RootState) => state.ord)
  const { message, user, isLoading, isError, isSuccess } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (user === null) {
      navigate('/')
    }
  }, [message, user, isLoading, isError, isSuccess])


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

  const totalOrderAmount = orders?.reduce((total, order) => {
    return total + order.paymentIntent.amount;
  }, 0);

  // Calculate the average order value
  const averageOrderValue = totalOrderAmount / orders.length;

  const cards = [
    {
      title: 'Total Sold Amount ',
      value: `$ ${totalOrderAmount}`,
    },
    {
      title: 'Average order value',
      value: `$ ${averageOrderValue}`,
    },
    {
      title: 'Total orders',
      value: orders.length,
    },
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
        <Chart options={options} series={series} type="bar" className="" />
      </div>
      <div className="my-4">
        <Orders />
      </div>
    </div>
  )
}

export default Dashboard