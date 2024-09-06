import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../Main';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

function Dashboard() {
  const { apiBaseUrl, OrderBaseUrl, notify } = useContext(MainContext);
  const [orders, setOrders] = useState([]);
  const [chartData, setChartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(apiBaseUrl + OrderBaseUrl + "/get-order", {
      withCredentials: true
    })
      .then((response) => {
        if (response.data.status === 1) {
          setOrders(response.data.Orderdata);

          // Transform data for chart
          const data = response.data.Orderdata.reduce((acc, order) => {
            const date = new Date(order.createdAt).toLocaleDateString();
            if (!acc[date]) {
              acc[date] = 0;
            }
            acc[date] += order.order_total;
            return acc;
          }, {});

          setChartData(Object.keys(data).map(date => ({ date, total: data[date] })));
        } else {
          notify(response.data.msg, "error");
          navigate("/admin/login");
        }
      })
      .catch((error) => {
        notify("Failed to fetch orders", "error");
      });
  }, [apiBaseUrl, OrderBaseUrl, notify, navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Line Chart */}
      <div>
        <h2>Order Trends</h2>
        {chartData.length > 0 ? (
          <LineChart width={800} height={400} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#8884d8" />
          </LineChart>
        ) : (
          <p>No data available for the chart.</p>
        )}
      </div>

      {/* Orders Table */}
      <div>
        <h2>Order Details</h2>
        {orders.length > 0 ? (
          <table border="1" cellPadding="10" style={{ marginTop: '20px', width: '100%' }}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Payment Type</th>
                <th>Created At</th>
                <th>Shipping Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>${order.order_total}</td>
                  <td>{order.order_status === 1 ? 'Completed' : 'Pending'}</td>
                  <td>{order.order_payment_type === 1 ? 'Credit Card' : 'Cash'}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <p>Name: {order.shipping_details.name}</p>
                    <p>Email: {order.shipping_details.email}</p>
                    <p>Contact: {order.shipping_details.contact}</p>
                    <p>Address: {order.shipping_details.address}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No orders available.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
