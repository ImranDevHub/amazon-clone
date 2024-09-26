import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import emptyOrder from '../../assets/img/empty-cart.png';
import { MyContext } from '../../components/DataProvider/DataProvider';
import Product from '../../components/Product/Product';
import { db } from '../../utils/firebase';

function Orders() {
  const context = useContext(MyContext);
  const { state } = context;
  const { user } = state;

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          // Create a reference to the 'orders' collection for the logged-in user and order by 'created' timestamp
          const ordersRef = collection(db, 'users', user.uid, 'orders');
          const q = query(ordersRef, orderBy('created', 'desc'));

          // Fetch all the documents matching the query
          const querySnapshot = await getDocs(q);

          console.log(querySnapshot);
          //  Map through the snapshot to create an array of orders
          const ordersList = querySnapshot.docs;

          setOrders(
            ordersList.map(doc => ({ id: doc?.id, data: doc?.data() }))
          );
        } catch (err) {
          console.error('Error fetching orders:', err);
        }
      } else {
        setOrders([]);
      }
    };

    fetchOrders();
  }, [user]);

  console.log(orders);

  return (
    <section className="container d-flex justify-content-center">
      <div>
        {orders.length > 0 ? (
          <>
            <h2 className="fs-1 fw-bold border-bottom border-3 border-warning pb-4 my-4">
              Your Orders
            </h2>
            {orders?.map(order => {
              return order?.data.basket.map((basket, i) => (
                <Product
                  data={basket}
                  key={i}
                  className="shadow-none"
                  cart={true}
                  detail={true}
                />
              ));
            })}
          </>
        ) : (
          <>
            <h2 className="text-center mt-5 fs-1 fw-bold">
              Your Amazon Order is empty :)
            </h2>
            <div className="empty--cart">
              <img src={emptyOrder} alt="empty cart" className="w-100" />
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Orders;
